import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'sanitymcp__get_ui_context',
    description: `Get the current UI context including the active document and workspace in Sanity Studio.`,
    params: [
      { name: 'resource', type: 'object', required: true, description: `No description.` },
      {
        name: 'documentId',
        type: 'string',
        required: false,
        description: `Sanity document ID (e.g. drafts.abc123 for drafts, or bare ID for published).`,
      },
      {
        name: 'documentType',
        type: 'string',
        required: false,
        description: `Schema type name of the document.`,
      },
      {
        name: 'maxRefDepth',
        type: 'integer',
        required: false,
        description: `Maximum reference depth to follow when resolving document references.`,
      },
      {
        name: 'workspaceName',
        type: 'string',
        required: false,
        description: `Sanity workspace name. Defaults to the default workspace.`,
      },
    ],
  },
  {
    name: 'sanitymcp_add_cors_origin',
    description: `Add a CORS origin to allow browser-based API access for a Sanity project.`,
    params: [
      {
        name: 'origin',
        type: 'string',
        required: true,
        description: `CORS origin URL to allow (e.g. https://myapp.com).`,
      },
      { name: 'resource', type: 'object', required: true, description: `No description.` },
      {
        name: 'allowCredentials',
        type: 'boolean',
        required: false,
        description: `Whether to allow credentials (cookies) from this CORS origin.`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_cors_origins_delete',
    description: `Deletes a CORS origin from a Sanity project.`,
    params: [
      {
        name: 'origin',
        type: 'string',
        required: true,
        description: `CORS origin to delete, in format protocol://hostname[:port]. Must be an exact match.`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_cors_origins_list',
    description: `Lists all CORS origins configured for a Sanity project.`,
    params: [
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_create_dataset',
    description: `Create a new dataset in a Sanity project with the specified access control mode.`,
    params: [
      {
        name: 'datasetName',
        type: 'string',
        required: true,
        description: `Name of the Sanity dataset.`,
      },
      { name: 'resource', type: 'object', required: true, description: `No description.` },
      {
        name: 'aclMode',
        type: 'string',
        required: false,
        description: `Dataset access control mode: public or private.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Human-readable description.`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_create_documents',
    description: `Create one or more draft documents by directly providing structured content. Creates drafts (drafts.* prefix) unless releaseId is specified for version creation.`,
    params: [
      {
        name: 'documents',
        type: 'array',
        required: true,
        description: `Array of documents to create. Each document must have a type and content, with every document field inside content. Prefer Sanity-generated _id values by omitting _id from content unless a stable custom document ID is required.`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
      {
        name: 'releaseId',
        type: 'string',
        required: false,
        description: `Optional release ID for creating versioned documents. If provided, documents will be created under the specified release version instead of as drafts.`,
      },
      {
        name: 'workspaceName',
        type: 'string',
        required: false,
        description: `Workspace name as returned by \`list_workspace_schemas\`. Not a document type. Defaults to "default".`,
      },
    ],
  },
  {
    name: 'sanitymcp_create_documents_from_json',
    description: `Create one or more Sanity documents from a JSON array of document objects.`,
    params: [
      {
        name: 'documents',
        type: 'array',
        required: true,
        description: `Array of documents to create. Each document must have a type and content.`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
      {
        name: 'releaseId',
        type: 'string',
        required: false,
        description: `ID of the release to target.`,
      },
      {
        name: 'workspaceName',
        type: 'string',
        required: false,
        description: `Sanity workspace name. Defaults to the default workspace.`,
      },
    ],
  },
  {
    name: 'sanitymcp_create_documents_from_markdown',
    description: `Create one or more Sanity documents from Markdown content.`,
    params: [
      {
        name: 'documents',
        type: 'array',
        required: true,
        description: `Array of documents to create. Each document must have a type and Markdown content.`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
      {
        name: 'releaseId',
        type: 'string',
        required: false,
        description: `ID of the release to target.`,
      },
      {
        name: 'workspaceName',
        type: 'string',
        required: false,
        description: `Sanity workspace name. Defaults to the default workspace.`,
      },
    ],
  },
  {
    name: 'sanitymcp_create_project',
    description: `Create a new Sanity project with optional CORS origin and organization.`,
    params: [
      {
        name: 'displayName',
        type: 'string',
        required: true,
        description: `Display name for the Sanity project.`,
      },
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `Sanity organization ID to create the project under.`,
      },
      {
        name: 'allowCredentials',
        type: 'boolean',
        required: false,
        description: `Whether to allow credentials (cookies) from this CORS origin.`,
      },
      {
        name: 'corsOrigin',
        type: 'string',
        required: false,
        description: `CORS origin URL for the new project.`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_create_release',
    description: `Create a new content release for scheduling or grouping document publications.`,
    params: [
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      { name: 'title', type: 'string', required: true, description: `Title of the release.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Human-readable description.`,
      },
      {
        name: 'intendedPublishAt',
        type: 'string',
        required: false,
        description: `ISO 8601 datetime when the release is scheduled to publish.`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
      {
        name: 'releaseId',
        type: 'string',
        required: false,
        description: `Optional release ID, if omitted one is generated.`,
      },
      {
        name: 'releaseType',
        type: 'string',
        required: false,
        description: `Type of release: scheduled, immediate, or undecided.`,
      },
    ],
  },
  {
    name: 'sanitymcp_create_version',
    description: `Create versioned copies of documents and associate them with a release.`,
    params: [
      {
        name: 'documentIds',
        type: 'array',
        required: true,
        description: `Array of document IDs to create versions for (min 1, max 10)`,
      },
      {
        name: 'releaseId',
        type: 'string',
        required: true,
        description: `ID of the release to target.`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_dataset_assets_upload',
    description: `Provide local Sanity CLI guidance for uploading an image or file asset to a Content Lake dataset. This tool does not read or upload the file.`,
    params: [
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_deploy_schema',
    description: `Deploy a schema declaration to a Sanity project workspace.`,
    params: [
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'schemaDeclaration',
        type: 'string',
        required: true,
        description: `Sanity schema configuration declaration string.`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
      {
        name: 'workspaceName',
        type: 'string',
        required: false,
        description: `Sanity workspace name. Defaults to the default workspace.`,
      },
    ],
  },
  {
    name: 'sanitymcp_deploy_studio',
    description: `Deploy a Sanity Studio to a hosted app subdomain.`,
    params: [
      {
        name: 'appHost',
        type: 'string',
        required: true,
        description: `Subdomain hostname for the deployed Sanity Studio.`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Human-facing title shown in Studio navigation.`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
      {
        name: 'workspaceName',
        type: 'string',
        required: false,
        description: `Sanity workspace name. Defaults to the default workspace.`,
      },
    ],
  },
  {
    name: 'sanitymcp_discard_drafts',
    description: `Discard draft versions of one or more documents.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `Document IDs to discard drafts for`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_generate_image',
    description: `Generate an image for a document field using an AI instruction.`,
    params: [
      {
        name: 'documentId',
        type: 'string',
        required: true,
        description: `Sanity document ID (e.g. drafts.abc123 for drafts, or bare ID for published).`,
      },
      {
        name: 'imagePath',
        type: 'string',
        required: true,
        description: `Path to the image field within the document.`,
      },
      {
        name: 'instruction',
        type: 'string',
        required: true,
        description: `Natural language instruction for the image transformation.`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
      {
        name: 'workspaceName',
        type: 'string',
        required: false,
        description: `Sanity workspace name. Defaults to the default workspace.`,
      },
    ],
  },
  {
    name: 'sanitymcp_get_document',
    description: `Retrieve a single Sanity document by its ID.`,
    params: [
      {
        name: 'documentId',
        type: 'string',
        required: true,
        description: `Sanity document ID (e.g. drafts.abc123 for drafts, or bare ID for published).`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_get_project_studios',
    description: `List all Sanity Studios deployed for a project.`,
    params: [
      { name: 'resource', type: 'object', required: true, description: `No description.` },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_get_sanity_rules',
    description: `Load one or more Sanity content rules by name.`,
    params: [
      {
        name: 'rules',
        type: 'array',
        required: true,
        description: `One or more rule names to load. Use list_sanity_rules to see available rules.`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_get_schema',
    description: `Retrieve the schema for a specific document type in a workspace.`,
    params: [
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
      {
        name: 'schemaId',
        type: 'string',
        required: false,
        description: `Optional exact schema ID returned by list_workspace_schemas. Use this to inspect a specific source when multiple deployments share a workspace name.`,
      },
      { name: 'type', type: 'string', required: false, description: `Document schema type name.` },
      {
        name: 'workspaceName',
        type: 'string',
        required: false,
        description: `Sanity workspace name. Defaults to the default workspace.`,
      },
    ],
  },
  {
    name: 'sanitymcp_give_sanity_feedback',
    description: `Submit feedback about Sanity when you encounter issues while working with a Sanity codebase or project.
Use this when:
- A Sanity MCP tool returned an unexpected error or confusing result
- You needed a Sanity capability that doesn't exist or is hard to use
- Sanity docs, MCP tool descriptions, or examples were unclear or incorrect
- Common Sanity surfaces such as @sanity/client, the HTTP API, schemas, Studio, or deployment were confusing or blocked progress
- You had to use a workaround for something in Sanity that should be simpler

Provide a specific, detailed message about what you were trying to do,
what happened, and what you expected instead.`,
    params: [
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `Describe the Sanity issue. Include: what you were trying to do, what you tried, and where you got stuck. Be specific — include MCP tool names, Sanity surface names such as @sanity/client, HTTP API, docs, Studio, or schemas, error messages, and parameter values when relevant.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Category of feedback to help with triage.`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: false,
        description: `The Sanity project ID this feedback relates to, if any. Leave unset for general feedback not tied to a specific project.`,
      },
      {
        name: 'severity',
        type: 'string',
        required: false,
        description: `How much this blocked progress. high = completely blocked, medium = workaround needed, low = minor.`,
      },
      {
        name: 'toolName',
        type: 'string',
        required: false,
        description: `The MCP tool this feedback is about, if any (e.g. "query_documents"). Leave unset for general Sanity feedback.`,
      },
    ],
  },
  {
    name: 'sanitymcp_list_datasets',
    description: `List all datasets in a Sanity project.`,
    params: [
      { name: 'resource', type: 'object', required: true, description: `No description.` },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_list_embeddings_indices',
    description: `List all embeddings indices available in a Sanity project.`,
    params: [
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_list_organizations',
    description: `List all Sanity organizations the authenticated user belongs to.`,
    params: [
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_list_projects',
    description: `List all Sanity projects the authenticated user has access to.`,
    params: [
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_list_releases',
    description: `List content releases for a project with optional state filtering and pagination.`,
    params: [
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of items to skip for pagination.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Filter releases by state: active, archived, or published.`,
      },
    ],
  },
  {
    name: 'sanitymcp_list_sanity_rules',
    description: `List all available Sanity content rule names.`,
    params: [
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_list_workspace_schemas',
    description: `List all schema types defined in a Sanity workspace.`,
    params: [
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_migration_guide',
    description: `Retrieve a Sanity migration guide by name.`,
    params: [
      {
        name: 'guide',
        type: 'string',
        required: true,
        description: `Name of the migration guide to retrieve.`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_patch_document_from_json',
    description: `Apply set, unset, or append patch operations to a document using JSON.`,
    params: [
      {
        name: 'documentId',
        type: 'string',
        required: true,
        description: `Sanity document ID (e.g. drafts.abc123 for drafts, or bare ID for published).`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'append',
        type: 'array',
        required: false,
        description: `Append patch operations: adds items to the end of existing array fields.`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
      {
        name: 'releaseId',
        type: 'string',
        required: false,
        description: `ID of the release to target.`,
      },
      {
        name: 'set',
        type: 'array',
        required: false,
        description: `Set patch operations: replaces field values at the specified document paths.`,
      },
      {
        name: 'unset',
        type: 'array',
        required: false,
        description: `Unset patch operations: removes fields or array items at the specified paths.`,
      },
      {
        name: 'workspaceName',
        type: 'string',
        required: false,
        description: `Sanity workspace name. Defaults to the default workspace.`,
      },
    ],
  },
  {
    name: 'sanitymcp_patch_document_from_markdown',
    description: `Patch a document field with Markdown content converted to Sanity portable text.`,
    params: [
      {
        name: 'documentId',
        type: 'string',
        required: true,
        description: `Sanity document ID (e.g. drafts.abc123 for drafts, or bare ID for published).`,
      },
      {
        name: 'markdown',
        type: 'string',
        required: true,
        description: `Markdown content to patch into the document.`,
      },
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `Document field path to target.`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
      {
        name: 'releaseId',
        type: 'string',
        required: false,
        description: `ID of the release to target.`,
      },
      {
        name: 'workspaceName',
        type: 'string',
        required: false,
        description: `Sanity workspace name. Defaults to the default workspace.`,
      },
    ],
  },
  {
    name: 'sanitymcp_patch_documents',
    description: `Update or edit one or more existing documents by applying precise modifications using @sanity/client patch() operations. Patches for each document are applied as a single transaction (all succeed or all fail). Edits are saved to the draft or release version; published content is never modified directly.`,
    params: [
      {
        name: 'documents',
        type: 'object',
        required: true,
        description: `Map of document IDs to patch operations, up to 25 documents. Accepts published, draft (\`drafts.<id>\`), and version (\`versions.<releaseId>.<id>\`) IDs. Published and draft IDs edit the draft; version IDs edit that release version.`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
      {
        name: 'releaseId',
        type: 'string',
        required: false,
        description: `Optional release ID for patching documents in an existing release.`,
      },
      {
        name: 'workspaceName',
        type: 'string',
        required: false,
        description: `Workspace name as returned by \`list_workspace_schemas\`. Not a document type. Defaults to "default".`,
      },
    ],
  },
  {
    name: 'sanitymcp_publish_documents',
    description: `Publish one or more draft documents to make them publicly visible.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `IDs of the documents to publish`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_query_documents',
    description: `Execute a GROQ query against the Sanity dataset and return matching documents.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `GROQ query string to execute.`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return.`,
      },
      {
        name: 'params',
        type: 'object',
        required: false,
        description: `Optional parameters for the GROQ query`,
      },
      {
        name: 'perspective',
        type: 'string',
        required: false,
        description: `Query perspective: published, previewDrafts, or raw.`,
      },
      {
        name: 'single',
        type: 'boolean',
        required: false,
        description: `Return a single result instead of an array.`,
      },
    ],
  },
  {
    name: 'sanitymcp_read_docs',
    description: `Read a Sanity documentation page by URL or path.`,
    params: [
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `Document field path to target.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `URL of the Sanity documentation page to read.`,
      },
    ],
  },
  {
    name: 'sanitymcp_run_sanity_cli',
    description: `Run a limited subset of Sanity CLI commands and return their output. Use \`--help\` to list available commands or \`<command> --help\` for command details. Commands run without a shell and cannot access the filesystem, prompt for input, run in the background, or change authentication. Dedicated Sanity MCP tools may provide more structured responses, but equivalent CLI commands are also available.`,
    params: [
      {
        name: 'args',
        type: 'string',
        required: true,
        description: `Arguments passed to the Sanity CLI after \`sanity\`, as a single string. Examples: \`--help\`, \`datasets list\`.`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_search_docs',
    description: `Search Sanity documentation by keyword query.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `GROQ query string to execute.`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
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
    name: 'sanitymcp_semantic_search',
    description: `Perform a semantic similarity search against a Sanity embeddings index.`,
    params: [
      {
        name: 'indexName',
        type: 'string',
        required: true,
        description: `Name of the embeddings index to search.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `GROQ query string to execute.`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
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
    name: 'sanitymcp_transform_image',
    description: `Apply an AI transformation to an image field in a Sanity document.`,
    params: [
      {
        name: 'documentId',
        type: 'string',
        required: true,
        description: `Sanity document ID (e.g. drafts.abc123 for drafts, or bare ID for published).`,
      },
      {
        name: 'imagePath',
        type: 'string',
        required: true,
        description: `Path to the image field within the document.`,
      },
      {
        name: 'instruction',
        type: 'string',
        required: true,
        description: `Natural language instruction for the image transformation.`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
      {
        name: 'workspaceName',
        type: 'string',
        required: false,
        description: `Sanity workspace name. Defaults to the default workspace.`,
      },
    ],
  },
  {
    name: 'sanitymcp_unpublish_documents',
    description: `Unpublish one or more documents to revert them to draft state.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `IDs of the documents to unpublish (published document IDs only)`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
      {
        name: 'releaseId',
        type: 'string',
        required: false,
        description: `Optional release ID for scheduling documents to be unpublished when the release runs.`,
      },
    ],
  },
  {
    name: 'sanitymcp_update_dataset',
    description: `Update the access control mode or description of an existing Sanity dataset.`,
    params: [
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'aclMode',
        type: 'string',
        required: false,
        description: `Dataset access control mode: public or private.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Human-readable description.`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_version_discard',
    description: `Discard document versions associated with a release.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `Document IDs to discard from the release`,
      },
      {
        name: 'releaseId',
        type: 'string',
        required: true,
        description: `ID of the release to target.`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_version_replace_document',
    description: `Replace a versioned document with the content of a source document.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Sanity document ID.` },
      {
        name: 'releaseId',
        type: 'string',
        required: true,
        description: `ID of the release to target.`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'sourceDocumentId',
        type: 'string',
        required: true,
        description: `ID of the source document to replace from.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Must be version.replace for this operation.`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_version_unpublish_document',
    description: `Unpublish a versioned document from a release.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Sanity document ID.` },
      {
        name: 'releaseId',
        type: 'string',
        required: true,
        description: `ID of the release to target.`,
      },
      {
        name: 'resource',
        type: 'object',
        required: true,
        description: `Resource information indicating which project ID and dataset to target`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
  {
    name: 'sanitymcp_whoami',
    description: `Get the currently authenticated Sanity user profile.`,
    params: [
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Brief description of what you are trying to accomplish.`,
      },
    ],
  },
]
