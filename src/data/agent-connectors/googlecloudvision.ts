import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googlecloudvision_files_annotate',
    description: `Run Vision API feature detectors — primarily OCR/document text detection — against a single multi-page file (PDF, TIFF, or GIF) in one synchronous call, optionally scoped to up to 5 of its pages.
Returns a responses array with exactly one entry (the API's BatchAnnotateFilesRequest currently accepts only one AnnotateFileRequest per call, despite the plural name); that entry holds per-page detection results (a nested responses array, one entry per processed page) or an error object if the file failed.
Use files_annotate for one file that needs an inline, synchronous result. Use files_async_batch_annotate instead for multiple files, large files, or long-running jobs whose input/output live in Cloud Storage. Use images_annotate instead for standalone raster images (JPEG, PNG, etc.) rather than multi-page documents.`,
    params: [
      {
        name: 'requests',
        type: 'array',
        required: true,
        description: `Array holding exactly one per-file annotation request (BatchAnnotateFilesRequest currently supports only one AnnotateFileRequest per synchronous call, even though this field is an array). The object must include an "inputConfig" field shaped as either {"content": "<base64-encoded file bytes>", "mimeType": "application/pdf"} or {"gcsSource": {"uri": "gs://bucket/file.pdf"}, "mimeType": "application/pdf"}, and a "features" array such as [{"type": "DOCUMENT_TEXT_DETECTION"}]. May optionally include a "pages" array of 1-indexed page numbers (at most 5 pages, or the last 5 pages using negative numbers) to limit which pages are processed; omit to process the file's first 5 pages by default. Example: [{"inputConfig": {"gcsSource": {"uri": "gs://my-bucket/doc.pdf"}, "mimeType": "application/pdf"}, "features": [{"type": "DOCUMENT_TEXT_DETECTION"}], "pages": [1, 2, 3]}]`,
      },
      {
        name: 'labels',
        type: 'object',
        required: false,
        description: `Optional user-defined metadata labels attached to this request, as a flat object of string key-value pairs. Keys/values are limited to 63 characters, lowercase letters, numbers, underscores, and dashes; keys must start with a letter.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: false,
        description: `Optional target project and location to route this call to, in the form "projects/{project-id}/locations/{location-id}". If omitted, Vision chooses a region automatically. Supported location IDs: "us", "asia", "eu".`,
      },
    ],
  },
  {
    name: 'googlecloudvision_files_async_batch_annotate',
    description: `Start an asynchronous, Cloud-Storage-backed batch file annotation job (typically OCR on multi-page PDFs or TIFFs) for files that already live in Cloud Storage. The job runs in the background and writes its results as JSON files to a Cloud Storage destination.
Returns immediately with a longrunning Operation object — {"name": "operations/...", "done": false, ...} — not the annotation results themselves.
Use files_async_batch_annotate for GCS-hosted files needing async OCR at scale. Use files_annotate instead for a handful of files sent inline that need an immediate, synchronous response. Unlike images_async_batch_annotate, outputConfig here is set per request inside each requests[] entry rather than once at the call level, and inputConfig only accepts gcsSource — inline content bytes are not supported on this async file path. Unlike files_annotate, page scoping is not supported here — every page of the file is always processed; do not send a "pages" field.
Files must already reside in Cloud Storage before calling this tool. After starting the job, poll the returned operation name with operations_get until done is true, or list in-flight jobs with operations_list.`,
    params: [
      {
        name: 'requests',
        type: 'array',
        required: true,
        description: `Array of per-file async annotation requests. Each object must include an "inputConfig" shaped as {"gcsSource": {"uri": "gs://bucket/file.pdf"}, "mimeType": "application/pdf"} — inline base64 "content" is NOT supported here, only gcsSource — a "features" array such as [{"type": "DOCUMENT_TEXT_DETECTION"}], and — unlike images_async_batch_annotate — its own "outputConfig" field ({"gcsDestination": {"uri": "gs://bucket/prefix"}, "batchSize": 20}) nested inside this same object rather than set once for the whole call. Do NOT include a "pages" field here — unlike the synchronous files_annotate, this async request type does not support page scoping and Google rejects it with a 400 Unknown-field error; the whole file is always processed. Example: [{"inputConfig": {"gcsSource": {"uri": "gs://my-bucket/doc.pdf"}, "mimeType": "application/pdf"}, "features": [{"type": "DOCUMENT_TEXT_DETECTION"}], "outputConfig": {"gcsDestination": {"uri": "gs://my-bucket/vision-output/"}, "batchSize": 20}}]`,
      },
      {
        name: 'labels',
        type: 'object',
        required: false,
        description: `Optional user-defined metadata labels attached to this request, as a flat object of string key-value pairs. Keys/values are limited to 63 characters, lowercase letters, numbers, underscores, and dashes; keys must start with a letter.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: false,
        description: `Optional target project and location to route this call to, in the form "projects/{project-id}/locations/{location-id}". If omitted, Vision chooses a region automatically. Supported location IDs: "us", "asia", "eu".`,
      },
    ],
  },
  {
    name: 'googlecloudvision_images_annotate',
    description: `Run one or more Vision API feature detectors (labels, text/OCR, faces, landmarks, logos, objects, safe search, image properties, web detection, crop hints, document text) against up to 16 images in a single synchronous call.
Returns a responses array in the same order as the submitted requests; each entry holds the detection results for the requested features (e.g. labelAnnotations, textAnnotations, faceAnnotations) or an error object if that image failed.
Use images_annotate for a small number of images that need an inline, synchronous result. Use images_async_batch_annotate instead for large batches or when results should be written to Cloud Storage. Use files_annotate instead for multi-page documents (PDF/TIFF/GIF) rather than standalone raster images.`,
    params: [
      {
        name: 'requests',
        type: 'array',
        required: true,
        description: `Array of up to 16 per-image annotation requests processed in this single call. Each object must include an "image" field with either {"content": "<base64-encoded image bytes>"} or {"source": {"imageUri": "gs://bucket/file.jpg"}}, and a "features" array such as [{"type": "LABEL_DETECTION", "maxResults": 10}]. May optionally include an "imageContext" object (e.g. languageHints, cropHintsParams, webDetectionParams) scoped to that one image. Example: [{"image": {"source": {"imageUri": "gs://my-bucket/photo.jpg"}}, "features": [{"type": "LABEL_DETECTION", "maxResults": 10}, {"type": "TEXT_DETECTION"}]}]`,
      },
      {
        name: 'labels',
        type: 'object',
        required: false,
        description: `Optional user-defined metadata labels attached to this request, as a flat object of string key-value pairs. Keys/values are limited to 63 characters, lowercase letters, numbers, underscores, and dashes; keys must start with a letter.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: false,
        description: `Optional target project and location to route this call to, in the form "projects/{project-id}/locations/{location-id}". If omitted, Vision chooses a region automatically. Supported location IDs: "us", "asia", "eu".`,
      },
    ],
  },
  {
    name: 'googlecloudvision_images_async_batch_annotate',
    description: `Start an asynchronous, Cloud-Storage-backed batch image annotation job for image sets too large or slow for the synchronous images_annotate call. The job runs in the background and writes its results as JSON files to a Cloud Storage destination shared by the whole batch.
Returns immediately with a longrunning Operation object — {"name": "operations/...", "done": false, ...} — not the annotation results themselves.
Use images_async_batch_annotate for large batches or when output should land in Cloud Storage. Use images_annotate instead for a handful of images that need an inline, synchronous response.
After starting the job, poll the returned operation name with operations_get until done is true, or list in-flight jobs with operations_list.`,
    params: [
      {
        name: 'output_config',
        type: 'object',
        required: true,
        description: `Call-level output destination applied to the entire batch (not set per-request). Must include gcsDestination.uri pointing to a Cloud Storage prefix, and may include batchSize (number of responses written per output JSON file; default 20 if omitted). Example: {"gcsDestination": {"uri": "gs://my-bucket/vision-output/"}, "batchSize": 20}`,
      },
      {
        name: 'requests',
        type: 'array',
        required: true,
        description: `Array of per-image annotation requests for this batch. Each object must include an "image" field with either {"content": "<base64-encoded image bytes>"} or {"source": {"imageUri": "gs://bucket/file.jpg"}}, and a "features" array such as [{"type": "LABEL_DETECTION", "maxResults": 10}]. Do not include outputConfig inside these entries — it is a single call-level field set once via output_config, applying to the whole batch. Example: [{"image": {"source": {"imageUri": "gs://my-bucket/photo.jpg"}}, "features": [{"type": "LABEL_DETECTION"}]}]`,
      },
      {
        name: 'labels',
        type: 'object',
        required: false,
        description: `Optional user-defined metadata labels attached to this request, as a flat object of string key-value pairs. Keys/values are limited to 63 characters, lowercase letters, numbers, underscores, and dashes; keys must start with a letter.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: false,
        description: `Optional target project and location to route this call to, in the form "projects/{project-id}/locations/{location-id}". If omitted, Vision chooses a region automatically. Supported location IDs: "us", "asia", "eu".`,
      },
    ],
  },
  {
    name: 'googlecloudvision_operations_cancel',
    description: `Request best-effort cancellation of an in-progress Google Cloud Vision long-running operation by its full operation name.
Returns an empty object on success. Cancellation is best-effort and not guaranteed to take effect before the operation finishes on its own — poll operations_get afterward to confirm the final state (a successfully cancelled operation reports done: true with a CANCELLED error; the job may also complete normally if cancellation lost the race).
Use operations_cancel to stop a batch job you no longer need. Use operations_delete instead to remove a finished operation's record without affecting anything still running.
Requires an operation name returned by an async-starting call such as images_async_batch_annotate or files_async_batch_annotate.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Full resource name of the long-running operation to cancel, exactly as returned by the call that started it — depending on which call, this may be a bare "operations/{operation_id}", or prefixed with "projects/{project}/" and/or "locations/{location}/". Copy it verbatim — do not strip or reconstruct the prefix.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_operations_delete',
    description: `Delete the record of a completed Google Cloud Vision long-running operation by its full operation name.
Returns an empty object on success. Deleting the operation record does not cancel or otherwise affect any underlying job or the output it already produced (e.g. files already written to Cloud Storage) — it only removes the ability to poll that operation's status via operations_get.
Use operations_delete to clean up finished operations you no longer need to track. Use operations_cancel instead to stop one that is still running — deleting an in-progress operation does not stop it.
Requires an operation name returned by an async-starting call such as images_async_batch_annotate or files_async_batch_annotate.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Full resource name of the long-running operation to delete, exactly as returned by the call that started it — depending on which call, this may be a bare "operations/{operation_id}", or prefixed with "projects/{project}/" and/or "locations/{location}/". Copy it verbatim — do not strip or reconstruct the prefix.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_operations_get',
    description: `Get the current status and result of a Google Cloud Vision long-running operation by its full operation name.
Returns an Operation object with name, an optional metadata object, a done boolean, and — once done — either an error or the operation-specific response payload (e.g. AsyncBatchAnnotateImagesResponse, AsyncBatchAnnotateFilesResponse, or ImportProductSetsResponse).
Use this to poll a job after starting it; use operations_list instead to browse all in-flight or past operations.
Requires an operation name returned by an async-starting call such as images_async_batch_annotate, files_async_batch_annotate, product_purge, or product_set_import.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Full resource name of the long-running operation to poll, exactly as returned by the call that started it — depending on which call, this may be a bare "operations/{operation_id}", or prefixed with "projects/{project}/" and/or "locations/{location}/" (e.g. files_async_batch_annotate returns a project-scoped name; product_purge/product_set_import return a location-scoped one). Copy it verbatim — do not strip or reconstruct the prefix.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_operations_list',
    description: `List Google Cloud Vision long-running operations, optionally filtered by an AIP-160 filter expression.
Returns operations (an array of Operation objects with name, metadata, and done) and a nextPageToken for fetching further pages when more results exist.
The name field must be exactly the literal string "operations" — Vision API's ListOperations binding only accepts this one value (confirmed by the API's own published parameter pattern, \`^operations$\`); it does not support listing scoped by project or location, even though individual operation names returned by other calls may be project- and/or location-prefixed. To find one specific operation whose name you don't have, list here and match on the returned name/metadata; once you have the name, use operations_get to poll it directly (operations_get accepts the name in whatever form it was returned, prefixed or not).
Use operations_list to browse in-flight or past operations, e.g. to find one you didn't keep the name of. Use operations_get instead once you already have a specific operation name to poll its status.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Optional AIP-160 filter expression to restrict which operations are returned (e.g. done=false to see only in-flight jobs). Leave blank to list all operations in the collection.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Must be exactly the literal string "operations" — this is the only value Vision API's ListOperations endpoint accepts (enforced server-side; the API does not support listing scoped by project or location). Leave this at the default.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of operations to return per page. If unset, the server chooses a default page size.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Pagination token from a previous operations_list call's nextPageToken, used to fetch the next page of results.`,
      },
      {
        name: 'return_partial_success',
        type: 'boolean',
        required: false,
        description: `When true, reachable operations are returned normally and unreachable ones are reported in the response's unreachable field instead of causing an error. Only meaningful when listing across collections; not documented as supported for Vision API's single flat operations collection, so leave blank unless you have a specific reason to set it.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_product_create',
    description: `Create a new product in Google Cloud Vision Product Search under a project and location.
Returns the created Product object, including its generated resource name (or the caller-supplied product ID if one was provided), productCategory, displayName, description, and productLabels.
Use this to add a new product before attaching reference images (reference_image_create) or adding it to a product set (product_set_add_product) for search scoping; use product_list to browse existing products instead of creating duplicates.`,
    params: [
      {
        name: 'display_name',
        type: 'string',
        required: true,
        description: `The human-readable display name for the product, up to 4096 characters.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The project and location in which to create the product, in the form projects/{project_id}/locations/{location_id}. Example: projects/my-project/locations/us-east1.`,
      },
      {
        name: 'product_category',
        type: 'string',
        required: true,
        description: `The category for the product, used to scope Product Search. This is immutable once the product is created — it cannot be changed later. Must be one of: homegoods-v2, apparel-v2, toys-v2, packagedgoods-v1, general-v1.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Free-text metadata describing the product, up to 4096 characters. Not used for search matching, but returned with the product.`,
      },
      {
        name: 'product_id',
        type: 'string',
        required: false,
        description: `A caller-chosen ID for the product, unique within the parent project and location, up to 128 characters. Cannot contain "/". If omitted, the server generates one.`,
      },
      {
        name: 'product_labels',
        type: 'array',
        required: false,
        description: `Key-value label pairs attached to the product, used to filter search results (e.g. color, style). Up to 500 labels, each key up to 128 characters and each value up to 128 characters. Example: [{"key": "color", "value": "blue"}, {"key": "style", "value": "running"}].`,
      },
    ],
  },
  {
    name: 'googlecloudvision_product_delete',
    description: `Permanently delete a product from Google Cloud Vision Product Search by its full resource name.
Returns an empty response on success.
Deleting a product also permanently deletes all of its reference images and removes it from any product sets — this cannot be undone. Use product_get first to confirm you have the right product, or product_set_remove_product instead if you only want to remove it from a product set's search scope without deleting the product itself.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The full resource name of the product to delete, in the form projects/{project_id}/locations/{location_id}/products/{product_id}. Example: projects/my-project/locations/us-east1/products/sku-12345.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_product_get',
    description: `Get a single product from Google Cloud Vision Product Search by its full resource name.
Returns the Product object: name, displayName, productCategory, description, and productLabels.
Use this when you already have a product's full resource name (e.g. returned by product_create or product_list). Use product_list to browse or find a product when you don't already know its resource name.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The full resource name of the product to retrieve, in the form projects/{project_id}/locations/{location_id}/products/{product_id}. Example: projects/my-project/locations/us-east1/products/sku-12345.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_product_list',
    description: `List all products in a Google Cloud Vision Product Search catalog under a project and location, paginated.
Returns an array of Product objects (name, displayName, productCategory, description, productLabels) plus a nextPageToken when more results are available.
Use this to browse every product in a project/location. Use product_set_products_list instead to see only the products belonging to one product set, and product_get when you already know a single product's full resource name.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The project and location whose products to list, in the form projects/{project_id}/locations/{location_id}. Example: projects/my-project/locations/us-east1.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of products to return per page. The service may return fewer than this value. If unspecified, a default page size is used; the maximum allowed value is 100 (larger values are coerced down).`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token received from a previous product_list call's nextPageToken, used to retrieve the next page of results.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_product_purge',
    description: `Bulk-delete products in Google Cloud Vision Product Search: either every product in one product set, or every product that belongs to no product set at all.
Returns a long-running Operation immediately; the deletion itself happens asynchronously. Poll operations_get with the returned operation's name to check when it finishes and whether it succeeded.
Set exactly one of product_set_id (purge that product set's products) or delete_orphan_products (purge products with no product set membership) — never both, and never neither. This is a bulk, irreversible delete, so it additionally requires force to be explicitly set to true or the API will reject the call without deleting anything.`,
    params: [
      {
        name: 'force',
        type: 'boolean',
        required: true,
        description: `Safety confirmation required to actually execute the purge. Must be explicitly set to true — this call performs an irreversible bulk delete and will not run without it.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The project and location to purge products from, in the form projects/{project_id}/locations/{location_id}. Example: projects/my-project/locations/us-east1.`,
      },
      {
        name: 'delete_orphan_products',
        type: 'boolean',
        required: false,
        description: `If true, purge every product in the parent project/location that does not belong to any product set. Set this OR product_set_id, not both. Leave blank/false if using product_set_id.`,
      },
      {
        name: 'product_set_id',
        type: 'string',
        required: false,
        description: `ID of the product set whose member products should all be purged. Set this OR delete_orphan_products, not both. Leave blank if using delete_orphan_products.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_product_set_add_product',
    description: `Add an existing product to a Google Cloud Vision product set, so the product becomes part of that set's similarity-search scope.
Returns an empty object on success. Adding a product that is already in the set, or that has reached the 100-product-set limit, has no additional effect / is rejected respectively.
Use product_set_remove_product to reverse this. The product must already exist (create it first with product_create) — this call only changes set membership, it does not create the product.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Full resource name of the product set to add the product to, in the form projects/{project_id}/locations/{location_id}/productSets/{product_set_id}.`,
      },
      {
        name: 'product',
        type: 'string',
        required: true,
        description: `Full resource name of the product to add, in the form projects/{project_id}/locations/{location_id}/products/{product_id}. This is a plain string value (the resource name itself), not an object.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_product_set_create',
    description: `Create a new product set in Google Cloud Vision Product Search, a named group used to scope similarity search to a subset of products.
Returns the created ProductSet object with its full resource name, display name, and index status.
Use this before adding products to a set with product_set_add_product, or bulk-create sets and their referenceImages together via product_set_import.
Products themselves are created separately with product_create and are not members of any set until added.`,
    params: [
      {
        name: 'display_name',
        type: 'string',
        required: true,
        description: `User-provided display name for the product set, up to 4096 characters.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The project and location in which to create the product set, in the form projects/{project_id}/locations/{location_id}. The location must match where the project's Product Search resources are hosted (e.g. us-west1).`,
      },
      {
        name: 'product_set_id',
        type: 'string',
        required: false,
        description: `Optional caller-chosen ID for the new product set. Must be at most 128 characters and conform to RFC-1034 (letters, numbers, hyphens). If omitted, the server generates one automatically.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_product_set_delete',
    description: `Permanently delete a Google Cloud Vision product set by its full resource name.
Returns an empty object on success.
This is NON-cascading: the products that belonged to this set are NOT deleted and are unaffected — they simply lose membership in this set (contrast with product_delete, which cascades and deletes a product's reference images). Use product_set_remove_product first if you only want to detach specific products without deleting the set itself.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Full resource name of the product set to delete, in the form projects/{project_id}/locations/{location_id}/productSets/{product_set_id}.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_product_set_get',
    description: `Retrieve details of a single Google Cloud Vision product set by its full resource name.
Returns a ProductSet object with name, displayName, and index status (indexTime when last indexed, or indexError if indexing failed).
Use this to check a specific product set's current state; use product_set_list to browse all product sets in a project/location instead.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Full resource name of the product set to retrieve, in the form projects/{project_id}/locations/{location_id}/productSets/{product_set_id}.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_product_set_import',
    description: `Bulk-import products, product sets, and reference images into Google Cloud Vision Product Search from a CSV manifest file stored in Google Cloud Storage.
Starts a long-running operation and returns an Operation object (not the import result inline) — poll it with operations_get to get the final ImportProductSetsResponse (created products/referenceImages and any per-row errors) once done.
This is the ONLY way to bulk-create reference images in one call — reference_image_create only handles one reference image at a time. The referenced CSV must follow Google's 8-column product-set import format (image URI, image ID, product set ID, product ID, product category, product display name, labels, bounding poly — see help link for the exact per-column spec).`,
    params: [
      {
        name: 'csv_file_uri',
        type: 'string',
        required: true,
        description: `Google Cloud Storage URI of the CSV manifest describing the product sets, products, and reference images to import, e.g. gs://bucket-name/manifest.csv. The CSV must follow Google's documented 8-column product-set import schema.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The project and location to import into, in the form projects/{project_id}/locations/{location_id}.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_product_set_list',
    description: `List all product sets in a Google Cloud Vision project and location, regardless of which products belong to them.
Returns an array of ProductSet objects (name, displayName, indexTime/indexError) plus a nextPageToken for pagination.
Use this to browse every product set defined for the project. Use product_set_products_list instead once you have a specific product set and need to see the products inside it.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The project and location whose product sets to list, in the form projects/{project_id}/locations/{location_id}.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of product sets to return per page. The service may return fewer than this value. Defaults to 10 if not specified; maximum is 100.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A pagination token received from a previous product_set_list call's nextPageToken field. Pass this to retrieve the next page of results.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_product_set_products_list',
    description: `List only the products that belong to one specific Google Cloud Vision product set.
Returns an array of Product objects (name, displayName, productCategory, productLabels) plus a nextPageToken for pagination.
Distinct from product_list, which lists ALL products in a project/location regardless of set membership — use this tool instead when you already have a product set and want just its members. Use product_set_add_product / product_set_remove_product to change which products belong to the set.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Full resource name of the product set whose products to list, in the form projects/{project_id}/locations/{location_id}/productSets/{product_set_id}. Named 'name' (not 'parent') because this is how the underlying API labels it, even though it functions as the scope for this list call.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of products to return per page. The service may return fewer than this value. Defaults to 10 if not specified; maximum is 100.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A pagination token received from a previous product_set_products_list call's nextPageToken field. Pass this to retrieve the next page of results.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_product_set_remove_product',
    description: `Remove a product from a Google Cloud Vision product set, detaching it from that set's similarity-search scope.
Returns an empty object on success. This does not delete the product itself, only its membership in this set — the product and its reference images remain intact and can still belong to other sets.
Use product_set_add_product to reverse this. Use product_delete instead if you actually want to delete the product (which cascades to its reference images).`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Full resource name of the product set to remove the product from, in the form projects/{project_id}/locations/{location_id}/productSets/{product_set_id}.`,
      },
      {
        name: 'product',
        type: 'string',
        required: true,
        description: `Full resource name of the product to remove, in the form projects/{project_id}/locations/{location_id}/products/{product_id}. This is a plain string value (the resource name itself), not an object.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_product_set_update',
    description: `Update a Google Cloud Vision product set's display name. Only displayName is mutable on a product set, so update_mask should always be set to "displayName".
Returns the updated ProductSet object.
Requires the product set's full resource name and the new display name (this tool keeps the URL and the request body in sync from the single name you provide, so they can't drift apart). Use product_set_get first if you need to confirm the current display name before overwriting it.`,
    params: [
      {
        name: 'display_name',
        type: 'string',
        required: true,
        description: `New display name for the product set.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Full resource name of the product set to update, in the form projects/{project_id}/locations/{location_id}/productSets/{product_set_id}. Used both in the request URL and in the request body — you only need to provide it once here.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: false,
        description: `Comma-separated list of field names (relative to ProductSet) to update. Only displayName is mutable, so this should always be "displayName".`,
      },
    ],
  },
  {
    name: 'googlecloudvision_product_update',
    description: `Update a product's display name, description, and/or labels in Google Cloud Vision Product Search via a partial update (PATCH).
Returns the updated Product object.
Only displayName, description, and productLabels can be changed this way — productCategory is immutable after creation and is not accepted by this tool. Use product_get first if you need to see the product's current field values before updating.
Prerequisites: the product must already exist (see product_create).`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The full resource name of the product to update, in the form projects/{project_id}/locations/{location_id}/products/{product_id}. Example: projects/my-project/locations/us-east1/products/sku-12345. Used both as the URL path and as the product.name field in the request body.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New free-text description for the product, up to 4096 characters. Leave blank to keep the existing description.`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `New display name for the product, up to 4096 characters. Leave blank to keep the existing display name.`,
      },
      {
        name: 'product_labels',
        type: 'array',
        required: false,
        description: `New key-value label pairs for the product, replacing the existing productLabels entirely. Up to 500 labels, each key/value up to 128 characters. Example: [{"key": "color", "value": "red"}]. Leave blank to keep the existing labels.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to update, restricted to displayName, description, and/or productLabels (e.g. "displayName,productLabels"). If omitted, all mutable fields supplied in this request are updated. Does not accept productCategory — that field is immutable.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_reference_image_create',
    description: `Add a reference image to a Product Search product by pointing at an image file already stored in Google Cloud Storage.
Returns a ReferenceImage object with its resource name, the GCS uri, and any bounding polygons.
Use reference_image_create to attach a new labeled training image to a product; use reference_image_list or reference_image_get to inspect images already attached, and reference_image_delete to remove one.
Prerequisite: the parent product must already exist — create it first with product_create.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `Full resource name of the parent product to attach this reference image to, in the form "projects/{project}/locations/{location}/products/{product}". This product must already exist — create it with product_create.`,
      },
      {
        name: 'uri',
        type: 'string',
        required: true,
        description: `Google Cloud Storage URI of the image to use as this reference image, in the form "gs://bucket-name/object-name". Required — inline/base64 image bytes are not accepted for reference images; the file must already be uploaded to GCS.`,
      },
      {
        name: 'bounding_polys',
        type: 'array',
        required: false,
        description: `Optional list of bounding polygons marking the specific region(s) within the image that represent the product. Each polygon is an object with a "vertices" array of {x, y} pixel-coordinate points. Up to 10 polygons are allowed. Each polygon is converted to a non-rotated rectangle: its shorter edge must resolve to at least 300 pixels, and its aspect ratio must be 1:4 or less (e.g. 1:3 is fine, 1:5 is not). If omitted, Vision assumes the whole image is the product (auto-detected using the product's productCategory).`,
      },
      {
        name: 'reference_image_id',
        type: 'string',
        required: false,
        description: `Optional caller-chosen ID for the new reference image, up to 128 characters. Cannot contain "/". If omitted, Vision generates an ID automatically.`,
      },
    ],
  },
  {
    name: 'googlecloudvision_reference_image_delete',
    description: `Permanently delete a reference image from a Product Search product; this removes only the Vision API's reference to the image and does not delete the underlying image file in Google Cloud Storage.
Returns an empty response body on success.
Use reference_image_delete to remove one training image; use product_delete to remove the entire product, which cascades to delete all of its reference images.
Prerequisite: the reference image must already exist — find its resource name with reference_image_list or reference_image_get.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Full resource name of the reference image to delete, in the form "projects/{project}/locations/{location}/products/{product}/referenceImages/{reference_image}".`,
      },
    ],
  },
  {
    name: 'googlecloudvision_reference_image_get',
    description: `Get a single reference image by its full resource name.
Returns a ReferenceImage object with its resource name, GCS uri, and any bounding polygons.
Use reference_image_get to fetch one known reference image; use reference_image_list to browse or find the right one first.
Prerequisite: the reference image must already exist — create it with reference_image_create.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Full resource name of the reference image to retrieve, in the form "projects/{project}/locations/{location}/products/{product}/referenceImages/{reference_image}".`,
      },
    ],
  },
  {
    name: 'googlecloudvision_reference_image_list',
    description: `List the reference images attached to a Product Search product.
Returns an array of ReferenceImage objects (resource name, GCS uri, boundingPolys) plus a nextPageToken for paging through further results.
Use reference_image_list to browse all training images on a product; use reference_image_get to fetch one specific reference image by name.
Prerequisite: the parent product must already exist — create it first with product_create.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `Full resource name of the product whose reference images to list, in the form "projects/{project}/locations/{location}/products/{product}".`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Maximum number of reference images to return per page. If unspecified, the API chooses a sensible default; the API may return fewer than the requested number of results.`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `A page token from a previous reference_image_list call's nextPageToken, used to fetch the next page of results.`,
      },
    ],
  },
]
