import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'grainmcp_add_clips_to_story',
    description: `Adds one or more clips to an existing story. Use list_stories or fetch_story to find the story ID, and create_clip or list_clips to get clip IDs.`,
    params: [
      {
        name: 'clip_ids',
        type: 'array',
        required: true,
        description: `List of clip IDs to add to the story. Use create_clip or list_clips to get clip IDs.`,
      },
      {
        name: 'story_id',
        type: 'string',
        required: true,
        description: `ID of the story to add clips to.`,
      },
    ],
  },
  {
    name: 'grainmcp_add_recordings_to_collection',
    description: `Adds one or more recordings to an existing collection (also known as a playlist) by recording ID. Use list_meetings or search_in_transcripts first to find recording IDs.`,
    params: [
      {
        name: 'collection_id',
        type: 'string',
        required: true,
        description: `The collection ID to add recordings to.`,
      },
      {
        name: 'recording_ids',
        type: 'array',
        required: true,
        description: `Recording IDs to add to the collection.`,
      },
    ],
  },
  {
    name: 'grainmcp_add_recordings_to_project',
    description: `Adds one or more recordings to an existing project by recording ID. Use list_meetings or search_in_transcripts first to find recording IDs.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The project ID to add recordings to.`,
      },
      {
        name: 'recording_ids',
        type: 'array',
        required: true,
        description: `Recording IDs to add to the project.`,
      },
    ],
  },
  {
    name: 'grainmcp_create_clip',
    description: `Creates a clip on a recording between the given timestamps.
Use search_in_transcripts first to find the recording and relevant transcript timestamps,
then call this tool with the meeting ID and start/end timestamps.
Choose start_ms and end_ms to capture a complete thought or topic — avoid cutting off mid-sentence.
Invalid ranges (start_ms >= end_ms, or end_ms past the recording's duration) returns an error.
`,
    params: [
      { name: 'clip_title', type: 'string', required: true, description: `Title for the clip.` },
      {
        name: 'end_ms',
        type: 'integer',
        required: true,
        description: `Timestamp in milliseconds where the clip should end.`,
      },
      {
        name: 'meeting_id',
        type: 'string',
        required: true,
        description: `The meeting ID to create a clip on.`,
      },
      {
        name: 'start_ms',
        type: 'integer',
        required: true,
        description: `Timestamp in milliseconds where the clip should start.`,
      },
    ],
  },
  {
    name: 'grainmcp_create_collection',
    description: `Creates a new empty collection (also known as a playlist) with the given title.
The collection is created with restricted visibility (only you can see it).
Use add_recordings_to_collection to add meetings, and update_collection_share_state
to change visibility.
`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title for the new collection.`,
      },
    ],
  },
  {
    name: 'grainmcp_create_project',
    description: `Creates a new empty project with the given title. The project is created with restricted visibility (only you can see it). Use add_recordings_to_project to add meetings, and update_project_share_state to change visibility.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title for the new project.`,
      },
    ],
  },
  {
    name: 'grainmcp_create_smart_topic',
    description: `Creates a new smart topic in your Grain workspace. A smart topic is a saved classifier
that marks where meetings discuss a given subject, based on example keywords and phrases.
Provide 1-50 examples: short examples (1-2 words) are treated as keywords, longer ones as
semantic phrases.

Only workspace admins can create smart topics, and the topic is associated with your team.
Matching runs asynchronously: existing meetings are scored over the following minutes, so
the new topic may return no meetings immediately when used with the \`smart_topics\` filter.
To reconfigure an existing topic, use the Grain app — this tool only creates new topics.
`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `A short description of what the topic captures.`,
      },
      {
        name: 'examples',
        type: 'array',
        required: true,
        description: `Example keywords (1-2 words) and phrases that exemplify the topic. 1-50 items, each at least 3 characters.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The smart topic name (also created as a tag). Must start with a letter or digit, followed by letters, digits, or hyphens — no spaces or other symbols.`,
      },
      {
        name: 'match_scope',
        type: 'string',
        required: false,
        description: `Which meetings to match: all, only external (with guests), or only internal. Defaults to all.`,
      },
      {
        name: 'speaker_scope',
        type: 'string',
        required: false,
        description: `Whose speech to match against: all speakers, external speakers, or internal speakers. Defaults to all.`,
      },
    ],
  },
  {
    name: 'grainmcp_create_story',
    description: `Creates a new story with the given title.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title for the new story.`,
      },
      {
        name: 'clip_ids',
        type: 'array',
        required: false,
        description: `Optional list of clip IDs to be added to the story.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the story.`,
      },
    ],
  },
  {
    name: 'grainmcp_fetch_collection',
    description: `Fetches detailed information about a single Grain collection (also known as a playlist) by ID,
including the list of recordings it contains with their URLs.
`,
    params: [
      { name: 'collection_id', type: 'string', required: true, description: `ID of a collection.` },
    ],
  },
  {
    name: 'grainmcp_fetch_deal',
    description: `Fetches information about a single HubSpot deal by ID.
In addition to returning the same data as returned by list_all_deals, this returns
data about all the activity that has occurred on the deal.
`,
    params: [{ name: 'deal_id', type: 'string', required: true, description: `ID of a deal.` }],
  },
  {
    name: 'grainmcp_fetch_meeting',
    description: `Fetches information about a single Grain meeting by ID.
The response format is the same as is returned by list_meetings.
`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `ID of a meeting.` },
    ],
  },
  {
    name: 'grainmcp_fetch_meeting_action_items',
    description: `Fetches the action items extracted from a single Grain meeting by ID.
Each action item includes the task description, timestamp, status (pending or completed),
the assignee (person_id and name, or null when unassigned), and the due date (or null
when not set). \`end_timestamp_ms\` is null when the action item has no end time.
In some cases, older meetings may not have had action items generated for them.
`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `ID of a meeting.` },
    ],
  },
  {
    name: 'grainmcp_fetch_meeting_coaching_feedback',
    description: `Fetches AI-generated sales coaching feedback and scorecard for a single Grain meeting by ID.
The response format is the same as is returned by list_coaching_feedback.
`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `ID of a meeting.` },
    ],
  },
  {
    name: 'grainmcp_fetch_meeting_notes',
    description: `Fetches the AI notes payload from a single Grain meeting by ID.
In some cases, older meetings may not have had notes generated for them. In these cases
you can use \`fetch_meeting_transcript\` instead to determine the content of the meeting.
`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `ID of a meeting.` },
    ],
  },
  {
    name: 'grainmcp_fetch_meeting_transcript',
    description: `Fetches the full transcript of a single Grain meeting by ID. Returns the entire
conversation as markdown, which can be large for long meetings.
`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `ID of a meeting.` },
    ],
  },
  {
    name: 'grainmcp_fetch_project',
    description: `Fetches detailed information about a single Grain project by ID,
including the list of recordings it contains with their URLs.
`,
    params: [
      { name: 'project_id', type: 'string', required: true, description: `ID of a project.` },
    ],
  },
  {
    name: 'grainmcp_fetch_story',
    description: `Fetches detailed information about a single Grain story by ID, including its items
(clips and text sections). Use list_stories first to find story IDs.
`,
    params: [
      {
        name: 'story_id',
        type: 'string',
        required: true,
        description: `ID of the story to fetch.`,
      },
    ],
  },
  {
    name: 'grainmcp_fetch_user_recording_notes',
    description: `Fetches the current user's private notes for a single Grain meeting by ID. Returns the notes as markdown text, or a message if no notes exist.`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `ID of a meeting.` },
    ],
  },
  {
    name: 'grainmcp_get_dossier_for_company',
    description: `Fetches the Company Intelligence dossier for a single company by \`company_id\`
(the id returned by \`search_companies\`). The dossier is returned as markdown plus
metadata. If the company exists but has no dossier generated yet, \`markdown\` and
the metadata fields are null. Read-only: this never triggers dossier generation.
`,
    params: [
      {
        name: 'company_id',
        type: 'string',
        required: true,
        description: `Company id fetched using \`search_companies\`.`,
      },
    ],
  },
  {
    name: 'grainmcp_list_all_deals',
    description: `List status of hubspot-linked deals that are synced in Grain.
If the list contains more than \`limit\` deals, the response will also contain a
non-null \`cursor\` value that can be used to fetch the next page of deals in the list
by calling the tool again and passing the \`cursor\` along with the same \`filters\`.
The list will be empty if there are no deals matching the supplied filters.
`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Optional cursor value from a previous request in order to fetch the next page of results.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Optional filters that can be used to reduce the result set of deals that are searched against.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per request page. Value should be between 1 and 20. If not specified, the default is 10.`,
      },
    ],
  },
  {
    name: 'grainmcp_list_attended_meetings',
    description: `Returns a filtered list of Grain meetings you have attended, ordered by most recent.
If the list contains more than \`limit\` meetings, the response will also contain a
non-null \`cursor\` value that can be used to fetch the next page of meetings in the list
by calling the tool again and passing the \`cursor\` along with the same \`filters\`.
The list will be empty if there are no meetings matching the supplied filters.
If also looking to include meetings the user didn't attend, use \`list_meetings\` instead.
`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Optional cursor value from a previous request in order to fetch the next page of results.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Optional filters that can be used to reduce the result set of meetings that are searched against.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per request page. Value should be between 1 and 20. If not specified, the default is 10.`,
      },
    ],
  },
  {
    name: 'grainmcp_list_clips',
    description: `Returns a paginated list of Grain clips you have access to, ordered by most recent.
Clips are short segments from meeting recordings.
If the list contains more than \`limit\` clips, the response will also contain a
non-null \`cursor\` value that can be used to fetch the next page by calling the tool again.
Only returns clips whose media has finished processing, so newly-created clips may take
a few minutes to appear.
`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Optional cursor value from a previous request in order to fetch the next page of results.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Optional filters to narrow down the list of clips.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per request page. Value should be between 1 and 20. If not specified, the default is 10.`,
      },
    ],
  },
  {
    name: 'grainmcp_list_coaching_feedback',
    description: `List AI-generated sales-coaching feedback and scorecards for a filtered set of meetings.
If the list contains more than \`limit\` meetings, the response will also contain a
non-null \`cursor\` value that can be used to fetch the next page of meetings in the list
by calling the tool again and passing the \`cursor\` along with the same \`filters\`.
The list will be empty if there are no meetings matching the supplied filters.
`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Optional cursor value from a previous request in order to fetch the next page of results.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Optional filters that can be used to reduce the result set of meetings that are searched against.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per request page. Value should be between 1 and 20. If not specified, the default is 10.`,
      },
    ],
  },
  {
    name: 'grainmcp_list_collections',
    description: `Returns a paginated list of Grain collections (also known as playlists) you have access to,
ordered by most recent.
A collection is a curated group of meetings (recordings) that belong together.
If the list contains more than \`limit\` collections, the response will also contain a
non-null \`cursor\` value that can be used to fetch the next page of collections in the list
by calling the tool again and passing the \`cursor\` along with the same \`filters\`.
The list will be empty if there are no collections matching the supplied filters.
`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Optional cursor value from a previous request in order to fetch the next page of results.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Optional filters to narrow down the list of collections.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per request page. Value should be between 1 and 20. If not specified, the default is 10.`,
      },
    ],
  },
  {
    name: 'grainmcp_list_meetings',
    description: `Returns a filtered list of Grain meetings you have access to, ordered by most recent.
If the list contains more than \`limit\` meetings, the response will also contain a
non-null \`cursor\` value that can be used to fetch the next page of meetings in the list
by calling the tool again and passing the \`cursor\` along with the same \`filters\`.
The list will be empty if there are no meetings matching the supplied filters.
If only looking for meetings the user attended, use \`list_attended_meetings\` instead.
`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Optional cursor value from a previous request in order to fetch the next page of results.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Optional filters that can be used to reduce the result set of meetings that are searched against.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per request page. Value should be between 1 and 20. If not specified, the default is 10.`,
      },
    ],
  },
  {
    name: 'grainmcp_list_open_deals',
    description: `List status of open hubspot-linked deals that are synced in Grain.
If the list contains more than \`limit\` deals, the response will also contain a
non-null \`cursor\` value that can be used to fetch the next page of deals in the list
by calling the tool again and passing the \`cursor\` along with the same \`filters\`.
The list will be empty if there are no open deals matching the supplied filters.
If also looking to include closed deals, use \`list_all_deals\` instead.
`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Optional cursor value from a previous request in order to fetch the next page of results.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Optional filters that can be used to reduce the result set of deals that are searched against.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per request page. Value should be between 1 and 20. If not specified, the default is 10.`,
      },
    ],
  },
  {
    name: 'grainmcp_list_projects',
    description: `Returns a paginated list of Grain projects you have access to, ordered by most recent.
A project is a curated group of meetings (recordings) that belong together.
If the list contains more than \`limit\` projects, the response will also contain a
non-null \`cursor\` value that can be used to fetch the next page of projects in the list
by calling the tool again and passing the \`cursor\` along with the same \`filters\`.
The list will be empty if there are no projects matching the supplied filters.
`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Optional cursor value from a previous request in order to fetch the next page of results.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Optional filters to narrow down the list of projects.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per request page. Value should be between 1 and 20. If not specified, the default is 10.`,
      },
    ],
  },
  {
    name: 'grainmcp_list_smart_topics',
    description: `Lists the smart topics configured in your Grain workspace. Smart topics are saved
classifiers that mark where meetings discuss a given subject. Use the returned \`id\`
values with the \`smart_topics\` filter on the meeting-listing tools (e.g. list_meetings)
to find meetings matching a topic. Deactivated topics are hidden unless
\`include_inactive\` is true.
`,
    params: [
      {
        name: 'include_inactive',
        type: 'boolean',
        required: false,
        description: `Include deactivated smart topics in the result. Defaults to false.`,
      },
    ],
  },
  {
    name: 'grainmcp_list_stories',
    description: `Returns a paginated list of Grain stories you have access to, ordered by most recent.
Stories are curated collections of clips and text sections created from meetings.
If the list contains more than \`limit\` stories, the response will also contain a
non-null \`cursor\` value that can be used to fetch the next page by calling the tool again.
`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Optional cursor value from a previous request in order to fetch the next page of results.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Optional filters to narrow down the list of stories.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per request page. Value should be between 1 and 20. If not specified, the default is 10.`,
      },
    ],
  },
  {
    name: 'grainmcp_list_workspace_users',
    description: `Get information about all the users in the logged-in Grain user's workspace. Each user's person ID is also returned and can be used to list recordings attended by that person.`,
    params: [],
  },
  {
    name: 'grainmcp_my_settings',
    description: `Get your personal settings.
For overrideable settings, a null value means the team setting is being applied.
You can use \`update_my_settings\` to change these settings.
`,
    params: [],
  },
  {
    name: 'grainmcp_my_team',
    description: `Get the settings of the team you belong to.
You can use \`my_settings\` to see your personal setting overrides.
`,
    params: [],
  },
  {
    name: 'grainmcp_myself',
    description: `Get information about the logged-in Grain user.`,
    params: [],
  },
  {
    name: 'grainmcp_resolve_urls',
    description: `Resolves canonical shareable URLs for Grain entities (meetings, clips, collections, stories) by ID.
Always prefer this tool over constructing URLs yourself; hand-built URLs are frequently wrong.
Supported \`media_type\` values: \`recording\`, \`clip\`, \`collection\`, \`story\`.
Each returned item contains either a \`url\` on success or an \`error\` string if the entity is not
accessible to the current user.
`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `List of entity references to resolve URLs for.`,
      },
    ],
  },
  {
    name: 'grainmcp_search_companies',
    description: `Returns filtered lists of companies that were participants of Grain meetings you have
access to.

Use one call with all requested company names when the user asks about multiple
companies. Set \`limit\` low, usually 1-3, when company names are specific.
`,
    params: [
      {
        name: 'search_strings',
        type: 'array',
        required: true,
        description: `Company names or domains to search for. Pass all requested companies in one call.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Optional filters that can be used to reduce the result set of meetings that are searched against.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per search string. Value should be between 1 and 20. If not specified, the default is 3.`,
      },
    ],
  },
  {
    name: 'grainmcp_search_in_transcripts',
    description: `Searches transcripts of Grain meetings and returns the matching segments rather than
the full transcript. Useful for locating specific content, topics, quotes, decisions,
action items, or moments across one or many meetings without loading entire transcripts.

Uses hybrid semantic + keyword search over transcript segments — coherent conversation
chunks annotated with summaries, topics, entities, and speaker info. Results are
grouped by meeting and ordered by relevance.
`,
    params: [
      {
        name: 'search_queries',
        type: 'array',
        required: true,
        description: `Array of 1-3 search queries optimized for hybrid BM25 + vector search over meeting transcript segments.
Segments group related discussion into chunks with descriptive summaries.
BM25 keyword matching against summaries is the strongest signal.

Generate exactly 3 queries:
1. Extract key nouns, names, and actions into a dense keyword query (e.g. "Lisa user data export Auth0 Clerk")
2. Include the keywords PLUS plausible co-occurring topics from the same discussion segment (e.g. "Lisa data export migration Auth0 Clerk switching authentication")
3. A synonym/rephrasing variation (e.g. "Lisa handle account data transfer auth provider migration")

Rules:
- ALWAYS preserve person names, product names, dates, and specific terms
- Keep queries keyword-dense, no filler words
- Do NOT write conversational/spoken-style queries
`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Optional filters that can be used to reduce the result set of meetings that are searched against.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per request page. Value should be between 1 and 50. If not specified, the default is 10.`,
      },
      {
        name: 'meeting_ids',
        type: 'array',
        required: false,
        description: `Optional list of meeting IDs to restrict the search to. When provided, only these meetings will be searched. Can be combined with filters for further narrowing.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip for pagination. Use with \`limit\` to page through results beyond the first page. Defaults to 0.`,
      },
    ],
  },
  {
    name: 'grainmcp_search_persons',
    description: `Returns a filtered list of persons that were participants of Grain meetings you have
access to.
`,
    params: [
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Optional filters that can be used to reduce the result set of meetings that are searched against.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return per request page. Value should be between 1 and 20. If not specified, the default is 10.`,
      },
      {
        name: 'search_string',
        type: 'string',
        required: false,
        description: `Only search persons whose name or email contains the specified substring.`,
      },
    ],
  },
  {
    name: 'grainmcp_tag_meetings',
    description: `Add or remove a tag from one or more meetings by recording ID. Creates the tag if it doesn't exist (on add).`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Whether to add or remove the tag.`,
      },
      {
        name: 'recording_ids',
        type: 'array',
        required: true,
        description: `Recording IDs to tag or untag.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: true,
        description: `The tag name to add or remove. Must start with a letter or digit, followed by letters, digits, or hyphens.`,
      },
    ],
  },
  {
    name: 'grainmcp_update_collection_share_state',
    description: `Changes the visibility of a collection (also known as a playlist). Options: 'restricted' (only shared users), 'workspace' (all workspace members), 'public' (anyone with the link).`,
    params: [
      {
        name: 'collection_id',
        type: 'string',
        required: true,
        description: `The collection ID to update.`,
      },
      {
        name: 'share_state',
        type: 'string',
        required: true,
        description: `The new visibility level for the collection.`,
      },
    ],
  },
  {
    name: 'grainmcp_update_my_settings',
    description: `Update your personal settings.
Set a field to null to unset your override and fall back to your team's setting.
`,
    params: [
      {
        name: 'auto_record_mode_external',
        type: 'string',
        required: false,
        description: `Overrideable
Defines if and how External Meetings (with external participants) for this user should be automatically recorded.

- bot           Eligible meetings will be autorecorded using Grain's bot recorders.
- local_capture Eligible meetings will be autorecorded using the user's Grain desktop capture.
- none          Eligible meetings won't be recorded
- null          Unsets the override, falling back to the team setting.
`,
      },
      {
        name: 'auto_record_mode_internal',
        type: 'string',
        required: false,
        description: `Overrideable
Defines if and how Internal Meetings (w/no external participants) for this user should be automatically recorded.

- bot           Eligible meetings will be autorecorded using Grain's bot recorders.
- local_capture Eligible meetings will be autorecorded using the user's Grain desktop capture.
- none          Eligible meetings won't be recorded
- null          Unsets the override, falling back to the team setting.
`,
      },
      {
        name: 'auto_record_mode_unscheduled',
        type: 'string',
        required: false,
        description: `Overrideable
Defines if and how Unscheduled Meetings (can't determine beforehand if Internal or External) for this user should
be automatically recorded.

- bot           Eligible meetings will be autorecorded using Grain's bot recorders.
- local_capture Eligible meetings will be autorecorded using the user's Grain desktop capture.
- none          Eligible meetings won't be recorded
- null          Unsets the override, falling back to the team setting.
`,
      },
      {
        name: 'auto_share_recordings_external',
        type: 'boolean',
        required: false,
        description: `Overrideable
Defines if bot recordings of External Meetings (with external participants) will be automatically shared to the
user's team. Set to null to unset the override, falling back to the team setting.
`,
      },
      {
        name: 'auto_share_recordings_internal',
        type: 'boolean',
        required: false,
        description: `Overrideable
Defines if bot recordings of Internal Meetings (w/no external participants) will be automatically shared to the
user's team. Set to null to unset the override, falling back to the team setting.
`,
      },
      {
        name: 'default_recordings_share_state',
        type: 'string',
        required: false,
        description: `Overrideable
Defines authorization for a recording with said recording's link.

- public     Anyone with the recording link will be able to see it.
- workspace  Anyone in your workspace with the recording link will be able to see it.
- restricted Only people with explicit access will be able to see the recording.
- null       Unsets the override, falling back to the team setting.
`,
      },
      {
        name: 'local_auto_share_recordings_external',
        type: 'boolean',
        required: false,
        description: `Overrideable
Defines if local_capture recordings of External Meetings (with external participants) will be automatically
shared to the user's team. Set to null to unset the override, falling back to the team setting.
`,
      },
      {
        name: 'local_auto_share_recordings_internal',
        type: 'boolean',
        required: false,
        description: `Overrideable
Defines if local_capture recordings of Internal Meetings (w/no external participants) will be automatically
shared to the user's team. Set to null to unset the override, falling back to the team setting.
`,
      },
      {
        name: 'local_recap_share_mode',
        type: 'string',
        required: false,
        description: `Overrideable
Defines if and to whom the email recap will be shared with after a local_capture recording.

- all      Email Recap will be sent to all participants.
- internal Email Recap will be sent to all internal participants.
- none     Email Recap will not be sent.
- null     Unsets the override, falling back to the team setting.
`,
      },
      {
        name: 'recap_share_mode',
        type: 'string',
        required: false,
        description: `Overrideable
Defines if and to whom the email recap will be shared with after a bot recording.

- all      Email Recap will be sent to all participants.
- internal Email Recap will be sent to all internal participants.
- none     Email Recap will not be sent.
- null     Unsets the override, falling back to the team setting.
`,
      },
    ],
  },
  {
    name: 'grainmcp_update_project_share_state',
    description: `Changes the visibility of a project. Options: 'restricted' (only shared users), 'workspace' (all workspace members), 'public' (anyone with the link).`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The project ID to update.`,
      },
      {
        name: 'share_state',
        type: 'string',
        required: true,
        description: `The new visibility level for the project.`,
      },
    ],
  },
]
