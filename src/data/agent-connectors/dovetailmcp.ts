import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'dovetailmcp_create_channel_datum',
    description: `Send a new data point to a Dovetail channel for automated AI processing.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail channel to which the data point will be sent.`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `The raw text content of the customer feedback data point to send (e.g. an app review, NPS response, or support ticket body).`,
      },
      {
        name: 'timestamp',
        type: 'string',
        required: true,
        description: `ISO 8601 timestamp recording when the feedback was originally received.`,
      },
      {
        name: 'source_title',
        type: 'string',
        required: false,
        description: `Optional title of the source the feedback came from (e.g. the support ticket subject).`,
      },
      {
        name: 'source_url',
        type: 'string',
        required: false,
        description: `Optional URL of the source the feedback came from, if available.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_create_comment',
    description: `Post a top-level comment on a Dovetail doc. Comments are discussion threads attached to docs.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `The comment content. Interpreted according to body_type.`,
      },
      {
        name: 'doc_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail doc on which to post the comment.`,
      },
      {
        name: 'body_type',
        type: 'string',
        required: false,
        description: `Format of the body. Defaults to "text"; use "html" for rich-text content.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_create_data',
    description: `Create a new research data entry within a Dovetail project. Data entries store raw research materials such as interview transcripts, survey responses, or notes.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail project to create the data entry in.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The body content of the research data entry in markdown format. Optional — omit to create an empty entry.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Custom fields to set on the new data entry. Each item is an object with \`label\`, \`value\`, and optional \`type\`. \`label\` matches an existing field in the project (or creates a new one). \`value\` depends on the field type: a string for TEXT/EMAIL/URL/PHONE, a boolean for BOOLEAN, a number for NUMBER/NPS, an ISO 8601 string for DATETIME, a string array for SELECT, a contact name for PERSON, or null to clear. Include \`type\` only when creating a new field; it defaults to TEXT and must be omitted when referencing an existing field.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The name or title of the new research data entry. Optional.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_create_doc',
    description: `Create a new doc in the Dovetail workspace. Docs are rich-text documents used for insights, reports, and notes.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Initial body content for the doc. Interpreted according to content_type (defaults to HTML).`,
      },
      {
        name: 'content_type',
        type: 'string',
        required: false,
        description: `Format of the content field. Defaults to "html". Use "markdown" or "text" for those formats.`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `The unique identifier of the folder to place the doc in. If omitted, the doc is created at the root level. Mutually exclusive with project_id.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `The unique identifier of the project to create the doc within. If omitted, the doc is created outside any project. Mutually exclusive with folder_id.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The title of the new Dovetail doc. Optional.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_create_folder',
    description: `Create a new folder in the Dovetail workspace to organize projects, docs, and channels.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The display name for the new folder.`,
      },
      {
        name: 'parent_folder_id',
        type: 'string',
        required: false,
        description: `The ID of the parent folder under which this new folder will be created. If omitted, the folder is created at the top level of the workspace.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_create_project',
    description: `Create a new project in the Dovetail workspace. Projects are the primary container for research data, docs, and insights.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `The unique identifier of the folder to create the project in. Optional — omit to create the project at the workspace root.`,
      },
      {
        name: 'template_id',
        type: 'string',
        required: false,
        description: `The unique identifier of a project template to use as the starting structure for the new project. Optional.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The name of the new project to create. Optional.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_create_tag',
    description: `Create a new tag within a Dovetail project. Tags are project-scoped labels used to categorize highlights and data.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail project in which to create the tag.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The display name for the new tag.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_create_transcript_highlight',
    description: `Create a highlight on an audio or video transcript by marking a start/end time range in seconds.`,
    params: [
      {
        name: 'end_time',
        type: 'number',
        required: true,
        description: `The end of the highlight in seconds within the transcript.`,
      },
      {
        name: 'note_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the data entry (note) that owns the transcript to highlight.`,
      },
      {
        name: 'start_time',
        type: 'number',
        required: true,
        description: `The start of the highlight in seconds within the transcript.`,
      },
      {
        name: 'tag_ids',
        type: 'array',
        required: false,
        description: `Optional list of tag IDs to attach to the newly created highlight.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_download_file',
    description: `Get a short-lived presigned URL to download the raw content of a file attachment.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the file attachment for which to generate a presigned download URL.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_channel',
    description: `Retrieve detailed information about a specific channel by its unique ID, including its topics.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail channel to retrieve.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_channel_datum',
    description: `Retrieve a single channel data point by its ID, including its theme classifications.`,
    params: [
      {
        name: 'datum_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the data point to retrieve.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_contact',
    description: `Retrieve a single contact by its unique identifier. Contacts represent research participants or customers in the Dovetail workspace.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the contact to retrieve.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_data_content',
    description: `Export and retrieve the complete content of a research data entry as markdown.`,
    params: [
      {
        name: 'data_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the research data entry whose content you want to retrieve.`,
      },
      {
        name: 'include_file_content',
        type: 'boolean',
        required: false,
        description: `Set to true to also read the extracted text of the entry's attached document files (PDF, DOCX, PPTX, XLSX). By default attached files appear only as links and their text is not included.`,
      },
      {
        name: 'max_chars',
        type: 'integer',
        required: false,
        description: `Maximum number of characters of the content body to return. Omit to return from offset to the end.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Character offset into the content body to start from. Combine with max_chars to page through long content. Defaults to 0 (start of body).`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_doc',
    description: `Retrieve detailed metadata for a single Dovetail doc by its unique ID.`,
    params: [
      {
        name: 'doc_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail doc to retrieve.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_doc_comment',
    description: `Retrieve a single comment on a Dovetail doc by its unique identifier.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the comment to retrieve.`,
      },
      {
        name: 'doc_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail doc that contains the comment.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_doc_content',
    description: `Export and retrieve the complete content of a Dovetail doc in markdown format.`,
    params: [
      {
        name: 'doc_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail doc whose content should be exported.`,
      },
      {
        name: 'max_chars',
        type: 'integer',
        required: false,
        description: `Maximum number of characters of the content body to return. Omit to return from offset to the end.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Character offset into the content body to start from. Combine with max_chars to page through long content. Defaults to 0 (start of body).`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_dovetail_projects',
    description: `Browse and discover all projects in the Dovetail workspace. Projects are the primary container for research data, docs, and insights.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `Filter projects by the folder they belong to. Optional — omit to list projects across all folders.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of projects to return per page. Optional.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous response. Pass this to retrieve the next page of results. Optional.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Filter projects by title. Optional.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_field',
    description: `Retrieve a single custom field definition by its unique identifier.`,
    params: [
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the custom field to retrieve.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_file',
    description: `Retrieve metadata for a single file attachment by its unique identifier.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the file attachment to retrieve metadata for.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_folder',
    description: `Retrieve a single folder by its unique identifier, including its metadata.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail folder to retrieve.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_folder_contents',
    description: `List all items contained directly within a specific folder — projects, docs, and channels.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the folder whose contents you want to list.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return in a single page of results. Optional.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous response. Pass this to retrieve the next page of results. Optional.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_highlight',
    description: `Retrieve a single highlight by its unique identifier, including its content and associated tags.`,
    params: [
      {
        name: 'highlight_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the highlight to retrieve.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_insight_content',
    description: `(Deprecated — use get_doc_content instead.) Export and retrieve the complete content of an insight in markdown format.`,
    params: [
      {
        name: 'insight_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the insight whose content to retrieve.`,
      },
      {
        name: 'max_chars',
        type: 'integer',
        required: false,
        description: `Maximum number of characters of the content body to return. Omit to return from offset to the end.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Character offset into the content body to start from. Combine with max_chars to page through long content. Defaults to 0 (start of body).`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_project',
    description: `Retrieve metadata for a single Dovetail project by its unique identifier.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail project to retrieve.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_project_data',
    description: `Retrieve detailed metadata and information about a specific research data entry.`,
    params: [
      {
        name: 'data_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the research data entry to retrieve.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_project_highlights',
    description: `Retrieve customer feedback highlights and key quotes from a Dovetail project.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail project whose highlights you want to retrieve.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of highlights to return per page. Use with start_cursor for pagination.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor to retrieve the next page of highlights. Obtained from the previous response.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_project_insight',
    description: `(Deprecated — use get_doc instead.) Retrieve a specific insight by its unique identifier.`,
    params: [
      {
        name: 'insight_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the insight to retrieve.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_tag',
    description: `Retrieve a single tag by its unique identifier, including its title and color.`,
    params: [
      {
        name: 'tag_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the tag to retrieve.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_get_user',
    description: `Retrieve a single workspace member's profile by their unique identifier.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the workspace member to retrieve.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_list_channel_data',
    description: `List the raw data points (e.g. app reviews, NPS responses, support tickets) in a Dovetail channel.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail channel whose data points you want to list.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of data points to return per page. Defaults to the server's default page size if omitted.`,
      },
      {
        name: 'source_timestamp_from',
        type: 'string',
        required: false,
        description: `Filter results to data points with a source timestamp on or after this ISO 8601 value. Optional.`,
      },
      {
        name: 'source_timestamp_to',
        type: 'string',
        required: false,
        description: `Filter results to data points with a source timestamp on or before this ISO 8601 value. Optional.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous list call. Pass this value to retrieve the next page of results.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_list_channel_themes',
    description: `Retrieve all AI-generated themes for a Dovetail channel. Themes are AI-generated clusters of related feedback.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail channel whose AI-generated themes you want to retrieve.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of themes to return per page. Optional.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous list call. Pass this value to retrieve the next page of results. Optional.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_list_channels',
    description: `Browse and discover all channels in the Dovetail workspace. Channels are automated analysis pipelines processing high-volume customer feedback into structured insights.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `Filter channels by the ID of a specific folder. If omitted, channels from all folders are returned.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of channels to return per page. Must be between 1 and 100. Defaults to the server's default page size if omitted.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous list call. Pass this value to retrieve the next page of results.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_list_contacts',
    description: `Browse the contacts database in the Dovetail workspace. Contacts are research participants or customers linked to data entries.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of contacts to return per page. Optional.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter contacts by name. Optional.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching the next page of results. Pass the cursor returned from a previous response. Optional.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_list_doc_comments',
    description: `Retrieve all comments on a specific Dovetail doc, returned in chronological order.`,
    params: [
      {
        name: 'doc_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail doc whose comments should be retrieved.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of comments to return per page. Optional.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous list call. Pass this value to retrieve the next page of results. Optional.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_list_docs',
    description: `Browse and discover all docs in the Dovetail workspace. Docs are rich-text documents used for insights, reports, and notes.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of docs to return in a single response. Use with start_cursor for pagination.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `Filter docs to only those belonging to the specified project.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned from a previous response. Pass this value to retrieve the next page of docs.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_list_fields',
    description: `Retrieve all custom fields defined on a Dovetail project. Fields are user-defined metadata attributes attached to data entries.`,
    params: [
      {
        name: 'field_set_type',
        type: 'string',
        required: true,
        description: `The field set type to filter fields by.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail project whose custom fields you want to list.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of fields to return per page. Optional.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous list call. Pass this value to retrieve the next page of results. Optional.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_list_folders',
    description: `Browse all folders in the Dovetail workspace. Folders organize projects, docs, and channels.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of folders to return per page. Defaults to the server's default page size if omitted.`,
      },
      {
        name: 'parent_folder_id',
        type: 'string',
        required: false,
        description: `Filter folders to only those nested within the specified parent folder. Optional.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous list call. Pass this value to retrieve the next page of results.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Filter folders by title. Optional.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_list_personal_docs',
    description: `Retrieve all docs authored by or assigned to a specific user in the Dovetail workspace.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the user whose personal docs should be retrieved.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of docs to return in a single response. Use with start_cursor for pagination.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned from a previous response. Pass this value to retrieve the next page of docs.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_list_project_data',
    description: `Browse and discover all research data entries within a specific Dovetail project.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail project whose data entries you want to list.`,
      },
      {
        name: 'created_at_from',
        type: 'string',
        required: false,
        description: `Filter data entries created on or after this ISO 8601 timestamp. Optional.`,
      },
      {
        name: 'created_at_to',
        type: 'string',
        required: false,
        description: `Filter data entries created on or before this ISO 8601 timestamp. Optional.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of data entries to return per page. Optional.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous response. Pass this to retrieve the next page of results. Optional.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Filter data entries by title. Optional.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_list_project_insights',
    description: `(Deprecated — use list_docs instead.) List insights within a Dovetail project.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail project whose insights to list.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of insights to return per page. Optional.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching the next page of results. Pass the cursor returned from a previous response. Optional.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_list_project_templates',
    description: `List all project templates available in the Dovetail workspace.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of templates to return per page. Optional.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous list call. Pass this value to retrieve the next page of results. Optional.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_list_tags',
    description: `Browse and discover tags in the Dovetail workspace, scoped to a specific project.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Dovetail project whose tags you want to list.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of tags to return per page. Use with start_cursor for pagination.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor to retrieve the next page of tags. Obtained from the previous response.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_list_users',
    description: `List all members of the Dovetail workspace, including their roles and contact information.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Filter workspace members by email. Optional.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of workspace members to return per page. Optional.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter workspace members by name. Optional.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching the next page of results. Pass the cursor returned from a previous response. Optional.`,
      },
    ],
  },
  {
    name: 'dovetailmcp_search_workspace',
    description: `Perform powerful text-based search across all content types in the Dovetail workspace — projects, docs, data, highlights, and contacts.`,
    params: [
      {
        name: 'date_field',
        type: 'string',
        required: false,
        description: `Which timestamp the date filter applies to. Defaults to CREATED. Has no effect unless date_from and date_to are both provided.`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Start of the date range filter, as an ISO 8601 datetime string. Must be provided together with date_to.`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `End of the date range filter, as an ISO 8601 datetime string. Must be provided together with date_from.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of search results to return per page. Optional.`,
      },
      {
        name: 'location_ids',
        type: 'array',
        required: false,
        description: `Scope results to objects located inside these folders or projects. Accepts folder and/or project IDs. Folder IDs are expanded recursively to include all nested sub-folders and their projects.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of items to skip for pagination (default 0). Optional.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `The text search query to run across all content in the Dovetail workspace. Omit or pass an empty string to list all items of the chosen types.`,
      },
      {
        name: 'types',
        type: 'array',
        required: false,
        description: `Content types to include in search results (default: all types).`,
      },
    ],
  },
]
