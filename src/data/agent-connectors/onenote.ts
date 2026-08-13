import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'onenote_copy_page',
    description: `Copy an existing OneNote page into a different section (including a section in a different notebook). This is an asynchronous Graph operation: a successful call returns 202 Accepted immediately with an Operation-Location header rather than the copied page itself; the copy completes shortly afterward in the background. Requires Notes.Create or Notes.ReadWrite scope.`,
    params: [
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneNote page to copy. Obtain page IDs from onenote_list_pages, onenote_search_pages, or onenote_create_page.`,
      },
      {
        name: 'target_section_id',
        type: 'string',
        required: true,
        description: `The unique ID of the destination section to copy the page into. Obtain section IDs from onenote_list_sections or onenote_create_section.`,
      },
      {
        name: 'group_id',
        type: 'string',
        required: false,
        description: `The ID of the Microsoft 365 group that owns the destination section, if the destination section belongs to a group notebook rather than the signed-in user's own notebooks.`,
      },
    ],
  },
  {
    name: 'onenote_create_notebook',
    description: `Create a new OneNote notebook for the signed-in user. Notebook names must be unique within the user's OneNote, cannot exceed 128 characters, and cannot contain the characters ?*/:<>|'". Returns the new notebook object including its id and sectionsUrl. Requires Notes.Create or Notes.ReadWrite scope.`,
    params: [
      {
        name: 'display_name',
        type: 'string',
        required: true,
        description: `The display name for the new notebook. Must be unique among the user's notebooks, 128 characters or fewer, and cannot contain the characters ?*/:<>|'".`,
      },
    ],
  },
  {
    name: 'onenote_create_page',
    description: `Create a new OneNote page in the specified section by posting well-formed HTML directly as the request body. Content-Type is text/html (application/xhtml+xml is also accepted by the Graph API) — the body must be valid XHTML-compliant markup (properly closed/nested tags), not JSON. Use a <title> element inside <head> to set the page title, and a <meta name="created" content="..."/> tag to set the creation date. This tool only supports plain HTML (including remote image URLs); pages that embed binary image/file data require a multipart/form-data request, which is not supported by this tool. Requires Notes.Create or Notes.ReadWrite scope.`,
    params: [
      {
        name: 'html_content',
        type: 'string',
        required: true,
        description: `Well-formed XHTML-compliant HTML for the new page, including the <html>, <head>, and <body> elements. Example: "<!DOCTYPE html><html><head><title>Meeting Notes</title></head><body><p>Agenda items...</p></body></html>". Remote image URLs are allowed in <img src="https://...">; embedded binary data is not supported by this tool.`,
      },
      {
        name: 'section_id',
        type: 'string',
        required: true,
        description: `The unique ID of the section in which to create the new page. Obtain section IDs from onenote_list_sections or onenote_create_section.`,
      },
    ],
  },
  {
    name: 'onenote_create_section',
    description: `Create a new OneNote section inside the specified notebook. Section names must be unique within the same hierarchy level, cannot exceed 50 characters, and cannot contain the characters ?*/:<>|'%~. Returns the new onenoteSection object including its id and pagesUrl. Requires Notes.Create or Notes.ReadWrite scope.`,
    params: [
      {
        name: 'display_name',
        type: 'string',
        required: true,
        description: `The display name for the new section. Must be unique among the notebook's other sections, 50 characters or fewer, and cannot contain the characters ?*/:<>|'%~.`,
      },
      {
        name: 'notebook_id',
        type: 'string',
        required: true,
        description: `The unique ID of the notebook in which to create the new section. Obtain notebook IDs from onenote_list_notebooks or onenote_create_notebook.`,
      },
    ],
  },
  {
    name: 'onenote_create_section_group',
    description: `Create a new section group directly inside the specified notebook. A section group is a folder-like container that can hold its own sections and nested section groups — useful for organizing many sections under one notebook. Section group names must be unique within the same hierarchy level, cannot exceed 50 characters, and cannot contain the characters ?*/:<>|'%~. Returns the new sectionGroup object including its id, sectionsUrl, and sectionGroupsUrl. Requires Notes.Create or Notes.ReadWrite scope.`,
    params: [
      {
        name: 'display_name',
        type: 'string',
        required: true,
        description: `The display name for the new section group. Must be unique among the notebook's other section groups, 50 characters or fewer, and cannot contain the characters ?*/:<>|'%~.`,
      },
      {
        name: 'notebook_id',
        type: 'string',
        required: true,
        description: `The unique ID of the notebook in which to create the new section group. Obtain notebook IDs from onenote_list_notebooks or onenote_create_notebook.`,
      },
    ],
  },
  {
    name: 'onenote_delete_page',
    description: `Permanently delete a OneNote page by page ID. This action cannot be undone through the API. On success, returns 204 No Content. Requires Notes.ReadWrite scope.`,
    params: [
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneNote page to delete. Obtain page IDs from onenote_list_pages, onenote_search_pages, or onenote_create_page.`,
      },
    ],
  },
  {
    name: 'onenote_get_page_content',
    description: `Retrieve the full HTML content of a OneNote page by page ID. Returns raw HTML (Content-Type: text/html), not JSON — the response body is the page's markup, including any embedded images as data URIs or object references. Set include_ids to true to have the server annotate elements with data-id attributes, which are required as the "target" of a subsequent onenote_update_page_content call. Requires Notes.Read, Notes.Create, or Notes.ReadWrite scope.`,
    params: [
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneNote page whose content to retrieve. Obtain page IDs from onenote_list_pages, onenote_search_pages, or onenote_create_page.`,
      },
      {
        name: 'include_ids',
        type: 'boolean',
        required: false,
        description: `When true, the returned HTML includes data-id attributes on elements so they can be targeted by a later onenote_update_page_content call. Default: false.`,
      },
    ],
  },
  {
    name: 'onenote_list_notebooks',
    description: `List all OneNote notebooks owned by or shared with the signed-in user. Returns each notebook's id, displayName, createdDateTime, lastModifiedDateTime, userRole, isShared, sectionsUrl, sectionGroupsUrl, and links (oneNoteWebUrl/oneNoteClientUrl). Default sort order is displayName ascending. Requires Notes.Create, Notes.Read, or Notes.ReadWrite scope.`,
    params: [
      {
        name: 'orderby',
        type: 'string',
        required: false,
        description: `Value for the OData $orderby query parameter — the property to sort results by. Example: "displayName desc". The default sort order is "displayName asc".`,
      },
      {
        name: 'select',
        type: 'string',
        required: false,
        description: `Value for the OData $select query parameter — a comma-separated list of notebook properties to return. Example: "id,displayName,lastModifiedDateTime" reduces response payload.`,
      },
      {
        name: 'top',
        type: 'integer',
        required: false,
        description: `Value for the OData $top query parameter — the maximum number of notebooks to return per page. Accepts values 1–999.`,
      },
    ],
  },
  {
    name: 'onenote_list_pages',
    description: `List the OneNote pages inside a specific section. Returns each page's id, title, createdByAppId, contentUrl, links, and lastModifiedDateTime. By default returns the top 20 pages ordered by lastModifiedDateTime descending; the maximum for top is 100. Use onenote_get_page_content to fetch a page's HTML body. Requires Notes.Read, Notes.Create, or Notes.ReadWrite scope.`,
    params: [
      {
        name: 'section_id',
        type: 'string',
        required: true,
        description: `The unique ID of the section whose pages to list. Obtain section IDs from onenote_list_sections or onenote_create_section.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Value for the OData $filter query parameter — an expression to narrow results. Example: "contains(tolower(title),'standup')".`,
      },
      {
        name: 'orderby',
        type: 'string',
        required: false,
        description: `Value for the OData $orderby query parameter — the property to sort results by. Example: "title asc". The default sort order is "lastModifiedDateTime desc".`,
      },
      {
        name: 'select',
        type: 'string',
        required: false,
        description: `Value for the OData $select query parameter — a comma-separated list of page properties to return. Example: "id,title,lastModifiedDateTime" reduces response payload.`,
      },
      {
        name: 'top',
        type: 'integer',
        required: false,
        description: `Value for the OData $top query parameter — the maximum number of pages to return per page of results (default: 20). The server-enforced maximum is 100.`,
      },
    ],
  },
  {
    name: 'onenote_list_section_groups',
    description: `List the OneNote section groups (sectionGroup objects) inside a specific notebook. A section group is a folder-like container that can hold its own sections and nested section groups. Returns each section group's id, displayName, sectionsUrl, sectionGroupsUrl, createdDateTime, and lastModifiedDateTime. The default sort order is displayName asc. Requires Notes.Create, Notes.Read, or Notes.ReadWrite scope.`,
    params: [
      {
        name: 'notebook_id',
        type: 'string',
        required: true,
        description: `The unique ID of the notebook whose section groups to list. Obtain notebook IDs from onenote_list_notebooks or onenote_create_notebook.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Value for the OData $filter query parameter — an expression to narrow results. Example: "displayName eq 'Archived'".`,
      },
      {
        name: 'orderby',
        type: 'string',
        required: false,
        description: `Value for the OData $orderby query parameter — the property to sort results by. Example: "lastModifiedDateTime desc". The default sort order is "displayName asc".`,
      },
      {
        name: 'select',
        type: 'string',
        required: false,
        description: `Value for the OData $select query parameter — a comma-separated list of section group properties to return. Example: "id,displayName,sectionsUrl" reduces response payload.`,
      },
      {
        name: 'top',
        type: 'integer',
        required: false,
        description: `Value for the OData $top query parameter — the maximum number of section groups to return per page. Accepts values 1–999.`,
      },
    ],
  },
  {
    name: 'onenote_list_sections',
    description: `List the OneNote sections (onenoteSection objects) inside a specific notebook. Returns each section's id, displayName, isDefault, pagesUrl, createdDateTime, and lastModifiedDateTime. The default response expands parentNotebook. Requires Notes.Create, Notes.Read, or Notes.ReadWrite scope.`,
    params: [
      {
        name: 'notebook_id',
        type: 'string',
        required: true,
        description: `The unique ID of the notebook whose sections to list. Obtain notebook IDs from onenote_list_notebooks or onenote_create_notebook.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Value for the OData $filter query parameter — an expression to narrow results. Example: "displayName eq 'Meeting Notes'".`,
      },
      {
        name: 'orderby',
        type: 'string',
        required: false,
        description: `Value for the OData $orderby query parameter — the property to sort results by. Example: "displayName asc" or "lastModifiedDateTime desc". The default sort order is "displayName asc".`,
      },
      {
        name: 'select',
        type: 'string',
        required: false,
        description: `Value for the OData $select query parameter — a comma-separated list of section properties to return. Example: "id,displayName,pagesUrl" reduces response payload.`,
      },
      {
        name: 'top',
        type: 'integer',
        required: false,
        description: `Value for the OData $top query parameter — the maximum number of sections to return per page. Accepts values 1–999.`,
      },
    ],
  },
  {
    name: 'onenote_search_pages',
    description: `Search all of the signed-in user's OneNote pages (across every notebook and section) for pages whose title contains the given text. Implemented as an OData $filter using contains(tolower(title),'...'), so matching is case-insensitive as long as the query is passed in lowercase. To list pages within one specific section instead, use onenote_list_pages. Requires Notes.Read, Notes.Create, or Notes.ReadWrite scope.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Text to search for in page titles. Pass lowercase for reliable matching, since the filter compares against a lowercased title (e.g. "standup" matches "Weekly Standup Notes").`,
      },
      {
        name: 'select',
        type: 'string',
        required: false,
        description: `Value for the OData $select query parameter — a comma-separated list of page properties to return. Example: "id,title,parentSection" reduces response payload.`,
      },
      {
        name: 'top',
        type: 'integer',
        required: false,
        description: `Value for the OData $top query parameter — the maximum number of matching pages to return. The server-enforced maximum is 100.`,
      },
    ],
  },
  {
    name: 'onenote_update_page_content',
    description: `Apply a single patchContentCommand to an existing OneNote page's content, per the Graph OneNote page-update semantics (a JSON array containing one command object with target/action/position/content). target must be the #<data-id> or generated <id> of an element from a onenote_get_page_content call made with include_ids=true, or the literal keyword "body" or "title". action is one of replace, append, delete, insert, or prepend. content must be well-formed HTML and is required for every action except delete. Binary image/file data in content is not supported by this tool (it would require a multipart/form-data request). On success, returns 204 No Content. Requires Notes.ReadWrite scope.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The action to perform on the target element.`,
      },
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `The unique ID of the OneNote page to update. Obtain page IDs from onenote_list_pages, onenote_search_pages, or onenote_create_page.`,
      },
      {
        name: 'target',
        type: 'string',
        required: true,
        description: `The element to update: the #<data-id> or generated <id> of an element (from a onenote_get_page_content call with include_ids=true), or the literal keyword "body" or "title".`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `A string of well-formed HTML to add to the page. Required for the replace, append, insert, and prepend actions; ignored for delete.`,
      },
      {
        name: 'position',
        type: 'string',
        required: false,
        description: `The location to add the supplied content, relative to the target element. Possible values: after (default) or before.`,
      },
    ],
  },
]
