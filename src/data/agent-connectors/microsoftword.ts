import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'microsoftword_copy_document',
    description: `Copy a Word document (.docx) in OneDrive to a new parent folder asynchronously. Returns HTTP 202 Accepted with a Location header pointing to a monitor URL; the copy itself completes in the background. Optionally provide a new name for the copy. Requires Files.ReadWrite or Files.ReadWrite.All scope.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique OneDrive item ID of the Word document to copy. Obtain item IDs from microsoftword_list_documents, microsoftword_search_documents, or microsoftword_create_document.`,
      },
      {
        name: 'new_parent_id',
        type: 'string',
        required: true,
        description: `The OneDrive item ID of the destination folder for the copy. Use "root" to copy to the top level of OneDrive.`,
      },
      {
        name: 'new_name',
        type: 'string',
        required: false,
        description: `Optional name for the copied document, including the .docx extension. If omitted, the copy keeps the original name.`,
      },
    ],
  },
  {
    name: 'microsoftword_create_document',
    description: `Create a new Word document (.docx) in OneDrive by initiating a resumable upload session. Returns an uploadUrl that the caller must use to upload the .docx file bytes via one or more PUT requests. The document is placed under the specified parent folder with the given filename. Requires Files.ReadWrite or Files.ReadWrite.All scope.`,
    params: [
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `The base name of the Word document to create, without the .docx extension. The extension is appended automatically. Example: "Project Proposal" creates "Project Proposal.docx".`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: true,
        description: `The OneDrive item ID of the parent folder where the document will be created. Use "root" to create the document at the top level of OneDrive. Obtain folder IDs from list or get drive item operations.`,
      },
      {
        name: 'conflict_behavior',
        type: 'string',
        required: false,
        description: `Behavior when a file with the same name already exists in the target folder. "fail" aborts and returns an error, "replace" overwrites the existing file, "rename" saves the new document with a different auto-generated name. Default: replace.`,
      },
    ],
  },
  {
    name: 'microsoftword_delete_document',
    description: `Delete a Word document (.docx) from OneDrive by item ID. The item is moved to the recycle bin, not permanently purged. On success, returns 204 No Content. Requires Files.ReadWrite or Files.ReadWrite.All scope.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique OneDrive item ID of the Word document to delete. Obtain item IDs from microsoftword_list_documents, microsoftword_search_documents, or microsoftword_create_document.`,
      },
    ],
  },
  {
    name: 'microsoftword_get_document',
    description: `Retrieve metadata for a Word document (.docx) in OneDrive by item ID. Returns name, size, createdDateTime, lastModifiedDateTime, file hashes/MIME type, parentReference, webUrl, and eTag/cTag. Does not return the document's content — use microsoftword_read_document to export the content as PDF. Requires Files.ReadWrite or Files.ReadWrite.All scope.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique OneDrive item ID of the Word document. Obtain item IDs from microsoftword_list_documents, microsoftword_search_documents, or microsoftword_create_document.`,
      },
    ],
  },
  {
    name: 'microsoftword_list_document_versions',
    description: `List the version history of a Word document (.docx) stored in OneDrive. Returns each version's ID, last-modified time, last-modified-by user, and size. Does not return version content — Microsoft Graph does not expose a way to download historical version bytes for this resource type via this API. Requires Files.ReadWrite or Files.ReadWrite.All scope.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique OneDrive item ID of the Word document whose version history to list. Obtain item IDs from microsoftword_list_documents, microsoftword_search_documents, or microsoftword_create_document.`,
      },
    ],
  },
  {
    name: 'microsoftword_list_documents',
    description: `List the children of a OneDrive folder, intended for finding Word (.docx) files. Use "root" as parent_id to list the top level of the signed-in user's OneDrive. The Graph API returns all item types (files and folders); pass filter with "endswith(name,'.docx')" to narrow results to Word documents only. Requires Files.ReadWrite or Files.ReadWrite.All scope.`,
    params: [
      {
        name: 'parent_id',
        type: 'string',
        required: true,
        description: `The OneDrive item ID of the folder to list. Use "root" to list the top level of OneDrive. Obtain folder IDs from microsoftword_get_document or other list operations.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Value for the OData $filter query parameter — an expression to narrow results. Example: "endswith(name,'.docx')" returns only Word documents.`,
      },
      {
        name: 'orderby',
        type: 'string',
        required: false,
        description: `Value for the OData $orderby query parameter — the property to sort results by. Example: "name asc" or "lastModifiedDateTime desc".`,
      },
      {
        name: 'select',
        type: 'string',
        required: false,
        description: `Value for the OData $select query parameter — a comma-separated list of properties to return. Example: "id,name,size,lastModifiedDateTime" reduces response payload.`,
      },
      {
        name: 'top',
        type: 'integer',
        required: false,
        description: `Value for the OData $top query parameter — the maximum number of items to return per page (default: 25).`,
      },
    ],
  },
  {
    name: 'microsoftword_move_document',
    description: `Move a Word document (.docx) to a different OneDrive folder, rename it, or both, by PATCHing its parentReference and/or name. Provide new_parent_id to move the document, new_name to rename it (include the .docx extension), or both at once. At least one of new_parent_id or new_name must be provided. Requires Files.ReadWrite or Files.ReadWrite.All scope.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique OneDrive item ID of the Word document to move or rename. Obtain item IDs from microsoftword_list_documents, microsoftword_search_documents, or microsoftword_create_document.`,
      },
      {
        name: 'new_name',
        type: 'string',
        required: false,
        description: `New name for the document, including the .docx extension. Omit to keep the current name while only moving the document.`,
      },
      {
        name: 'new_parent_id',
        type: 'string',
        required: false,
        description: `The OneDrive item ID of the destination folder. Use "root" to move the document to the top level of OneDrive. Omit to keep the document in its current folder while only renaming it.`,
      },
    ],
  },
  {
    name: 'microsoftword_read_document',
    description: `Export a Word document (.docx) from OneDrive as a PDF by requesting the file content with the format=pdf conversion parameter. Returns the PDF binary of the document. Note: Microsoft Graph converts the document server-side to PDF; it does not return Markdown or plain text. Client-side parsing is required to extract text from the returned PDF. Requires Files.Read or Files.ReadWrite scope.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique OneDrive item ID of the Word document (.docx) to export as PDF. Obtain item IDs from list drive items, search drive items, or get drive item operations. Example: "01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K".`,
      },
    ],
  },
  {
    name: 'microsoftword_search_documents',
    description: `Search the signed-in user's personal OneDrive for items matching a query string, searching across file names and content. Include "docx" in the query or filter the returned array client-side by name to isolate Word documents, since this endpoint searches all OneDrive item types. Requires Files.ReadWrite or Files.ReadWrite.All scope.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query string to find Word documents by name or content. Example: "quarterly report docx".`,
      },
      {
        name: 'select',
        type: 'string',
        required: false,
        description: `Value for the OData $select query parameter — a comma-separated list of properties to return. Example: "id,name,size,webUrl" reduces response payload.`,
      },
      {
        name: 'top',
        type: 'integer',
        required: false,
        description: `Value for the OData $top query parameter — the maximum number of results to return. Accepts values 1–999.`,
      },
    ],
  },
  {
    name: 'microsoftword_update_document_content',
    description: `Overwrite the content of an existing Word document (.docx) in OneDrive by initiating an upload session against its item ID. Returns an uploadUrl that the caller must use to PUT the replacement .docx file bytes (as one request for files under ~60 MiB, or as sequential byte-range PUTs for larger files) — mirrors microsoftword_create_document but targets an existing item's content instead of creating a new file by name. No request body is required to start the session. Requires Files.ReadWrite or Files.ReadWrite.All scope.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `The unique OneDrive item ID of the existing Word document whose content will be replaced. Obtain item IDs from microsoftword_list_documents, microsoftword_search_documents, or microsoftword_create_document.`,
      },
    ],
  },
]
