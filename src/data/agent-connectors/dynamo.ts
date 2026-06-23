import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'dynamo_bulk_delete',
    description: `Delete multiple entities in Dynamo Software using bulk import.`,
    params: [
      {
        name: 'entityName',
        type: 'string',
        required: true,
        description: `The name of the Dynamo entity whose records will be deleted (e.g., 'contact', 'activity').`,
      },
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `A required array of entity objects to delete. Each object should contain '_id' or the internal ID property for the entity.`,
      },
    ],
  },
  {
    name: 'dynamo_bulk_upsert',
    description: `Create or update multiple entities in Dynamo Software using bulk import.`,
    params: [
      {
        name: 'entityName',
        type: 'string',
        required: true,
        description: `The name of the Dynamo entity to bulk create or update records for (e.g., 'contact', 'activity').`,
      },
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `A required array of entity objects to create or update. Each object should contain the key property values plus any additional fields to set.`,
      },
      {
        name: 'keyProperties',
        type: 'array',
        required: true,
        description: `A required set of property names which combined determine the unique identity of each entity for matching purposes.`,
      },
      {
        name: 'importAction',
        type: 'string',
        required: false,
        description: `Controls the import behavior. Default is 'updateorcreate'. 'create': only creates new records; 'update': only updates existing matches; 'updateorcreate': updates if match found, creates if not.`,
      },
      {
        name: 'skipColumnIfSourceHasNoValue',
        type: 'boolean',
        required: false,
        description: `Default false. When true, blank or null property values in the input are ignored and will not overwrite existing data. When false (default), blank values will clear existing property values.`,
      },
      {
        name: 'skipIfPropertyHasNoValue',
        type: 'boolean',
        required: false,
        description: `Default true. When true, properties not present in a given item will not overwrite existing values for that item. When false, all items must contain the same properties and unspecified values will be overwritten.`,
      },
    ],
  },
  {
    name: 'dynamo_create_document',
    description: `Create a new document or update an existing one based on key columns in Dynamo.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The display title of the document. Required when creating a file upload (x_ishyperlink=false) or a hyperlink (x_ishyperlink=true).`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The document file contents encoded as a base64 string. Required when x_ishyperlink is false (default). Maps to the '_content' field in the API body.`,
      },
      {
        name: 'extension',
        type: 'string',
        required: false,
        description: `The file extension of the document including the dot prefix. Required when x_ishyperlink is false.`,
      },
      {
        name: 'hyperlink',
        type: 'string',
        required: false,
        description: `The URL for a hyperlink document. Required when x_ishyperlink is true. Must be a valid URL.`,
      },
      {
        name: 'x_identifier',
        type: 'boolean',
        required: false,
        description: `When true, the response will include the Identifier property (Name (ID)) for the document. Default is true.`,
      },
      {
        name: 'x_importaction',
        type: 'string',
        required: false,
        description: `Controls the create/update behavior when x_keycolumns is provided. Default is 'updateorcreate'. Only applies when x_keycolumns is also set.`,
      },
      {
        name: 'x_ishyperlink',
        type: 'boolean',
        required: false,
        description: `When set to true, the document is created as a web link (hyperlink) instead of a file upload. Default is false.`,
      },
      {
        name: 'x_keycolumns',
        type: 'string',
        required: false,
        description: `A set of comma-separated column names used to determine the identity of a specific document for upsert. The '_content' column cannot be used as a key column.`,
      },
      {
        name: 'x_keycolumns_encoded',
        type: 'boolean',
        required: false,
        description: `When true, the x_keycolumns value must be provided as a base64-encoded string. Default is false.`,
      },
      {
        name: 'x_resolved',
        type: 'boolean',
        required: false,
        description: `When false, reference properties in the response are returned as objects (with _id and _es) instead of resolved primitive values. Default is true.`,
      },
    ],
  },
  {
    name: 'dynamo_decrypt_property',
    description: `Returns decrypted value of an encrypted property for a given entity record.`,
    params: [
      {
        name: 'entityName',
        type: 'string',
        required: true,
        description: `The name of the Dynamo entity that contains the encrypted property (e.g., 'Contact', 'Activity').`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID/entity key) of the specific entity record whose encrypted property you want to decrypt.`,
      },
      {
        name: 'property',
        type: 'string',
        required: true,
        description: `The name of the encrypted property to decrypt. Must be a property that is configured as encrypted in Dynamo.`,
      },
    ],
  },
  {
    name: 'dynamo_entity_by_id',
    description: `Returns a single instance of a Dynamo entity by its ID with optional column selection and formatting controls.`,
    params: [
      {
        name: 'entityName',
        type: 'string',
        required: true,
        description: `The name of the Dynamo entity type to retrieve a record from (e.g., 'activity', 'contact').`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) of the specific entity record to retrieve.`,
      },
      {
        name: 'x_columns',
        type: 'string',
        required: false,
        description: `Comma-separated list of property names to include in the response. Reduces bandwidth by returning only specified fields.`,
      },
      {
        name: 'x_columns_encoded',
        type: 'boolean',
        required: false,
        description: `When true, the x_columns value must be provided as a base64-encoded string. Default is false.`,
      },
      {
        name: 'x_resolved',
        type: 'boolean',
        required: false,
        description: `When false, reference/lookup properties are returned as raw objects (with _id and _es) instead of resolved display values. Default is true.`,
      },
      {
        name: 'x_showlabels',
        type: 'boolean',
        required: false,
        description: `When true, property keys in the response use display labels instead of internal property names. Default is false.`,
      },
    ],
  },
  {
    name: 'dynamo_entity_delete',
    description: `Deletes a single instance of the specified Dynamo entity by ID.`,
    params: [
      {
        name: 'entityName',
        type: 'string',
        required: true,
        description: `The name of the Dynamo entity type from which to delete the record (e.g., 'activity', 'contact').`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) of the specific entity record to delete.`,
      },
    ],
  },
  {
    name: 'dynamo_entity_extended_schema',
    description: `Returns the extended schema definition of a specified Dynamo entity, including detailed metadata and optional permissions.`,
    params: [
      {
        name: 'entityName',
        type: 'string',
        required: true,
        description: `The name of the Dynamo entity to retrieve the extended schema for (e.g., 'activity', 'contact', 'document').`,
      },
      {
        name: 'permissions',
        type: 'boolean',
        required: false,
        description: `When true, the schema response includes information about the current user's permissions to perform operations on each property. Default is false.`,
      },
    ],
  },
  {
    name: 'dynamo_entity_properties',
    description: `Returns all properties for a specified Dynamo entity.`,
    params: [
      {
        name: 'entityName',
        type: 'string',
        required: true,
        description: `The name of the Dynamo entity whose properties (field list) you want to retrieve.`,
      },
    ],
  },
  {
    name: 'dynamo_entity_put',
    description: `Creates or updates an entity item in Dynamo using PUT semantics. Supports key columns or ID-based upsert via headers or request body.`,
    params: [
      {
        name: 'body',
        type: 'object',
        required: true,
        description: `The entity field values to create or update. Pass a JSON object with the Dynamo property names as keys.`,
      },
      {
        name: 'entityName',
        type: 'string',
        required: true,
        description: `The name of the Dynamo entity type to create or update (e.g., 'activity', 'contact', 'document').`,
      },
      {
        name: 'x_identifier',
        type: 'boolean',
        required: false,
        description: `When true, the response includes the Identifier property (Name (ID)) for the entity. Default is true.`,
      },
      {
        name: 'x_importaction',
        type: 'string',
        required: false,
        description: `Controls the create/update behavior when x_keycolumns is set. Default is 'updateorcreate'. Only applies when x_keycolumns is also provided.`,
      },
      {
        name: 'x_keycolumns',
        type: 'string',
        required: false,
        description: `Comma-separated column names used to determine the identity of a specific entity for upsert matching.`,
      },
      {
        name: 'x_keycolumns_encoded',
        type: 'boolean',
        required: false,
        description: `When true, the x_keycolumns value must be provided as a base64-encoded string. Default is false.`,
      },
      {
        name: 'x_resolved',
        type: 'boolean',
        required: false,
        description: `When false, reference/lookup properties are returned as raw objects (with _id and _es) instead of resolved display values. Default is true.`,
      },
    ],
  },
  {
    name: 'dynamo_entity_schema',
    description: `Returns the schema definition of a specified Dynamo entity.`,
    params: [
      {
        name: 'entityName',
        type: 'string',
        required: true,
        description: `The name of the Dynamo entity whose field schema you want to retrieve (e.g., 'activity', 'contact', 'document').`,
      },
      {
        name: 'permissions',
        type: 'boolean',
        required: false,
        description: `When true, the schema response includes information about the current user's permissions to perform operations on each property. Default is false.`,
      },
    ],
  },
  {
    name: 'dynamo_entity_total',
    description: `Returns total count of items for a given Dynamo entity.`,
    params: [
      {
        name: 'entityName',
        type: 'string',
        required: true,
        description: `The name of the Dynamo entity whose total record count you want to retrieve.`,
      },
    ],
  },
  {
    name: 'dynamo_entity_update_by_id',
    description: `Updates or creates an instance of a Dynamo entity identified by ID and returns the updated item.`,
    params: [
      {
        name: 'body',
        type: 'object',
        required: true,
        description: `Key-value pairs of entity properties to update. Property names must match the entity schema exactly. Example: {"Subject": "Follow-up call", "Body": "Discuss proposal"}`,
      },
      {
        name: 'entityName',
        type: 'string',
        required: true,
        description: `The name of the Dynamo entity type containing the record to update (e.g., 'activity', 'contact').`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) of the specific entity record to update or create.`,
      },
      {
        name: 'x_identifier',
        type: 'boolean',
        required: false,
        description: `When true, the response includes the Identifier property (Name (ID)) for the entity. Default is true.`,
      },
      {
        name: 'x_resolved',
        type: 'boolean',
        required: false,
        description: `When false, reference/lookup properties in the response are returned as raw objects (with _id and _es) instead of resolved display values. Default is true.`,
      },
    ],
  },
  {
    name: 'dynamo_entity_upsert',
    description: `Creates or updates an entity item in Dynamo. Supports key-based upsert using headers or ID in request body.`,
    params: [
      {
        name: 'body',
        type: 'object',
        required: true,
        description: `JSON object containing the entity field values to create or update. Property names must match Dynamo field names exactly.`,
      },
      {
        name: 'entityName',
        type: 'string',
        required: true,
        description: `The name of the Dynamo entity type to create or update a record for (e.g., 'activity', 'contact').`,
      },
      {
        name: 'x_identifier',
        type: 'boolean',
        required: false,
        description: `When true, the response includes the Identifier property (Name (ID)) for the entity. Default is true.`,
      },
      {
        name: 'x_importaction',
        type: 'string',
        required: false,
        description: `Controls the create/update behavior when x_keycolumns is provided. Default is 'updateorcreate'.`,
      },
      {
        name: 'x_keycolumns',
        type: 'string',
        required: false,
        description: `Comma-separated column names that together uniquely identify an entity for upsert matching.`,
      },
      {
        name: 'x_keycolumns_encoded',
        type: 'boolean',
        required: false,
        description: `When true, the x_keycolumns value must be provided as a base64-encoded string. Default is false.`,
      },
      {
        name: 'x_resolved',
        type: 'boolean',
        required: false,
        description: `When false, reference/lookup properties in the response are returned as raw objects (with _id and _es) instead of resolved display values. Default is true.`,
      },
    ],
  },
  {
    name: 'dynamo_get_document_by_id',
    description: `Returns a single Dynamo document by its unique ID with optional column filtering and formatting controls.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) of the document to retrieve.`,
      },
      {
        name: 'x_columns',
        type: 'string',
        required: false,
        description: `Comma-separated list of property names to include in the response. Reduces bandwidth.`,
      },
      {
        name: 'x_columns_encoded',
        type: 'boolean',
        required: false,
        description: `When true, the x_columns value must be provided as a base64-encoded string. Default is false.`,
      },
      {
        name: 'x_identifier',
        type: 'boolean',
        required: false,
        description: `When true, the response includes the Identifier property (Name (ID)) for the document. Default is true.`,
      },
      {
        name: 'x_resolved',
        type: 'boolean',
        required: false,
        description: `When false, reference/lookup properties are returned as raw objects (with _id and _es) instead of resolved display values. Default is true.`,
      },
      {
        name: 'x_showlabels',
        type: 'boolean',
        required: false,
        description: `When true, property keys in the response use display labels instead of internal property names. Default is false.`,
      },
    ],
  },
  {
    name: 'dynamo_get_document_extended_schema',
    description: `Returns an extended schema of the Dynamo Document entity, including detailed metadata and optional permission information.`,
    params: [
      {
        name: 'permissions',
        type: 'boolean',
        required: false,
        description: `When true, the extended schema response includes information about the current user's permissions to perform operations on each property. Default is false.`,
      },
    ],
  },
  {
    name: 'dynamo_get_document_properties',
    description: `Returns all properties available for the document entity in Dynamo.`,
    params: [],
  },
  {
    name: 'dynamo_get_document_schema',
    description: `Returns the schema definition of the Dynamo document entity, optionally including permission metadata.`,
    params: [
      {
        name: 'permissions',
        type: 'boolean',
        required: false,
        description: `When true, the schema response includes information about the current user's permissions to perform operations on each document property. Default is false.`,
      },
    ],
  },
  {
    name: 'dynamo_get_document_upload_restrictions',
    description: `Returns upload restrictions for Dynamo Document entity such as size limits, allowed types, and validation rules.`,
    params: [],
  },
  {
    name: 'dynamo_get_documents',
    description: `Retrieve documents from Dynamo with filters, sorting, pagination.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Optional document UUID. When provided, the response contains only the document matching this ID.`,
      },
      {
        name: 'x_columns',
        type: 'string',
        required: false,
        description: `Comma-separated list of property names to include in the response. Reduces bandwidth by returning only specified fields.`,
      },
      {
        name: 'x_columns_encoded',
        type: 'boolean',
        required: false,
        description: `When true, the x_columns value must be provided as a base64-encoded string. Default is false.`,
      },
      {
        name: 'x_resolved',
        type: 'boolean',
        required: false,
        description: `When false, reference/lookup properties are returned as raw objects (with _id and _es) instead of resolved display values. Default is true.`,
      },
      {
        name: 'x_showlabels',
        type: 'boolean',
        required: false,
        description: `When true, property keys in the response use display labels instead of internal property names. Default is false.`,
      },
      {
        name: 'x_sort',
        type: 'string',
        required: false,
        description: `Sorting expression for the returned documents. Supports single or multiple property sort with direction.`,
      },
      {
        name: 'x_sort_encoded',
        type: 'boolean',
        required: false,
        description: `When true, the x_sort value must be provided as a base64-encoded string. Default is false.`,
      },
    ],
  },
  {
    name: 'dynamo_get_documents_total',
    description: `Returns the total number of document entities in Dynamo.`,
    params: [],
  },
  {
    name: 'dynamo_get_entities',
    description: `Returns all available Dynamo entities with optional filtering support.`,
    params: [
      {
        name: 'x_filter',
        type: 'string',
        required: false,
        description: `Filter entities whose properties match the given criteria. Format: propertyA=value1, propertyB=value2.`,
      },
    ],
  },
  {
    name: 'dynamo_get_entity_items',
    description: `Returns all items for a given Dynamo entity with support for filtering, pagination, sorting, and column selection.`,
    params: [
      {
        name: 'entityName',
        type: 'string',
        required: true,
        description: `The name of the Dynamo entity type to retrieve records from (e.g., 'activity', 'contact', 'document').`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Optional UUID to filter to a single entity record. When provided, only the record matching this ID is returned.`,
      },
      {
        name: 'x_columns',
        type: 'string',
        required: false,
        description: `Comma-separated list of property names to include in the response. Reduces bandwidth by returning only specified fields.`,
      },
      {
        name: 'x_columns_encoded',
        type: 'boolean',
        required: false,
        description: `When true, the x_columns value must be provided as a base64-encoded string. Default is false.`,
      },
      {
        name: 'x_resolved',
        type: 'boolean',
        required: false,
        description: `When false, reference/lookup properties are returned as raw objects (with _id and _es) instead of resolved display values. Default is true.`,
      },
      {
        name: 'x_showlabels',
        type: 'boolean',
        required: false,
        description: `When true, property keys in the response use display labels instead of internal property names. Default is false.`,
      },
      {
        name: 'x_sort',
        type: 'string',
        required: false,
        description: `Sorting expression for the returned records. Supports single or multiple property sort with direction.`,
      },
      {
        name: 'x_sort_encoded',
        type: 'boolean',
        required: false,
        description: `When true, the x_sort value must be provided as a base64-encoded string. Default is false.`,
      },
    ],
  },
  {
    name: 'dynamo_get_entity_schema',
    description: `Returns a brief schema for all available Dynamo entities with optional filtering, permission details, and extended metadata.`,
    params: [
      {
        name: 'full',
        type: 'boolean',
        required: false,
        description: `When true, returns the complete schema containing all properties that can be passed to the x-filter parameter. Default is false.`,
      },
      {
        name: 'permissions',
        type: 'boolean',
        required: false,
        description: `When true, each entity schema includes the current user's permissions to perform operations on that entity. Default is false.`,
      },
      {
        name: 'showConfirmDelete',
        type: 'boolean',
        required: false,
        description: `When true, the schema response includes the showConfirmDelete property for each entity. Default is false.`,
      },
      {
        name: 'showSubtitle',
        type: 'boolean',
        required: false,
        description: `When true, the schema response includes the Subtitle property name for each entity. Default is false.`,
      },
      {
        name: 'x_filter',
        type: 'string',
        required: false,
        description: `Filters entities whose properties match the given schema criteria. Format: propertyA=value1, propertyB=value2.`,
      },
    ],
  },
  {
    name: 'dynamo_reset_api_key',
    description: `Removes the user's API key from the server cache. The key remains valid but will be revalidated on next request.`,
    params: [],
  },
  {
    name: 'dynamo_search',
    description: `Retrieves data matching saved search criteria from Dynamo using advanced filter queries.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `JSON-formatted advanced search query in Dynamo's 'advf' format. Copy this from the Dynamo site's advanced search panel using the 'API Query' button.`,
      },
      {
        name: 'all',
        type: 'boolean',
        required: false,
        description: `When true, returns all matching results across all pages instead of only the first page. Use with caution for large result sets.`,
      },
      {
        name: 'utcOffset',
        type: 'number',
        required: false,
        description: `The difference in hours from Coordinated Universal Time (UTC) to use for date/time calculations in the search. Default is 0 (UTC).`,
      },
      {
        name: 'x_columns',
        type: 'string',
        required: false,
        description: `Comma-separated list of property names to include in each result. Reduces bandwidth.`,
      },
      {
        name: 'x_columns_encoded',
        type: 'boolean',
        required: false,
        description: `When true, the x_columns value must be provided as a base64-encoded string. Default is false.`,
      },
      {
        name: 'x_resolved',
        type: 'boolean',
        required: false,
        description: `When false, reference/lookup properties are returned as raw objects (with _id and _es) instead of resolved display values. Default is true.`,
      },
      {
        name: 'x_showlabels',
        type: 'boolean',
        required: false,
        description: `When true, property keys in the response use display labels instead of internal property names. Default is false.`,
      },
      {
        name: 'x_sort',
        type: 'string',
        required: false,
        description: `Sorting expression for the search results. Supports single or multiple property sort.`,
      },
      {
        name: 'x_sort_encoded',
        type: 'boolean',
        required: false,
        description: `When true, the x_sort value must be provided as a base64-encoded string. Default is false.`,
      },
    ],
  },
  {
    name: 'dynamo_update_document',
    description: `Creates a new version of a Dynamo document by updating it using its ID. Optionally updates title or creates hyperlink versions.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID) of the document to update.`,
      },
      {
        name: '_content',
        type: 'string',
        required: false,
        description: `The new document file content encoded as a base64 string. Providing this creates a new version of the document.`,
      },
      {
        name: 'hyperlink',
        type: 'string',
        required: false,
        description: `The URL for a hyperlink document. Required when x-ishyperlink is true. Must be a valid URL.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Optional new title for the document. When updated, the title change applies to ALL versions of the document, not just the current version.`,
      },
      {
        name: 'x-identifier',
        type: 'boolean',
        required: false,
        description: `When true, the response includes the Identifier property (Name (ID)) for the document. Default is true.`,
      },
      {
        name: 'x-ishyperlink',
        type: 'boolean',
        required: false,
        description: `When true, indicates that the document being updated is a hyperlink (URL) rather than a file. Default is false.`,
      },
      {
        name: 'x-resolved',
        type: 'boolean',
        required: false,
        description: `When false, reference/lookup properties in the response are returned as raw objects (with _id and _es) instead of resolved display values. Default is true.`,
      },
    ],
  },
  {
    name: 'dynamo_upsert_document',
    description: `Create or update a document in Dynamo using key columns via PUT operation.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The display title of the document. Required for all document types (file or hyperlink).`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The document file contents encoded as a base64 string. Required when x_ishyperlink is false. Maps to '_content' in the API body.`,
      },
      {
        name: 'extension',
        type: 'string',
        required: false,
        description: `The file extension including the dot prefix. Required when x_ishyperlink is false.`,
      },
      {
        name: 'hyperlink',
        type: 'string',
        required: false,
        description: `The URL for a hyperlink document. Required when x_ishyperlink is true. Must be a valid URL.`,
      },
      {
        name: 'x_identifier',
        type: 'boolean',
        required: false,
        description: `When true, the response includes the Identifier property (Name (ID)) for the document. Default is true.`,
      },
      {
        name: 'x_importaction',
        type: 'string',
        required: false,
        description: `Controls the create/update behavior when x_keycolumns is provided. Default is 'updateorcreate'.`,
      },
      {
        name: 'x_ishyperlink',
        type: 'boolean',
        required: false,
        description: `When true, the document is created/updated as a web hyperlink instead of a file upload. Default is false.`,
      },
      {
        name: 'x_keycolumns',
        type: 'string',
        required: false,
        description: `Comma-separated column names used to determine the identity of a specific document for upsert matching. The '_content' column cannot be used as a key column.`,
      },
      {
        name: 'x_keycolumns_encoded',
        type: 'boolean',
        required: false,
        description: `When true, the x_keycolumns value must be provided as a base64-encoded string. Default is false.`,
      },
      {
        name: 'x_resolved',
        type: 'boolean',
        required: false,
        description: `When false, reference/lookup properties in the response are returned as raw objects (with _id and _es) instead of resolved display values. Default is true.`,
      },
    ],
  },
  {
    name: 'dynamo_view_get',
    description: `Returns available views or items from a specified view with optional filtering, sorting, and column selection.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `The path identifier of the view. If provided, returns all items matching that view's search criteria. If omitted, returns a list of all available views.`,
      },
      {
        name: 'utcOffset',
        type: 'number',
        required: false,
        description: `The difference in hours from Coordinated Universal Time (UTC) for date/time calculations. Default is 0 (UTC).`,
      },
      {
        name: 'x_columns',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional property names to include in the response alongside the view's default columns.`,
      },
      {
        name: 'x_columns_encoded',
        type: 'boolean',
        required: false,
        description: `When true, the x_columns value must be provided as a base64-encoded string. Default is false.`,
      },
      {
        name: 'x_resolved',
        type: 'boolean',
        required: false,
        description: `When false, reference/lookup properties are returned as raw objects (with _id and _es) instead of resolved display values. Default is true.`,
      },
      {
        name: 'x_showlabels',
        type: 'boolean',
        required: false,
        description: `When true, property keys in the response use display labels instead of internal property names. Default is false.`,
      },
      {
        name: 'x_sort',
        type: 'string',
        required: false,
        description: `Sort expression that overrides the view's default sorting with higher priority.`,
      },
      {
        name: 'x_sort_encoded',
        type: 'boolean',
        required: false,
        description: `When true, the x_sort value must be provided as a base64-encoded string. Default is false.`,
      },
    ],
  },
  {
    name: 'dynamo_view_post',
    description: `Retrieves items from a specified Dynamo view using optional filters and query rules.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The path identifier of the view to search. Required. Combined with optional filter rules in the request body to retrieve matching items.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `JSON string representing additional filter rules to apply on top of the view's built-in search criteria. If omitted, only the view's default criteria are used.`,
      },
      {
        name: 'utcOffset',
        type: 'number',
        required: false,
        description: `The difference in hours from Coordinated Universal Time (UTC) for date/time calculations. Default is 0 (UTC).`,
      },
      {
        name: 'x_columns',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional property names to include in the response alongside the view's default columns.`,
      },
      {
        name: 'x_columns_encoded',
        type: 'boolean',
        required: false,
        description: `When true, the x_columns value must be provided as a base64-encoded string. Default is false.`,
      },
      {
        name: 'x_resolved',
        type: 'boolean',
        required: false,
        description: `When false, reference/lookup properties are returned as raw objects (with _id and _es) instead of resolved display values. Default is true.`,
      },
      {
        name: 'x_showlabels',
        type: 'boolean',
        required: false,
        description: `When true, property keys in the response use display labels instead of internal property names. Default is false.`,
      },
      {
        name: 'x_sort',
        type: 'string',
        required: false,
        description: `Sort expression that overrides the view's default sorting with higher priority.`,
      },
      {
        name: 'x_sort_encoded',
        type: 'boolean',
        required: false,
        description: `When true, the x_sort value must be provided as a base64-encoded string. Default is false.`,
      },
    ],
  },
  {
    name: 'dynamo_view_sql',
    description: `Returns a list of available SQL views from Dynamo.`,
    params: [],
  },
  {
    name: 'dynamo_view_sql_get_by_name',
    description: `Returns data from a specific SQL view in Dynamo using the view name.`,
    params: [
      {
        name: 'viewName',
        type: 'string',
        required: true,
        description: `The name of the SQL view to retrieve, without the 'EXPORTSQL_' prefix. The API appends this prefix automatically when calling GET /api/v2.2/View/sql/EXPORTSQL_{viewName}.`,
      },
    ],
  },
  {
    name: 'dynamo_view_sql_sp_execute',
    description: `Executes a SQL stored procedure in Dynamo and returns the result.`,
    params: [
      {
        name: 'spName',
        type: 'string',
        required: true,
        description: `The name of the SQL stored procedure to execute, without the 'EXPORTSQLSP_' prefix. The API prepends this prefix automatically when calling POST /api/v2.2/View/sql/EXPORTSQLSP_{spName}.`,
      },
      {
        name: 'parameters',
        type: 'object',
        required: false,
        description: `Optional JSON object containing named parameters to pass to the stored procedure. The object's keys and values depend on the specific stored procedure's parameter requirements.`,
      },
    ],
  },
  {
    name: 'dynamo_workflow_action_button',
    description: `Triggers a workflow action button operation on a specific entity record in Dynamo.`,
    params: [
      {
        name: 'entity',
        type: 'string',
        required: true,
        description: `The display name of the Dynamo entity type that contains the action button. Must match the entity name as configured in Dynamo.`,
      },
      {
        name: 'entity_key',
        type: 'string',
        required: true,
        description: `The UUID of the specific entity record on which the action button workflow will be triggered.`,
      },
      {
        name: 'property',
        type: 'string',
        required: true,
        description: `The name of the action button property on the entity that maps to the workflow to trigger.`,
      },
    ],
  },
  {
    name: 'dynamo_workflow_custom_operation',
    description: `Triggers a custom workflow operation in Dynamo by operation name with optional parameters.`,
    params: [
      {
        name: 'operation',
        type: 'string',
        required: true,
        description: `The name of the custom workflow operation to trigger. Used as the last segment of the URL: POST /api/v2.2/Workflow/CustomOperation/{operation}.`,
      },
      {
        name: 'parameters',
        type: 'object',
        required: false,
        description: `Optional JSON object containing named parameters to pass to the custom workflow operation. The keys and values depend on what the specific operation expects.`,
      },
    ],
  },
  {
    name: 'dynamo_workflow_schedule',
    description: `Triggers all workflows defined to run on a specific schedule by schedule ID in Dynamo.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The UUID of the Dynamo workflow schedule to trigger. All workflows associated with this schedule will be executed immediately, as if the schedule's configured time had been reached.`,
      },
    ],
  },
]
