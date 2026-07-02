import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'slitemcp_append-blocks',
    description: `Append sliteml content blocks to an existing note, optionally anchoring them before or after a specific block.`,
    params: [
      { name: 'noteId', type: 'string', required: true, description: `The ID of the note to append blocks to.` },
      { name: 'sliteml', type: 'string', required: true, description: `sliteml content blocks to insert. Block IDs are auto-generated and returned in changedContent.` },
      { name: 'afterBlockId', type: 'string', required: false, description: `Block ID to insert after; read from trailing {#blockId} markers in a get-note response.` },
      { name: 'beforeBlockId', type: 'string', required: false, description: `Block ID to insert before; read from trailing {#blockId} markers in a get-note response.` },
      { name: 'returnFullDocument', type: 'boolean', required: false, description: `If true, include the full updated document in the response. Defaults to false.` },
    ],
  },
  {
    name: 'slitemcp_archive-note',
    description: `Archive a note, hiding it from navigation and search until restored.`,
    params: [
      { name: 'noteId', type: 'string', required: true, description: `The ID of the note to archive.` },
    ],
  },
  {
    name: 'slitemcp_ask-slite',
    description: `Ask a question and get an AI-generated answer with source citations from your workspace.`,
    params: [
      { name: 'question', type: 'string', required: true, description: `The question to ask Slite.` },
      { name: 'parentNoteId', type: 'string', required: false, description: `Optional filter to only search within notes under this parent note id.` },
    ],
  },
  {
    name: 'slitemcp_create-channel',
    description: `Create a new channel (top-level container for notes) and become its first member.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the channel to create.` },
      { name: 'iconColor', type: 'string', required: false, description: `Optional icon color. Paired with iconShape.` },
      { name: 'iconShape', type: 'string', required: false, description: `Optional icon shape. Use an icon key like 'rocket' or 'book' (no colons).` },
      { name: 'type', type: 'string', required: false, description: `Channel visibility. "public" (default) is open to all org members, "private" is restricted to invited members.` },
    ],
  },
  {
    name: 'slitemcp_create-collection',
    description: `Create a new collection (structured database of notes) with typed columns.`,
    params: [
      { name: 'columns', type: 'array', required: true, description: `Column definitions for the collection. The Title column is always included automatically.` },
      { name: 'title', type: 'string', required: true, description: `The title of the collection to create.` },
      { name: 'parentNoteId', type: 'string', required: false, description: `Optional ID of the parent note. If not specified, the collection will be created in your personal channel.` },
    ],
  },
  {
    name: 'slitemcp_create-comment-thread',
    description: `Create a new comment thread on a note, optionally anchored to a specific block or highlighted text.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `Plain-text content of the first comment.` },
      { name: 'noteId', type: 'string', required: true, description: `The ID of the note to open the thread on.` },
      { name: 'blockId', type: 'string', required: false, description: `Optional: when anchoring inline, the ID of the block to edit. Same as \`modify-block\`.` },
      { name: 'highlight', type: 'string', required: false, description: `Optional quoted snippet shown alongside the thread in the sidebar.` },
      { name: 'sliteml', type: 'string', required: false, description: `For inline anchoring, the updated block sliteml containing a <comment> tag with the thread ID.` },
    ],
  },
  {
    name: 'slitemcp_create-note',
    description: `Create a new note with a title, optional sliteml content, and optional parent.`,
    params: [
      { name: 'title', type: 'string', required: true, description: `The title of the note to create.` },
      { name: 'contentWidth', type: 'string', required: false, description: `Doc layout: 'regular' (default centered) or 'wide' (expanded).` },
      { name: 'fields', type: 'object', required: false, description: `Field values for collection records, keyed by column ID. Only applies when parentNoteId is a collection.` },
      { name: 'iconColor', type: 'string', required: false, description: `Optional icon color. Paired with iconShape.` },
      { name: 'iconShape', type: 'string', required: false, description: `Optional icon shape. Use an icon key like 'rocket' or 'book' (no colons).` },
      { name: 'parentNoteId', type: 'string', required: false, description: `Optional ID of the parent note. If not specified, the note will be created in your personal channel.` },
      { name: 'sliteml', type: 'string', required: false, description: `Optional sliteml content for the note body. Do not duplicate the title as a heading.` },
    ],
  },
  {
    name: 'slitemcp_get-comment-thread-on-note',
    description: `Retrieve a single comment thread by its note and thread IDs.`,
    params: [
      { name: 'noteId', type: 'string', required: true, description: `The ID of the note the thread belongs to.` },
      { name: 'threadId', type: 'string', required: true, description: `The ID of the comment thread to retrieve.` },
    ],
  },
  {
    name: 'slitemcp_get-note',
    description: `Retrieve a note's content by ID, returning sliteml with block IDs or plain Markdown.`,
    params: [
      { name: 'noteId', type: 'string', required: true, description: `The ID of the note to retrieve.` },
      { name: 'cursor', type: 'string', required: false, description: `Pass the nextCursor from a previous partial response to continue reading the document.` },
      { name: 'endBlockId', type: 'string', required: false, description: `Return only blocks up to and including this one (inclusive). Combine with startBlockId for a slice.` },
      { name: 'format', type: 'string', required: false, description: `Content format to return: 'sliteml' (default, with block IDs) or 'md' (plain Markdown).` },
      { name: 'fullContent', type: 'boolean', required: false, description: `Return the full document. Defaults to true; set false to fetch only a preview.` },
      { name: 'startBlockId', type: 'string', required: false, description: `Return only blocks from this block onward (inclusive). Combine with endBlockId for a slice.` },
    ],
  },
  {
    name: 'slitemcp_get-note-children',
    description: `List child notes under a parent note (paginated).`,
    params: [
      { name: 'noteId', type: 'string', required: true, description: `The ID of the parent note.` },
      { name: 'cursor', type: 'string', required: false, description: `Cursor to use to continue fetching the note children (for pagination when there are more than 50 children).` },
    ],
  },
  {
    name: 'slitemcp_get-user',
    description: `Retrieve a user by ID, including their name, email, and role.`,
    params: [
      { name: 'userId', type: 'string', required: true, description: `The ID of the user to retrieve.` },
    ],
  },
  {
    name: 'slitemcp_get-user-group',
    description: `Retrieve a user group by ID, including its name, description, and members.`,
    params: [
      { name: 'userGroupId', type: 'string', required: true, description: `The ID of the user group to retrieve.` },
    ],
  },
  {
    name: 'slitemcp_list-channels',
    description: `List channels accessible to the current user (paginated).`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination when there are more results.` },
    ],
  },
  {
    name: 'slitemcp_list-comment-threads',
    description: `List all non-archived comment threads on a note, oldest-first, with full content.`,
    params: [
      { name: 'noteId', type: 'string', required: true, description: `The ID of the note to list threads on.` },
    ],
  },
  {
    name: 'slitemcp_list-empty-notes-for-knowledge-management',
    description: `List empty notes for knowledge management, filterable by channel, owner, and pagination cursor.`,
    params: [
      { name: 'channelIdList', type: 'array', required: false, description: `Optional channel IDs to filter notes by channel.` },
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination when there are more results.` },
      { name: 'first', type: 'integer', required: false, description: `Maximum number of notes to return. Defaults to 20.` },
      { name: 'ownerIdList', type: 'array', required: false, description: `Optional user or user group IDs to filter notes by owner.` },
    ],
  },
  {
    name: 'slitemcp_list-inactive-notes-for-knowledge-management',
    description: `List inactive notes for knowledge management, filterable by channel, owner, and pagination cursor.`,
    params: [
      { name: 'channelIdList', type: 'array', required: false, description: `Optional channel IDs to filter notes by channel.` },
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination when there are more results.` },
      { name: 'first', type: 'integer', required: false, description: `Maximum number of notes to return. Defaults to 20.` },
      { name: 'ownerIdList', type: 'array', required: false, description: `Optional user or user group IDs to filter notes by owner.` },
    ],
  },
  {
    name: 'slitemcp_list-notes-for-knowledge-management',
    description: `List notes for knowledge management, filterable by review state, channel, owner, and age.`,
    params: [
      { name: 'channelIdList', type: 'array', required: false, description: `Optional channel IDs to filter notes by channel.` },
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination when there are more results.` },
      { name: 'first', type: 'integer', required: false, description: `Maximum number of notes to return. Defaults to 20.` },
      { name: 'ownerIdList', type: 'array', required: false, description: `Optional user or user group IDs to filter notes by owner.` },
      { name: 'reviewStateList', type: 'array', required: false, description: `Optional filter to return notes in special review states.` },
      { name: 'sinceDaysAgo', type: 'number', required: false, description: `Optional time window for popularity.` },
    ],
  },
  {
    name: 'slitemcp_list-public-notes-for-knowledge-management',
    description: `List public notes for knowledge management, filterable by review state, channel, owner, and age.`,
    params: [
      { name: 'channelIdList', type: 'array', required: false, description: `Optional channel IDs to filter notes by channel.` },
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination when there are more results.` },
      { name: 'first', type: 'integer', required: false, description: `Maximum number of notes to return. Defaults to 20.` },
      { name: 'ownerIdList', type: 'array', required: false, description: `Optional user or user group IDs to filter notes by owner.` },
      { name: 'reviewStateList', type: 'array', required: false, description: `Optional filter to return notes in special review states.` },
      { name: 'sinceDaysAgo', type: 'number', required: false, description: `Optional time window for public notes.` },
    ],
  },
  {
    name: 'slitemcp_list-recently-edited-notes',
    description: `List the last 10 notes recently edited by the current user.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination when there are more results.` },
    ],
  },
  {
    name: 'slitemcp_list-recently-visited-notes',
    description: `List the last 10 notes recently visited by the current user.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination when there are more results.` },
    ],
  },
  {
    name: 'slitemcp_modify-block',
    description: `Replace a single block in a note with new sliteml content, identified by block ID.`,
    params: [
      { name: 'blockId', type: 'string', required: true, description: `ID of the block to replace; read from {#blockId} markers in a get-note response.` },
      { name: 'noteId', type: 'string', required: true, description: `The ID of the note containing the block.` },
      { name: 'sliteml', type: 'string', required: true, description: `Replacement sliteml content for the block. Do not include the block ID in the content.` },
      { name: 'returnFullDocument', type: 'boolean', required: false, description: `If true, include the full updated document in the response. Defaults to false.` },
    ],
  },
  {
    name: 'slitemcp_modify-range',
    description: `Replace a consecutive range of blocks in a note with new sliteml content.`,
    params: [
      { name: 'endBlockId', type: 'string', required: true, description: `ID of the last block in the range to replace (inclusive); must follow startBlockId in document order.` },
      { name: 'noteId', type: 'string', required: true, description: `The ID of the note containing the blocks.` },
      { name: 'sliteml', type: 'string', required: true, description: `Replacement sliteml content. Pass an empty string to delete the range.` },
      { name: 'startBlockId', type: 'string', required: true, description: `ID of the first block in the range to replace (inclusive).` },
      { name: 'returnFullDocument', type: 'boolean', required: false, description: `If true, include the full updated document in the response. Defaults to false.` },
    ],
  },
  {
    name: 'slitemcp_move-note',
    description: `Move a note to become a child of another parent note.`,
    params: [
      { name: 'noteId', type: 'string', required: true, description: `The ID of the note to move.` },
      { name: 'parentNoteId', type: 'string', required: true, description: `The ID of the target parent note to move the note into.` },
    ],
  },
  {
    name: 'slitemcp_remove-blocks',
    description: `Remove one or more blocks from a note by their block IDs.`,
    params: [
      { name: 'blockIds', type: 'array', required: true, description: `The block IDs to remove. Use get-note with format="sliteml" to see available block IDs.` },
      { name: 'noteId', type: 'string', required: true, description: `The ID of the note containing the blocks.` },
    ],
  },
  {
    name: 'slitemcp_reply-to-comment-thread',
    description: `Add a reply to an existing comment thread and return the updated thread.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `Plain-text content of the reply.` },
      { name: 'threadId', type: 'string', required: true, description: `The ID of the comment thread to reply to.` },
    ],
  },
  {
    name: 'slitemcp_resolve-comment-thread',
    description: `Mark a comment thread as resolved.`,
    params: [
      { name: 'threadId', type: 'string', required: true, description: `The ID of the comment thread to resolve.` },
    ],
  },
  {
    name: 'slitemcp_restore-note',
    description: `Restore an archived note, making it visible in navigation and search again.`,
    params: [
      { name: 'noteId', type: 'string', required: true, description: `The ID of the archived note to restore.` },
    ],
  },
  {
    name: 'slitemcp_search-notes',
    description: `Search notes by keywords and return matching titles, IDs, and text highlights.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `The search query to perform.` },
      { name: 'hitsPerPage', type: 'number', required: false, description: `Specify how many notes to return per page.` },
      { name: 'includeArchived', type: 'boolean', required: false, description: `Optional filter to also include archived notes in the search results (default to false).` },
      { name: 'lastEditedAfter', type: 'string', required: false, description: `Optional filter to only return notes edited after a specific date (ISO 8601 format).` },
      { name: 'page', type: 'number', required: false, description: `Used to perform pagination on search.` },
      { name: 'parentNoteId', type: 'string', required: false, description: `Optional filter to only return notes under this parent note id.` },
      { name: 'reviewState', type: 'string', required: false, description: `Optional filter to return notes in a special review state.` },
    ],
  },
  {
    name: 'slitemcp_search-user-groups',
    description: `Search and list user groups in the organization by name.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination when there are more results.` },
      { name: 'query', type: 'string', required: false, description: `Optional search query to filter groups by name.` },
    ],
  },
  {
    name: 'slitemcp_search-users',
    description: `Search and list users in the organization by name or email.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Cursor for pagination when there are more results.` },
      { name: 'query', type: 'string', required: false, description: `Optional search query to filter users by name, email, or username.` },
    ],
  },
  {
    name: 'slitemcp_set-note-review-state',
    description: `Set the review state and optional review owner of a note.`,
    params: [
      { name: 'noteId', type: 'string', required: true, description: `The ID of the note.` },
      { name: 'message', type: 'string', required: false, description: `Optional message. Only applicable for "out_of_date" and "verification_requested" states.` },
      { name: 'reviewState', type: 'string', required: false, description: `The new review state to set. Optional if only updating the review owner.` },
      { name: 'reviewStateManagedBy', type: 'string', required: false, description: `Optional user ID to set as the review owner for this note.` },
      { name: 'reviewStateManagedByUserGroup', type: 'string', required: false, description: `Optional user group ID to set as the review owner for this note. Mutually exclusive with reviewStateManagedBy.` },
    ],
  },
  {
    name: 'slitemcp_unresolve-comment-thread',
    description: `Reopen a previously resolved comment thread.`,
    params: [
      { name: 'threadId', type: 'string', required: true, description: `The ID of the comment thread to unresolve.` },
    ],
  },
  {
    name: 'slitemcp_update-channel',
    description: `Rename a channel or change its icon color and shape.`,
    params: [
      { name: 'channelId', type: 'string', required: true, description: `The ID of the channel to update.` },
      { name: 'iconColor', type: 'string', required: false, description: `Optional new icon color. Pass null to clear.` },
      { name: 'iconShape', type: 'string', required: false, description: `Optional new icon shape. Pick an icon dictionary key (e.g. "book", "rocket") — no colons. Pass null to clear.` },
      { name: 'name', type: 'string', required: false, description: `Optional new name for the channel.` },
    ],
  },
  {
    name: 'slitemcp_update-collection',
    description: `Add or remove columns in a collection (structured database of notes).`,
    params: [
      { name: 'noteId', type: 'string', required: true, description: `The ID of the collection note to update.` },
      { name: 'columns', type: 'array', required: false, description: `New columns to add to the collection.` },
      { name: 'removeColumns', type: 'array', required: false, description: `Column IDs to remove. Errors if any ID does not match an existing column.` },
    ],
  },
  {
    name: 'slitemcp_update-note',
    description: `Update an existing note's title, content, icon, or layout settings.`,
    params: [
      { name: 'noteId', type: 'string', required: true, description: `The ID of the note to update.` },
      { name: 'contentWidth', type: 'string', required: false, description: `Doc layout: 'regular' (default centered) or 'wide' (expanded).` },
      { name: 'fields', type: 'object', required: false, description: `Field values for collection records, keyed by column ID. Only applies when the note is inside a collection.` },
      { name: 'iconColor', type: 'string', required: false, description: `Optional new icon color. Pass null to clear.` },
      { name: 'iconShape', type: 'string', required: false, description: `Optional new icon shape. Use an icon key like 'rocket' or '#collection_table' for collection views.` },
      { name: 'sliteml', type: 'string', required: false, description: `Optional new sliteml content. Replaces the entire note body.` },
      { name: 'title', type: 'string', required: false, description: `Optional new title for the note.` },
    ],
  },
  {
    name: 'slitemcp_verify-note',
    description: `Mark a note as verified, optionally with an expiration date.`,
    params: [
      { name: 'noteId', type: 'string', required: true, description: `The ID of the note to verify.` },
      { name: 'until', type: 'string', required: false, description: `Optional ISO 8601 date in the future when the verification should expire.` },
    ],
  },
]
