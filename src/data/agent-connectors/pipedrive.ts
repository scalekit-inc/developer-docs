import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'pipedrive_activities_list',
    description: `Retrieve a list of activities from Pipedrive. Filter by owner, deal, person, organization, completion status, and date range.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination from a previous response.`,
      },
      {
        name: 'deal_id',
        type: 'integer',
        required: false,
        description: `Filter activities by deal ID.`,
      },
      {
        name: 'done',
        type: 'boolean',
        required: false,
        description: `Filter by completion status: true for done, false for undone.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of activities to return per page (max 500).`,
      },
      {
        name: 'org_id',
        type: 'integer',
        required: false,
        description: `Filter activities by organization ID.`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `Filter activities by owner user ID.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `Filter activities by person ID.`,
      },
      {
        name: 'updated_since',
        type: 'string',
        required: false,
        description: `Filter activities updated after this RFC3339 datetime.`,
      },
    ],
  },
  {
    name: 'pipedrive_activity_create',
    description: `Create a new activity in Pipedrive such as a call, meeting, email, or task. Associate it with a deal, person, or organization.`,
    params: [
      {
        name: 'subject',
        type: 'string',
        required: true,
        description: `Subject/title of the activity.`,
      },
      {
        name: 'deal_id',
        type: 'integer',
        required: false,
        description: `ID of the deal to associate this activity with.`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Due date of the activity in YYYY-MM-DD format.`,
      },
      {
        name: 'due_time',
        type: 'string',
        required: false,
        description: `Due time of the activity in HH:MM format.`,
      },
      {
        name: 'note',
        type: 'string',
        required: false,
        description: `Note or description for the activity.`,
      },
      {
        name: 'org_id',
        type: 'integer',
        required: false,
        description: `ID of the organization to associate this activity with.`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `ID of the user responsible for this activity.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `ID of the person to associate this activity with.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Type of activity (e.g., call, meeting, email, task, deadline, lunch).`,
      },
    ],
  },
  {
    name: 'pipedrive_activity_delete',
    description: `Delete an activity from Pipedrive by its ID. After 30 days it will be permanently removed.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the activity to delete.`,
      },
    ],
  },
  {
    name: 'pipedrive_activity_update',
    description: `Update an existing activity in Pipedrive. Modify subject, type, due date/time, note, completion status, or associations.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the activity to update.`,
      },
      {
        name: 'deal_id',
        type: 'integer',
        required: false,
        description: `ID of the deal to associate this activity with.`,
      },
      {
        name: 'done',
        type: 'boolean',
        required: false,
        description: `Mark the activity as done (true) or undone (false).`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Updated due date in YYYY-MM-DD format.`,
      },
      {
        name: 'due_time',
        type: 'string',
        required: false,
        description: `Updated due time in HH:MM format.`,
      },
      {
        name: 'note',
        type: 'string',
        required: false,
        description: `Updated note or description for the activity.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Updated subject/title of the activity.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Updated type of activity (e.g., call, meeting, email, task).`,
      },
    ],
  },
  {
    name: 'pipedrive_deal_create',
    description: `Create a new deal in Pipedrive with a title, value, currency, pipeline, stage, associated person and organization.`,
    params: [
      { name: 'title', type: 'string', required: true, description: `Title of the deal.` },
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `Currency code for the deal value (e.g., USD, EUR).`,
      },
      {
        name: 'expected_close_date',
        type: 'string',
        required: false,
        description: `Expected close date in YYYY-MM-DD format.`,
      },
      {
        name: 'org_id',
        type: 'integer',
        required: false,
        description: `ID of the organization to associate with this deal.`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `ID of the user who owns this deal.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `ID of the person to associate with this deal.`,
      },
      {
        name: 'pipeline_id',
        type: 'integer',
        required: false,
        description: `ID of the pipeline to place this deal in.`,
      },
      {
        name: 'stage_id',
        type: 'integer',
        required: false,
        description: `ID of the pipeline stage for this deal.`,
      },
      {
        name: 'value',
        type: 'number',
        required: false,
        description: `Monetary value of the deal.`,
      },
    ],
  },
  {
    name: 'pipedrive_deal_delete',
    description: `Delete a deal from Pipedrive by its ID. This action marks the deal as deleted.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the deal to delete.` },
    ],
  },
  {
    name: 'pipedrive_deal_get',
    description: `Retrieve details of a specific deal in Pipedrive by its ID, including title, value, status, pipeline stage, associated person and organization.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the deal to retrieve.`,
      },
    ],
  },
  {
    name: 'pipedrive_deal_update',
    description: `Update an existing deal in Pipedrive. Modify title, value, status, pipeline stage, associated person, organization, or close date.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the deal to update.` },
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `Currency code for the deal value (e.g., USD, EUR).`,
      },
      {
        name: 'expected_close_date',
        type: 'string',
        required: false,
        description: `Expected close date in YYYY-MM-DD format.`,
      },
      {
        name: 'org_id',
        type: 'integer',
        required: false,
        description: `ID of the organization to associate with this deal.`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `ID of the user who owns this deal.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `ID of the person to associate with this deal.`,
      },
      {
        name: 'pipeline_id',
        type: 'integer',
        required: false,
        description: `ID of the pipeline for this deal.`,
      },
      {
        name: 'stage_id',
        type: 'integer',
        required: false,
        description: `ID of the pipeline stage for this deal.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Status of the deal: open, won, or lost.`,
      },
      { name: 'title', type: 'string', required: false, description: `New title for the deal.` },
      {
        name: 'value',
        type: 'number',
        required: false,
        description: `Monetary value of the deal.`,
      },
    ],
  },
  {
    name: 'pipedrive_deals_list',
    description: `Retrieve a list of deals from Pipedrive. Filter by owner, person, organization, pipeline, stage, and status with cursor-based pagination.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination from a previous response.`,
      },
      {
        name: 'filter_id',
        type: 'integer',
        required: false,
        description: `ID of a saved filter to apply.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of deals to return per page (max 500).`,
      },
      {
        name: 'org_id',
        type: 'integer',
        required: false,
        description: `Filter deals by organization ID.`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `Filter deals by owner user ID.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `Filter deals by person ID.`,
      },
      {
        name: 'pipeline_id',
        type: 'integer',
        required: false,
        description: `Filter deals by pipeline ID.`,
      },
      {
        name: 'stage_id',
        type: 'integer',
        required: false,
        description: `Filter deals by stage ID.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter deals by status: open, won, lost, or all_not_deleted.`,
      },
    ],
  },
  {
    name: 'pipedrive_deals_search',
    description: `Search for deals in Pipedrive by a search term across title and other fields. Supports filtering by person, organization, and status.`,
    params: [
      {
        name: 'term',
        type: 'string',
        required: true,
        description: `Search term to find matching deals. Minimum 2 characters.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination from a previous response.`,
      },
      {
        name: 'exact_match',
        type: 'boolean',
        required: false,
        description: `When true, only results with exact case-insensitive match are returned.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to search in (e.g., title,notes,custom_fields).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 500).`,
      },
      {
        name: 'organization_id',
        type: 'integer',
        required: false,
        description: `Filter results by organization ID.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `Filter results by person ID.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by deal status: open, won, or lost.`,
      },
    ],
  },
  {
    name: 'pipedrive_file_delete',
    description: `Delete a file from Pipedrive by its ID.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the file to delete.` },
    ],
  },
  {
    name: 'pipedrive_file_get',
    description: `Retrieve metadata of a specific file in Pipedrive by its ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the file to retrieve.`,
      },
    ],
  },
  {
    name: 'pipedrive_files_list',
    description: `Retrieve a list of files attached to Pipedrive records with pagination and sorting.`,
    params: [
      { name: 'limit', type: 'integer', required: false, description: `Number of files per page.` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Field and direction to sort by (e.g., id DESC, add_time ASC).`,
      },
      { name: 'start', type: 'integer', required: false, description: `Pagination start offset.` },
    ],
  },
  {
    name: 'pipedrive_goal_create',
    description: `Create a new goal in Pipedrive to track team or individual performance metrics.`,
    params: [
      {
        name: 'assignee_id',
        type: 'integer',
        required: true,
        description: `ID of the user or team assigned to this goal.`,
      },
      {
        name: 'assignee_type',
        type: 'string',
        required: true,
        description: `Type of assignee: person or team.`,
      },
      {
        name: 'duration_end',
        type: 'string',
        required: true,
        description: `Goal end date in YYYY-MM-DD format.`,
      },
      {
        name: 'duration_start',
        type: 'string',
        required: true,
        description: `Goal start date in YYYY-MM-DD format.`,
      },
      {
        name: 'interval',
        type: 'string',
        required: true,
        description: `Goal tracking interval: weekly, monthly, quarterly, or yearly.`,
      },
      { name: 'target', type: 'number', required: true, description: `Target value for the goal.` },
      { name: 'title', type: 'string', required: true, description: `Title of the goal.` },
      {
        name: 'tracking_metric',
        type: 'string',
        required: true,
        description: `What to track: count or sum.`,
      },
      {
        name: 'type_name',
        type: 'string',
        required: true,
        description: `Goal type: deals_won, deals_progressed, activities_completed, activities_added, or revenue_forecast.`,
      },
    ],
  },
  {
    name: 'pipedrive_goal_delete',
    description: `Delete a goal from Pipedrive by its ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the goal to delete.` },
    ],
  },
  {
    name: 'pipedrive_goal_update',
    description: `Update an existing goal in Pipedrive. Modify title, assignee, target, interval, or duration.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the goal to update.` },
      {
        name: 'assignee_id',
        type: 'integer',
        required: false,
        description: `Updated assignee user or team ID.`,
      },
      {
        name: 'assignee_type',
        type: 'string',
        required: false,
        description: `Updated assignee type: person or team.`,
      },
      {
        name: 'duration_end',
        type: 'string',
        required: false,
        description: `Updated goal end date in YYYY-MM-DD format.`,
      },
      {
        name: 'duration_start',
        type: 'string',
        required: false,
        description: `Updated goal start date in YYYY-MM-DD format.`,
      },
      {
        name: 'interval',
        type: 'string',
        required: false,
        description: `Updated tracking interval: weekly, monthly, quarterly, or yearly.`,
      },
      { name: 'target', type: 'number', required: false, description: `Updated target value.` },
      { name: 'title', type: 'string', required: false, description: `Updated title of the goal.` },
    ],
  },
  {
    name: 'pipedrive_goals_find',
    description: `Search and filter goals in Pipedrive by type, title, assignee, and time period.`,
    params: [
      {
        name: 'assignee_id',
        type: 'integer',
        required: false,
        description: `Filter goals by assignee user or team ID.`,
      },
      {
        name: 'assignee_type',
        type: 'string',
        required: false,
        description: `Type of assignee: person or team.`,
      },
      {
        name: 'is_active',
        type: 'boolean',
        required: false,
        description: `Filter by active status: true for active, false for inactive.`,
      },
      {
        name: 'period_end',
        type: 'string',
        required: false,
        description: `Goal period end date in YYYY-MM-DD format.`,
      },
      {
        name: 'period_start',
        type: 'string',
        required: false,
        description: `Goal period start date in YYYY-MM-DD format.`,
      },
      { name: 'title', type: 'string', required: false, description: `Filter goals by title.` },
      {
        name: 'type_name',
        type: 'string',
        required: false,
        description: `Filter by goal type: deals_won, deals_progressed, activities_completed, activities_added, revenue_forecast.`,
      },
    ],
  },
  {
    name: 'pipedrive_lead_create',
    description: `Create a new lead in Pipedrive with a title and optional associations to a person or organization.`,
    params: [
      { name: 'title', type: 'string', required: true, description: `Title of the lead.` },
      {
        name: 'organization_id',
        type: 'integer',
        required: false,
        description: `ID of the organization to associate this lead with.`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `ID of the user who owns this lead.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `ID of the person to associate this lead with.`,
      },
    ],
  },
  {
    name: 'pipedrive_lead_delete',
    description: `Delete a lead from Pipedrive by its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The UUID of the lead to delete.`,
      },
    ],
  },
  {
    name: 'pipedrive_lead_get',
    description: `Retrieve details of a specific lead in Pipedrive by its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The UUID of the lead to retrieve.`,
      },
    ],
  },
  {
    name: 'pipedrive_lead_update',
    description: `Update an existing lead in Pipedrive. Modify title, owner, person, organization, or status.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The UUID of the lead to update.`,
      },
      {
        name: 'is_archived',
        type: 'boolean',
        required: false,
        description: `Whether to archive this lead.`,
      },
      {
        name: 'organization_id',
        type: 'integer',
        required: false,
        description: `ID of the organization to associate this lead with.`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `ID of the user who owns this lead.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `ID of the person to associate this lead with.`,
      },
      { name: 'title', type: 'string', required: false, description: `Updated title of the lead.` },
    ],
  },
  {
    name: 'pipedrive_leads_list',
    description: `Retrieve a list of leads from Pipedrive with pagination. Filter by owner, person, or organization.`,
    params: [
      {
        name: 'filter_id',
        type: 'integer',
        required: false,
        description: `ID of a saved filter to apply.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Number of leads per page.` },
      {
        name: 'organization_id',
        type: 'integer',
        required: false,
        description: `Filter leads by organization ID.`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `Filter leads by owner user ID.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `Filter leads by person ID.`,
      },
      { name: 'start', type: 'integer', required: false, description: `Pagination start offset.` },
    ],
  },
  {
    name: 'pipedrive_leads_search',
    description: `Search for leads in Pipedrive by title, notes, or custom fields.`,
    params: [
      {
        name: 'term',
        type: 'string',
        required: true,
        description: `Search term. Minimum 2 characters.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination from a previous response.`,
      },
      {
        name: 'exact_match',
        type: 'boolean',
        required: false,
        description: `When true, only exact case-insensitive matches are returned.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to search in (e.g., title,notes,custom_fields).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 500).`,
      },
      {
        name: 'organization_id',
        type: 'integer',
        required: false,
        description: `Filter results by organization ID.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `Filter results by person ID.`,
      },
    ],
  },
  {
    name: 'pipedrive_note_create',
    description: `Create a new note in Pipedrive and associate it with a deal, person, organization, or lead.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `HTML content of the note.` },
      {
        name: 'deal_id',
        type: 'integer',
        required: false,
        description: `ID of the deal to attach this note to.`,
      },
      {
        name: 'lead_id',
        type: 'string',
        required: false,
        description: `UUID of the lead to attach this note to.`,
      },
      {
        name: 'org_id',
        type: 'integer',
        required: false,
        description: `ID of the organization to attach this note to.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `ID of the person to attach this note to.`,
      },
    ],
  },
  {
    name: 'pipedrive_note_delete',
    description: `Delete a note from Pipedrive by its ID.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The ID of the note to delete.` },
    ],
  },
  {
    name: 'pipedrive_note_update',
    description: `Update the content of an existing note in Pipedrive.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Updated HTML content of the note.`,
      },
      { name: 'id', type: 'integer', required: true, description: `The ID of the note to update.` },
    ],
  },
  {
    name: 'pipedrive_notes_list',
    description: `Retrieve a list of notes from Pipedrive. Filter by deal, person, organization, lead, or date range.`,
    params: [
      {
        name: 'deal_id',
        type: 'integer',
        required: false,
        description: `Filter notes by deal ID.`,
      },
      {
        name: 'lead_id',
        type: 'string',
        required: false,
        description: `Filter notes by lead UUID.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Number of notes per page.` },
      {
        name: 'org_id',
        type: 'integer',
        required: false,
        description: `Filter notes by organization ID.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `Filter notes by person ID.`,
      },
      { name: 'start', type: 'integer', required: false, description: `Pagination start offset.` },
      {
        name: 'user_id',
        type: 'integer',
        required: false,
        description: `Filter notes by the user who created them.`,
      },
    ],
  },
  {
    name: 'pipedrive_organization_create',
    description: `Create a new organization (company) in Pipedrive with a name, address, and optional owner.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the organization.` },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `Physical address of the organization.`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `ID of the user who owns this organization.`,
      },
    ],
  },
  {
    name: 'pipedrive_organization_delete',
    description: `Delete an organization from Pipedrive by its ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the organization to delete.`,
      },
    ],
  },
  {
    name: 'pipedrive_organization_get',
    description: `Retrieve details of a specific organization in Pipedrive by its ID, including name, address, and associated deals and contacts.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the organization to retrieve.`,
      },
    ],
  },
  {
    name: 'pipedrive_organization_update',
    description: `Update an existing organization in Pipedrive. Modify name, address, or owner.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the organization to update.`,
      },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `Updated physical address of the organization.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated name of the organization.`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `ID of the user who owns this organization.`,
      },
    ],
  },
  {
    name: 'pipedrive_organizations_list',
    description: `Retrieve a list of organizations (companies) from Pipedrive with cursor-based pagination and optional filtering.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination from a previous response.`,
      },
      {
        name: 'filter_id',
        type: 'integer',
        required: false,
        description: `ID of a saved filter to apply.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of organizations to return per page (max 500).`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `Filter organizations by owner user ID.`,
      },
    ],
  },
  {
    name: 'pipedrive_organizations_search',
    description: `Search for organizations in Pipedrive by a search term across name, address, and custom fields.`,
    params: [
      {
        name: 'term',
        type: 'string',
        required: true,
        description: `Search term. Minimum 2 characters.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination from a previous response.`,
      },
      {
        name: 'exact_match',
        type: 'boolean',
        required: false,
        description: `When true, only exact case-insensitive matches are returned.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to search in (e.g., name,address,custom_fields).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 500).`,
      },
    ],
  },
  {
    name: 'pipedrive_person_create',
    description: `Create a new person (contact) in Pipedrive with name, email, phone, and optional organization association.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Full name of the person.` },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Email address of the person.`,
      },
      {
        name: 'org_id',
        type: 'integer',
        required: false,
        description: `ID of the organization to associate this person with.`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `ID of the user who owns this person record.`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `Phone number of the person.`,
      },
    ],
  },
  {
    name: 'pipedrive_person_delete',
    description: `Delete a person (contact) from Pipedrive by their ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the person to delete.`,
      },
    ],
  },
  {
    name: 'pipedrive_person_get',
    description: `Retrieve details of a specific person (contact) in Pipedrive by their ID, including name, emails, phones, and associated organization.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the person to retrieve.`,
      },
    ],
  },
  {
    name: 'pipedrive_person_update',
    description: `Update an existing person (contact) in Pipedrive. Modify name, email, phone, organization, or owner.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the person to update.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Updated email address of the person.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated full name of the person.`,
      },
      {
        name: 'org_id',
        type: 'integer',
        required: false,
        description: `ID of the organization to associate this person with.`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `ID of the user who owns this person record.`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `Updated phone number of the person.`,
      },
    ],
  },
  {
    name: 'pipedrive_persons_list',
    description: `Retrieve a list of persons (contacts) from Pipedrive. Filter by owner, organization, or deal with cursor-based pagination.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination from a previous response.`,
      },
      {
        name: 'deal_id',
        type: 'integer',
        required: false,
        description: `Filter persons by associated deal ID.`,
      },
      {
        name: 'filter_id',
        type: 'integer',
        required: false,
        description: `ID of a saved filter to apply.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of persons to return per page (max 500).`,
      },
      {
        name: 'org_id',
        type: 'integer',
        required: false,
        description: `Filter persons by organization ID.`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `Filter persons by owner user ID.`,
      },
    ],
  },
  {
    name: 'pipedrive_persons_search',
    description: `Search for persons (contacts) in Pipedrive by name, email, phone, or custom fields.`,
    params: [
      {
        name: 'term',
        type: 'string',
        required: true,
        description: `Search term to find matching persons. Minimum 2 characters.`,
      },
      {
        name: 'exact_match',
        type: 'boolean',
        required: false,
        description: `When true, only results with exact case-insensitive match are returned.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to search in (e.g., name,email,phone,custom_fields).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 500).`,
      },
      {
        name: 'organization_id',
        type: 'integer',
        required: false,
        description: `Filter results by organization ID.`,
      },
    ],
  },
  {
    name: 'pipedrive_pipeline_create',
    description: `Create a new sales pipeline in Pipedrive with a name and optional deal probability setting.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the pipeline.` },
      {
        name: 'is_deal_probability_enabled',
        type: 'boolean',
        required: false,
        description: `Whether deal probability is enabled for this pipeline.`,
      },
    ],
  },
  {
    name: 'pipedrive_pipeline_delete',
    description: `Delete a sales pipeline from Pipedrive by its ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the pipeline to delete.`,
      },
    ],
  },
  {
    name: 'pipedrive_pipeline_get',
    description: `Retrieve details of a specific sales pipeline in Pipedrive by its ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the pipeline to retrieve.`,
      },
    ],
  },
  {
    name: 'pipedrive_pipeline_update',
    description: `Update an existing sales pipeline in Pipedrive. Modify name or deal probability settings.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the pipeline to update.`,
      },
      {
        name: 'is_deal_probability_enabled',
        type: 'boolean',
        required: false,
        description: `Whether deal probability is enabled for this pipeline.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated name of the pipeline.`,
      },
    ],
  },
  {
    name: 'pipedrive_pipelines_list',
    description: `Retrieve all sales pipelines from Pipedrive with their stages and configuration.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination from a previous response.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of pipelines per page (max 500).`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Field to sort results by: id, update_time, or add_time.`,
      },
      {
        name: 'sort_direction',
        type: 'string',
        required: false,
        description: `Sort direction: asc or desc.`,
      },
    ],
  },
  {
    name: 'pipedrive_product_create',
    description: `Create a new product in Pipedrive with name, price, description, and other attributes.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the product.` },
      { name: 'code', type: 'string', required: false, description: `Product code or SKU.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the product.`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `ID of the user who owns this product.`,
      },
      {
        name: 'tax',
        type: 'number',
        required: false,
        description: `Tax rate for this product (percentage).`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Unit of measurement for this product.`,
      },
    ],
  },
  {
    name: 'pipedrive_product_delete',
    description: `Delete a product from Pipedrive by its ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the product to delete.`,
      },
    ],
  },
  {
    name: 'pipedrive_product_get',
    description: `Retrieve details of a specific product in Pipedrive by its ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the product to retrieve.`,
      },
    ],
  },
  {
    name: 'pipedrive_product_update',
    description: `Update an existing product in Pipedrive. Modify name, code, description, unit, tax, or owner.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the product to update.`,
      },
      {
        name: 'code',
        type: 'string',
        required: false,
        description: `Updated product code or SKU.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description of the product.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated name of the product.`,
      },
      { name: 'owner_id', type: 'integer', required: false, description: `Updated owner user ID.` },
      {
        name: 'tax',
        type: 'number',
        required: false,
        description: `Updated tax rate (percentage).`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Updated unit of measurement.`,
      },
    ],
  },
  {
    name: 'pipedrive_products_list',
    description: `Retrieve a list of products from Pipedrive with cursor-based pagination and optional filtering.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination from a previous response.`,
      },
      {
        name: 'filter_id',
        type: 'integer',
        required: false,
        description: `ID of a saved filter to apply.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of products per page (max 500).`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `Filter products by owner user ID.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Field to sort by (e.g., id, update_time, add_time, name).`,
      },
      {
        name: 'sort_direction',
        type: 'string',
        required: false,
        description: `Sort direction: asc or desc.`,
      },
    ],
  },
  {
    name: 'pipedrive_products_search',
    description: `Search for products in Pipedrive by name, code, or custom fields.`,
    params: [
      {
        name: 'term',
        type: 'string',
        required: true,
        description: `Search term. Minimum 2 characters.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination from a previous response.`,
      },
      {
        name: 'exact_match',
        type: 'boolean',
        required: false,
        description: `When true, only exact case-insensitive matches are returned.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to search in (e.g., name,code,description).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 500).`,
      },
    ],
  },
  {
    name: 'pipedrive_stage_create',
    description: `Create a new stage in a Pipedrive pipeline with a name and optional deal probability settings.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the stage.` },
      {
        name: 'pipeline_id',
        type: 'integer',
        required: true,
        description: `ID of the pipeline this stage belongs to.`,
      },
      {
        name: 'days_to_rotten',
        type: 'integer',
        required: false,
        description: `Number of days a deal stays in this stage before it's marked as rotten.`,
      },
      {
        name: 'deal_probability',
        type: 'integer',
        required: false,
        description: `Deal success probability for this stage (0-100).`,
      },
      {
        name: 'is_deal_rot_enabled',
        type: 'boolean',
        required: false,
        description: `Whether rotten flag is enabled for deals in this stage.`,
      },
    ],
  },
  {
    name: 'pipedrive_stage_delete',
    description: `Delete a pipeline stage from Pipedrive by its ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the stage to delete.`,
      },
    ],
  },
  {
    name: 'pipedrive_stage_get',
    description: `Retrieve details of a specific pipeline stage in Pipedrive by its ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the stage to retrieve.`,
      },
    ],
  },
  {
    name: 'pipedrive_stage_update',
    description: `Update an existing pipeline stage in Pipedrive. Modify name, pipeline, deal probability, or rotten settings.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the stage to update.`,
      },
      {
        name: 'days_to_rotten',
        type: 'integer',
        required: false,
        description: `Number of days before a deal is marked as rotten.`,
      },
      {
        name: 'deal_probability',
        type: 'integer',
        required: false,
        description: `Deal success probability for this stage (0-100).`,
      },
      {
        name: 'is_deal_rot_enabled',
        type: 'boolean',
        required: false,
        description: `Whether rotten flag is enabled for deals in this stage.`,
      },
      { name: 'name', type: 'string', required: false, description: `Updated name of the stage.` },
      {
        name: 'pipeline_id',
        type: 'integer',
        required: false,
        description: `ID of the pipeline this stage belongs to.`,
      },
    ],
  },
  {
    name: 'pipedrive_stages_list',
    description: `Retrieve all stages in Pipedrive. Filter by pipeline ID with cursor-based pagination.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination from a previous response.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of stages per page (max 500).`,
      },
      {
        name: 'pipeline_id',
        type: 'integer',
        required: false,
        description: `Filter stages by pipeline ID.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Field to sort by (e.g., id, update_time, add_time).`,
      },
      {
        name: 'sort_direction',
        type: 'string',
        required: false,
        description: `Sort direction: asc or desc.`,
      },
    ],
  },
  {
    name: 'pipedrive_user_get',
    description: `Retrieve details of a specific user in Pipedrive by their ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the user to retrieve.`,
      },
    ],
  },
  {
    name: 'pipedrive_user_me',
    description: `Retrieve the profile of the currently authenticated user in Pipedrive.`,
    params: [],
  },
  {
    name: 'pipedrive_users_find',
    description: `Search for Pipedrive users by name or email address.`,
    params: [
      {
        name: 'term',
        type: 'string',
        required: true,
        description: `Search term to match against user name or email.`,
      },
      {
        name: 'search_by_email',
        type: 'boolean',
        required: false,
        description: `When true, the search term is matched against email addresses instead of names.`,
      },
    ],
  },
  {
    name: 'pipedrive_users_list',
    description: `Retrieve all users in the Pipedrive company account.`,
    params: [],
  },
  {
    name: 'pipedrive_webhook_create',
    description: `Create a new webhook in Pipedrive to receive real-time notifications when objects are created, updated, or deleted.`,
    params: [
      {
        name: 'event_action',
        type: 'string',
        required: true,
        description: `Action to trigger the webhook: added, updated, deleted, or * for all.`,
      },
      {
        name: 'event_object',
        type: 'string',
        required: true,
        description: `Object type to watch: deal, person, organization, activity, lead, note, pipeline, product, stage, user, or * for all.`,
      },
      {
        name: 'subscription_url',
        type: 'string',
        required: true,
        description: `The URL to send webhook notifications to.`,
      },
      {
        name: 'http_auth_password',
        type: 'string',
        required: false,
        description: `Password for HTTP Basic Auth on the subscription URL.`,
      },
      {
        name: 'http_auth_user',
        type: 'string',
        required: false,
        description: `Username for HTTP Basic Auth on the subscription URL.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Display name for this webhook.`,
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: `Webhook payload version: 1 or 2.`,
      },
    ],
  },
  {
    name: 'pipedrive_webhook_delete',
    description: `Delete a webhook from Pipedrive by its ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the webhook to delete.`,
      },
    ],
  },
  {
    name: 'pipedrive_webhooks_list',
    description: `Retrieve all webhooks configured in the Pipedrive account.`,
    params: [],
  },
]
