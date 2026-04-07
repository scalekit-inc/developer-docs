import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'evertrace_cities_list',
    description: `Search available cities by name. Returns city name strings sorted by signal count. Use these values in signal filters for the city field.`,
    params: [
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Number of results per page.`,
      },
      { name: 'page', type: 'string', required: false, description: `Page number for pagination.` },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Case-insensitive partial match on city name (e.g. "san fran"). Omit to list all cities sorted by signal count.`,
      },
    ],
  },
  {
    name: 'evertrace_companies_list',
    description: `Search companies by name or look up by specific IDs. Returns company entity IDs (exe_* format) needed for signal filtering by past_companies.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Look up specific companies by entity ID (exe_* format).`,
      },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Number of results per page.`,
      },
      { name: 'page', type: 'string', required: false, description: `Page number for pagination.` },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Case-insensitive partial match on company name (e.g. "google").`,
      },
    ],
  },
  {
    name: 'evertrace_educations_list',
    description: `Search education institutions by name or look up by specific IDs. Returns institution entity IDs (ede_* format) needed for signal filtering by past_education.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Look up specific institutions by entity ID (ede_* format).`,
      },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Number of results per page.`,
      },
      { name: 'page', type: 'string', required: false, description: `Page number for pagination.` },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Case-insensitive partial match on institution name (e.g. "stanford").`,
      },
    ],
  },
  {
    name: 'evertrace_list_entries_create',
    description: `Add a signal to a list.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The list ID to add the signal to.`,
      },
      { name: 'signal_id', type: 'string', required: true, description: `The signal ID to add.` },
    ],
  },
  {
    name: 'evertrace_list_entries_delete',
    description: `Remove an entry from a list.`,
    params: [
      { name: 'entry_id', type: 'string', required: true, description: `The entry ID to remove.` },
      { name: 'list_id', type: 'string', required: true, description: `The list ID.` },
    ],
  },
  {
    name: 'evertrace_list_entries_get',
    description: `Get a single list entry with its full signal profile.`,
    params: [
      { name: 'entry_id', type: 'string', required: true, description: `The entry ID.` },
      { name: 'list_id', type: 'string', required: true, description: `The list ID.` },
    ],
  },
  {
    name: 'evertrace_list_entries_list',
    description: `List entries in a list with pagination, sorting, and filtering by screening/viewed status.`,
    params: [
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Number of results per page.`,
      },
      { name: 'list_id', type: 'string', required: true, description: `The list ID.` },
      { name: 'page', type: 'string', required: false, description: `Page number for pagination.` },
      {
        name: 'screened_by',
        type: 'array',
        required: false,
        description: `Filter by screening status. Prefix with "-" to exclude (e.g. ["-me", "-others"]).`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Sort field: "entry_created_at" (when added to list) or "signal_discovered_at" (when signal was discovered).`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort direction: "asc" (oldest first) or "desc" (newest first).`,
      },
      {
        name: 'viewed_by',
        type: 'array',
        required: false,
        description: `Filter by viewed status. Prefix with "-" to exclude (e.g. ["-me"]).`,
      },
    ],
  },
  {
    name: 'evertrace_lists_create',
    description: `Create a new list. Provide user IDs in accesses to share the list with teammates. The creator is automatically granted access.`,
    params: [
      {
        name: 'accesses',
        type: 'array',
        required: false,
        description: `Array of user IDs to share this list with. Pass an empty array for private list.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the new list.` },
    ],
  },
  {
    name: 'evertrace_lists_delete',
    description: `Permanently delete a list and all its entries.`,
    params: [{ name: 'id', type: 'string', required: true, description: `The list ID to delete.` }],
  },
  {
    name: 'evertrace_lists_get',
    description: `Get a list by ID with its entries, accesses, and creator information.`,
    params: [{ name: 'id', type: 'string', required: true, description: `The list ID.` }],
  },
  {
    name: 'evertrace_lists_list',
    description: `List all lists the current user has access to in evertrace.ai.`,
    params: [],
  },
  {
    name: 'evertrace_lists_update',
    description: `Rename a list.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The list ID to update.` },
      { name: 'name', type: 'string', required: true, description: `New name for the list.` },
    ],
  },
  {
    name: 'evertrace_searches_create',
    description: `Create a new saved search with filters. Each filter requires a key, operator, and value. Provide sharee user IDs to share the search with teammates.`,
    params: [
      {
        name: 'emoji',
        type: 'string',
        required: false,
        description: `Optional emoji for the saved search.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: true,
        description: `Array of filter objects. Each filter has: key (e.g. "country", "industry", "score"), operator (e.g. "in"), and value (e.g. "India").`,
      },
      {
        name: 'sharees',
        type: 'array',
        required: true,
        description: `Array of user IDs to share this search with.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title of the saved search (max 50 characters).`,
      },
      {
        name: 'visited_at',
        type: 'number',
        required: true,
        description: `Epoch timestamp in milliseconds for when the search was last visited.`,
      },
    ],
  },
  {
    name: 'evertrace_searches_delete',
    description: `Permanently delete a saved search.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The saved search ID to delete.` },
    ],
  },
  {
    name: 'evertrace_searches_duplicate',
    description: `Duplicate a saved search, creating a copy with the same filters and settings.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The saved search ID to duplicate.`,
      },
    ],
  },
  {
    name: 'evertrace_searches_get',
    description: `Get a saved search by ID with its filters and sharees.`,
    params: [{ name: 'id', type: 'string', required: true, description: `The saved search ID.` }],
  },
  {
    name: 'evertrace_searches_list',
    description: `List all saved searches accessible to the current user in evertrace.ai.`,
    params: [],
  },
  {
    name: 'evertrace_searches_signals_list',
    description: `List signals matching a saved search's filters with pagination.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The saved search ID.` },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Number of results per page.`,
      },
      { name: 'page', type: 'string', required: false, description: `Page number for pagination.` },
    ],
  },
  {
    name: 'evertrace_searches_update',
    description: `Update a saved search. All fields are optional — only provided fields are changed. If filters are provided, they replace all existing filters. If sharees are provided, they replace the full access list.`,
    params: [
      {
        name: 'emoji',
        type: 'string',
        required: false,
        description: `New emoji for the saved search.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Replaces all existing filters. Each filter has: key, operator, value.`,
      },
      { name: 'id', type: 'string', required: true, description: `The saved search ID to update.` },
      {
        name: 'sharees',
        type: 'array',
        required: false,
        description: `Replaces the full sharee list with these user IDs.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the saved search (max 50 characters).`,
      },
      {
        name: 'visited_at',
        type: 'number',
        required: false,
        description: `Epoch timestamp in milliseconds for when the search was last visited.`,
      },
    ],
  },
  {
    name: 'evertrace_signal_mark_viewed',
    description: `Mark a signal as viewed by the current user.`,
    params: [
      {
        name: 'signal_id',
        type: 'string',
        required: true,
        description: `The ID of the signal to mark as viewed.`,
      },
    ],
  },
  {
    name: 'evertrace_signal_screen',
    description: `Screen a signal, marking it as reviewed by the current user. Screened signals are hidden from default views.`,
    params: [
      {
        name: 'signal_id',
        type: 'string',
        required: true,
        description: `The ID of the signal to screen.`,
      },
    ],
  },
  {
    name: 'evertrace_signal_unscreen',
    description: `Unscreen a signal, making it visible again in default views.`,
    params: [
      {
        name: 'signal_id',
        type: 'string',
        required: true,
        description: `The ID of the signal to unscreen.`,
      },
    ],
  },
  {
    name: 'evertrace_signals_entries',
    description: `Get all list entries for a signal. Shows which lists this signal has been added to.`,
    params: [{ name: 'id', type: 'string', required: true, description: `The signal ID.` }],
  },
  {
    name: 'evertrace_signals_get',
    description: `Get a single talent signal by ID with full profile details including experiences, educations, taggings, views, and screenings.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The signal ID to retrieve.` },
    ],
  },
  {
    name: 'evertrace_signals_list',
    description: `Search and filter talent signals with pagination. Returns full signal profiles including experiences, educations, taggings, views, and screenings.`,
    params: [
      {
        name: 'age',
        type: 'array',
        required: false,
        description: `Filter by age range buckets. Valid values: "Below 25", "25 to 29", "30 to 34", "35 to 39", "40 to 44", "45 to 49", "Above 49".`,
      },
      {
        name: 'city',
        type: 'array',
        required: false,
        description: `Filter by city name (e.g. ["San Francisco"]). Use evertrace_cities_list to search available cities. Prefix with "!" to exclude.`,
      },
      {
        name: 'country',
        type: 'array',
        required: false,
        description: `Filter by country name (e.g. ["United States"]). Prefix with "!" to exclude.`,
      },
      {
        name: 'created_after',
        type: 'string',
        required: false,
        description: `Epoch timestamp in milliseconds. Only returns signals discovered after this point.`,
      },
      {
        name: 'customer_focus',
        type: 'array',
        required: false,
        description: `Filter by target market. Valid values: "B2B", "B2C".`,
      },
      {
        name: 'education_level',
        type: 'array',
        required: false,
        description: `Filter by highest education level. Valid values: "Bachelor", "Master", "PhD or Above", "MBA", "No university degree".`,
      },
      {
        name: 'fullname',
        type: 'string',
        required: false,
        description: `Free-text search on person name (case-insensitive partial match).`,
      },
      {
        name: 'gender',
        type: 'array',
        required: false,
        description: `Filter by gender. Valid values: "man", "woman".`,
      },
      {
        name: 'industry',
        type: 'array',
        required: false,
        description: `Filter by industry vertical (e.g. ["Technology", "Healthcare"]). Prefix with "!" to exclude.`,
      },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Number of results per page.`,
      },
      {
        name: 'origin',
        type: 'array',
        required: false,
        description: `Filter by nationality/origin country (e.g. ["India"]). Prefix with "!" to exclude.`,
      },
      { name: 'page', type: 'string', required: false, description: `Page number for pagination.` },
      {
        name: 'past_companies',
        type: 'array',
        required: false,
        description: `Filter by past employer using company entity IDs in exe_* format. Use evertrace_companies_list to look up IDs.`,
      },
      {
        name: 'past_education',
        type: 'array',
        required: false,
        description: `Filter by past education institution using IDs in ede_* format. Use evertrace_educations_list to look up IDs.`,
      },
      {
        name: 'profile_tags',
        type: 'array',
        required: false,
        description: `Filter by profile background tags. Valid values: "Serial Founder", "VC Backed Founder", "VC Backed Operator", "VC Investor", "YC Alumni", "Big Tech experience", "Big 4 experience", "Banking experience", "Consulting experience".`,
      },
      {
        name: 'region',
        type: 'array',
        required: false,
        description: `Filter by geographic region or US state (e.g. ["Europe", "California"]). Prefix with "!" to exclude.`,
      },
      {
        name: 'score',
        type: 'string',
        required: false,
        description: `Minimum score threshold (1–10). Acts as a >= filter.`,
      },
      {
        name: 'screened_by',
        type: 'array',
        required: false,
        description: `Filter by screening status. Use "me", "others", or user IDs. Prefix with "-" to exclude.`,
      },
      {
        name: 'source',
        type: 'array',
        required: false,
        description: `Filter by data source name. Values are dynamic per workspace.`,
      },
      {
        name: 'time_range',
        type: 'array',
        required: false,
        description: `Absolute date range as [from, to] in YYYY-MM-DD format (e.g. ["2026-01-01", "2026-03-01"]). Mutually exclusive with time_relative.`,
      },
      {
        name: 'time_relative',
        type: 'string',
        required: false,
        description: `Relative time window in days from today (e.g. "30", "60", "90") or epoch ms timestamp. Mutually exclusive with time_range.`,
      },
      {
        name: 'type',
        type: 'array',
        required: false,
        description: `Filter by signal type. Valid values: "New Company", "Stealth Position", "Left Position", "Investor Position", "Board Position", "New Position", "Promoted", "New Patent", "New Grant".`,
      },
    ],
  },
  {
    name: 'evertrace_signals_list_by_linkedin_id',
    description: `Get all signals representing the same person, matched by LinkedIn ID. Useful for finding duplicate or historical signals for the same individual.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The signal ID to match LinkedIn ID from.`,
      },
    ],
  },
]
