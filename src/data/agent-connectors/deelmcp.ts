import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'deelmcp_advance_eligibility_get',
    description: `Checks whether the authenticated contractor is eligible for a Deel Advance. Evaluates KYC verification, contract type, payment cycle status, termination proximity, and organization standing, returning a detailed breakdown.`,
    params: [],
  },
  {
    name: 'deelmcp_ap_vendor_bill_create',
    description: `Creates a new vendor bill in accounts payable, associating it with your organization. Attachments can be added to the bill via a subsequent call using the returned id.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_approve_or_reject_external_candidate_interview_response',
    description: `Use this endpoint to process a candidate's interview decision received from an external provider. Provide the job and candidate identifiers and the action to approve or reject the interview. The system records the decision and updates the candidate's`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_ats_application_feedback_list',
    description: `Returns a paginated list of feedbacks submitted for activities on the given application, including reviewer profiles, overall recommendations, and form responses.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the application to retrieve feedbacks for.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous response.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of feedbacks to return per page.`,
      },
      {
        name: 'should_hide_sensitive_fields',
        type: 'boolean',
        required: false,
        description: `When true, form responses marked as sensitive are omitted from the response. Defaults to true.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter feedbacks by submission status.`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_application_sources_list',
    description: `Returns the available application sources in the Applicant Tracking System.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `The cursor for pagination` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records returned in one response`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_applications_create',
    description: `Creates a new ATS application linking an existing candidate to an existing job. Both the candidate and job must exist prior to this call; the returned id can be used for subsequent operations such as adding notes or associating interview stages.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_ats_applications_get',
    description: `Retrieves a single application by its application_id, including associated job details, job posting details, and related metadata.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the application to retrieve`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_applications_interview_plan_create',
    description: `Associates an application with an interview plan stage. Set \`is_current_stage\` to control active vs historical entry. Supports selective activity triggers and candidate archivation with optional rejection email.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `ID of the application to be associated with the interview plan stage`,
      },
      { name: 'data', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_ats_applications_list',
    description: `Returns a cursor-paginated list of candidate applications across all open positions for the organization, with filtering by job, interview plan stage, candidate tags, source, stage type, and last-updated timestamp.`,
    params: [
      {
        name: 'candidate_tag_ids',
        type: 'array',
        required: false,
        description: `Filter applications by candidate tag IDs`,
      },
      {
        name: 'current_stage_category_type_slugs',
        type: 'array',
        required: false,
        description: `Filter applications by current stage category type slugs`,
      },
      {
        name: 'current_stage_default_type_slugs',
        type: 'array',
        required: false,
        description: `Filter applications by current stage default type slugs. Use 'others' for custom stages.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Use the nextCursor value from the previous response to get the next page of results.`,
      },
      {
        name: 'interview_plan_stage_ids',
        type: 'array',
        required: false,
        description: `Filter applications by specific interview plan stage IDs`,
      },
      {
        name: 'job_criterias_matchings',
        type: 'array',
        required: false,
        description: `Filter applications by job criteria matching state. Each object specifies a job criteria ID and whether the candidate matches it.`,
      },
      {
        name: 'job_id',
        type: 'string',
        required: false,
        description: `Filter applications by specific job ID`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of applications to return per page`,
      },
      {
        name: 'search_text',
        type: 'string',
        required: false,
        description: `Search text to filter applications by candidate name or email`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Field to sort applications by`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort order for applications`,
      },
      {
        name: 'source_slugs',
        type: 'array',
        required: false,
        description: `Filter applications by source slugs`,
      },
      {
        name: 'updated_after',
        type: 'string',
        required: false,
        description: `Filter applications updated after this timestamp (ISO 8601 format)`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_applications_notes_create',
    description: `Adds a note to a specific application. The \`author_id\` must correspond to a valid HRIS user.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `Id of the application which the note will be added`,
      },
      { name: 'data', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_ats_attachments_get',
    description: `Lists attachment files for a specific ATS entity, scoped by \`attachable_type_slug\`, \`attachable_id\`, and \`attachment_type_slug\`.`,
    params: [
      {
        name: 'attachable_id',
        type: 'string',
        required: true,
        description: `Unique identifier for the attachable entity`,
      },
      {
        name: 'attachable_type_slug',
        type: 'string',
        required: true,
        description: `Type of the attachable entity`,
      },
      {
        name: 'attachment_type_slug',
        type: 'string',
        required: true,
        description: `Type of the attachment`,
      },
      { name: 'cursor', type: 'string', required: false, description: `The cursor for pagination` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records returned in one response`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_candidate_create',
    description: `Creates a candidate record for contractor onboarding outside of an ATS flow. The returned record can be used in subsequent contract creation calls.`,
    params: [
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Details of candidate to create`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_candidates_create',
    description: `Creates a new candidate record in the ATS and returns the candidate with their unique identifier, which can then be used to link the candidate to job applications.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_ats_candidates_list',
    description: `Returns a paginated list of candidates, optionally filtered by job IDs, department IDs, tag IDs, current stage category or default type slugs, or a timestamp to return only records updated after a given point.`,
    params: [
      {
        name: 'current_stage_category_type_slugs',
        type: 'array',
        required: false,
        description: `Filter candidates by current stage category type slugs`,
      },
      {
        name: 'current_stage_default_type_slugs',
        type: 'array',
        required: false,
        description: `Filter candidates by current stage default type slugs`,
      },
      { name: 'cursor', type: 'string', required: false, description: `The cursor for pagination` },
      {
        name: 'department_ids',
        type: 'array',
        required: false,
        description: `Filter candidates by department IDs`,
      },
      {
        name: 'job_ids',
        type: 'array',
        required: false,
        description: `Filter candidates by job IDs`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records returned in one response`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search text for filtering candidates`,
      },
      {
        name: 'tag_ids',
        type: 'array',
        required: false,
        description: `Filter candidates by tag IDs`,
      },
      {
        name: 'updated_after',
        type: 'string',
        required: false,
        description: `Filter applications updated after this timestamp (ISO 8601 format)`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_candidates_tags_create',
    description: `Replaces all existing tags on a candidate with the provided set of \`tag_ids\`. This is a full replacement — any tags not included in the request body will be removed.`,
    params: [
      {
        name: 'candidate_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the candidate.`,
      },
      {
        name: 'tag_ids',
        type: 'array',
        required: true,
        description: `List of tag IDs to associate with the candidate`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_departments_list',
    description: `Returns a paginated list of all departments configured in the ATS.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `The cursor for pagination` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records returned in one response`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_email_templates_list',
    description: `Returns a paginated list of published email templates for the organization, supporting cursor-based pagination and filtering by \`updated_after\` timestamp.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Use the nextCursor value from the previous response to get the next page of results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of email templates to return per page`,
      },
      {
        name: 'updated_after',
        type: 'string',
        required: false,
        description: `Return only email templates that were updated after this timestamp (ISO 8601 format)`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_employment_types_list',
    description: `Returns a paginated list of employment types available in the ATS.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `The cursor for pagination` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records returned in one response`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_hiring_members_list',
    description: `Returns a paginated list of hiring members configured in the ATS.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `The cursor for pagination` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records returned in one response`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_job_boards_job_list',
    description: `Returns a paginated list of job postings belonging to the specified job board. Results can be filtered using available query parameters.`,
    params: [
      {
        name: 'job_board_id',
        type: 'string',
        required: true,
        description: `Job Board ID must be a valid UUID`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor for pagination (optional)`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records returned in one response (optional)`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_job_boards_list',
    description: `Retrieves a list of job boards in the Applicant Tracking System`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination` },
      { name: 'limit', type: 'integer', required: false, description: `Number of items to return` },
    ],
  },
  {
    name: 'deelmcp_ats_job_postings_get',
    description: `Returns a single job posting by \`job_posting_id\`, including its associated job object, publication status, application form configuration, compensation visibility flag, and rich-text description.`,
    params: [
      {
        name: 'job_posting_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the job posting to retrieve`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_job_postings_list',
    description: `Use this endpoint to retrieve job postings by specifying the job board ID or job ID. It provides detailed postings with job details, publication status, and relevant metadata.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor for pagination. Use the value from next_cursor of the previous response to fetch the next page.`,
      },
      {
        name: 'job_board_id',
        type: 'string',
        required: false,
        description: `Job board to list postings from (UUID).`,
      },
      {
        name: 'job_id',
        type: 'string',
        required: false,
        description: `When set, only postings for this job are returned (UUID).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of job postings to return per page (min: 1, max: 100).`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_jobs_create',
    description: `Creates a new job in the ATS and returns the resulting job record, including its assigned \`id\`, initial status, and associated approval rule and request identifiers.`,
    params: [{ name: 'data', type: 'object', required: false, description: `No description.` }],
  },
  {
    name: 'deelmcp_ats_jobs_list',
    description: `Returns a paginated list of jobs in the ATS, filterable by text search, interview plan, locations, teams, employment types, departments, status values, and an ISO 8601 \`updated_after\` timestamp.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `The cursor for pagination` },
      {
        name: 'department_ids',
        type: 'array',
        required: false,
        description: `Array of department UUIDs (optional)`,
      },
      {
        name: 'employment_type_ids',
        type: 'array',
        required: false,
        description: `Array of employment type UUIDs (optional)`,
      },
      {
        name: 'interview_plan_id',
        type: 'string',
        required: false,
        description: `Interview plan UUID (optional)`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records returned in one response`,
      },
      {
        name: 'location_ids',
        type: 'array',
        required: false,
        description: `Array of location UUIDs (optional)`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Text to search for in job records (optional)`,
      },
      {
        name: 'status',
        type: 'array',
        required: false,
        description: `Array of job status values (optional)`,
      },
      {
        name: 'team_ids',
        type: 'array',
        required: false,
        description: `Array of team UUIDs (optional)`,
      },
      {
        name: 'updated_after',
        type: 'string',
        required: false,
        description: `Filter jobs updated after this timestamp (ISO 8601 format)`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_locations_list',
    description: `Returns a paginated list of all work locations associated with the organization, suitable for use when constructing job postings or filtering by location.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `The cursor for pagination` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records returned in one response`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_offers_list',
    description: `Returns all offers associated with the organization, including worker type and offer status, to support pre-onboarding and contract creation workflows.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: false,
        description: `Filter offers by a specific application ID`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_reasons_list',
    description: `Returns a paginated list of rejection and archivation reasons, filterable by \`reason_group_slug\` and \`subgroup_slug\`; when \`include_counts\` is true, each reason includes a usage count.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `The cursor for pagination` },
      {
        name: 'include_counts',
        type: 'string',
        required: false,
        description: `If sent true, it will fetch result with counts`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records returned in one response`,
      },
      {
        name: 'reason_group_slug',
        type: 'string',
        required: false,
        description: `Reason group enum`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search text for filtering candidates`,
      },
      {
        name: 'subgroup_slug',
        type: 'string',
        required: false,
        description: `Reason subgroup enum`,
      },
    ],
  },
  {
    name: 'deelmcp_ats_tags_list',
    description: `Returns a paginated list of tags associated with the organization, filterable by label and \`tag_group_slug\`; when \`include_counts\` is true, each tag includes a count of associated candidates.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor for pagination. Use the value from next_cursor of the previous response to fetch the next page.`,
      },
      {
        name: 'include_counts',
        type: 'string',
        required: false,
        description: `When true, each tag includes candidates_count (number of candidates with that tag)`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of tags to return per page (default: 20, max: 100).`,
      },
      {
        name: 'search_text',
        type: 'string',
        required: false,
        description: `Filter tags by label (case-insensitive partial match)`,
      },
      {
        name: 'tag_group_slug',
        type: 'string',
        required: false,
        description: `Filter by tag group. Use CANDIDATE for candidate tags.`,
      },
    ],
  },
  {
    name: 'deelmcp_bank_contractor_bank_transfer_requirements_get',
    description: `Returns the field requirements for creating a bank transfer method for the specified country and currency combination, including fee information calculated against the provided amount or a default of 100.00.`,
    params: [
      { name: 'country', type: 'string', required: true, description: `Country code` },
      { name: 'currency', type: 'string', required: true, description: `Currency code` },
      {
        name: 'amount',
        type: 'number',
        required: false,
        description: `Amount for calculating fees, if not provided, the default amount of 100.00 is used`,
      },
    ],
  },
  {
    name: 'deelmcp_bank_employee_transfer_requirements_get',
    description: `Returns progressive field requirements for configuring a bank transfer payout method. Submit iteratively until \`is_final\` is \`true\`, then call \`POST /payouts/employees/methods\` to create the method.`,
    params: [{ name: 'data', type: 'object', required: false, description: `Request data` }],
  },
  {
    name: 'deelmcp_benefit_401k_activate',
    description: `Activates the 401k benefits integration for the specified legal entity. Must be called before 401k plans can be created or employees enrolled.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Id from the legal entity to activate 401k integration`,
      },
    ],
  },
  {
    name: 'deelmcp_benefit_401k_enrollment_create',
    description: `Enrolls a contract in a 401(k) plan, setting contribution rates and election details. The referenced plan must be active and created via \`POST /benefits/legal-entities/{legal_entity_id}/401k/plans\` before enrollment can proceed.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `Contract id from the employee`,
      },
      {
        name: 'contribution_limit',
        type: 'number',
        required: true,
        description: `Maximum limit of contribution.`,
      },
      {
        name: 'legal_entity_id',
        type: 'string',
        required: true,
        description: `Legal entity id which employee/contract belongs`,
      },
      {
        name: 'plan_id',
        type: 'string',
        required: true,
        description: `Plan id to enroll the employee into`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Type of the contribution for 401k.`,
      },
      {
        name: 'contribution_type',
        type: 'string',
        required: false,
        description: `Type of contribution.`,
      },
      {
        name: 'contribution_value',
        type: 'number',
        required: false,
        description: `Value of the contribution.`,
      },
      {
        name: 'details',
        type: 'object',
        required: false,
        description: `Object containing additional information about the enrollment.`,
      },
    ],
  },
  {
    name: 'deelmcp_benefit_401k_enrollment_delete',
    description: `Removes the enrollment settings for an employee, from a specific 401k plan.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `Contract id from the employee`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Legal entity id which employee/contract belongs`,
      },
      {
        name: 'plan_id',
        type: 'string',
        required: true,
        description: `Plan id to enroll the employee into`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Type of the contribution for 401k.`,
      },
    ],
  },
  {
    name: 'deelmcp_benefit_401k_enrollment_get',
    description: `Returns the current enrollment settings for an employee, within a specific 401k plan.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `Contract id from the employee`,
      },
      {
        name: 'legal_entity_id',
        type: 'string',
        required: true,
        description: `Legal entity id which employee/contract belongs`,
      },
      {
        name: 'plan_id',
        type: 'string',
        required: true,
        description: `Plan id to enroll the employee into`,
      },
    ],
  },
  {
    name: 'deelmcp_benefit_401k_enrollment_update',
    description: `Replaces all enrollment settings for a contract's existing 401(k) plan enrollment. As a PUT operation, the full set of enrollment fields must be supplied; omitted fields will not be preserved from the prior state.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract`,
      },
      {
        name: 'legal_entity_id',
        type: 'string',
        required: true,
        description: `Legal entity id which employee/contract belongs`,
      },
      {
        name: 'plan_id',
        type: 'string',
        required: true,
        description: `Plan id to enroll the employee into`,
      },
      {
        name: 'contribution_limit',
        type: 'number',
        required: false,
        description: `Maximum limit of contribution.`,
      },
      {
        name: 'contribution_type',
        type: 'string',
        required: false,
        description: `Type of contribution.`,
      },
      {
        name: 'contribution_value',
        type: 'number',
        required: false,
        description: `Value of the contribution.`,
      },
      {
        name: 'details',
        type: 'object',
        required: false,
        description: `Object containing additional information about the enrollment.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Type of the contribution for 401k.`,
      },
    ],
  },
  {
    name: 'deelmcp_benefit_401k_plan_clean_up',
    description: `Triggers a cleanup of 401k plan data for the specified legal entity.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Id from the legal entity to clean up`,
      },
    ],
  },
  {
    name: 'deelmcp_benefit_401k_plan_create',
    description: `Creates a new 401k plan for the specified legal entity. The 401k integration must be activated before this endpoint can be called. The response includes the plan's unique identifier required for subsequent enrollment and management operations.`,
    params: [
      {
        name: 'contribution_type',
        type: 'string',
        required: true,
        description: `Type of contribution for the 401K plan.`,
      },
      {
        name: 'legal_entity_id',
        type: 'string',
        required: true,
        description: `Id from the legal entity to receive a new 401k plan`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the 401K plan.` },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `Start date of the plan.`,
      },
      {
        name: 'contribution_value',
        type: 'number',
        required: false,
        description: `Value of the contribution if type is percent or amount.`,
      },
      {
        name: 'contribution_value_for_match_rate',
        type: 'array',
        required: false,
        description: `Array of objects containing limits and rates for match rate contribution type.`,
      },
      {
        name: 'details',
        type: 'object',
        required: false,
        description: `Object containing additional information about the 401K plan.`,
      },
    ],
  },
  {
    name: 'deelmcp_benefit_401k_plan_delete',
    description: `Delete a 401k plan`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Legal entity id which plans belongs`,
      },
      { name: 'plan_id', type: 'string', required: true, description: `Plan id` },
    ],
  },
  {
    name: 'deelmcp_benefit_401k_plan_list',
    description: `Returns all 401k plans configured for the specified legal entity.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Id from the legal entity to fetch 401k plans`,
      },
    ],
  },
  {
    name: 'deelmcp_benefit_401k_plan_update',
    description: `Replaces the full configuration of a 401k plan within the specified legal entity. As a PUT operation, the complete plan object must be supplied; any omitted fields will not be preserved.`,
    params: [
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Schema for the 401K Guideline Plan request body.`,
      },
      {
        name: 'legal_entity_id',
        type: 'string',
        required: true,
        description: `Id from the legal entity to update a 401k plan`,
      },
      { name: 'plan_id', type: 'string', required: true, description: `401K plan id` },
    ],
  },
  {
    name: 'deelmcp_benefit_employee_get',
    description: `Returns profile and contract data for a single employee within a legal entity integrated with an external benefits vendor. When \`active_contracts\` is \`true\`, only active contracts are included in the response.`,
    params: [
      {
        name: 'employee_id',
        type: 'string',
        required: true,
        description: `Employee id from the legal entity to fetch data`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Id from the legal entity to fetch data`,
      },
      {
        name: 'active_contracts',
        type: 'boolean',
        required: false,
        description: `Fetch only active contracts for employees`,
      },
    ],
  },
  {
    name: 'deelmcp_benefit_employee_list',
    description: `Returns employees belonging to the legal entity that has been integrated with an external benefits vendor. Results can be filtered to include only employees with active contracts.`,
    params: [
      {
        name: 'legal_entity_id',
        type: 'string',
        required: true,
        description: `Id from the legal entity to fetch data`,
      },
      {
        name: 'active_contracts',
        type: 'boolean',
        required: false,
        description: `Fetch only active contracts for employees`,
      },
      { name: 'items_per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Items to be skipped when searching`,
      },
    ],
  },
  {
    name: 'deelmcp_benefit_pay_stub_list',
    description: `Get pay stub from employees from organization integrated with external benefits vendor`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Id from the legal entity to fetch data`,
      },
      { name: 'items_per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Items to be skipped when searching`,
      },
      {
        name: 'payroll_end_date',
        type: 'string',
        required: false,
        description: `Payroll end date`,
      },
      {
        name: 'payroll_start_date',
        type: 'string',
        required: false,
        description: `Payroll start date`,
      },
      { name: 'status', type: 'string', required: false, description: `Payroll status` },
    ],
  },
  {
    name: 'deelmcp_benefit_payroll_setting_get',
    description: `Get legal entity payroll settings from organization integrated with external benefits vendor`,
    params: [
      {
        name: 'legal_entity_id',
        type: 'string',
        required: true,
        description: `Id from the legal entity to fetch data`,
      },
    ],
  },
  {
    name: 'deelmcp_benefit_paystub_get',
    description: `Get paystub by payroll event from legal entity integrated with external benefits vendor`,
    params: [
      { name: 'legal_entity_id', type: 'string', required: true, description: `Legal entity UUID` },
      { name: 'payroll_event_id', type: 'string', required: true, description: `Payroll id` },
    ],
  },
  {
    name: 'deelmcp_benefit_paystub_list',
    description: `Get paystubs from legal entity integrated with external benefits vendor`,
    params: [
      {
        name: 'legal_entity_id',
        type: 'string',
        required: true,
        description: `Id from the legal entity to fetch data`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The last fetched id to start querying from`,
      },
      {
        name: 'date_end',
        type: 'string',
        required: false,
        description: `End date to fectch the paystubs`,
      },
      {
        name: 'date_start',
        type: 'string',
        required: false,
        description: `Start date to fectch the paystubs from`,
      },
      { name: 'items_per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'states',
        type: 'array',
        required: false,
        description: `Payroll states: OPEN | LOCKED | CLOSED (OPEN doesn't have \`employees\` info)`,
      },
    ],
  },
  {
    name: 'deelmcp_benefits_ytd_pay_get',
    description: `Returns aggregated year-to-date payroll figures for employees in the specified legal entity over a caller-specified date range. Both \`date_start\` and \`date_end\` are required.`,
    params: [
      {
        name: 'date_end',
        type: 'string',
        required: true,
        description: `End date to fetch aggregated pay data`,
      },
      {
        name: 'date_start',
        type: 'string',
        required: true,
        description: `Start date to fetch aggregated pay data`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Id from the legal entity to fetch data`,
      },
    ],
  },
  {
    name: 'deelmcp_clone_a_group',
    description: `Clone an existing group within the organization. This creates a new group with the specified name, copying the structure and settings from the source group.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Unique identifier of the group to be cloned.`,
      },
    ],
  },
  {
    name: 'deelmcp_compensation_band_bulk_update',
    description: `Bulk-updates existing compensation bands. Each band is identified by ID or by the unique combination of job family group, job family, job profile, market, market group, and worker type. Accepts up to 1000 bands per request.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_compensation_band_create',
    description: `Bulk creates or upserts up to 1000 compensation bands per request. Returns a summary of created and updated records. Bands define pay ranges for a job profile, market, and worker type combination.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_compensation_band_delete',
    description: `Permanently deletes a compensation band, nullifying any existing band point assignments. This action cannot be undone.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the compensation band to delete.`,
      },
    ],
  },
  {
    name: 'deelmcp_compensation_band_get',
    description: `Returns a single compensation band with all band point values and worker statistics. Optionally compare against a specific employee by providing their HRIS profile OID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the compensation band to retrieve.`,
      },
      {
        name: 'compareWithHrisProfileOid',
        type: 'string',
        required: false,
        description: `Optional HRIS profile OID to compare the band against a specific employee. When provided, workerStats will include the employee's band placement.`,
      },
    ],
  },
  {
    name: 'deelmcp_compensation_band_list',
    description: `Returns a paginated list of compensation bands. Supports filtering by market, job profile, worker type, currency, status, and band IDs, as well as sorting by level or assigned worker count.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination — returns results after this cursor.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination — returns results before this cursor.`,
      },
      {
        name: 'compensationBandIds',
        type: 'string',
        required: false,
        description: `Comma-separated list of compensation band IDs to filter by.`,
      },
      {
        name: 'currencies',
        type: 'string',
        required: false,
        description: `Comma-separated list of currency codes to filter by.`,
      },
      {
        name: 'jobProfiles',
        type: 'string',
        required: false,
        description: `Comma-separated list of job profile IDs to filter by.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'markets',
        type: 'string',
        required: false,
        description: `Comma-separated list of market IDs to filter by.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search term to filter by job profile name.`,
      },
      { name: 'sortBy', type: 'string', required: false, description: `Field to sort results by.` },
      { name: 'sortOrder', type: 'string', required: false, description: `Sort direction.` },
      {
        name: 'statuses',
        type: 'string',
        required: false,
        description: `Comma-separated list of band statuses to filter by.`,
      },
      {
        name: 'workerTypes',
        type: 'string',
        required: false,
        description: `Comma-separated list of worker types to filter by.`,
      },
    ],
  },
  {
    name: 'deelmcp_compensation_band_point_update',
    description: `Updates the band point configuration (indexes 1–9) for the organization. Points 1 and 9 must always be enabled. No separate GET exists — read current settings from the List Compensation Bands response.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_compensation_band_update',
    description: `Updates an existing compensation band. When \`cashBandPointValues\` is provided, it replaces the full band points list. Compensation bands define pay ranges for a job profile and market.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the compensation band to update.`,
      },
    ],
  },
  {
    name: 'deelmcp_compensation_job_family_create',
    description: `Use this endpoint to create a new job family within an existing job family group. Job families group related job profiles under a common domain. Ensure you have the jobArchitecture.manage permission to perform this operation.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_compensation_job_family_group_create',
    description: `Creates a new job family group — the top-level unit in the job architecture hierarchy used to group related job families.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_compensation_job_family_group_list',
    description: `Use this endpoint to retrieve a paginated list of job family groups for the organization. Supports filtering by name, IDs, and tracks, as well as sorting and pagination. Ensure you have the jobArchitecture.view permission to perform this operation.`,
    params: [
      {
        name: 'jobFamilyGroupIds',
        type: 'array',
        required: false,
        description: `Filter by specific job family group IDs.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip for pagination.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Filter job family groups by name.`,
      },
      { name: 'sortBy', type: 'string', required: false, description: `Field to sort results by.` },
      { name: 'sortOrder', type: 'string', required: false, description: `Sort direction.` },
      {
        name: 'tracks',
        type: 'array',
        required: false,
        description: `Filter by job profile position tracks.`,
      },
    ],
  },
  {
    name: 'deelmcp_compensation_job_family_list',
    description: `Returns a paginated list of job families. Supports filtering by name, job family group, IDs, and tracks, as well as sorting and pagination.`,
    params: [
      {
        name: 'jobFamilyGroupIds',
        type: 'array',
        required: false,
        description: `Filter by parent job family group IDs.`,
      },
      {
        name: 'jobFamilyIds',
        type: 'array',
        required: false,
        description: `Filter by specific job family IDs.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip for pagination.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Filter job families by name.`,
      },
      { name: 'sortBy', type: 'string', required: false, description: `Field to sort results by.` },
      { name: 'sortOrder', type: 'string', required: false, description: `Sort direction.` },
      { name: 'tracks', type: 'array', required: false, description: `Filter by position tracks.` },
    ],
  },
  {
    name: 'deelmcp_compensation_job_profile_bulk_assign',
    description: `Use this endpoint to bulk assign or unassign job profiles to workers' primary active employment. Pass null as jobProfileId to remove an existing assignment. Ensure you have the jobProfile.manage permission to perform this operation.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_compensation_job_profile_create',
    description: `Use this endpoint to create a new job profile within a job family in the job architecture module. Job profiles define seniority levels and tracks for workers. Ensure you have the jobProfile.manage permission to perform this operation.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_compensation_job_profile_history_list',
    description: `Returns a cursor paginated list of workers and their assigned job profiles for the organization's primary active employments. Supports filtering by assignment status, job title, manager, and country.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Use the cursor value from the previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination.`,
      },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `Filter by worker country codes.`,
      },
      { name: 'jobTitles', type: 'array', required: false, description: `Filter by job title.` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      { name: 'managerIds', type: 'array', required: false, description: `Filter by manager IDs.` },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter workers by name.`,
      },
      { name: 'sortBy', type: 'string', required: false, description: `Field to sort results by.` },
      { name: 'sortOrder', type: 'string', required: false, description: `Sort direction.` },
      {
        name: 'types',
        type: 'array',
        required: false,
        description: `Filter workers by assignment status. ASSIGNED = has a job profile, UNASSIGNED = does not.`,
      },
    ],
  },
  {
    name: 'deelmcp_compensation_job_profile_list',
    description: `Returns a paginated list of job profiles. Supports filtering by name, job family, job family group, IDs, and tracks, as well as sorting and pagination.`,
    params: [
      {
        name: 'jobFamilyGroupIds',
        type: 'array',
        required: false,
        description: `Filter by job family group IDs.`,
      },
      {
        name: 'jobFamilyIds',
        type: 'array',
        required: false,
        description: `Filter by job family IDs.`,
      },
      {
        name: 'jobProfileIds',
        type: 'array',
        required: false,
        description: `Filter by specific job profile IDs.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip for pagination.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Filter job profiles by name or description.`,
      },
      { name: 'sortBy', type: 'string', required: false, description: `Field to sort results by.` },
      { name: 'sortOrder', type: 'string', required: false, description: `Sort direction.` },
      { name: 'tracks', type: 'array', required: false, description: `Filter by position tracks.` },
    ],
  },
  {
    name: 'deelmcp_compensation_market_bulk_assign',
    description: `Assigns multiple workers to sub-markets in a single request. Each assignment maps a worker (by ID or email) to a sub-market. Workers can only belong to one sub-market; reassignment moves them automatically.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_compensation_market_bulk_unassign',
    description: `Removes multiple workers from their assigned sub-markets in a single request. After unassignment, workers lose their sub-market association and their compensation band assignment is invalidated.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_compensation_market_group_create',
    description: `Bulk creates market groups and their sub-markets. Each group requires a name, currency code, and at least one sub-market with eligible worker types. Defines the market structure used for compensation bands.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_compensation_market_group_get',
    description: `Retrieves a single market group by its unique identifier, including all associated sub-markets and their eligible worker types. Market groups define the currency and sub-market structure used in compensation bands.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the market group to retrieve.`,
      },
    ],
  },
  {
    name: 'deelmcp_compensation_market_group_list',
    description: `Returns a cursor-paginated list of market groups and sub-markets for the organization. Each market group defines a currency and contains sub-markets with eligible worker types. Filterable by name, worker types, and currencies.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination.`,
      },
      {
        name: 'currencies',
        type: 'string',
        required: false,
        description: `Comma-separated list of currency codes to filter by.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search term to filter by market group name.`,
      },
      {
        name: 'workerTypes',
        type: 'string',
        required: false,
        description: `Comma-separated list of worker types to filter by.`,
      },
    ],
  },
  {
    name: 'deelmcp_compensation_market_group_update',
    description: `Updates a market group by ID. Can update name, currency code, description, and sub-markets list. When markets is provided it replaces the existing sub-markets list; omitted sub-markets are deleted.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the market group to update.`,
      },
    ],
  },
  {
    name: 'deelmcp_compensation_market_list',
    description: `Returns a paginated list of sub-markets. Sub-markets belong to a market group and define which worker types are eligible for compensation bands in a given geographic or logical segment.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
    ],
  },
  {
    name: 'deelmcp_compensation_market_worker_list',
    description: `Returns a cursor-paginated list of workers assigned to a specific sub-market, with band assignment status, band stats status, current salary, and manager info.`,
    params: [
      {
        name: 'market_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the sub-market whose workers to list.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination.`,
      },
      {
        name: 'cities',
        type: 'string',
        required: false,
        description: `Comma-separated list of cities to filter by.`,
      },
      {
        name: 'jobTitles',
        type: 'string',
        required: false,
        description: `Comma-separated list of job titles to filter by.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'managers',
        type: 'string',
        required: false,
        description: `Comma-separated list of manager IDs to filter by.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search term to filter by worker name.`,
      },
    ],
  },
  {
    name: 'deelmcp_compliance_document_send_confirm',
    description: `Step 2 of 2: confirms and executes a pending send-document operation, assigning the custom document to the specified workers. Requires the execution_id returned by the preview step.`,
    params: [
      {
        name: 'execution_id',
        type: 'string',
        required: true,
        description: `The execution ID returned by the send preview step.`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_amendment_create',
    description: `Submits an amendment to modify the details of an existing contract. If the contract is already signed or active, the amendment must be approved and re-signed before the changes take effect.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `You can specify any combination of data points that need changing.`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_amendment_list',
    description: `Retrieves the paginated list of amendments associated with a given contract, with optional filtering by amendment status and sign status.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the contract`,
      },
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination.` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of work statements to return.`,
      },
      {
        name: 'sign_statuses',
        type: 'array',
        required: false,
        description: `Filter by work statement sign status.`,
      },
      {
        name: 'statuses',
        type: 'array',
        required: false,
        description: `Filter by work statement status.`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_bulk_update_create',
    description: `Use this endpoint to execute bulk contract updates asynchronously. Currently, only completion_date updates for IC contracts are supported.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_contract_bulk_update_get',
    description: `Returns the current status and row-level failures for a bulk contract update execution.`,
    params: [
      {
        name: 'execution_id',
        type: 'string',
        required: true,
        description: `Bulk contract update execution public ID.`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_copy_bulk_create',
    description: `Create copies of a batch of contracts. Use this endpoint to duplicate contracts efficiently. Ensure the correct source contracts and overrides are specified for each copy.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_contract_cost_center_create',
    description: `Assign cost centers to employment by contract id`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `Employment's contract ID`,
      },
      { name: 'data', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_contract_create',
    description: `Creates a new contractor contract and returns it with its assigned \`id\`. After creation, invite the contractor to sign via \`POST /contracts/{contract_id}/invitations\`.`,
    params: [{ name: 'data', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_contract_custom_field_delete',
    description: `Clears the value of a custom field on the specified contract, identified by the custom field \`id\`.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Contract id.` },
      { name: 'id', type: 'string', required: true, description: `Custom field id.` },
    ],
  },
  {
    name: 'deelmcp_contract_custom_field_get',
    description: `Retrieves a single custom field definition from a contract by its \`id\`, returning the field's name, type, settings, placement, and description.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Custom field id.` }],
  },
  {
    name: 'deelmcp_contract_custom_field_list',
    description: `Returns all custom fields associated with the specified contract.`,
    params: [{ name: 'contract_id', type: 'string', required: true, description: `Contract Id` }],
  },
  {
    name: 'deelmcp_contract_custom_field_update',
    description: `Creates or updates custom field values on the specified contract. This is a full replacement operation — any custom field values not included in the request body will be removed.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Contract id.` },
      { name: 'data', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_contract_get',
    description: `Retrieves the full record for a specific contract by \`contract_id\`, including status, compensation, worker details, and metadata. Pass \`expand=cost_centers\` as a query parameter to include cost center data in the response.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the contract.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Include cost centers in the response.`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_i9_dismiss',
    description: `Marks the I-9 for a given contract as verified outside of Deel`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_invoice_adjustment_list',
    description: `Retrieves invoice line items (adjustments) associated with a given contract_id, with support for filtering by contract type, adjustment type, status, invoice, reporter, and submission date range.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel contract id.` },
      {
        name: 'contract_types',
        type: 'array',
        required: false,
        description: `List of contract types`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Short date in format ISO-8601 (YYYY-MM-DD). For example 2022-12-31.`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `Short date in format ISO-8601 (YYYY-MM-DD). For example 2022-12-31.`,
      },
      {
        name: 'invoice_id',
        type: 'string',
        required: false,
        description: `ID of an existing invoice`,
      },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Return a page of results with given number of records; NOTE: technically ALL query parameters are strings or array of strings`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Return a page of results after given index of row; NOTE: technically ALL query parameters are strings or array of strings`,
      },
      {
        name: 'reporter_id',
        type: 'string',
        required: false,
        description: `ID of an existing profile`,
      },
      {
        name: 'statuses',
        type: 'array',
        required: false,
        description: `statuses of invoice adjustment to filter`,
      },
      {
        name: 'types',
        type: 'array',
        required: false,
        description: `types of invoice adjustments to filter`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_list',
    description: `Returns a paginated list of contract summaries with optional filtering by status, type, team, country, currency, external ID, or name. Use \`GET /contracts/{contract_id}\` for full details.`,
    params: [
      {
        name: 'after_cursor',
        type: 'string',
        required: false,
        description: `Return next page of results after the given cursor.`,
      },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `Filter contracts by country codes.`,
      },
      {
        name: 'currencies',
        type: 'array',
        required: false,
        description: `Filter contracts by currency codes.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Include cost centers in the response.`,
      },
      {
        name: 'external_id',
        type: 'string',
        required: false,
        description: `Filter contracts for the given external ID.`,
      },
      {
        name: 'external_id_absent',
        type: 'string',
        required: false,
        description: `Filter contracts by external ID presence. When true, returns contracts without an external ID. When false, returns contracts with an external ID. Cannot be used with external_id query param when set to true.`,
      },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Return a page of results with the given number of records.`,
      },
      {
        name: 'order_direction',
        type: 'string',
        required: false,
        description: `Order direction of results; ascending or descending.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Include a contract if its name or the contractor's name contains the given search term.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Sort contracts by the given field name.`,
      },
      {
        name: 'statuses',
        type: 'array',
        required: false,
        description: `Filter contracts by current status. A contract is included in the results if its status is in this list.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Filter contracts for the given team ID. NOTE: All query parameters are technically strings or arrays of strings.`,
      },
      {
        name: 'types',
        type: 'array',
        required: false,
        description: `Filter contracts by type. A contract is included in the results if its type is in this list.`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_milestone_review_bulk_create',
    description: `Review a batch of milestones to approve or reject submitted work.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel contract id.` },
      { name: 'data', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_contract_milestone_review_create',
    description: `Review a milestone to approve or decline submitted work.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel contract id.` },
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'milestone_id',
        type: 'string',
        required: true,
        description: `ID of milestone to return`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_off_cycle_payment_create',
    description: `Creates a new invoice line item for an off-cycle payment against a specific contract, for use when a payment must be issued outside the regular payment schedule.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier (ID) of the Deel contract for which the off-cycle payment is being created.`,
      },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_contract_off_cycle_payment_get',
    description: `Retrieves a single off-cycle payment identified by id within a specific contract.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel contract id.` },
      { name: 'id', type: 'string', required: true, description: `Deel off-cycle payment id.` },
    ],
  },
  {
    name: 'deelmcp_contract_off_cycle_payment_list',
    description: `Retrieves all off-cycle payments for a specified contract. Off-cycle payments represent payments made outside the regular payment schedule, such as exceptional or one-time expenses.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier (ID) of the Deel contract for which to retrieve off-cycle payments.`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_payroll_adjustment_list',
    description: `Retrieves all adjustments associated with a specific contract, optionally scoped to a date range.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel adjustment id.` },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Filter adjustments by start date.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `Filter adjustments by end date.`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_pdf_download',
    description: `Returns a secure, time-limited URL for downloading the PDF version of the contract identified by contract_id. The URL is accessible only to the authenticated worker associated with that contract.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique public identifier of the contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_preview',
    description: `Returns the rendered HTML content of an IC or EOR contract agreement for a given contract_id. If no templateId is provided, the default or currently assigned template is used. Global Payroll contract types are not supported.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel contract id.` },
      {
        name: 'templateId',
        type: 'string',
        required: false,
        description: `ID of an existing contract template.`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_reject',
    description: `Rejects a contract identified by contract_id, provided it is currently in a pending, unsigned state. Contracts that have already been signed or previously rejected are not eligible for this operation.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique public identifier of the contract to reject. This is the contract's public ID that can be used to identify the specific contract in the system.`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_sign',
    description: `Signs a contract on behalf of the client (employer), advancing it through the hiring workflow to a pending-contractor-signature state. Can also sign a pending amendment on an active contract.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel contract id.` },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_contract_sign_invite_delete',
    description: `Removes the active signing invitation from a contract to allow a new invitation to be issued to the worker.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel contract id.` },
    ],
  },
  {
    name: 'deelmcp_contract_sign_invite_get',
    description: `Retrieves the signing invitation link generated for the worker on a contract, with optional localization via the \`locale\` parameter.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel contract id.` },
      {
        name: 'locale',
        type: 'string',
        required: false,
        description: `Country code in ISO Alpha-2 format (lowercase).`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_sign_invite_send',
    description: `Sends a signing invitation email to a worker, setting their email as the expected signer. Resets a previously rejected contract to signing-eligible. Cannot be called if the worker has already signed.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel contract id.` },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_contract_task_bulk_review',
    description: `Approves or declines multiple submitted tasks associated with a contract in a single request. Each task review must include a status of approved or declined, with an optional reason required when declining.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique Deel contract ID associated with the tasks.`,
      },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_contract_task_create',
    description: `Creates a new task for the contractor associated with the specified contract. A task can include an amount, description, and submission date.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique Deel contract ID associated with the task.`,
      },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_contract_task_delete',
    description: `Deletes a specific task from a contract. An optional \`reason\` can be supplied for audit or documentation purposes.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Deel contract.`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the task to be deleted.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `The reason for deleting the task. This can be used for auditing purposes.`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_task_list',
    description: `Retrieves all tasks associated with a specific contract, including each task's ID, amount, submission date, status, and description.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the Deel contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_task_review',
    description: `Submits an approval or rejection review for a task associated with a contract. If the review status is declined, an optional reason may be included in the request body.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique Deel contract ID associated with the task.`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique ID of the task to be reviewed.`,
      },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_contract_template_list',
    description: `Returns all contract templates available to the organization, including fixed-rate, pay-as-you-go, and milestone-based types. Template identifiers returned here can be supplied when creating new contracts.`,
    params: [],
  },
  {
    name: 'deelmcp_contract_termination_create',
    description: `Initiates termination of an active contract, recording the termination reason, effective date, and any final payment details. Can only be called on contracts that are currently active.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the contractor contract`,
      },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Termination data. At minimum, you must provide either terminate_now: true (for immediate termination) OR completion_date (for scheduled termination).`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_termination_delete',
    description: `Cancels a pending termination request for the specified contract, reverting the contract to its pre-termination state. Only termination requests that have not yet reached their effective date can be cancelled.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `Unique identifier for the contract`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_termination_reason_list',
    description: `Retrieves the standardized list of termination reasons to present when initiating a contract termination`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Use the value from \`next_cursor\` in the previous response to fetch the next page.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (default: 20, max: 100)`,
      },
      { name: 'order', type: 'string', required: false, description: `Sort direction for results` },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to order results by`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_timesheet_list',
    description: `Returns timesheets associated with the specified contract, with optional filtering by contract type, status, reporter, and date range.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel contract id.` },
      {
        name: 'contract_types',
        type: 'string',
        required: false,
        description: `Types of contracts to filter.`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Short date in format ISO-8601 (YYYY-MM-DD). For example 2022-12-31.`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `Short date in format ISO-8601 (YYYY-MM-DD). For example 2022-12-31.`,
      },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Return a page of results with given number of records; NOTE: technically ALL query parameters are strings or array of strings`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Return a page of results after given index of row`,
      },
      {
        name: 'reporter_id',
        type: 'string',
        required: false,
        description: `ID of an existing profile`,
      },
      {
        name: 'statuses',
        type: 'string',
        required: false,
        description: `Statuses of timesheets to filter.`,
      },
    ],
  },
  {
    name: 'deelmcp_contract_update',
    description: `Sets an external identifier to link internal reference IDs (e.g. employee numbers, ERP keys) to a Deel worker. Must be unique. Can be used as a filter when listing contracts.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel contract id.` },
      { name: 'data', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_delay_eor_employee_onboarding',
    description: `Delay EOR employee onboarding`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      { name: 'oid', type: 'string', required: true, description: `Contract oid` },
    ],
  },
  {
    name: 'deelmcp_delete_worker_relation',
    description: `Delete a worker relation.`,
    params: [
      { name: 'hrisProfileOid', type: 'string', required: true, description: `Worker Relation ID` },
    ],
  },
  {
    name: 'deelmcp_delete_worker_relation_external_id',
    description: `Delete a worker relation by external id.`,
    params: [
      {
        name: 'profileId',
        type: 'string',
        required: true,
        description: `Worker Relation external ID`,
      },
    ],
  },
  {
    name: 'deelmcp_delete_worker_relation_type_external_id',
    description: `Delete a Worker Relation Type by the external ID.`,
    params: [
      {
        name: 'externalId',
        type: 'string',
        required: true,
        description: `Worker Relation Type external ID`,
      },
    ],
  },
  {
    name: 'deelmcp_document_bulk_reminder_confirm',
    description: `Send reminder notifications to workers with a pending document assignment`,
    params: [
      {
        name: 'execution_id',
        type: 'string',
        required: true,
        description: `The execution ID returned by the bulk-remind preview step.`,
      },
    ],
  },
  {
    name: 'deelmcp_document_bulk_reminder_preview',
    description: `Previews a bulk reminder operation for a custom document. Returns recipient count, sample names, and an execution ID. Nothing is sent — must be followed by the confirm endpoint.`,
    params: [
      {
        name: 'documentTemplateId',
        type: 'string',
        required: true,
        description: `Unique identifier of the document template to send reminders for.`,
      },
      {
        name: 'customMessage',
        type: 'string',
        required: false,
        description: `Optional custom message to include in the reminder.`,
      },
      {
        name: 'documentStatuses',
        type: 'array',
        required: false,
        description: `Filter recipients by document status.`,
      },
      {
        name: 'hiringStatuses',
        type: 'array',
        required: false,
        description: `Filter recipients by hiring status.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Filter recipients by worker name.`,
      },
      {
        name: 'workerIds',
        type: 'array',
        required: false,
        description: `Specific worker IDs to remind. If empty, all eligible workers are included.`,
      },
    ],
  },
  {
    name: 'deelmcp_document_bulk_reminder_result_get',
    description: `Returns the full recipient list for a pending bulk reminder execution. Use after the preview step to show the user exactly who will be reminded about a custom document before they confirm.`,
    params: [
      {
        name: 'execution_id',
        type: 'string',
        required: true,
        description: `The execution ID returned by the bulk-remind preview step.`,
      },
    ],
  },
  {
    name: 'deelmcp_document_compliance_cancel',
    description: `Cancels a custom document assignment for a specific worker. Only works on documents not yet completed or signed. Triggers onboarding reassessment.`,
    params: [
      {
        name: 'document_template_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the document template.`,
      },
      {
        name: 'workerId',
        type: 'string',
        required: true,
        description: `Unique identifier of the worker whose document assignment is being cancelled.`,
      },
    ],
  },
  {
    name: 'deelmcp_document_compliance_download',
    description: `Returns pre-signed download URLs (valid 15 minutes) for a submitted custom document. Returns an empty array if the document has not yet been submitted. Handles regular PDFs, e-signature documents, and uploaded files.`,
    params: [
      {
        name: 'document_template_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the document template.`,
      },
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the worker.`,
      },
    ],
  },
  {
    name: 'deelmcp_document_compliance_list',
    description: `Search and filter custom document submissions across all workers for a given template. Use to answer "who has submitted/not submitted document X?".`,
    params: [
      {
        name: 'document_template_id',
        type: 'string',
        required: true,
        description: `The ID of the document template to search within.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response.`,
      },
      {
        name: 'document_statuses',
        type: 'array',
        required: false,
        description: `Filter by document status.`,
      },
      {
        name: 'hiring_statuses',
        type: 'array',
        required: false,
        description: `Filter by worker hiring status.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      { name: 'search', type: 'string', required: false, description: `Filter by worker name.` },
    ],
  },
  {
    name: 'deelmcp_document_compliance_remind',
    description: `Sends a reminder email to specific workers about a pending custom document. Has a built-in 24-hour rate limit per worker — workers reminded within the last 24 hours are silently skipped.`,
    params: [
      {
        name: 'document_template_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the document template.`,
      },
      {
        name: 'workerIds',
        type: 'array',
        required: true,
        description: `List of worker IDs to send reminders to. Between 1 and 100.`,
      },
      {
        name: 'customMessage',
        type: 'string',
        required: false,
        description: `Optional custom message to include in the reminder email.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Optional custom subject line for the reminder email.`,
      },
    ],
  },
  {
    name: 'deelmcp_document_send_preview',
    description: `Step 1 of 2: previews sending a custom document to one or more workers. Returns recipient count, sample names, and an execution ID. Nothing is sent. Must be followed by the confirm endpoint.`,
    params: [
      {
        name: 'documentTemplateId',
        type: 'string',
        required: true,
        description: `Unique identifier of the document template to send.`,
      },
      {
        name: 'workerIds',
        type: 'array',
        required: true,
        description: `List of worker IDs to send the document to. At least 1 required.`,
      },
    ],
  },
  {
    name: 'deelmcp_document_template_list',
    description: `Lists all custom document templates in the organization. Use when the user asks "what custom documents do we have?" or before sending a document to workers.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous response.`,
      },
      {
        name: 'document_types',
        type: 'array',
        required: false,
        description: `Filter by document action type.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'mandatory_optional',
        type: 'array',
        required: false,
        description: `Filter by whether the document is required or optional.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Free-text search on document template name.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Field to sort results by.`,
      },
      { name: 'sort_order', type: 'string', required: false, description: `Sort direction.` },
    ],
  },
  {
    name: 'deelmcp_draft_quote_create',
    description: `Use this endpoint to create draft quotes for preparing contracts. This process helps in establishing preliminary terms before finalizing.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_draft_quote_update',
    description: `Use this endpoint to update a draft quote before it becomes a contract.`,
    params: [
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Draft quote fields to update. All fields are optional.`,
      },
      {
        name: 'draft_quote_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the draft quote to update.`,
      },
    ],
  },
  {
    name: 'deelmcp_engage_learning_journey_list',
    description: `Returns cursor-paginated ActionableJourneys (Courses) assigned to the authenticated worker.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor to the next page of results. If not provided, the first page will be returned.`,
      },
      {
        name: 'journey_assignment_ids',
        type: 'array',
        required: false,
        description: `Filter by JourneyAssignment IDs.`,
      },
      {
        name: 'journey_ids',
        type: 'array',
        required: false,
        description: `Filter by Journey IDs.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Return a page of results with given number of records.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_additional_cost_get',
    description: `Returns the allowances and non-statutory additional costs available for inclusion in an EOR contract quote for the specified country.`,
    params: [
      {
        name: 'country',
        type: 'string',
        required: true,
        description: `The two-letter ISO code of the country for which to retrieve the EOR additional costs.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_amendment_accept',
    description: `Accepts a pending amendment on an EOR worker contract, formally approving the proposed modifications on the client's behalf. The amendment must already exist and be in a pending state before this operation can be called.`,
    params: [
      {
        name: 'amendment_id',
        type: 'string',
        required: true,
        description: `A unique identifier for the employee contract amendment.`,
      },
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of EOR worker contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_amendment_confirm',
    description: `Confirms a draft amendment on an EOR contract and initiates the review process, routing it to Deel and the employee for acknowledgment and approval. The amendment must exist in a confirmable state prior to calling this endpoint.`,
    params: [
      {
        name: 'amendment_id',
        type: 'string',
        required: true,
        description: `A unique identifier for the employee contract amendment.`,
      },
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of EOR worker contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_amendment_create',
    description: `Creates a new amendment for an EOR contract, supporting changes to salary, currency, effective date, and other terms. Validated against applicable business and regulatory rules.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the EOR worker contract`,
      },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_eor_amendment_delete',
    description: `Cancels a pending EOR contract amendment, voiding the request and preventing it from being reviewed or applied to the contract.`,
    params: [
      {
        name: 'amendment_id',
        type: 'string',
        required: true,
        description: `A unique identifier for the employee contract amendment.`,
      },
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of EOR worker contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_amendment_get',
    description: `Retrieves a specific amendment for an EOR contract.`,
    params: [
      {
        name: 'amendment_id',
        type: 'string',
        required: true,
        description: `A unique identifier for the employee contract amendment.`,
      },
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of EOR worker contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_amendment_list',
    description: `Retrieves all amendments associated with a given EOR contract, including each amendment's type, effective date, and current status, providing a full history of changes applied to the contract.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of EOR worker contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_amendment_pdf_download',
    description: `Generates a secure, time-limited download URL for the PDF of a specific EOR contract amendment. The returned URL is valid for 15 minutes from the time of generation.`,
    params: [
      {
        name: 'amendment_id',
        type: 'string',
        required: true,
        description: `A unique identifier for the employee contract amendment.`,
      },
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of EOR worker contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_amendment_settings_get',
    description: `Returns validation settings for amendment data points on an EOR contract, optionally scoped by employment state. Use to determine which fields are editable and what constraints apply.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of EOR worker contract.`,
      },
      {
        name: 'employment_state',
        type: 'string',
        required: false,
        description: `The employment state of the EOR worker contract`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_amendment_sign',
    description: `Records the employee's signature on a specific contract amendment, confirming acceptance of the amendment terms. Returns the updated amendment record upon successful signing.`,
    params: [
      {
        name: 'amendment_id',
        type: 'string',
        required: true,
        description: `A unique identifier for the employee contract amendment.`,
      },
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of EOR worker contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_amendment_update',
    description: `Applies a partial update to a specific EOR contract amendment. The amendment must be in DRAFT status; updates to amendments in any other state will be rejected. This operation overwrites existing draft data and cannot be undone.`,
    params: [
      {
        name: 'amendment_id',
        type: 'string',
        required: true,
        description: `A unique identifier for the employee contract amendment. This string is either supplied by the client or generated by the system and is used to uniquely identify the amendment during upsert operations.`,
      },
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of EOR worker contract.`,
      },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_eor_amendment_validate',
    description: `Validates amendment data points for a given contract against any external validation rules before an amendment is submitted. This call should be made prior to creating an amendment to confirm that the proposed data points are acceptable.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
      {
        name: 'data',
        type: 'object',
        required: false,
        description: `Dynamic object containing amendment fields. Supports flexible keys such as scope, job_title, or others.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_assignment_accept',
    description: `Records client approval of a project assignment for an EOR contract, confirming that the terms have been reviewed and accepted.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_eor_assignment_checkin_get',
    description: `Returns the checkin questionnaire for a project assignment, including all sections and questions. The optional \`version\` parameter ensures the fetched questionnaire matches an expected version.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the contract.`,
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: `This field is to ensure that the latest version of the project assignment checkin matches the version received from the webhook. If it is not sent, the version validation is not performed. If it is sent, it is checked whether the current version is equal to the version sent; if not, a 409 error occurs, otherwise, the data is returned.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_assignment_checkin_submit',
    description: `Submits completed answers for a project assignment checkin questionnaire. All required questionnaire fields must be included; partial submissions are not accepted.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the contract.`,
      },
      {
        name: 'data',
        type: 'object',
        required: false,
        description: `Form submission payload containing respondent type, question answers, and optional version.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_assignment_get',
    description: `Returns the project assignment PDF for an EOR contract pending client approval. The optional version parameter allows callers to confirm the retrieved document matches an expected version before proceeding with acceptance.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: `This field is to ensure that the latest version of the project assignment PDF matches the version received from the webhook. If it is not sent, the version validation is not performed and the endpoint returns the PDF. If it is sent, it is checked whether the current version is equal to the version sent; if not, a 409 error occurs, otherwise, the PDF is returned.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_bank_account_create',
    description: `Registers a bank account for an EOR employee. Returns the \`id\` of the newly created bank account record.`,
    params: [
      {
        name: 'data',
        type: 'array',
        required: true,
        description: `Array of key value properties of bank account`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_bank_guide_get',
    description: `Returns the bank account form guide for the specified \`country\` and \`currency\` combination, providing the field structure required to add a new bank account for an EOR employee.`,
    params: [
      { name: 'country', type: 'string', required: true, description: `Country` },
      { name: 'currency', type: 'string', required: true, description: `Currency` },
    ],
  },
  {
    name: 'deelmcp_eor_benefit_list',
    description: `Returns benefits available in a specific country, scoped by work visa requirement, weekly work hours, employment type, team, and legal entity.`,
    params: [
      { name: 'country_code', type: 'string', required: true, description: `Country code.` },
      {
        name: 'employment_type',
        type: 'string',
        required: true,
        description: `Type of employment`,
      },
      {
        name: 'legal_entity_id',
        type: 'string',
        required: true,
        description: `The ID of the legal entity.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `The ID of the team the worker belongs to.`,
      },
      {
        name: 'work_hours_per_week',
        type: 'number',
        required: true,
        description: `Working hours per week`,
      },
      {
        name: 'work_visa',
        type: 'boolean',
        required: true,
        description: `Indicates if work visa is required.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_compliance_document_acknowledge',
    description: `Submits the worker's consent acknowledgement for a compliance document that requires it. This operation is required before documents marked as needing acknowledgement are considered complete.`,
    params: [
      {
        name: 'document_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the compliance document.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_compliance_document_download',
    description: `Returns a time-limited download URL for a submitted compliance document. The URL expires at the time indicated by \`expires_at\` in the response.`,
    params: [
      {
        name: 'document_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a compliance document in Deel.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_compliance_document_list',
    description: `Returns the list of compliance documents associated with an EOR employee.`,
    params: [],
  },
  {
    name: 'deelmcp_eor_compliance_document_send',
    description: `Uploads a compliance document file against the specified \`document_id\` for an EOR employee.`,
    params: [
      {
        name: 'document_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a compliance document in Deel.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_compliance_template_download',
    description: `Returns a time-limited download URL for the compliance document template associated with the given \`document_id\`, only if a template exists for that document.`,
    params: [
      {
        name: 'document_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a compliance document in Deel.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_contract_benefit_list',
    description: `Returns benefits associated with the specified EOR contract.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the EOR contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_contract_cancel',
    description: `Cancels the EOR contract identified by oid. The contract must be in an active or pending state to be eligible for cancellation.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      { name: 'oid', type: 'string', required: true, description: `Contract oid` },
    ],
  },
  {
    name: 'deelmcp_eor_contract_document_get',
    description: `Returns a specific document as a PDF for a given EOR contract. Currently only the \`FRAMEWORK_AGREEMENT\` document type is supported.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `EOR contract ID` },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type of document. Currently only FRAMEWORK_AGREEMENT is supported.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_contract_document_list',
    description: `Returns all documents associated with a specific EOR contract.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `EOR contract ID` },
    ],
  },
  {
    name: 'deelmcp_eor_contract_document_sign',
    description: `Applies a signature and job title to a specified EOR contract document. Currently only the \`FRAMEWORK_AGREEMENT\` document type is supported.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `EOR contract ID` },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type of document. Currently only FRAMEWORK_AGREEMENT is supported.`,
      },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_eor_contract_form_get',
    description: `Retrieves the versioned form definition for creating an EOR contract in the specified country, including fields, validation rules, and conditional logic. The \`state\` parameter is only required for countries that mandate it.`,
    params: [
      {
        name: 'country_code',
        type: 'string',
        required: true,
        description: `Two-letter country code in ISO 3166-1 alpha-2 format`,
      },
      {
        name: 'contract_duration_in_days',
        type: 'integer',
        required: false,
        description: `The contract duration in days for definite contracts.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `The selected start date of the contract in ISO 8601 formatted date string.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `The selected state code of the contract. This is only required for countries that specify it.`,
      },
      {
        name: 'work_hours_per_week',
        type: 'integer',
        required: false,
        description: `The selected number of work hours per week.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_contract_forms_definition_get',
    description: `Returns paginated, versioned form definitions for creating EOR contracts across specified countries. Use the latest effective version. Not for reading or updating existing contracts.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching subsequent pages of results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of countries to return in a single response. Defaults to 10.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_contract_get',
    description: `Returns basic contract information and associated employment costs for a specific EOR contract.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the Deel contract`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_contract_offboarding_get',
    description: `Retrieves the offboarding request associated with a specific EOR contract, including termination details, document review status, offboarding request data, and pending employee notification state.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_contract_sign',
    description: `Signs a contract on behalf of the contractor, transitioning contract status to active and completing the contractor onboarding workflow.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_eor_contract_update',
    description: `Applies partial updates to mutable fields of an EOR contract, such as salary, job title, or benefits. Only fields included in the request body are modified; fields required for validation must still be present.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
      { name: 'data', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_eor_effective_date_limit_get',
    description: `Returns validation rules for the effective date field within an EOR contract amendment flow.`,
    params: [
      {
        name: 'amendment_id',
        type: 'string',
        required: true,
        description: `A unique identifier for the employee contract amendment`,
      },
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the EOR worker contract`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_employment_cost_batch',
    description: `Determine the total employment costs for an Employee of Record (EOR) arrangement across different countries, including salary, employer costs, benefits, and additional fees.`,
    params: [
      {
        name: 'data',
        type: 'array',
        required: true,
        description: `Array of employee cost calculation requests.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_employment_cost_calculate',
    description: `Calculates the total employment cost for an EOR arrangement in a specified country, returning a breakdown that includes employer costs, benefits, platform fees, and severance accrual.`,
    params: [{ name: 'data', type: 'object', required: false, description: `No description.` }],
  },
  {
    name: 'deelmcp_eor_hr_document_list',
    description: `Returns all HR verification letters and documents associated with the employee contract.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_hrx_document_get',
    description: `Generates a pre-signed URL for downloading a specific HRX document as a PDF associated with an EOR contract. The URL expires 15 minutes after generation.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
      {
        name: 'document_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the document to download.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_hrx_document_list',
    description: `Returns a paginated list of HRX documents shared with an employee under a specific EOR contract.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Use the cursor from the previous response to get the next page of results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page. Maximum is 100, default is 20.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_job_scope_list',
    description: `Returns predefined and custom job scope templates available for EOR contracts, optionally filtered to templates belonging to a specific team.`,
    params: [{ name: 'team', type: 'string', required: false, description: `Team public id` }],
  },
  {
    name: 'deelmcp_eor_job_scope_validate',
    description: `Validates a job scope description and returns any validation errors. When errors are present, the response also includes a \`quote_validation_log_public_id\` and pre-populated \`data_for_corrected_job_scope_endpoint\` to support subsequent correction.`,
    params: [{ name: 'data', type: 'object', required: true, description: `details of job scope` }],
  },
  {
    name: 'deelmcp_eor_mailbox_password_update',
    description: `Changes the mailbox password for an EOR worker.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_eor_offboarding_attachment_get',
    description: `Downloads the content of a specific attachment associated with the termination for a given contract.`,
    params: [
      {
        name: 'attachment_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the attachment to download.`,
      },
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_offboarding_client_sign_off_review',
    description: `Submits a client sign-off decision—approval or change request—for the offboarding documents of a specific contract during the client sign-off step.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
      { name: 'data', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_eor_offboarding_create',
    description: `Formally initiates the resignation process for the EOR contract by submitting a resignation request on behalf of the worker.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_offboarding_employee_sign_off_review',
    description: `Records an employee's sign-off decision—approval or change request with feedback—for the offboarding document set of a contract.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_eor_offboarding_pto_review_submit',
    description: `Submits PTO details for a resignation request, triggers related notifications, and finalizes the PTO review step. Only callable when the resignation status is \`AWAITING_PTO\`.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_eor_offboarding_required_info_get',
    description: `Returns country-specific mandatory and optional questions, and identifies required supporting documents, that must be provided when initiating the offboarding process for a contract.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_offboarding_restricted_date_list',
    description: `Returns country-specific dates unavailable for offboarding end-date selection—including weekends and public holidays—along with the earliest available end date; optionally filtered by termination type.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
      {
        name: 'termination_type',
        type: 'string',
        required: false,
        description: `Type of offboarding.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_offboarding_timeoff_data_get',
    description: `Returns time-off entitlements, balances, and upcoming time offs for the employee, optionally scoped to a target \`end_date\`. Includes policy settings required to complete an offboarding request.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Desired end date for offboarding`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_payroll_agreement_download',
    description: `Returns a time-limited download URL for the employee agreement PDF associated with the given \`contract_id\`. When the optional \`version\` parameter is supplied and a version mismatch is detected, behaviour diverges from the default resolution path.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: `Optional version of the Employment Agreement to be signed. If informed and in the case of a mismatch, the API will return an error.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_payslip_download',
    description: `Returns a URL for downloading the specified payslip as a PDF.`,
    params: [
      {
        name: 'payslip_id',
        type: 'string',
        required: true,
        description: `Unique identifier for the payslip.`,
      },
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `Unique identifier for the worker.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_payslip_list',
    description: `Returns a list of payslip records for the specified worker.`,
    params: [
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `The ID of the worker whose payslips are being retrieved.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_resignation_create',
    description: `Initiates a resignation request for an EOR contract.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_resignation_letter_get',
    description: `Returns a preview of the resignation letter for the EOR contract before the worker submits their signature.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_resignation_letter_sign',
    description: `Records the worker's signature on the resignation letter for the contract, which is required to finalize the resignation process; upon successful submission, the signed letter is queued for PDF generation and further processing.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
      { name: 'data', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_eor_resignation_list',
    description: `Returns resignations submitted by EOR workers, optionally filtered by resignation letter status.`,
    params: [
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by resignation letter status`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_resignation_request',
    description: `Enable clients with group admin and people manager permissions to initiate a resignation request for an Employee of Record (EOR) contract within their team.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      { name: 'oid', type: 'string', required: true, description: `Public contract oid` },
    ],
  },
  {
    name: 'deelmcp_eor_start_date_get',
    description: `Returns the earliest allowed start date for a new EOR contract based on employment country, nationality, and visa requirements. Also returns payroll timing parameters that govern when the contract can take effect.`,
    params: [
      {
        name: 'employment_country',
        type: 'string',
        required: true,
        description: `Employment country in ISO 3166-1 alpha-2 format`,
      },
      { name: 'team_id', type: 'string', required: true, description: `Team ID` },
      {
        name: 'employee_nationality',
        type: 'string',
        required: false,
        description: `Employee nationality in ISO 3166-1 alpha-2 format`,
      },
      {
        name: 'employment_state',
        type: 'string',
        required: false,
        description: `State or province of employment`,
      },
      { name: 'legal_entity_id', type: 'string', required: false, description: `Legal entity ID` },
      {
        name: 'special_job_id',
        type: 'string',
        required: false,
        description: `Special job ID (if applicable)`,
      },
      {
        name: 'work_visa',
        type: 'boolean',
        required: false,
        description: `Whether a work visa is required`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_tax_document_list',
    description: `Returns tax documents for the authenticated worker.`,
    params: [],
  },
  {
    name: 'deelmcp_eor_termination_create',
    description: `Initiates a termination request for an EOR contract, beginning the offboarding process. Returns desired and confirmed end dates along with any termination documents generated.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_termination_request',
    description: `This API enables clients with group admin and people manager permissions to initiate a request for the termination of an Employee of Record (EOR) contract for members of their team.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      { name: 'oid', type: 'string', required: true, description: `Public contract id` },
    ],
  },
  {
    name: 'deelmcp_eor_validation_get',
    description: `Returns country-specific hiring guide data — including salary requirements, holidays, probation terms, health insurance, and currency — for use in creating and validating EOR contract quotes.`,
    params: [
      {
        name: 'country_code',
        type: 'string',
        required: true,
        description: `Country code in ISO Alpha-2 format.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_worker_additional_info_add',
    description: `Adds supplemental information fields to an EOR employee's contract record.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel contract id.` },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Additional fields are country/state-specific and validated against the worker additional fields form for the employment country.`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_worker_additional_info_update',
    description: `Partially updates additional information on an EOR employee agreement. Only permitted when status is \`new\`, \`under_review\`, or \`waiting_for_employee_contract\`; other statuses return an error.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel contract id.` },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `You can submit any subset of fields. Keys not listed above are treated as country/state-specific additional information fields. Those keys must match the fields returned by GET /forms/eor/worker-additional-fields/{country_code} (public keys).`,
      },
    ],
  },
  {
    name: 'deelmcp_eor_worker_benefit_list',
    description: `Returns the benefits for the authenticated employee. The employee identity is inferred from the auth token, so this endpoint must be called with an employee-scoped token rather than a client token.`,
    params: [],
  },
  {
    name: 'deelmcp_eor_worker_create',
    description: `Submits details for an Employee of Record (EOR) contract and returns a quote. Deel processes the submitted information and returns pricing, compensation, and health plan details before the contract is activated.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_eor_worker_info_update',
    description: `Partially updates employee information on an EOR contract. Only documented fields are accepted. Restricted to contracts in pre-signature or review statuses; other statuses return a validation error.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee contract.`,
      },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_eor_worker_profile_create',
    description: `Creates an EOR worker record and returns the associated \`user_id\`, \`profile_id\`, and \`hris_profile_id\`.`,
    params: [{ name: 'data', type: 'object', required: false, description: `No description.` }],
  },
  {
    name: 'deelmcp_external_org_personal_info_update',
    description: `Partially updates a worker's personal information using an external identifier. Only fields included in the request body are modified.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a worker (External ID).`,
      },
    ],
  },
  {
    name: 'deelmcp_external_org_worker_relation_create',
    description: `Creates a hierarchical worker relation between a worker and their subordinates, using external IDs to identify all parties. The request body must supply the external IDs of both the parent and child workers along with the relation type.`,
    params: [{ name: 'data', type: 'object', required: false, description: `No description.` }],
  },
  {
    name: 'deelmcp_external_org_worker_relation_list',
    description: `Returns all worker relations associated with the HrisProfile identified by the given external ID, including both parent and child relationships.`,
    params: [
      {
        name: 'profile_id',
        type: 'string',
        required: true,
        description: `HrisProfile external ID`,
      },
    ],
  },
  {
    name: 'deelmcp_external_org_worker_relation_update',
    description: `Creates or replaces the parent worker relation for the HrisProfile identified by the given external ID. If a parent relation already exists for this profile, it is overwritten with the supplied data.`,
    params: [
      {
        name: 'profile_id',
        type: 'string',
        required: true,
        description: `HrisProfile external ID`,
      },
      {
        name: 'data',
        type: 'object',
        required: false,
        description: `The request payload containing parent relationship details.`,
      },
    ],
  },
  {
    name: 'deelmcp_forms_eor_worker_field_list',
    description: `Retrieves the additional form fields required when onboarding EOR workers in the specified country.`,
    params: [{ name: 'country_code', type: 'string', required: true, description: `Country code` }],
  },
  {
    name: 'deelmcp_forms_gp_worker_field_list',
    description: `Retrieves the country-specific additional information fields required for GP workers to run payroll in compliance with local regulations.`,
    params: [
      {
        name: 'country_code',
        type: 'string',
        required: true,
        description: `ISO 3166-1 alpha-2 country code for which to retrieve GP worker additional fields.`,
      },
    ],
  },
  {
    name: 'deelmcp_get_all_profile_worker_relations',
    description: `List of worker relations.`,
    params: [
      { name: 'hrisProfileOid', type: 'string', required: true, description: `HrisProfile ID` },
    ],
  },
  {
    name: 'deelmcp_get_eor_bank_account_guide',
    description: `Retrieve bank account form guide for an EOR employee. This data can be used to add a new bank account for an employee.`,
    params: [],
  },
  {
    name: 'deelmcp_get_eor_termination',
    description: `This API allows clients and employees with viewer permissions to retrieve termination data. It ensures that only authorized users can access sensitive information related to terminations.`,
    params: [
      { name: 'oid', type: 'string', required: true, description: `Public contract oid` },
      { name: 'terminationId', type: 'string', required: true, description: `Termination id` },
    ],
  },
  {
    name: 'deelmcp_gp_bank_account_create',
    description: `Adds a bank account for the GP worker; country-specific field requirements must be retrieved from \`GET /gp/workers/{worker_id}/banks/guide\` before submitting.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a worker in UUID format.`,
      },
    ],
  },
  {
    name: 'deelmcp_gp_bank_account_list',
    description: `Returns all bank accounts associated with the employee.`,
    params: [
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a worker.`,
      },
    ],
  },
  {
    name: 'deelmcp_gp_bank_account_update',
    description: `Partially updates the bank account for the worker; only fields provided in the request body are modified.`,
    params: [
      {
        name: 'bank_id',
        type: 'string',
        required: true,
        description: `Unique identifier for the bank account in UUID format.`,
      },
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a worker in UUID format.`,
      },
      {
        name: 'account_number',
        type: 'string',
        required: false,
        description: `The user's bank account number.`,
      },
      { name: 'account_type', type: 'string', required: false, description: `Bank account type.` },
      {
        name: 'ach_routing_number',
        type: 'string',
        required: false,
        description: `The ACH (Automated Clearing House) Routing Number.`,
      },
      {
        name: 'address_line1',
        type: 'string',
        required: false,
        description: `The primary address line.`,
      },
      {
        name: 'address_line2',
        type: 'string',
        required: false,
        description: `The secondary address line.`,
      },
      {
        name: 'bank_branch_name',
        type: 'string',
        required: false,
        description: `The name of the user's bank branch.`,
      },
      { name: 'bank_code', type: 'string', required: false, description: `The bank code.` },
      {
        name: 'bank_country_code',
        type: 'string',
        required: false,
        description: `The country code where the bank is located.`,
      },
      {
        name: 'bank_name',
        type: 'string',
        required: false,
        description: `Name of the user's bank.`,
      },
      {
        name: 'branch_code',
        type: 'string',
        required: false,
        description: `The branch code of the user's bank.`,
      },
      {
        name: 'city',
        type: 'string',
        required: false,
        description: `The city of the user's address.`,
      },
      {
        name: 'country_code',
        type: 'string',
        required: false,
        description: `The country code of the user's address.`,
      },
      {
        name: 'currency_code',
        type: 'string',
        required: false,
        description: `The currency code for transactions.`,
      },
      { name: 'email', type: 'string', required: false, description: `The user's email address.` },
      { name: 'full_name', type: 'string', required: false, description: `Full name of the user.` },
      {
        name: 'iban',
        type: 'string',
        required: false,
        description: `The International Bank Account Number (IBAN).`,
      },
      {
        name: 'original_name',
        type: 'string',
        required: false,
        description: `The original name of the user.`,
      },
      { name: 'phone', type: 'string', required: false, description: `The user's phone number.` },
      {
        name: 'postal',
        type: 'string',
        required: false,
        description: `The user's postal or ZIP code.`,
      },
      {
        name: 'province_state',
        type: 'string',
        required: false,
        description: `The state or province of the user's address.`,
      },
      {
        name: 'rib_number',
        type: 'string',
        required: false,
        description: `The RIB (Relevé d'Identité Bancaire).`,
      },
      {
        name: 'swift_bic',
        type: 'string',
        required: false,
        description: `SWIFT/BIC code for the bank.`,
      },
      {
        name: 'tax_id',
        type: 'string',
        required: false,
        description: `The user's tax identification number.`,
      },
    ],
  },
  {
    name: 'deelmcp_gp_bank_guide_get',
    description: `Returns the country-specific field requirements for a worker's bank account form, which determines the fields required when adding a bank account.`,
    params: [
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a worker in UUID format.`,
      },
    ],
  },
  {
    name: 'deelmcp_gp_contract_job_title_update',
    description: `Use this API to update the job title for a contract. Provide the contract ID and new job title details to make a change.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the GP contract.`,
      },
      { name: 'data', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_gp_gtn_report_download',
    description: `Downloads the gross-to-net calculation report for the specified payroll report as a CSV file, with optional currency conversion applied.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Id of the gp payroll report.` },
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `Currency to be used in the report calculation.`,
      },
    ],
  },
  {
    name: 'deelmcp_gp_gtn_report_get',
    description: `Returns paginated gross-to-net calculation records for the specified payroll report, with optional currency conversion applied to the results.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Id of the gp payroll report.` },
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `Currency to be used in the report calculation.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Offset/index of record for the next page of records to return.`,
      },
    ],
  },
  {
    name: 'deelmcp_gp_payroll_report_list',
    description: `Retrieves payroll events associated with the specified legal entity, suitable for preparing payroll reports or auditing pay cycles.`,
    params: [
      {
        name: 'legal_entity_id',
        type: 'string',
        required: true,
        description: `Unique identifier for the legal entity in UUID format.`,
      },
    ],
  },
  {
    name: 'deelmcp_gp_payslip_download',
    description: `Returns a pre-signed, temporary download URL for a GP employee payslip PDF. Use after calling the payslips list endpoint to obtain the \`payslip_id\`. Supports only GP contract types.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Unique identifier for the worker in UUID format.`,
      },
      {
        name: 'payslipId',
        type: 'string',
        required: true,
        description: `Unique identifier for the payslip in UUID format.`,
      },
    ],
  },
  {
    name: 'deelmcp_gp_payslip_list',
    description: `Returns the payslip history for a GP employee, including each payslip's date range and status. Restricted to GP contract types. Each payslip in the response includes an \`id\` required by the payslip download endpoint.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Unique identifier for the worker in UUID format.`,
      },
    ],
  },
  {
    name: 'deelmcp_gp_termination_create',
    description: `Initiates the termination process for a Global Payroll worker. A successful response confirms the request was accepted and the process has begun, but does not indicate that termination is complete.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a worker in UUID format.`,
      },
    ],
  },
  {
    name: 'deelmcp_gp_worker_additional_info_update',
    description: `Partially updates the additional information on the contract; only fields supplied under the \`data\` object are modified.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique public identifier of the contract.`,
      },
      { name: 'data', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_gp_worker_address_update',
    description: `Partially updates the address on record for the GP employee.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a worker in UUID format.`,
      },
    ],
  },
  {
    name: 'deelmcp_gp_worker_compensation_update',
    description: `Updates the compensation for the GP employee and returns the complete compensation history including the applied change.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a worker in UUID format.`,
      },
    ],
  },
  {
    name: 'deelmcp_gp_worker_employee_info_update',
    description: `Partially updates personal details, tax information, and employment-related fields for the GP worker.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a worker in UUID format.`,
      },
    ],
  },
  {
    name: 'deelmcp_gp_worker_info_add',
    description: `Adds supplementary fields to the contract, with the extra data supplied under the \`data\` object in the request body.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique public identifier of the contract.`,
      },
      { name: 'data', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_gp_worker_pto_update',
    description: `Applies a partial update to the PTO policy assigned to a Global Payroll worker. Only fields included in the request body are modified; omitted fields retain their current values.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a worker in UUID format.`,
      },
    ],
  },
  {
    name: 'deelmcp_hiring_insights_employment_comparison_list',
    description: `Use this endpoint to compare employment regulations, costs, time off, and payroll details across one or more countries for hiring analysis.`,
    params: [
      {
        name: 'categories',
        type: 'array',
        required: false,
        description: `Comparison categories to include`,
      },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `Country codes to compare (ISO 3166-1 alpha-2)`,
      },
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `Target currency (ISO 4217); when provided, amounts inside text are converted`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination to fetch the next page of results`,
      },
      { name: 'draft', type: 'string', required: false, description: `Draft version of the data` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return`,
      },
    ],
  },
  {
    name: 'deelmcp_hiring_insights_eor_cost_calculate',
    description: `Use this endpoint to compare EOR and local entity options for international hiring.`,
    params: [
      {
        name: 'data',
        type: 'array',
        required: true,
        description: `Array of calculation parameters`,
      },
    ],
  },
  {
    name: 'deelmcp_hiring_insights_salary_calculate',
    description: `Use this endpoint to retrieve a salary histogram for a specified job title and seniority level in a given country, returned in the requested currency and time scale.`,
    params: [
      { name: 'data', type: 'array', required: true, description: `Array of salary data requests` },
    ],
  },
  {
    name: 'deelmcp_hiring_insights_summary_get',
    description: `Provides the best countries to hire talent based on your criteria, so you can make informed, strategic hiring decisions with confidence.`,
    params: [
      {
        name: 'job_title',
        type: 'string',
        required: true,
        description: `The job title for which you want to get hiring insights`,
      },
      {
        name: 'seniority',
        type: 'string',
        required: true,
        description: `The seniority level of the position`,
      },
      {
        name: 'budget',
        type: 'number',
        required: false,
        description: `Budget limit for the position`,
      },
      {
        name: 'budget_type',
        type: 'string',
        required: false,
        description: `Type of budget calculation`,
      },
      {
        name: 'priority_factors',
        type: 'array',
        required: false,
        description: `Priority factors to consider when filtering countries`,
      },
      {
        name: 'regions',
        type: 'array',
        required: false,
        description: `Geographic regions to filter by`,
      },
      {
        name: 'timezones',
        type: 'array',
        required: false,
        description: `Timezone offsets to filter by`,
      },
    ],
  },
  {
    name: 'deelmcp_hiring_insights_take_home_pay_calculate',
    description: `Use this endpoint to estimate take-home pay for compensation inputs.`,
    params: [
      {
        name: 'data',
        type: 'array',
        required: true,
        description: `Array of salary items to process`,
      },
    ],
  },
  {
    name: 'deelmcp_hr_preview_offer_letter',
    description: `Preview job offer letter`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel contract id.` },
    ],
  },
  {
    name: 'deelmcp_hr_suite_review_cycle_feedback_get',
    description: `Retrieves review cycle feedback and competency data for an HRIS organization user,
  including categorized feedback entries (self-review, peer, upward, downward) and core
  competencies.`,
    params: [
      {
        name: 'hris_organization_user_id',
        type: 'string',
        required: true,
        description: `A valid UUID v4 identifying the specific user.`,
      },
      {
        name: 'review_cycle_id',
        type: 'string',
        required: true,
        description: `A valid UUID v4 identifying the review cycle.`,
      },
    ],
  },
  {
    name: 'deelmcp_hris_org_chart_get',
    description: `Retrieves the organizational chart structure for an organization. Returns hierarchical trees of workers and optionally orphaned nodes (workers without managers).`,
    params: [
      {
        name: 'group_by',
        type: 'string',
        required: false,
        description: `Grouping strategy for organizing the org chart.`,
      },
      {
        name: 'group_by_value',
        type: 'string',
        required: false,
        description: `Optional value to filter by when using specific grouping strategies.`,
      },
    ],
  },
  {
    name: 'deelmcp_hris_team_custom_field_update',
    description: `Applies a partial update to custom field values on the specified team. Updates can be scheduled for a future effective date, and setting a field's value to \`null\` deletes that field value.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `Public ID (UUID) of the HRIS team/organization structure`,
      },
    ],
  },
  {
    name: 'deelmcp_ic_invoice_download',
    description: `This endpoint provides embedded worker flows access to download a pdf of a specific invoice while using a worker:PAT token.`,
    params: [
      {
        name: 'invoice_id',
        type: 'string',
        required: true,
        description: `Public invoice identifier (UUID) for the invoice whose PDF URL is returned.`,
      },
    ],
  },
  {
    name: 'deelmcp_ic_invoice_get',
    description: `This endpoint retrieves invoice information by ID. Use it to access detailed invoice data for reference or verification.`,
    params: [
      {
        name: 'invoice_id',
        type: 'string',
        required: true,
        description: `Public invoice id for the invoice to return.`,
      },
    ],
  },
  {
    name: 'deelmcp_ic_invoice_list',
    description: `This endpoint provides direct access to worker invoices via a worker token without requiring completion of the typical onboarding flow.`,
    params: [],
  },
  {
    name: 'deelmcp_ic_legal_entity_setup',
    description: `Independent contractors use this endpoint to complete legal-entity onboarding, triggering post-commit screening and background checks. Suitable for the IC Embedded flow in the public API.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_immigration_business_visa_eligibility_get',
    description: `Analyzes nationality, residence, destination, and trip dates to return available business visa options with fees, timelines, and qualification criteria. Optional \`second_nationality\` expands eligibility.`,
    params: [
      {
        name: 'destination_country',
        type: 'string',
        required: true,
        description: `The destination country code of the trip in ISO 3166-1 alpha-2 format`,
      },
      {
        name: 'nationality',
        type: 'string',
        required: true,
        description: `The nationality country code of the person in ISO 3166-1 alpha-2 format`,
      },
      {
        name: 'residence_country',
        type: 'string',
        required: true,
        description: `The residence country code of the person in ISO 3166-1 alpha-2 format`,
      },
      {
        name: 'trip_end_date',
        type: 'string',
        required: true,
        description: `The trip end date in ISO 8601 format (YYYY-MM-DD)`,
      },
      {
        name: 'trip_reason',
        type: 'string',
        required: true,
        description: `The reason for the trip`,
      },
      {
        name: 'trip_start_date',
        type: 'string',
        required: true,
        description: `The trip start date in ISO 8601 format (YYYY-MM-DD)`,
      },
      {
        name: 'second_nationality',
        type: 'string',
        required: false,
        description: `The second nationality country code of the person in ISO 3166-1 alpha-2 format (optional)`,
      },
    ],
  },
  {
    name: 'deelmcp_immigration_case_create',
    description: `Creates a new immigration case for a worker. The appropriate visa type must be determined before calling this endpoint.`,
    params: [{ name: 'data', type: 'string', required: false, description: `No description.` }],
  },
  {
    name: 'deelmcp_immigration_case_document_get',
    description: `Retrieves the details of a specific document requirement within a worker's immigration case, including the requirement's current status and information about any previously rejected document.`,
    params: [
      {
        name: 'case_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the case for which the required document is being requested.`,
      },
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `The hris profile oid (public id) of the worker.`,
      },
    ],
  },
  {
    name: 'deelmcp_immigration_case_document_upload',
    description: `Uploads a document against a specific case document requirement and submits it for review.`,
    params: [
      {
        name: 'case_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the case for which the required document is being requested.`,
      },
      {
        name: 'document_request_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the document request fo which this document is being uplodaded`,
      },
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `The hris profile oid (public id) of the worker.`,
      },
    ],
  },
  {
    name: 'deelmcp_immigration_case_get',
    description: `Returns detailed information for a specific immigration case including applicant profile, visa type, status, estimated completion date, process details, and compliance documents.`,
    params: [{ name: 'case_id', type: 'string', required: true, description: `Filter by case ID` }],
  },
  {
    name: 'deelmcp_immigration_case_list',
    description: `Retrieves a paginated list of immigration cases with filters for applicant name, case type, status, and country. Returns case details including type, status, process, timestamps, and optional closure information.`,
    params: [
      {
        name: 'case_type_ids',
        type: 'array',
        required: false,
        description: `Filter by case type IDs`,
      },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `Filter by country. Uses ISO 3166-1 alpha-2 codes (https://www.iban.com/country-codes).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching next set of results`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max number of results to return`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search by applicant name or code`,
      },
      { name: 'statuses', type: 'array', required: false, description: `Filter by case status` },
    ],
  },
  {
    name: 'deelmcp_immigration_client_case_get',
    description: `Retrieves the details of an immigration case by its case ID.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Immigration case id` }],
  },
  {
    name: 'deelmcp_immigration_client_case_list',
    description: `Returns a paginated list of immigration cases, optionally filtered by applicant name or code, case type, status, and country (ISO 3166-1 alpha-2). Use the \`cursor\` value from each response to retrieve the next page of results.`,
    params: [
      {
        name: 'case_type_ids',
        type: 'array',
        required: false,
        description: `Filter by case type IDs`,
      },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `Filter by country. Uses ISO 3166-1 alpha-2 codes (https://www.iban.com/country-codes).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching next set of results`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max number of results to return`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search by applicant name or code`,
      },
      { name: 'statuses', type: 'array', required: false, description: `Filter by case status` },
    ],
  },
  {
    name: 'deelmcp_immigration_document_get',
    description: `Retrieves the details of an immigration case document by its document \`id\`.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Immigration case document id ` },
    ],
  },
  {
    name: 'deelmcp_immigration_onboarding_case_get',
    description: `Returns the right-to-work onboarding case for a worker, including any associated documents; returns an empty response if no open case exists. When a worker is associated with multiple contracts, supply \`contract_id\` to target a specific contract.`,
    params: [
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `The hris profile oid (public id) of the worker.`,
      },
      {
        name: 'contract_id',
        type: 'string',
        required: false,
        description: `Filters the worker's onboarding case to a specific contract. If the worker has multiple contracts and this parameter is omitted, the response may return a case from any associated contract; the response includes contract.id to indicate which contract was used. Provide this parameter for deterministic results.`,
      },
    ],
  },
  {
    name: 'deelmcp_immigration_visa_requirement_get',
    description: `Returns the necessity of a work visa for a specific country given the employee's nationalities.`,
    params: [
      {
        name: 'country_code',
        type: 'string',
        required: true,
        description: `Two-letter country code in ISO 3166-1 alpha-2 format for the country where the individual is employed`,
      },
      {
        name: 'employee_nationalities',
        type: 'string',
        required: true,
        description: `List of employee nationalities in ISO 3166-1 alpha-2 format`,
      },
    ],
  },
  {
    name: 'deelmcp_immigration_visa_type_list',
    description: `Returns the visa types supported for immigration processing in a country, identified by its Alpha-2 country code.`,
    params: [
      { name: 'country_code', type: 'string', required: true, description: `Alpha 2 country code` },
    ],
  },
  {
    name: 'deelmcp_industry_subcategories_list',
    description: `Lists industry subcategories with their parent category details and NAICS codes, supporting cursor-based pagination and sorting by category or subcategory name.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor used for paginating to the next page of results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page.`,
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: `Sorting order of the results.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Field used to sort the results.`,
      },
    ],
  },
  {
    name: 'deelmcp_invoice_adjustment_create',
    description: `Creates an invoice adjustment — such as a bonus, commission, VAT percentage, or deduction — against a contract. Pass the \`recurring\` query parameter to apply the adjustment automatically to future invoices.`,
    params: [
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Details of invoice adjustment to create.`,
      },
      {
        name: 'recurring',
        type: 'string',
        required: false,
        description: `Add this invoice adjustment as recurring`,
      },
    ],
  },
  {
    name: 'deelmcp_invoice_adjustment_delete',
    description: `Permanently removes an invoice adjustment by its \`id\`.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Invoice adjustment id.` }],
  },
  {
    name: 'deelmcp_invoice_adjustment_get',
    description: `Retrieves a single invoice line item by its \`id\`.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of an existing invoice` },
    ],
  },
  {
    name: 'deelmcp_invoice_adjustment_list',
    description: `Returns invoice adjustments, optionally filtered by contract, adjustment type, status, invoice, reporter, or submission date range.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: false,
        description: `Id of an Deel contract.`,
      },
      {
        name: 'contract_types',
        type: 'array',
        required: false,
        description: `List of contract types`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Short date in format ISO-8601 (YYYY-MM-DD). For example 2022-12-31.`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `Short date in format ISO-8601 (YYYY-MM-DD). For example 2022-12-31.`,
      },
      {
        name: 'invoice_id',
        type: 'string',
        required: false,
        description: `ID of an existing invoice`,
      },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Return a page of results with given number of records; NOTE: technically ALL query parameters are strings or array of strings`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Return a page of results after given index of row; NOTE: technically ALL query parameters are strings or array of strings`,
      },
      {
        name: 'reporter_id',
        type: 'string',
        required: false,
        description: `ID of an existing profile`,
      },
      {
        name: 'statuses',
        type: 'array',
        required: false,
        description: `statuses of invoice adjustment to filter`,
      },
      {
        name: 'types',
        type: 'array',
        required: false,
        description: `types of invoice adjustments to filter`,
      },
    ],
  },
  {
    name: 'deelmcp_invoice_adjustment_review',
    description: `Submits an approve or decline review decision for a single invoice adjustment.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of an existing invoice adjustment.`,
      },
    ],
  },
  {
    name: 'deelmcp_invoice_adjustment_update',
    description: `Applies a partial update to an existing invoice adjustment; only fields included in the request body are modified.`,
    params: [
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Details of adjustment to update`,
      },
      { name: 'id', type: 'string', required: true, description: `Invoice adjustment id.` },
    ],
  },
  {
    name: 'deelmcp_invoice_category_list',
    description: `Returns the available adjustment categories, optionally filtered by contract type. Category IDs returned here are required when creating adjustments and define the type and accounting treatment applied.`,
    params: [
      {
        name: 'contract_types',
        type: 'array',
        required: false,
        description: `array of contract types to filter categories`,
      },
    ],
  },
  {
    name: 'deelmcp_invoice_deel_invoice_list',
    description: `Returns a paginated list of invoices for Deel platform fees.`,
    params: [
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Return a page of results with given number of records; NOTE technically ALL query parameters are strings or array of strings`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Return a page of results after given index of row; NOTE technically ALL query parameters are strings or array of strings'`,
      },
    ],
  },
  {
    name: 'deelmcp_invoice_download',
    description: `Returns a temporary download URL for an invoice PDF; the URL expires at the time indicated by \`expires_at\` in the response.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The invoice ID used to identify the invoice to be downloaded.`,
      },
    ],
  },
  {
    name: 'deelmcp_invoice_get',
    description: `Retrieves the details of a single invoice by \`invoice_id\`.`,
    params: [
      {
        name: 'invoice_id',
        type: 'string',
        required: true,
        description: `The invoice ID used to identify the invoice to be retireved.`,
      },
    ],
  },
  {
    name: 'deelmcp_invoice_list',
    description: `Returns a paginated list of invoices; by default only paid invoices are returned, but passing \`status=all\` returns invoices in all statuses. Supports both offset- and cursor-based pagination.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Return next page of results after the given cursor.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Will include invoices from COR workers in the response.`,
      },
      {
        name: 'issued_from_date',
        type: 'string',
        required: false,
        description: `Filter invoices issued on or after the specified date.`,
      },
      {
        name: 'issued_to_date',
        type: 'string',
        required: false,
        description: `Filter invoices issued before the specified date.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of records to retrieve per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Index of the first record to return.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `If status query has value of all, all invoices will be returned. Otherwise only paid invoices will be fetched.`,
      },
    ],
  },
  {
    name: 'deelmcp_invoice_payroll_adjustment_create',
    description: `Creates a new payroll adjustment for a contract, modifying the payment amount on the next payment cycle. The \`adjustment_category_id\` must reference a valid category retrieved from \`GET /adjustments/categories\`.`,
    params: [],
  },
  {
    name: 'deelmcp_invoice_payroll_adjustment_delete',
    description: `Permanently deletes an adjustment by its id.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Deel adjustment id.` }],
  },
  {
    name: 'deelmcp_invoice_payroll_adjustment_get',
    description: `Retrieves a specific adjustment by its id, including its amount, status, payment cycle dates, and associated contract_id.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Deel adjustment id.` }],
  },
  {
    name: 'deelmcp_invoice_payroll_adjustment_update',
    description: `Applies a partial update to an existing adjustment. Only fields included in the request body are modified; omitted fields retain their current values.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Deel adjustment id.` }],
  },
  {
    name: 'deelmcp_invoice_tax_create',
    description: `Creates an invoicing tax entry for an independent contractor contract.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel Contract ID` },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_invoice_tax_delete',
    description: `Permanently removes the specified \`tax_type\` from the contract's invoicing tax configuration; this action is irreversible and takes effect on future invoices.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel Contract ID` },
      { name: 'tax_type', type: 'string', required: true, description: `IC tax type` },
    ],
  },
  {
    name: 'deelmcp_invoice_tax_list',
    description: `Retrieves the VAT and withholding tax settings configured for an independent contractor contract.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel Contract ID` },
    ],
  },
  {
    name: 'deelmcp_invoice_tax_update',
    description: `Applies a partial update to the invoicing tax for an independent contractor contract; accepts \`tax_type\` (WITHHOLDING_TAX or VAT) and \`percentage\` to modify how taxes are calculated on future invoices.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel Contract ID` },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_it_asset_get',
    description: `Retrieves the details of a specific IT asset by \`asset_id\`.`,
    params: [
      {
        name: 'asset_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the IT asset`,
      },
    ],
  },
  {
    name: 'deelmcp_it_asset_list',
    description: `Returns a cursor-paginated list of all IT assets historically or currently managed by the organization.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Filter assets by their product category`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Indicates where the next page of results starts, as returned in a paginated list response`,
      },
      {
        name: 'hris_profile_id',
        type: 'string',
        required: false,
        description: `Filter assets by assigned worker with given HRIS Profile ID`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Return a page of results with given number of records`,
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `Filter assets by their location`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter assets by their status`,
      },
    ],
  },
  {
    name: 'deelmcp_it_order_get',
    description: `Returns the status, shipping details, and associated product for a single IT equipment order identified by order_id.`,
    params: [
      {
        name: 'order_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the IT order`,
      },
    ],
  },
  {
    name: 'deelmcp_it_order_list',
    description: `Returns a cursor-paginated list of all IT equipment orders for the organization, spanning both historical and current procurement requests.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Indicates where the next page of results starts, as returned in a paginated list response`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Return a page of results with given number of records`,
      },
    ],
  },
  {
    name: 'deelmcp_it_policy_list',
    description: `Returns all available IT hardware policies, which define the equipment eligible for ordering.`,
    params: [],
  },
  {
    name: 'deelmcp_knowledge_rag_config_create',
    description: `Use this endpoint to create a new RAG (Retrieval-Augmented Generation) config for a team, that you can use to search using RAG Run Endpoint`,
    params: [
      { name: 'data', type: 'object', required: true, description: `Configuration object.` },
    ],
  },
  {
    name: 'deelmcp_knowledge_rag_config_delete',
    description: `Use this endpoint to delete a RAG (Retrieval-Augmented Generation) configuration by its ID. This action is destructive.`,
    params: [
      {
        name: 'config_id',
        type: 'string',
        required: true,
        description: `Config Id for the RAG config`,
      },
    ],
  },
  {
    name: 'deelmcp_knowledge_rag_config_get',
    description: `Use this endpoint to retrieve a RAG (Retrieval-Augmented Generation) configuration by its ID. Provide the config_id in the path. This is a read-only operation suitable for auditing or configuring clients.`,
    params: [
      {
        name: 'config_id',
        type: 'string',
        required: true,
        description: `Config Id for the RAG config`,
      },
    ],
  },
  {
    name: 'deelmcp_knowledge_rag_config_list',
    description: `Use this endpoint to retrieve all RAG (Retrieval-Augmented Generation) configuration using pagination. This is a read-only operation suitable for fetching all RAG configs.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor used to retrieve the next page of results.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Array of fields to include in the response. Sent as multiple query parameters: fields=output_schema&fields=metadata`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return. Must be between 1 and 100.`,
      },
    ],
  },
  {
    name: 'deelmcp_knowledge_rag_config_run',
    description: `Use this endpoint to run a retrieval-augmented query using the specified config_id`,
    params: [
      {
        name: 'config_id',
        type: 'string',
        required: true,
        description: `Config Id for the RAG config`,
      },
      { name: 'data', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_knowledge_rag_config_update',
    description: `Use this endpoint to update an existing RAG (Retrieval-Augmented Generation) configuration`,
    params: [
      {
        name: 'config_id',
        type: 'string',
        required: true,
        description: `Config Id for the RAG config`,
      },
      { name: 'data', type: 'object', required: true, description: `Configuration object.` },
    ],
  },
  {
    name: 'deelmcp_legal_entity_cost_center_synchronize',
    description: `Update legal entity cost center's data to replicate the data provided on the request`,
    params: [
      { name: 'data', type: 'array', required: true, description: `No description.` },
      { name: 'legal_entity_id', type: 'string', required: true, description: `Legal entity id` },
    ],
  },
  {
    name: 'deelmcp_list_payroll_cycles',
    description: `Use this endpoint to retrieve a list of payroll events for a specified legal entity.`,
    params: [
      {
        name: 'legal_entity_id',
        type: 'string',
        required: true,
        description: `The unique identifier (public ID) for the legal entity.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor, CUID or UUID format.`,
      },
      {
        name: 'date_end',
        type: 'string',
        required: false,
        description: `End date in the format 'YYYY-MM-DD'. Must not exceed 5 years in the future.`,
      },
      {
        name: 'date_start',
        type: 'string',
        required: false,
        description: `Start date in the format 'YYYY-MM-DD'. Must not be earlier than 5 years ago.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return.`,
      },
    ],
  },
  {
    name: 'deelmcp_lookup_country_list',
    description: `Returns all countries supported by the platform, including each country's visa support status, Employer of Record availability, sub-territories, and classification.`,
    params: [],
  },
  {
    name: 'deelmcp_lookup_currency_list',
    description: `Returns all currencies supported by the platform, including their ISO codes and names.`,
    params: [],
  },
  {
    name: 'deelmcp_lookup_job_title_list',
    description: `Returns the platform's catalogue of predefined job titles. Results are paginated using cursor-based navigation via \`after_cursor\`.`,
    params: [
      {
        name: 'after_cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Use this to retrieve the next page of results.`,
      },
    ],
  },
  {
    name: 'deelmcp_lookup_list',
    description: `Returns reference data of the type specified by the \`documents\` query parameter; supported values are \`currencies\`, \`countries\`, \`entity_types\`, and \`sic\`.`,
    params: [
      {
        name: 'documents',
        type: 'string',
        required: true,
        description: `The type of lookup data to retrieve. Options are \`currencies\`, \`countries\`, \`entity_types\`, and \`sic_numbers\`.`,
      },
    ],
  },
  {
    name: 'deelmcp_lookup_seniority_list',
    description: `Returns predefined seniority levels including their names, hierarchical positions, and identifiers. When \`is_eor_contract\` is \`true\`, C-level seniorities are excluded from the response.`,
    params: [
      {
        name: 'is_eor_contract',
        type: 'boolean',
        required: false,
        description: `when \`true\`, exclude C-level seniorities for EOR contracts. Set to \`false\` to return all seniorities`,
      },
    ],
  },
  {
    name: 'deelmcp_lookup_timeoff_type_list',
    description: `Returns the predefined time-off types available for registration on the platform.`,
    params: [],
  },
  {
    name: 'deelmcp_milestone_create',
    description: `Creates a new payment milestone on a milestone-based contract. After creation, the milestone enters a review workflow before payment is processed.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Deel contract where the milestone will be added.`,
      },
      { name: 'data', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_milestone_delete',
    description: `Permanently deletes a specific milestone from a contract. This operation is irreversible and removes all associated milestone data.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Deel contract from which the milestone will be deleted.`,
      },
      {
        name: 'milestone_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the milestone that is to be deleted.`,
      },
    ],
  },
  {
    name: 'deelmcp_milestone_get',
    description: `Retrieves a single milestone identified by milestone_id within a specific contract.`,
    params: [
      { name: 'contract_id', type: 'string', required: true, description: `Deel contract id.` },
      {
        name: 'milestone_id',
        type: 'string',
        required: true,
        description: `ID of milestone to return`,
      },
    ],
  },
  {
    name: 'deelmcp_milestone_list',
    description: `Retrieves all milestones associated with a specific contract, including each milestone's title, amount, status, relevant dates, and creator and reviewer information.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Deel contract for which milestones are being retrieved.`,
      },
    ],
  },
  {
    name: 'deelmcp_offboarding_tracker_get',
    description: `Returns termination details for a contract identified by its offboarding tracker \`id\`.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Unique onboarding tracker identifier`,
      },
    ],
  },
  {
    name: 'deelmcp_offboarding_tracker_hris_get',
    description: `Returns termination details for a contract identified by its HRIS profile \`oid\`.`,
    params: [
      { name: 'oid', type: 'string', required: true, description: `Unique hris profile oid` },
    ],
  },
  {
    name: 'deelmcp_offboarding_tracker_list',
    description: `Returns a list of contracts currently in the offboarding process. By default, results are scoped to a 45-day date range; set \`ignore_date_range\` to \`true\` to retrieve all terminations regardless of date.`,
    params: [
      {
        name: 'hiring_types',
        type: 'array',
        required: false,
        description: `Hiring type (e.g., contractor, employee)`,
      },
      {
        name: 'ignore_date_range',
        type: 'boolean',
        required: false,
        description: `Ignore the default 45-day date range and retrieve all terminations`,
      },
      {
        name: 'include_overview',
        type: 'boolean',
        required: false,
        description: `Include an overview of the contract`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per page`,
      },
      {
        name: 'pagination',
        type: 'object',
        required: false,
        description: `Cursor-style pagination payload for the next page (pass values returned from the previous response).`,
      },
      {
        name: 'progress_statuses',
        type: 'array',
        required: false,
        description: `Progress status of the contract`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search term to filter contracts by name or other attributes`,
      },
      { name: 'sort_by', type: 'string', required: false, description: `Field to sort by` },
      { name: 'sort_order', type: 'string', required: false, description: `Sorting order` },
    ],
  },
  {
    name: 'deelmcp_onboarding_tracker_counter_get',
    description: `Returns onboarding tracker counts grouped by status with a grand total, filtered by the caller's organization.`,
    params: [
      { name: 'actions', type: 'array', required: false, description: `No description.` },
      { name: 'contractOid', type: 'array', required: false, description: `No description.` },
      { name: 'countries', type: 'array', required: false, description: `No description.` },
      { name: 'fromDate', type: 'string', required: false, description: `No description.` },
      { name: 'hiringTypes', type: 'array', required: false, description: `No description.` },
      {
        name: 'hrisDirectManagers',
        type: 'array',
        required: false,
        description: `No description.`,
      },
      { name: 'includeOverview', type: 'boolean', required: false, description: `No description.` },
      { name: 'legalEntities', type: 'array', required: false, description: `No description.` },
      { name: 'limit', type: 'integer', required: false, description: `No description.` },
      { name: 'progressStatuses', type: 'array', required: false, description: `No description.` },
      { name: 'search', type: 'string', required: false, description: `No description.` },
      { name: 'sortBy', type: 'string', required: false, description: `No description.` },
      { name: 'sortOrder', type: 'string', required: false, description: `No description.` },
      { name: 'teams', type: 'array', required: false, description: `No description.` },
      { name: 'toDate', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_onboarding_tracker_get',
    description: `Returns a worker's onboarding status by \`tracker_id\`.`,
    params: [
      {
        name: 'tracker_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the onboarding tracker.`,
      },
    ],
  },
  {
    name: 'deelmcp_onboarding_tracker_hris_get',
    description: `Returns a worker's onboarding status by \`hris_profile_id\`.`,
    params: [
      {
        name: 'hris_profile_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the employee HRIS profile.`,
      },
    ],
  },
  {
    name: 'deelmcp_onboarding_tracker_list',
    description: `Returns a list of workers currently going through onboarding, including contract details, HRIS profile information, current onboarding status, and onboarding due dates. Supports cursor-based pagination.`,
    params: [
      { name: 'actions', type: 'array', required: false, description: `Onboarding actions` },
      {
        name: 'contractOid',
        type: 'array',
        required: false,
        description: `Search attribute to filter onboarding list by contract id`,
      },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `Search attribute to filter onboarding list by country`,
      },
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination` },
      {
        name: 'fromDate',
        type: 'string',
        required: false,
        description: `Start date for filtering contracts`,
      },
      {
        name: 'hiringTypes',
        type: 'array',
        required: false,
        description: `Search attribute to filter onboarding list by hiring type`,
      },
      {
        name: 'hrisDirectManagers',
        type: 'array',
        required: false,
        description: `Search attribute to filter onboarding list by HRIS direct manager`,
      },
      {
        name: 'include_overview',
        type: 'boolean',
        required: false,
        description: `Include an overview of the contract`,
      },
      {
        name: 'legalEntities',
        type: 'array',
        required: false,
        description: `Search attribute to filter onboarding list by legal entity`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per page`,
      },
      {
        name: 'progressStatuses',
        type: 'array',
        required: false,
        description: `Search attribute to filter onboarding list by progress status`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search term to filter contracts by name or other attributes`,
      },
      { name: 'sort_by', type: 'string', required: false, description: `Field to sort by` },
      { name: 'sort_order', type: 'string', required: false, description: `Sorting order` },
      {
        name: 'teams',
        type: 'array',
        required: false,
        description: `Search attribute to filter onboarding list by team`,
      },
      {
        name: 'toDate',
        type: 'string',
        required: false,
        description: `End date for filtering contracts`,
      },
    ],
  },
  {
    name: 'deelmcp_onboarding_worker_create',
    description: `Complete the profile setup for independent contractors including address, tax details, and legal status in a single call during the IC-embedded onboarding flow. This operation requires a worker session token obtained via the worker session endpoint.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_org_analytics_get',
    description: `Executes an analytics query against the Cube backend. Use GET /organization/analytics/:entity_name/metadata first to fetch metadata for the specific entity, then use only the measures and dimensions returned for that entity.`,
    params: [
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Request payload containing the Cube.js query and output format. The query specifies which dimensions, measures, and time_dimensions to retrieve from an analytics entity (e.g., people).`,
      },
    ],
  },
  {
    name: 'deelmcp_org_analytics_metadata_get',
    description: `Returns metadata for an analytics entity (cube) including measures, dimensions, types, and formats. Use this to construct valid queries for \`POST /organizations/analytics\` — all query members must belong to the same entity.`,
    params: [
      {
        name: 'entity_name',
        type: 'string',
        required: true,
        description: `The name of the analytics entity (cube) to retrieve metadata for.`,
      },
    ],
  },
  {
    name: 'deelmcp_org_analytics_tile_get',
    description: `Creates a new analytics tile (chart, table, or text widget) for use on custom dashboards.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_org_contract_custom_field_list',
    description: `Returns custom field definitions for contracts — field metadata and placement for supported types (text, list, multiselect, number, percentage, currency, date), not contract-specific values.`,
    params: [],
  },
  {
    name: 'deelmcp_org_cost_center_list',
    description: `Returns all cost centers associated with the specified legal_entity_id.`,
    params: [
      { name: 'legal_entity_id', type: 'string', required: true, description: `Legal entity id` },
    ],
  },
  {
    name: 'deelmcp_org_create_legal_entity',
    description: `Creates a new legal entity under the organization and returns the entity record including its assigned id.`,
    params: [{ name: 'data', type: 'object', required: false, description: `No description.` }],
  },
  {
    name: 'deelmcp_org_current_person_get',
    description: `Returns the profile of the currently authenticated user, including identity, organizational membership, and integration identifiers for connected services such as Slack.`,
    params: [],
  },
  {
    name: 'deelmcp_org_current_person_profile_update',
    description: `Applies a partial update to the authenticated user's profile, modifying only the fields supplied in the request body.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_org_custom_field_get',
    description: `"Retrieves a single person custom field definition by its \`id\`.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Custom field id.` }],
  },
  {
    name: 'deelmcp_org_custom_field_list',
    description: `Returns custom field definitions for people - field metadata and placement for supported types (text, list, multiselect, number, percentage, currency, date), not person-specific values.`,
    params: [],
  },
  {
    name: 'deelmcp_org_delete_structure',
    description: `Permanently removes an organization structure from the organization.`,
    params: [{ name: 'external_id', type: 'string', required: true, description: `External ID` }],
  },
  {
    name: 'deelmcp_org_department_list',
    description: `Returns the list of departments within the authenticated user's organization, including each department's identifier, name, and parent department where applicable.`,
    params: [],
  },
  {
    name: 'deelmcp_org_department_update',
    description: `Assigns a worker to a department by their HRIS profile ID. By default the new assignment appends to existing positions; set \`replace_other_positions\` to true to replace all current positions instead.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `Hris profile ID` },
      {
        name: 'replace_other_positions',
        type: 'boolean',
        required: false,
        description: `Indicates if this department position should replace all other positions or only append to the existing ones.`,
      },
    ],
  },
  {
    name: 'deelmcp_org_direct_employee_create',
    description: `Creates a direct employee record under the organization's own legal entity, provisioning both a person and an employment contract. For onboarding employees managed through your own payroll providers.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_org_get',
    description: `Returns details of the organization associated with the authentication token; the organization is resolved automatically from the token and requires no additional identifier.`,
    params: [],
  },
  {
    name: 'deelmcp_org_get_legal_entity',
    description: `Returns legal entity data for an organization integrated with an external benefits vendor.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Id from the legal entity to fetch data`,
      },
    ],
  },
  {
    name: 'deelmcp_org_get_structure',
    description: `Fetches a single organization structure, returning associated roles and teams alongside structure metadata.`,
    params: [{ name: 'external_id', type: 'string', required: true, description: `External ID` }],
  },
  {
    name: 'deelmcp_org_group_create',
    description: `Creates a new group within the organization and returns the created group record, including its assigned \`id\`.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_org_group_delete',
    description: `Soft-deletes a group by archiving it. The group is not permanently removed and the response includes the \`archived_at\` timestamp reflecting when the archive occurred.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Unique identifier of the group to be archived.`,
      },
    ],
  },
  {
    name: 'deelmcp_org_group_list',
    description: `Returns a paginated list of groups in the organization. Archived groups are included by default and can be excluded via the \`include_archived_groups\` parameter.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The encoded cursor for paginated results. This is an opaque string that allows fetching the next set of results.`,
      },
      {
        name: 'external_metadata',
        type: 'string',
        required: false,
        description: `Extra information about the group.`,
      },
      {
        name: 'include_archived_groups',
        type: 'boolean',
        required: false,
        description: `Include archived groups (soft deleted records). Defaults to \`true\`.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of groups to return (between 1 and 100)`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort the results in ascending (ASC) or descending (DESC) order based on the group name.`,
      },
    ],
  },
  {
    name: 'deelmcp_org_group_update',
    description: `Applies a partial update to an existing group's details. Only fields included in the request body are modified; omitted fields retain their current values.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Unique identifier of the group to be edited.`,
      },
    ],
  },
  {
    name: 'deelmcp_org_hris_person_get',
    description: `Returns detailed information about a single person in the organization by their public ID. Returns personal details, employment information, organizational structure, person status, direct manager, custom fields, and related data.`,
    params: [
      {
        name: 'hris_profile_id',
        type: 'string',
        required: true,
        description: `Unique identifier for the person.`,
      },
      {
        name: 'include_custom_fields',
        type: 'boolean',
        required: false,
        description: `Include custom fields in the response.`,
      },
      {
        name: 'include_worker_relations',
        type: 'boolean',
        required: false,
        description: `Include worker relations in the response.`,
      },
    ],
  },
  {
    name: 'deelmcp_org_legal_entity_delete',
    description: `Archives the legal entity identified by id, marking it as inactive without permanently removing it; the response includes the archived_at timestamp.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the legal entity.`,
      },
    ],
  },
  {
    name: 'deelmcp_org_legal_entity_list',
    description: `Returns a paginated list of legal entities in the account, with optional filtering by country, entity type, global payroll flag, and archived status.`,
    params: [
      { name: 'country', type: 'string', required: false, description: `Filter by country.` },
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination.` },
      {
        name: 'global_payroll',
        type: 'boolean',
        required: false,
        description: `Filter by global payroll flag.`,
      },
      {
        name: 'include_archived',
        type: 'boolean',
        required: false,
        description: `Whether to include archived legal entities in the results.`,
      },
      {
        name: 'include_payroll_settings',
        type: 'boolean',
        required: false,
        description: `Whether to include payroll settings in the response.`,
      },
      {
        name: 'legal_entity_id',
        type: 'string',
        required: false,
        description: `Filter by specific legal entity ID.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of results to return per page.`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sorting order of the results.`,
      },
      { name: 'type', type: 'string', required: false, description: `Filter by entity type.` },
    ],
  },
  {
    name: 'deelmcp_org_manager_create',
    description: `Creates a new manager in the organization and returns the created manager's identity fields, including the assigned \`id\`.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_org_manager_list',
    description: `Returns a paginated list of all managers in the organization.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return per page.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `The starting index for the page of records to return.`,
      },
    ],
  },
  {
    name: 'deelmcp_org_person_custom_field_delete',
    description: `Removes a specific custom field value from a worker record by the custom field's ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Custom field id.` },
      { name: 'worker_id', type: 'string', required: true, description: `Worker id.` },
    ],
  },
  {
    name: 'deelmcp_org_person_custom_field_list',
    description: `Returns all custom field values currently set for the specified worker.`,
    params: [{ name: 'worker_id', type: 'string', required: true, description: `Worker id.` }],
  },
  {
    name: 'deelmcp_org_person_custom_field_update',
    description: `Creates or updates a custom field value for a worker; if a value for the specified field already exists it is overwritten.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      { name: 'worker_id', type: 'string', required: true, description: `Worker id.` },
    ],
  },
  {
    name: 'deelmcp_org_person_list',
    description: `Returns a paginated list of people records in the organization. Supports filtering by search term, teams, custom fields, and other query parameters. Build people directories, sync HR data, or power search interfaces across your workforce records.`,
    params: [
      {
        name: 'band_placements',
        type: 'array',
        required: false,
        description: `Employee's current band placement.`,
      },
      {
        name: 'comparative_ratios_from',
        type: 'number',
        required: false,
        description: `Employee's minimum band placement`,
      },
      {
        name: 'comparative_ratios_to',
        type: 'number',
        required: false,
        description: `Employee's maximum band placement`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Pick the fields you want to see in the response in order to avoid a bloated people list output. Supports dot notation (e.g., 'employments[0].contract_status') to access nested fields.`,
      },
      {
        name: 'hiring_statuses',
        type: 'array',
        required: false,
        description: `Employee's current hiring status.`,
      },
      {
        name: 'hiring_types',
        type: 'array',
        required: false,
        description: `Filter people by hiring types`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Return a page of results with given number of records.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Return a page of results with given number of records.`,
      },
      {
        name: 'person_statuses',
        type: 'array',
        required: false,
        description: `Filter people by person (worker profile) lifecycle status.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Include a contract if by name or contractor name contains given search term.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Sort people by given field name.`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Order direction of results; ascending or descending.`,
      },
      {
        name: 'teams',
        type: 'array',
        required: false,
        description: `Filter the results based on the team(group) the users contract is associated with`,
      },
    ],
  },
  {
    name: 'deelmcp_org_personal_info_get',
    description: `Returns personal information for a worker by their worker ID.`,
    params: [
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a worker (External ID).`,
      },
    ],
  },
  {
    name: 'deelmcp_org_personal_info_update',
    description: `Partially updates personal information for a worker by their worker ID; only fields included in the request body are modified.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a worker.`,
      },
    ],
  },
  {
    name: 'deelmcp_org_positions_list',
    description: `Fetches all positions associated with the specified \`hrisProfileId\`.`,
    params: [
      { name: 'hris_profile_id', type: 'string', required: true, description: `HRIS Profile ID` },
    ],
  },
  {
    name: 'deelmcp_org_positions_update',
    description: `Applies a batch of add, edit, and delete operations to positions within a single request. Multiple operation types may be submitted together; callers should ensure each operation in the batch targets a valid, existing position where applicable.`,
    params: [
      {
        name: 'data',
        type: 'object',
        required: false,
        description: `The request payload containing the position changes to apply.`,
      },
    ],
  },
  {
    name: 'deelmcp_org_relation_type_create',
    description: `Creates a new worker relation type, defining a named parent–child relationship structure that can be applied to worker associations. The \`is_default\` flag on the response indicates whether the created type has been set as the default relation type.`,
    params: [{ name: 'data', type: 'object', required: false, description: `No description.` }],
  },
  {
    name: 'deelmcp_org_relation_type_delete',
    description: `Permanently deletes the worker relation type. This operation is irreversible; ensure no active worker relations are associated with the type before calling.`,
    params: [
      { name: 'type_id', type: 'string', required: true, description: `Worker Relation Type ID` },
    ],
  },
  {
    name: 'deelmcp_org_relation_type_list',
    description: `Returns all configured worker relation types available in the organization, which define the valid relationship categories that can be assigned when creating or upserting worker relations.`,
    params: [],
  },
  {
    name: 'deelmcp_org_role_create',
    description: `Creates a new custom role within the current organization.`,
    params: [{ name: 'data', type: 'object', required: false, description: `No description.` }],
  },
  {
    name: 'deelmcp_org_role_list',
    description: `Retrieves all roles defined within the current organization.`,
    params: [],
  },
  {
    name: 'deelmcp_org_role_update',
    description: `Applies a partial update to the custom role, modifying only the fields supplied in the request body.`,
    params: [
      { name: 'roleId', type: 'string', required: true, description: `ID of the role` },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_org_structure_delete',
    description: `Permanently removes an organization structure from the organization.`,
    params: [
      {
        name: 'hris_org_structure_id',
        type: 'string',
        required: true,
        description: `Org Structure`,
      },
    ],
  },
  {
    name: 'deelmcp_org_structure_get',
    description: `Fetches a single organization structure by its \`hrisOrgStr_id\`, returning associated roles, teams, and structure metadata.`,
    params: [
      {
        name: 'hris_org_structure_id',
        type: 'string',
        required: true,
        description: `HRIS Organization Structure ID`,
      },
    ],
  },
  {
    name: 'deelmcp_org_structure_update',
    description: `Applies a partial update to an existing organization structure. Only fields provided in the request body are modified; omitted fields retain their current values.`,
    params: [
      {
        name: 'hris_org_structure_id',
        type: 'string',
        required: true,
        description: `Org Structure`,
      },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_org_structures_create',
    description: `Creates a new organization structure, returning the record with its assigned \`id\`. The \`is_multi_select\` and \`enable_roles\` flags control multi-team assignment and role management support.`,
    params: [{ name: 'data', type: 'object', required: false, description: `No description.` }],
  },
  {
    name: 'deelmcp_org_structures_list',
    description: `Returns the organization's hierarchical structure, including departments and teams, with offset-based pagination.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Return a page of results with given number of records.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Return a page of results with given number of records.`,
      },
    ],
  },
  {
    name: 'deelmcp_org_task_list',
    description: `Returns a paginated list of all tasks for the organization, not limited to the caller. Supports offset/limit and cursor-based pagination, which are mutually exclusive — do not combine \`cursor\` with offset.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Filter by task category.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor for cursor-based pagination. When provided, use with limit only (do not use offset).`,
      },
      {
        name: 'external_id',
        type: 'string',
        required: false,
        description: `Filter by external ID (for tasks created with an external reference).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return (1-100).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search string for task display name or description.`,
      },
      { name: 'statuses', type: 'array', required: false, description: `Filter by task statuses.` },
    ],
  },
  {
    name: 'deelmcp_org_team_list',
    description: `Returns the list of teams within the authenticated user's organization, with each entry including the team's ID and name.`,
    params: [],
  },
  {
    name: 'deelmcp_org_update_legal_entity',
    description: `Applies a partial update to an existing legal entity identified by id; only fields included in the request body are modified.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the legal entity.`,
      },
      { name: 'address', type: 'object', required: false, description: `No description.` },
      {
        name: 'company_identifiers',
        type: 'object',
        required: false,
        description: `Identifiers associated with the legal entity.`,
      },
      {
        name: 'entity_type',
        type: 'string',
        required: false,
        description: `The type of the legal entity.`,
      },
      {
        name: 'industry_name',
        type: 'string',
        required: false,
        description: `The industry name of the legal entity.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The name of the legal entity.`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `The phone number of the legal entity.`,
      },
      {
        name: 'sic_number',
        type: 'string',
        required: false,
        description: `The SIC number of the legal entity.`,
      },
    ],
  },
  {
    name: 'deelmcp_org_update_structure',
    description: `Applies a partial update to an existing organization structure. Only fields provided in the request body are modified; omitted fields retain their current values.`,
    params: [
      { name: 'external_id', type: 'string', required: true, description: `External ID` },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_org_worker_relation_create',
    description: `Establishes a hierarchical relationship between a worker and one or more subordinates. The request body must identify both the parent worker and the subordinate profiles to be linked.`,
    params: [
      {
        name: 'data',
        type: 'object',
        required: false,
        description: `The request payload containing the relationship details.`,
      },
    ],
  },
  {
    name: 'deelmcp_org_worker_relations_child_update',
    description: `Creates or replaces the child worker relation for the HrisProfile. If a child relation already exists for this profile, it is overwritten with the supplied data.`,
    params: [
      { name: 'hris_profile_oid', type: 'string', required: true, description: `HrisProfile ID` },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_org_working_location_list',
    description: `Returns the list of available work location labels for the organization. Populate options when creating or editing people or contract records.`,
    params: [],
  },
  {
    name: 'deelmcp_org_working_location_update',
    description: `Sets the working location for a worker identified by their HRIS profile ID.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `Hris profile ID` },
    ],
  },
  {
    name: 'deelmcp_payment_breakdown_get',
    description: `Returns a breakdown of a payment made to Deel, with individual invoices and the Deel fee included as discrete line items.`,
    params: [
      {
        name: 'payment_id',
        type: 'string',
        required: true,
        description: `Unique identifier for the payment to retrieve the breakdown.`,
      },
    ],
  },
  {
    name: 'deelmcp_payout_auto_withdrawal_get',
    description: `Returns the current auto-withdrawal configuration for the authenticated worker, including whether auto-withdrawal is enabled and the identifier of the selected withdrawal method.`,
    params: [],
  },
  {
    name: 'deelmcp_payout_auto_withdrawal_update',
    description: `Partially updates the auto-withdrawal configuration, allowing callers to enable or disable auto-withdrawal and change the target withdrawal method.`,
    params: [{ name: 'data', type: 'object', required: false, description: `No description.` }],
  },
  {
    name: 'deelmcp_payout_balance_list',
    description: `Returns the total available balances for the authenticated contractor, broken down by currency and aggregated into a single cross-currency total.`,
    params: [],
  },
  {
    name: 'deelmcp_payout_bank_transfer_method_update',
    description: `Fully replaces the bank transfer method; all method fields must be provided as this is a complete replacement, not a partial update.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `Method unique identifier` },
    ],
  },
  {
    name: 'deelmcp_payout_bank_transfer_route_list',
    description: `Returns all bank transfer routes available to the authenticated contractor.`,
    params: [],
  },
  {
    name: 'deelmcp_payout_contractor_auto_withdrawal_update',
    description: `Updates the auto-withdrawal configuration for the authenticated contractor.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_payout_employee_method_create',
    description: `Creates or updates an employee's bank payout method. If a method already exists, the existing record is superseded and the response includes a version identifier and activation status reflecting the updated state.`,
    params: [{ name: 'data', type: 'object', required: false, description: `Request data` }],
  },
  {
    name: 'deelmcp_payout_employee_method_delete',
    description: `Permanently removes the bank payout method identified by the given method \`id\`.`,
    params: [{ name: 'id', type: 'string', required: true, description: `method ID` }],
  },
  {
    name: 'deelmcp_payout_employee_method_list',
    description: `Retrieves the configured bank payout methods for an employee.`,
    params: [],
  },
  {
    name: 'deelmcp_payout_transfer_method_create',
    description: `Registers a new bank transfer payout method; the request payload structure is dynamic and determined by the selected option, so callers should retrieve field requirements before submitting.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_payout_transfer_method_list',
    description: `Returns all payout methods associated with the authenticated account, with optional filtering to return only the default method.`,
    params: [
      {
        name: 'is_default',
        type: 'boolean',
        required: false,
        description: `Filter by whether the method is default. If true, only default methods will be returned.`,
      },
    ],
  },
  {
    name: 'deelmcp_payout_withdrawal_request',
    description: `Initiates a withdrawal of available funds to the employee's configured payout method. The operation is asynchronous; the outcome is delivered via webhook rather than the synchronous response.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_payout_withdrawal_tracking_get',
    description: `Retrieve the step-by-step tracking information for a withdrawal, including current progress, status steps, and any delay banners.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Withdrawal ID (numeric sequential ID or UUID v4 public ID)`,
      },
      {
        name: 'profileId',
        type: 'string',
        required: false,
        description: `Contractor profile public ID (UUID). Required when the caller is a client/org admin. Specifies which contractor's withdrawal to look up.`,
      },
    ],
  },
  {
    name: 'deelmcp_payroll_contract_create',
    description: `Creates a new Global Payroll contract. Country-specific required fields must be retrieved first from \`GET /forms/gp/worker-additional-fields/{country_code}\`. Returns the contract with its \`id\`.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_payroll_cycle_gross_to_net_get',
    description: `Returns categorized gross-to-net data — including category group, category, sub-category, and label — for each contract within the payroll cycle identified by \`cycle_id\`.`,
    params: [
      {
        name: 'cycle_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the payroll event.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination of results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return. Defaults to 20.`,
      },
    ],
  },
  {
    name: 'deelmcp_payroll_cycle_list',
    description: `Lists payroll cycles with optional filters for contract OIDs, date range, country, entity, and cycle state. Use \`employment_id\` to narrow results to specific employee contracts.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination.` },
      {
        name: 'cycle_action_states',
        type: 'array',
        required: false,
        description: `Filter by cycle action state.`,
      },
      { name: 'cycle_types', type: 'array', required: false, description: `Filter by cycle type.` },
      { name: 'cycles_tab', type: 'string', required: false, description: `Filter cycles by tab.` },
      {
        name: 'employment_id',
        type: 'string',
        required: false,
        description: `Contract OID(s) from people endpoint employments[0].id.`,
      },
      { name: 'end_date', type: 'string', required: false, description: `End of date range.` },
      {
        name: 'exclude_completed',
        type: 'boolean',
        required: false,
        description: `Exclude completed cycles.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of cycles to return.`,
      },
      { name: 'start_date', type: 'string', required: false, description: `Start of date range.` },
    ],
  },
  {
    name: 'deelmcp_payroll_equity_tax_event_create',
    description: `Submits an equity or token tax event for an EOR worker enrolled in Equity & Token Services.`,
    params: [{ name: 'data', type: 'object', required: false, description: `No description.` }],
  },
  {
    name: 'deelmcp_payroll_payment_cycle_list',
    description: `Fetches the scheduled payment dates and current status of each payment cycle for a specific contract.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The Deel contract ID for which payment dates are being retrieved.`,
      },
    ],
  },
  {
    name: 'deelmcp_payroll_report_entry_update',
    description: `Updates payroll report items for an employee in a specific cycle. Ensure the cycle is editable before submitting. Provide \`payroll_report_column_id\` values from the payroll report response.`,
    params: [
      { name: 'cycle_id', type: 'string', required: true, description: `Payroll event/cycle id.` },
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'payroll_report_entry_id',
        type: 'string',
        required: true,
        description: `Payroll report entry id, unique for each employee for each cycle.`,
      },
    ],
  },
  {
    name: 'deelmcp_payroll_report_get',
    description: `Get payroll report data for a payroll cycle, including available columns, employee row values, and optional previous report items. Use this response to discover payroll_report_column_id and payroll_id before updating entries.`,
    params: [
      { name: 'cycle_id', type: 'string', required: true, description: `Payroll event/cycle id.` },
      {
        name: 'contract_oids',
        type: 'array',
        required: false,
        description: `Contract OID(s) to filter report rows.`,
      },
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination.` },
      {
        name: 'employee_status',
        type: 'array',
        required: false,
        description: `Employee status filter.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of report rows.`,
      },
      { name: 'search', type: 'string', required: false, description: `Filter by employee name.` },
    ],
  },
  {
    name: 'deelmcp_raw_shift_update',
    description: `Update specific fields of an existing raw shift by its unique \`external_id\`. This includes shift meta details, description etc.`,
    params: [
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Raw shift update request data.`,
      },
      {
        name: 'external_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the shift to be updated.`,
      },
    ],
  },
  {
    name: 'deelmcp_retrieve_ats_job_posting_by_organization',
    description: `This endpoint retrieves a single job posting by its ID for a specific organization. It provides detailed information about the job posting, including its associated job details, publication status, and other relevant metadata.`,
    params: [
      {
        name: 'job_posting_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the job posting to retrieve`,
      },
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the organization`,
      },
    ],
  },
  {
    name: 'deelmcp_retrieve_ats_job_postings_by_organization',
    description: `Retrieves a list of all job postings in the Applicant Tracking System. Results can be filtered by query parameters.`,
    params: [
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the organization`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor for pagination (optional)`,
      },
      {
        name: 'job_board_id',
        type: 'string',
        required: false,
        description: `Job Board ID must be a valid UUID`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records returned in one response (optional)`,
      },
    ],
  },
  {
    name: 'deelmcp_retrieve_custom_fields_for_organization',
    description: `Retrieves custom field values for a specific organization structure (team). This endpoint returns all custom fields configured for organization structures, including their current values, inheritance status, and any pending change requests. Custom fields`,
    params: [
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `Public ID (UUID) of the HRIS team/organization structure`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor for pagination`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max items per page (default 20, max 100)`,
      },
    ],
  },
  {
    name: 'deelmcp_retrieve_payment_receipts',
    description: `Retrieve a list of payments made to Deel, including worker details, payment status, and payment methods.`,
    params: [
      {
        name: 'currencies',
        type: 'array',
        required: false,
        description: `Filters payments by their currency codes. Can be a single currency code or an array of codes.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `A cursor for pagination. Use the value returned in the 'next_cursor' field to get the next page of results.`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Filters results to include payments created on or after this date (in ISO 8601 format).`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `Filters results to include payments created before this date (in ISO 8601 format).`,
      },
      {
        name: 'entities',
        type: 'array',
        required: false,
        description: `Filters payments by legal entity type (e.g., 'individual' or 'company'). Can be a single entity type or an array.`,
      },
      {
        name: 'statuses',
        type: 'array',
        required: false,
        description: `Filters payments by their status (e.g., 'paid' or 'processing'). Can be a single status type or an array.`,
      },
    ],
  },
  {
    name: 'deelmcp_system_profile_list',
    description: `Use this endpoint to retrieve a list of Deel users along with their connected system accounts (Slack, GitHub, Jira).`,
    params: [
      {
        name: 'email',
        type: 'array',
        required: false,
        description: `One or more emails to match exactly; repeat the param (?email=a@x.com&email=b@y.com). At least one of 'email' or 'name' must be provided.`,
      },
      {
        name: 'name',
        type: 'array',
        required: false,
        description: `One or more names (case-insensitive partial match); repeat the param (?name=John&name=Doe). At least one of 'email' or 'name' must be provided.`,
      },
    ],
  },
  {
    name: 'deelmcp_task_update',
    description: `Applies a partial update to the specified task and returns whether the update was successful.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The id of an existing task`,
      },
    ],
  },
  {
    name: 'deelmcp_time_tracking_raw_shift_create',
    description: `Submits one or more raw shift records to the time tracking system. Raw shifts represent unprocessed time entries that may undergo validation or transformation before being reflected in processed time data.`,
    params: [
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Request data containing contract ID and shifts to be created.`,
      },
    ],
  },
  {
    name: 'deelmcp_time_tracking_shift_bulk_delete',
    description: `Permanently deletes one or more shifts identified by their external IDs. Deleted shifts are immediately unrecoverable and can no longer be retrieved or modified.`,
    params: [
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Request data containing the external IDs of shifts to be deleted.`,
      },
    ],
  },
  {
    name: 'deelmcp_time_tracking_shift_create',
    description: `Creates one or more time tracking shifts for a contract in a single request. Supports both original shift submissions and correction shifts that adjust hours for previously processed shifts.`,
    params: [
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Request data containing contract ID and shifts to be created.`,
      },
    ],
  },
  {
    name: 'deelmcp_time_tracking_shift_external_delete',
    description: `Permanently deletes a shift identified by its external_id. Once deleted, the shift cannot be retrieved or modified.`,
    params: [
      {
        name: 'external_id',
        type: 'string',
        required: true,
        description: `The unique external identifier of the shift to be deleted.`,
      },
    ],
  },
  {
    name: 'deelmcp_time_tracking_shift_external_get',
    description: `Retrieves the details of a specific shift.`,
    params: [
      {
        name: 'external_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the shift to retrieve.`,
      },
    ],
  },
  {
    name: 'deelmcp_time_tracking_shift_external_update',
    description: `Applies a partial update to an existing shift, modifying only the fields supplied in the request body. Fields omitted from the request are left unchanged.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `Shift update request data.` },
      {
        name: 'external_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the shift to be updated.`,
      },
    ],
  },
  {
    name: 'deelmcp_time_tracking_shift_list',
    description: `Returns a paginated list of shifts. Results can be scoped to one or more contracts and bounded by a date range using \`from_date\` and \`to_date\`.`,
    params: [
      {
        name: 'contract_id',
        type: 'array',
        required: false,
        description: `Filter shifts by one or more contract IDs.`,
      },
      {
        name: 'from_date',
        type: 'string',
        required: false,
        description: `Filter shifts from this date (YYYY-MM-DD).`,
      },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Offset/index of record for the next page of records to return.`,
      },
      {
        name: 'to_date',
        type: 'string',
        required: false,
        description: `Filter shifts until this date (YYYY-MM-DD).`,
      },
    ],
  },
  {
    name: 'deelmcp_time_tracking_shift_rate_create',
    description: `Creates a new shift rate with a specified name, type, value, and an externally supplied identifier that can be used to correlate the rate with records in external systems.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_time_tracking_shift_rate_external_delete',
    description: `Deletes a shift rate identified by its external_id, which is the custom identifier assigned at creation time. Deletion is blocked if the shift rate is currently associated with any active shift.`,
    params: [{ name: 'external_id', type: 'string', required: true, description: `external ID` }],
  },
  {
    name: 'deelmcp_time_tracking_shift_rate_external_get',
    description: `Retrieves a shift rate.`,
    params: [
      {
        name: 'external_id',
        type: 'string',
        required: true,
        description: `The unique external identifier of the shift rate to retrieve.`,
      },
    ],
  },
  {
    name: 'deelmcp_time_tracking_shift_rate_external_update',
    description: `Applies a partial update to an existing shift rate, modifying only the fields provided in the request body.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'external_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the shift rate to be updated.`,
      },
    ],
  },
  {
    name: 'deelmcp_time_tracking_shift_rate_list',
    description: `Returns a paginated list of shift rates. Use the limit and offset parameters to control page size and starting position within the result set.`,
    params: [
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `The maximum number of records to return per page. For example, '10' to return up to 10 records.`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `The starting index for the records to retrieve. For example, '0' for the first page or '10' for the second page when limit=10.`,
      },
    ],
  },
  {
    name: 'deelmcp_time_tracking_timesheet_get',
    description: `Retrieves a timesheet by \`timesheet_id\`, including its submission, review, and processing status. Pass \`expand=file_data\` to include file name and download URL in the response.`,
    params: [
      {
        name: 'timesheet_id',
        type: 'string',
        required: true,
        description: `ID of the timesheet to fetch file for`,
      },
      {
        name: 'extend',
        type: 'string',
        required: false,
        description: `Optional list of fields to extend in the response. Currently only \`file_data\` is supported, which includes file details (file_id, file_name) and download URL.`,
      },
    ],
  },
  {
    name: 'deelmcp_time_tracking_timesheet_review',
    description: `Approves or rejects a submitted timesheet; only timesheets in \`PENDING_REVIEW\` status are eligible, and all associated hours are approved or rejected as a single operation.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'timesheet_id',
        type: 'string',
        required: true,
        description: `ID of the timesheet to review`,
      },
    ],
  },
  {
    name: 'deelmcp_time_tracking_timesheet_upload_url_generate',
    description: `Accepts timesheet file metadata and returns a pre-signed \`upload_url\` together with a new timesheet record \`id\`. Currently limited to EOR contracts.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_timeoff_all_event_list',
    description: `Returns time-off events for a worker profile identified by hris_profile_id, with optional filtering by time_off_type_id or policy_id.`,
    params: [
      {
        name: 'hris_profile_id',
        type: 'string',
        required: true,
        description: `Worker hris profile id`,
      },
      { name: 'policy_id', type: 'string', required: false, description: `Policy id` },
      {
        name: 'time_off_type_id',
        type: 'string',
        required: false,
        description: `Time off type id`,
      },
    ],
  },
  {
    name: 'deelmcp_timeoff_dailies_list',
    description: `Returns holidays, work schedule entries, and time-off dailies for a given date range, scoped to one or more HRIS profile IDs or countries.`,
    params: [
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `List of countries to be fetched`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date of non working days date range`,
      },
      { name: 'hris_profile_ids', type: 'array', required: false, description: `HRIS profile ids` },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date of non working days date range`,
      },
    ],
  },
  {
    name: 'deelmcp_timeoff_entitlement_list',
    description: `Returns time-off entitlements for the specified hris_profile_id, including available balances, used days, and remaining allocation per time-off type. Results can be scoped to a specific policy type or tracking period date.`,
    params: [
      { name: 'hris_profile_id', type: 'string', required: true, description: `HRIS profile ID` },
      {
        name: 'policy_type_name',
        type: 'string',
        required: false,
        description: `Policy type name`,
      },
      {
        name: 'tracking_period_date',
        type: 'string',
        required: false,
        description: `Tracking period date`,
      },
    ],
  },
  {
    name: 'deelmcp_timeoff_event_list',
    description: `Returns a paginated list of time-off requests for the specified hris_profile_id, with optional filters for status, policy type, date ranges covering the time-off period, approval date, and last-updated date.`,
    params: [
      { name: 'hris_profile_id', type: 'string', required: true, description: `HRIS profile id` },
      {
        name: 'approval_end_date',
        type: 'string',
        required: false,
        description: `Approval end date`,
      },
      {
        name: 'approval_start_date',
        type: 'string',
        required: false,
        description: `Approval start date`,
      },
      { name: 'end_date', type: 'string', required: false, description: `End date of time off` },
      { name: 'next', type: 'string', required: false, description: `Next page` },
      { name: 'page_size', type: 'integer', required: false, description: `Page size` },
      { name: 'policy_types', type: 'array', required: false, description: `Policy types` },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date of time off`,
      },
      { name: 'status', type: 'array', required: false, description: `Time off status` },
      { name: 'time_off_ids', type: 'array', required: false, description: `Time off ids` },
      {
        name: 'updated_end_date',
        type: 'string',
        required: false,
        description: `Updated end date`,
      },
      {
        name: 'updated_start_date',
        type: 'string',
        required: false,
        description: `Updated start date`,
      },
    ],
  },
  {
    name: 'deelmcp_timeoff_policy_list',
    description: `Returns the time-off policies assigned to the specified hris_profile_id, including policy details such as allowed types, accrual rules, and balances. Results can be filtered by policy type name or policy type ID.`,
    params: [
      { name: 'hris_profile_id', type: 'string', required: true, description: `hrisProfileId id.` },
      { name: 'policy_type_id', type: 'string', required: false, description: `policy type id` },
      {
        name: 'policy_type_name',
        type: 'string',
        required: false,
        description: `Policy type name.`,
      },
    ],
  },
  {
    name: 'deelmcp_timeoff_policy_validation_template_list',
    description: `Returns policy validation templates and policy types for one or more countries, specified as ISO 3166-1 alpha-2 codes. Policy types in the response are unique across the result set.`,
    params: [
      {
        name: 'countries',
        type: 'array',
        required: true,
        description: `List of countries (ISO 3166-1 alpha-2 codes) to fetch policy templates and types for.`,
      },
    ],
  },
  {
    name: 'deelmcp_timeoff_request_create',
    description: `Creates a new time-off request for a worker.`,
    params: [
      { name: 'data', type: 'object', required: false, description: `The time off request data` },
    ],
  },
  {
    name: 'deelmcp_timeoff_request_delete',
    description: `Cancels the time-off request identified by time_off_id, setting its status to CANCELED regardless of its current state.`,
    params: [
      { name: 'time_off_id', type: 'string', required: true, description: `Time off request id` },
    ],
  },
  {
    name: 'deelmcp_timeoff_request_list',
    description: `Returns time-off requests for the authenticated organization, with optional filtering by status, date ranges, policy types, and specific request IDs. Results are paginated using cursor-based navigation.`,
    params: [
      {
        name: 'approval_end_date',
        type: 'string',
        required: false,
        description: `Approval end date`,
      },
      {
        name: 'approval_start_date',
        type: 'string',
        required: false,
        description: `Approval start date`,
      },
      { name: 'end_date', type: 'string', required: false, description: `End date of time off` },
      {
        name: 'include_deleted_time_offs',
        type: 'boolean',
        required: false,
        description: `When true, includes soft-deleted time-off records in the response. Deleted records will have a deleted_at timestamp and status DELETED.`,
      },
      { name: 'next', type: 'string', required: false, description: `Next page` },
      { name: 'page_size', type: 'integer', required: false, description: `Page size` },
      { name: 'policy_types', type: 'array', required: false, description: `Policy types` },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date of time off`,
      },
      { name: 'status', type: 'array', required: false, description: `Time off status` },
      { name: 'time_off_ids', type: 'array', required: false, description: `Time off ids` },
      {
        name: 'updated_end_date',
        type: 'string',
        required: false,
        description: `Updated end date`,
      },
      {
        name: 'updated_start_date',
        type: 'string',
        required: false,
        description: `Updated start date`,
      },
    ],
  },
  {
    name: 'deelmcp_timeoff_request_review',
    description: `Approves or rejects a batch of time-off requests in a single call. The desired status must be either APPROVED or REJECTED for each entry; the response distinguishes successfully processed requests from those that encountered errors.`,
    params: [
      {
        name: 'data',
        type: 'array',
        required: true,
        description: `Array of time-offs to be reviewed`,
      },
    ],
  },
  {
    name: 'deelmcp_timeoff_request_update',
    description: `Applies a partial update to an existing time-off request identified by time_off_id. Only fields included in the request body are modified.`,
    params: [
      { name: 'time_off_id', type: 'string', required: true, description: `Time off request id` },
      {
        name: 'data',
        type: 'object',
        required: false,
        description: `Time off update request data`,
      },
    ],
  },
  {
    name: 'deelmcp_timeoff_request_validate',
    description: `Validates a time-off request against policy compliance, available balance, blackout dates, and other rules before creation. Returns an \`is_valid\` flag with any errors and adjusted dates.`,
    params: [
      { name: 'data', type: 'object', required: false, description: `Time off request data` },
    ],
  },
  {
    name: 'deelmcp_timeoff_sync_run',
    description: `Synchronizes time-off requests from an external HRIS for Global Payroll contracts. Records are upserted or deleted by external ID. Deel calculates the payroll cycle impact of each operation.`,
    params: [{ name: 'data', type: 'object', required: false, description: `No description.` }],
  },
  {
    name: 'deelmcp_timesheet_create',
    description: `Creates a timesheet entry for an hourly contractor, recording the contract, date, hours worked, and an optional description. The entry is immediately placed into a review workflow upon creation.`,
    params: [
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Payload attributes required to create one timesheet entry with optional approval, preset, and grouping metadata.`,
      },
    ],
  },
  {
    name: 'deelmcp_timesheet_create_reviews',
    description: `Review a batch of timesheets to approve or reject submitted work.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_timesheet_delete',
    description: `Permanently deletes a timesheet entry. An optional \`reason\` query parameter may be provided to record the rationale for deletion.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of an existing timesheet` },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Reason for deleting an existing task`,
      },
    ],
  },
  {
    name: 'deelmcp_timesheet_get',
    description: `Returns a single timesheet entry.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of an existing timesheet` },
    ],
  },
  {
    name: 'deelmcp_timesheet_list',
    description: `Returns a paginated list of timesheets in the account, optionally filtered by contract_id, contract_types, statuses, reporter_id, or date range.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: false,
        description: `Filter results to timesheets belonging to this Deel contract ID.`,
      },
      {
        name: 'contract_types',
        type: 'array',
        required: false,
        description: `List of contract types`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Short date in format ISO-8601 (YYYY-MM-DD). For example 2022-12-31.`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `Short date in format ISO-8601 (YYYY-MM-DD). For example 2022-12-31.`,
      },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Maximum number of records to return per page. NOTE: query parameters are passed as strings.`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Number of records to skip before starting to return results. NOTE: query parameters are passed as strings.`,
      },
      {
        name: 'reporter_id',
        type: 'string',
        required: false,
        description: `Filter results to timesheets submitted by this user ID.`,
      },
      {
        name: 'statuses',
        type: 'array',
        required: false,
        description: `List of statuses to filter by`,
      },
    ],
  },
  {
    name: 'deelmcp_timesheet_preset_create',
    description: `Creates a new hourly report preset, returning the assigned id upon success.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_timesheet_preset_delete',
    description: `Permanently deletes an hourly report preset identified by id.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the hourly report preset to delete`,
      },
    ],
  },
  {
    name: 'deelmcp_timesheet_preset_get',
    description: `Retrieves a single hourly report preset by its id.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the hourly report preset to retrieve`,
      },
    ],
  },
  {
    name: 'deelmcp_timesheet_preset_list',
    description: `Returns saved hourly report presets for the specified contract, optionally scoped to a work statement. Results support cursor-based pagination and can be ordered by title or creation date.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `ID of the Deel contract`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching next set of results`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per page`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to order results by (title or created_at)`,
      },
      {
        name: 'order_direction',
        type: 'string',
        required: false,
        description: `Direction of ordering (ASC or DESC)`,
      },
      {
        name: 'work_statement_id',
        type: 'string',
        required: false,
        description: `ID of the work statement (optional)`,
      },
    ],
  },
  {
    name: 'deelmcp_timesheet_preset_update',
    description: `Applies a partial update to an existing hourly report preset identified by id. Only fields included in the request body are modified.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the hourly report preset to update`,
      },
    ],
  },
  {
    name: 'deelmcp_timesheet_review',
    description: `Submits an approve or reject decision for a timesheet entry. Approved timesheets are queued for inclusion in the next payment cycle.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of an existing timesheet` },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_timesheet_root_preset_alt_get',
    description: `Retrieves a single hourly report root preset by its id, including its current status.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the hourly report root preset to retrieve`,
      },
    ],
  },
  {
    name: 'deelmcp_timesheet_root_preset_async_create',
    description: `Creates a new hourly report root preset and initiates asynchronous processing; the response includes an async_task object that can be used to track completion.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the hourly report root preset (maximum 255 characters)`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Detailed description of the root preset's purpose and usage (maximum 30000 characters)`,
      },
      {
        name: 'file',
        type: 'string',
        required: false,
        description: `Optional file attachment for the root preset`,
      },
      {
        name: 'hourly_report_presets',
        type: 'array',
        required: false,
        description: `Array of preset configurations to be created along with the root preset`,
      },
      {
        name: 'hourly_report_presets_processing_type',
        type: 'string',
        required: false,
        description: `Determines whether presets should be processed synchronously or asynchronously`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `The type of preset, RATE – indicates a preset that overrides the default contract rate, TRACKING - used exclusively for tracking, applying the default contract rate`,
      },
    ],
  },
  {
    name: 'deelmcp_timesheet_root_preset_async_list',
    description: `Returns a cursor-paginated list of hourly report root presets, with optional filtering by work_statement_statuses and result ordering.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching the next page of results`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page (max: 100)`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to order the results by`,
      },
      {
        name: 'order_direction',
        type: 'string',
        required: false,
        description: `Direction to order the results (ascending or descending)`,
      },
      {
        name: 'work_statement_statuses',
        type: 'array',
        required: false,
        description: `Filter results by work statement status`,
      },
    ],
  },
  {
    name: 'deelmcp_timesheet_update',
    description: `Partially updates an existing timesheet entry; only fields supplied in the request body are modified. Both clients and contractors may perform this operation.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `ID of an existing timesheet.` },
    ],
  },
  {
    name: 'deelmcp_update_worker_relation_type',
    description: `Update a worker relation type.`,
    params: [
      { name: 'typeId', type: 'string', required: true, description: `Worker Relation Type id` },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_update_worker_relation_type_external_id',
    description: `Update a worker relation type by external id.`,
    params: [
      {
        name: 'externalId',
        type: 'string',
        required: true,
        description: `Worker Relation Type external ID`,
      },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_upsert_parent_worker_relations',
    description: `Create a parent worker relation.`,
    params: [
      { name: 'hrisProfileOid', type: 'string', required: true, description: `HrisProfile ID` },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_verification_aml_get',
    description: `Returns the most recent AML screening result for the specified entity. The \`entity_type\` must be one of \`profile\`, \`hris_profile\`, or \`legal_entity\`.`,
    params: [
      { name: 'entity_id', type: 'string', required: true, description: `UUID v4 of the entity` },
      {
        name: 'entity_type',
        type: 'string',
        required: true,
        description: `The type of entity to screen. Only 'profile', 'hris_profile', 'legal_entity' are accepted.`,
      },
    ],
  },
  {
    name: 'deelmcp_verification_kyc_get',
    description: `Retrieves KYC verification details for a worker identified by \`worker_profile_id\` or \`profile_id\`; these two parameters are mutually exclusive. \`contract_id\` is required when multiple profiles are associated with the worker.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: false,
        description: `Worker's contract ID. This parameter is required in case there are multiple profiles associated to the target worker. For example, when worker used to work for the former company he had another profile ID. So we need contract ID to properly resolve profile's KYC details. In case this parameter is not provided and multiple associated profiles are found, exception with 409 status code will be thrown`,
      },
      {
        name: 'profile_id',
        type: 'string',
        required: false,
        description: `Worker's profile public ID client requests to fetch KYC details for, This parameter is mutually exclusive with worker_profile_id `,
      },
      {
        name: 'worker_profile_id',
        type: 'string',
        required: false,
        description: `Worker's HRIS profile public ID client requests to fetch KYC details for. This parameter is mutually exclusive with profile_id`,
      },
    ],
  },
  {
    name: 'deelmcp_verification_method_get',
    description: `Returns the KYC verification method supported for a given combination of issuing country and document type.`,
    params: [
      {
        name: 'country',
        type: 'string',
        required: true,
        description: `The document's issuing country code (ISO 3166-1 alpha-2)`,
      },
      {
        name: 'document_type',
        type: 'string',
        required: true,
        description: `The document to be provided during KYC`,
      },
    ],
  },
  {
    name: 'deelmcp_verification_screening_create',
    description: `Creates a manual identity verification submission as a fallback when automated verification has failed multiple times or when the document's country of issue is not supported by the automated solution.`,
    params: [],
  },
  {
    name: 'deelmcp_vms_candidate_message_create',
    description: `Use this endpoint to handle new candidate's chat message received from an external provider. Provide the job and candidate identifiers and message text. The system will save text and show it to client as candidate's chat message.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_vms_candidate_update',
    description: `Handles a candidate action event from an external provider by updating the candidate state and triggering corresponding platform workflows.`,
    params: [{ name: 'data', type: 'object', required: true, description: `No description.` }],
  },
  {
    name: 'deelmcp_worker_amendment_sign',
    description: `Records the worker's signature on a pending amendment identified by amendment_id. Once signed, the amendment's status change is reflected in the associated contract.`,
    params: [
      {
        name: 'amendment_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the amendment to sign`,
      },
      { name: 'data', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_worker_compliance_document_list',
    description: `Retrieve the list of compliance document requirements for a worker, grouped by country. Returns all required and optional documents with their current submission status. Applicable for both independent contractors and EOR employees.`,
    params: [],
  },
  {
    name: 'deelmcp_worker_contract_sign',
    description: `Records the worker's signature on the contract identified by contract_id. Only contracts in an unsigned, pending state can be signed.`,
    params: [
      {
        name: 'contract_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the contract.`,
      },
      { name: 'data', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'deelmcp_worker_contract_type_list',
    description: `Returns the additional information template for a given contract type and employment country, specifying the fields required to complete employee information for that combination.`,
    params: [
      {
        name: 'country',
        type: 'string',
        required: true,
        description: `ISO 3166-1 alpha-2 country code.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The contract type. Must be 'eor' (Employer of Record) or 'gp' (Global Payroll).`,
      },
    ],
  },
  {
    name: 'deelmcp_worker_document_download',
    description: `Get the download link of worker document.`,
    params: [
      {
        name: 'document_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a compliance document in Deel.`,
      },
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a worker.`,
      },
    ],
  },
  {
    name: 'deelmcp_worker_document_list',
    description: `Retrieve a list of documents of a worker.`,
    params: [
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `Unique identifier for a worker.`,
      },
    ],
  },
  {
    name: 'deelmcp_worker_hrx_manager_get',
    description: `Retrieves the Human Resource Experience (HRX) Manager assigned to the authenticated worker, including contact details and a scheduling URL. Accessible only to workers with the appropriate permissions.`,
    params: [],
  },
  {
    name: 'deelmcp_worker_personal_info_external_get',
    description: `Retrieves a worker profile record using a system-wide external worker identifier.`,
    params: [
      {
        name: 'worker_id',
        type: 'string',
        required: true,
        description: `System-wide external identifier for a worker record.`,
      },
    ],
  },
  {
    name: 'deelmcp_workflow_action_trigger',
    description: `Add workflow actions to a workflow created by AI Agents`,
    params: [
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Actions configuration data containing an array of workflow actions`,
      },
    ],
  },
  {
    name: 'deelmcp_workflow_trigger',
    description: `Creates an internal invisible workflow with a trigger`,
    params: [
      { name: 'data', type: 'object', required: true, description: `Trigger configuration data` },
    ],
  },
]
