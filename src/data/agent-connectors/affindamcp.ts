import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'affindamcp_add_connection_to_integration',
    description: `Attach an existing service connection to an integration.`,
    params: [
      { name: 'connection_id', type: 'string', required: true, description: `No description.` },
      { name: 'integration_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_archive_documents',
    description: `Move documents to \`\`archived\`\` state.`,
    params: [
      { name: 'document_ids', type: 'array', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_assign_document_type_to_workspace',
    description: `Make a document type available for use in a workspace.`,
    params: [
      { name: 'document_type_id', type: 'string', required: true, description: `No description.` },
      { name: 'workspace_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_bulk_create_data_source_values',
    description: `Append many new rows to a data source in one call.`,
    params: [
      { name: 'data_source_id', type: 'string', required: true, description: `No description.` },
      { name: 'values', type: 'array', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_bulk_create_fields',
    description: `Create many fields on a document type in one call.`,
    params: [
      { name: 'document_type_id', type: 'string', required: true, description: `No description.` },
      { name: 'fields', type: 'array', required: true, description: `No description.` },
      { name: 'field_group_id', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_confirm_documents',
    description: `Mark documents as validated, moving them from \`\`review\`\` to \`\`validated\`\`.`,
    params: [
      { name: 'document_ids', type: 'array', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_create_api_token',
    description: `Create a new long-lived Affinda API key for the current user.`,
    params: [],
  },
  {
    name: 'affindamcp_create_connect_token',
    description: `Mint an OAuth connect token + URL so the user can authorise a service.`,
    params: [
      { name: 'connection_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_create_data_source',
    description: `Create an empty data source (lookup table) in an organization.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'organization_id', type: 'string', required: true, description: `No description.` },
      { name: 'display_property', type: 'string', required: false, description: `No description.` },
      { name: 'key_property', type: 'string', required: false, description: `No description.` },
      {
        name: 'schema_definition',
        type: 'string',
        required: false,
        description: `No description.`,
      },
    ],
  },
  {
    name: 'affindamcp_create_data_source_value',
    description: `Add one new row to a data source.`,
    params: [
      { name: 'data_source_id', type: 'string', required: true, description: `No description.` },
      { name: 'value', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_create_document_type',
    description: `Create a new document type (extraction template) in an organization.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'organization_id', type: 'string', required: true, description: `No description.` },
      {
        name: 'disable_confirmation_if_validation_rules_fail',
        type: 'boolean',
        required: false,
        description: `No description.`,
      },
    ],
  },
  {
    name: 'affindamcp_create_field',
    description: `Create a single field on a document type.`,
    params: [
      { name: 'document_type_id', type: 'string', required: true, description: `No description.` },
      { name: 'field_type', type: 'string', required: true, description: `No description.` },
      { name: 'label', type: 'string', required: true, description: `No description.` },
      { name: 'slug', type: 'string', required: true, description: `No description.` },
      { name: 'decimal_places', type: 'string', required: false, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      { name: 'enabled', type: 'boolean', required: false, description: `No description.` },
      { name: 'field_group_id', type: 'string', required: false, description: `No description.` },
      { name: 'manual_entry', type: 'boolean', required: false, description: `No description.` },
      {
        name: 'mapping_data_source_id',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'multiple', type: 'boolean', required: false, description: `No description.` },
      { name: 'no_rect', type: 'boolean', required: false, description: `No description.` },
      { name: 'options', type: 'string', required: false, description: `No description.` },
      { name: 'parent_id', type: 'string', required: false, description: `No description.` },
      {
        name: 'transformation_prompt',
        type: 'string',
        required: false,
        description: `No description.`,
      },
    ],
  },
  {
    name: 'affindamcp_create_field_group',
    description: `Create a field group (heading/section) on a document type.`,
    params: [
      { name: 'document_type_id', type: 'string', required: true, description: `No description.` },
      { name: 'label', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_create_integration',
    description: `Create a new, empty integration in an organization.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'organization_id', type: 'string', required: true, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_create_matching_criterion',
    description: `Add a matching criterion to a field with an attached data source.`,
    params: [
      {
        name: 'data_source_property',
        type: 'string',
        required: true,
        description: `No description.`,
      },
      { name: 'field_id', type: 'string', required: true, description: `No description.` },
      { name: 'source_field_id', type: 'string', required: true, description: `No description.` },
      { name: 'field_attribute', type: 'string', required: false, description: `No description.` },
      { name: 'match_type', type: 'string', required: false, description: `No description.` },
      { name: 'required', type: 'boolean', required: false, description: `No description.` },
      { name: 'required_strict', type: 'boolean', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_create_recruit_workspace',
    description: `Create a fully-configured Recruitment workspace in one call.`,
    params: [
      { name: 'organization_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_create_validation_rule',
    description: `Create a validation rule for a document type.`,
    params: [
      { name: 'document_type_id', type: 'string', required: true, description: `No description.` },
      { name: 'prompt', type: 'string', required: true, description: `No description.` },
      { name: 'enabled', type: 'boolean', required: false, description: `No description.` },
      { name: 'field_ids', type: 'string', required: false, description: `No description.` },
      {
        name: 'missing_data_option',
        type: 'string',
        required: false,
        description: `No description.`,
      },
    ],
  },
  {
    name: 'affindamcp_create_validation_run',
    description: `Run a validation rule against a document and refresh its results.`,
    params: [
      {
        name: 'validation_rule_id',
        type: 'string',
        required: true,
        description: `No description.`,
      },
      { name: 'document_id', type: 'string', required: false, description: `No description.` },
      { name: 'document_type_id', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_create_workspace',
    description: `Create a new workspace with chosen processing settings.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'organization_id', type: 'string', required: true, description: `No description.` },
      {
        name: 'document_splitter_id',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      {
        name: 'enable_document_classification',
        type: 'boolean',
        required: false,
        description: `No description.`,
      },
      {
        name: 'enable_document_splitting',
        type: 'boolean',
        required: false,
        description: `No description.`,
      },
      {
        name: 'model_memory_strategy',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'ocr_mode', type: 'string', required: false, description: `No description.` },
      {
        name: 'reject_duplicates',
        type: 'boolean',
        required: false,
        description: `No description.`,
      },
      { name: 'visibility', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_delete_data_source',
    description: `Delete a data source and every row it contains.`,
    params: [
      { name: 'data_source_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_delete_data_source_value',
    description: `Delete one row from a data source by its key.`,
    params: [
      { name: 'data_source_id', type: 'string', required: true, description: `No description.` },
      { name: 'key', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_delete_document_type',
    description: `Delete a document type permanently.`,
    params: [
      { name: 'document_type_id', type: 'string', required: true, description: `No description.` },
      {
        name: 'delete_documents',
        type: 'boolean',
        required: false,
        description: `No description.`,
      },
    ],
  },
  {
    name: 'affindamcp_delete_field',
    description: `Delete a single field from a document type.`,
    params: [{ name: 'field_id', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'affindamcp_delete_field_group',
    description: `Delete a field group (heading/section) from a document type.`,
    params: [
      { name: 'field_group_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_delete_integration',
    description: `Permanently delete an integration.`,
    params: [
      { name: 'integration_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_delete_integration_secret',
    description: `Permanently delete a secret. Removes both the database record and the
Lambda environment variable.`,
    params: [{ name: 'secret_id', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'affindamcp_delete_matching_criterion',
    description: `Delete a matching criterion from a field.`,
    params: [
      {
        name: 'matching_criterion_id',
        type: 'string',
        required: true,
        description: `No description.`,
      },
    ],
  },
  {
    name: 'affindamcp_delete_validation_rule',
    description: `Delete a validation rule from a document type.`,
    params: [
      {
        name: 'validation_rule_id',
        type: 'string',
        required: true,
        description: `No description.`,
      },
    ],
  },
  {
    name: 'affindamcp_deploy_integration_version',
    description: `Snapshot the integration's current code as a new version and deploy it.

Call this immediately after every successful \`\`update_integration\`\`
that changed \`\`python_code\`\` â it MUST be the next tool call. Code
saved on the integration is not live until deployed, and
\`\`run_integration\`\` always executes the deployed version, so skipping
this step means tests run stale code and real document events still
fire the previous version.

To roll back a bad deploy, use \`\`revert_integration_version\`\` wi...`,
    params: [
      { name: 'integration_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_get_data_source',
    description: `Get one data source by ID â name, schema, and key/display properties.`,
    params: [
      { name: 'data_source_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_get_document',
    description: `Get one document by ID â state, workspace, document type, and basic metadata.`,
    params: [
      { name: 'document_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_get_document_extraction',
    description: `Get the extracted data for one document â raw text plus all field values.`,
    params: [
      { name: 'document_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_get_document_type',
    description: `Get one document type by ID â name, organization, and counts only.`,
    params: [
      { name: 'document_type_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_get_document_type_details',
    description: `Get a document type's full configuration â settings + counts.`,
    params: [
      { name: 'document_type_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_get_field',
    description: `Get one field by ID â full settings, formatter, and relationships.`,
    params: [{ name: 'field_id', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'affindamcp_get_field_group',
    description: `Get one field group by ID â label, position, parent document type.`,
    params: [
      { name: 'field_group_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_get_integration',
    description: `Get one integration by ID â full configuration, code, and connections.`,
    params: [
      { name: 'integration_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_get_integration_run',
    description: `Get one integration run by ID â full, untruncated logs and output.`,
    params: [
      {
        name: 'integration_run_id',
        type: 'string',
        required: true,
        description: `No description.`,
      },
    ],
  },
  {
    name: 'affindamcp_get_usage',
    description: `Get daily credits consumption for an organization over a date range.`,
    params: [
      { name: 'organization_id', type: 'string', required: true, description: `No description.` },
      { name: 'document_type_id', type: 'string', required: false, description: `No description.` },
      { name: 'end_date', type: 'string', required: false, description: `No description.` },
      { name: 'start_date', type: 'string', required: false, description: `No description.` },
      { name: 'workspace_id', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_get_validation_rule',
    description: `Get one validation rule by ID â prompt, enabled, fields, missing-data option.`,
    params: [
      {
        name: 'validation_rule_id',
        type: 'string',
        required: true,
        description: `No description.`,
      },
    ],
  },
  {
    name: 'affindamcp_get_workspace',
    description: `Get one workspace by ID â name, organization, and document counts only.`,
    params: [
      { name: 'workspace_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_get_workspace_details',
    description: `Get a workspace's full configuration â settings + counts.`,
    params: [
      { name: 'workspace_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_list_data_source_values',
    description: `List the rows (records) stored in a data source.`,
    params: [
      { name: 'data_source_id', type: 'string', required: true, description: `No description.` },
      { name: 'limit', type: 'integer', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_list_data_sources',
    description: `List data sources (lookup tables) defined on an organization.`,
    params: [
      { name: 'organization_id', type: 'string', required: true, description: `No description.` },
      { name: 'limit', type: 'integer', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_list_document_splitters',
    description: `List document splitters available to an organization.`,
    params: [
      { name: 'organization_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_list_document_types',
    description: `List document types in an organization.`,
    params: [
      { name: 'organization_id', type: 'string', required: true, description: `No description.` },
      { name: 'limit', type: 'integer', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_list_documents',
    description: `List documents in a workspace with their state and basic metadata.`,
    params: [
      { name: 'workspace_id', type: 'string', required: true, description: `No description.` },
      { name: 'limit', type: 'integer', required: false, description: `No description.` },
      { name: 'search_text', type: 'string', required: false, description: `No description.` },
      { name: 'state', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_list_fields',
    description: `List a document type's full field schema, grouped by field group.`,
    params: [
      { name: 'document_type_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_list_integration_connections',
    description: `List third-party service connections in an organization.`,
    params: [
      { name: 'organization_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_list_integration_runs',
    description: `List recent runs for an integration, newest first.`,
    params: [
      { name: 'integration_id', type: 'string', required: true, description: `No description.` },
      { name: 'limit', type: 'integer', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_list_integration_secrets',
    description: `List the names of secrets configured for an integration.`,
    params: [
      { name: 'integration_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_list_integration_versions',
    description: `List deployed-version snapshots for an integration, newest first.`,
    params: [
      { name: 'integration_id', type: 'string', required: true, description: `No description.` },
      { name: 'limit', type: 'integer', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_list_integrations',
    description: `List integrations in an organization.`,
    params: [
      { name: 'organization_id', type: 'string', required: true, description: `No description.` },
      { name: 'enabled', type: 'string', required: false, description: `No description.` },
      { name: 'limit', type: 'integer', required: false, description: `No description.` },
      { name: 'workspace_id', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_list_matching_criteria',
    description: `List matching criteria configured on a field.`,
    params: [{ name: 'field_id', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'affindamcp_list_model_memory_documents',
    description: `List the confirmed reference documents currently in a document type's model memory.`,
    params: [
      { name: 'document_type_id', type: 'string', required: true, description: `No description.` },
      { name: 'limit', type: 'integer', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_list_organizations',
    description: `List organizations the current user belongs to.`,
    params: [{ name: 'limit', type: 'integer', required: false, description: `No description.` }],
  },
  {
    name: 'affindamcp_list_pipedream_apps',
    description: `Search the catalogue of Pipedream apps available for new connections.`,
    params: [
      { name: 'search_query', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_list_recent_field_annotations',
    description: `Spot-check how one field is being extracted across recent documents.`,
    params: [
      { name: 'field_id', type: 'string', required: true, description: `No description.` },
      { name: 'filter_by', type: 'string', required: false, description: `No description.` },
      { name: 'limit', type: 'integer', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_list_validation_rules',
    description: `List validation rules attached to a document type.`,
    params: [
      { name: 'document_type_id', type: 'string', required: true, description: `No description.` },
      { name: 'limit', type: 'integer', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_list_workspaces',
    description: `List workspaces in an organization.`,
    params: [
      { name: 'organization_id', type: 'string', required: true, description: `No description.` },
      { name: 'limit', type: 'integer', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_populate_document_type_fields',
    description: `Auto-suggest fields for a document type by analysing sample documents.`,
    params: [
      { name: 'document_ids', type: 'array', required: true, description: `No description.` },
      { name: 'document_type_id', type: 'string', required: true, description: `No description.` },
      { name: 'instructions', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_reassign_document_type',
    description: `Reassign documents to a different document type in the same workspace.`,
    params: [
      { name: 'document_ids', type: 'array', required: true, description: `No description.` },
      { name: 'document_type_id', type: 'string', required: true, description: `No description.` },
      { name: 'reparse', type: 'boolean', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_reject_documents',
    description: `Move documents to \`\`rejected\`\` state.`,
    params: [
      { name: 'document_ids', type: 'array', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_remove_connection_from_integration',
    description: `Detach a service connection from an integration.`,
    params: [
      { name: 'connection_id', type: 'string', required: true, description: `No description.` },
      { name: 'integration_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_revert_integration_version',
    description: `Roll an integration back to a previous version and redeploy it.`,
    params: [
      { name: 'integration_id', type: 'string', required: true, description: `No description.` },
      { name: 'version_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_run_integration',
    description: `Execute an integration against one document as a test run.`,
    params: [
      { name: 'document_id', type: 'string', required: true, description: `No description.` },
      { name: 'integration_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_set_integration_secret',
    description: `Create or update a secret on an integration. The value is stored only as
an environment variable on the Lambda function â never in the database.`,
    params: [
      { name: 'integration_id', type: 'string', required: true, description: `No description.` },
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'value', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_test_connection',
    description: `Verify a service connection's credentials are still valid.`,
    params: [
      { name: 'connection_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_update_data_source',
    description: `Update top-level settings on a data source (name, key, display property).`,
    params: [
      { name: 'data_source_id', type: 'string', required: true, description: `No description.` },
      { name: 'display_property', type: 'string', required: false, description: `No description.` },
      { name: 'key_property', type: 'string', required: false, description: `No description.` },
      { name: 'name', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_update_data_source_value',
    description: `Update one row in a data source by its key â partial merge.`,
    params: [
      { name: 'data_source_id', type: 'string', required: true, description: `No description.` },
      { name: 'key', type: 'string', required: true, description: `No description.` },
      { name: 'value', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_update_document_type',
    description: `Update one or more settings on an existing document type.`,
    params: [
      { name: 'document_type_id', type: 'string', required: true, description: `No description.` },
      {
        name: 'auto_refresh_validation_results',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      {
        name: 'disable_confirmation_if_validation_rules_fail',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'name', type: 'string', required: false, description: `No description.` },
      {
        name: 'show_redact_button',
        type: 'string',
        required: false,
        description: `No description.`,
      },
    ],
  },
  {
    name: 'affindamcp_update_field',
    description: `Update one or more settings on an existing field.`,
    params: [
      { name: 'field_id', type: 'string', required: true, description: `No description.` },
      {
        name: 'auto_confirm_if_validation_rules_pass',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'decimal_places', type: 'string', required: false, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      {
        name: 'display_enum_value',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'display_raw_text', type: 'string', required: false, description: `No description.` },
      { name: 'drop_null', type: 'string', required: false, description: `No description.` },
      { name: 'enabled', type: 'string', required: false, description: `No description.` },
      { name: 'field_group_id', type: 'string', required: false, description: `No description.` },
      { name: 'field_type', type: 'string', required: false, description: `No description.` },
      { name: 'hide_enum_detail', type: 'string', required: false, description: `No description.` },
      { name: 'label', type: 'string', required: false, description: `No description.` },
      { name: 'manual_entry', type: 'string', required: false, description: `No description.` },
      {
        name: 'mapping_data_source_id',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'multiple', type: 'string', required: false, description: `No description.` },
      { name: 'no_rect', type: 'string', required: false, description: `No description.` },
      { name: 'options', type: 'string', required: false, description: `No description.` },
      { name: 'position', type: 'string', required: false, description: `No description.` },
      {
        name: 'return_first_instance_only',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'slug', type: 'string', required: false, description: `No description.` },
      {
        name: 'transformation_prompt',
        type: 'string',
        required: false,
        description: `No description.`,
      },
    ],
  },
  {
    name: 'affindamcp_update_integration',
    description: `Update one or more settings â including code â on an integration.`,
    params: [
      { name: 'integration_id', type: 'string', required: true, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      { name: 'document_type_id', type: 'string', required: false, description: `No description.` },
      { name: 'enabled', type: 'string', required: false, description: `No description.` },
      { name: 'event', type: 'string', required: false, description: `No description.` },
      { name: 'name', type: 'string', required: false, description: `No description.` },
      { name: 'python_code', type: 'string', required: false, description: `No description.` },
      { name: 'workspace_id', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_update_matching_criterion',
    description: `Update settings on an existing matching criterion.`,
    params: [
      {
        name: 'matching_criterion_id',
        type: 'string',
        required: true,
        description: `No description.`,
      },
      {
        name: 'data_source_property',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'field_attribute', type: 'string', required: false, description: `No description.` },
      { name: 'match_type', type: 'string', required: false, description: `No description.` },
      { name: 'required', type: 'string', required: false, description: `No description.` },
      { name: 'required_strict', type: 'string', required: false, description: `No description.` },
      { name: 'source_field_id', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_update_organization',
    description: `Rename an organization.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'organization_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_update_validation_rule',
    description: `Update one or more settings on an existing validation rule.`,
    params: [
      {
        name: 'validation_rule_id',
        type: 'string',
        required: true,
        description: `No description.`,
      },
      { name: 'enabled', type: 'string', required: false, description: `No description.` },
      { name: 'field_ids', type: 'string', required: false, description: `No description.` },
      { name: 'generate_code', type: 'boolean', required: false, description: `No description.` },
      {
        name: 'missing_data_option',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'prompt', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_update_workspace',
    description: `Update one or more settings on an existing workspace.`,
    params: [
      { name: 'workspace_id', type: 'string', required: true, description: `No description.` },
      { name: 'auto_validation', type: 'string', required: false, description: `No description.` },
      {
        name: 'document_splitter_id',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      {
        name: 'enable_document_classification',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      {
        name: 'enable_document_splitting',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      {
        name: 'enable_validation',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      {
        name: 'model_memory_strategy',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'name', type: 'string', required: false, description: `No description.` },
      { name: 'ocr_mode', type: 'string', required: false, description: `No description.` },
      {
        name: 'reject_duplicates',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'visibility', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'affindamcp_wait_for_document_processing',
    description: `Block until every document in a workspace has finished processing.`,
    params: [
      { name: 'workspace_id', type: 'string', required: true, description: `No description.` },
      { name: 'timeout_seconds', type: 'integer', required: false, description: `No description.` },
    ],
  },
]
