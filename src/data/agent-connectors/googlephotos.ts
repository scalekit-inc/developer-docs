import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googlephotos_add_album_enrichment',
    description: `Add a text caption, location, or map enrichment item to an album this app created — Google removed access to a user's pre-existing Photos library in March 2025, so enrichments can only be added to app-owned albums. Provide exactly one enrichment type (text, location, or map) with the fields it needs, and optionally where in the album to place it relative to an existing media item or enrichment. Returns the id of the newly created enrichment item. Use add_album_enrichment after create_album to annotate an album with narrative text, a place, or a route between two places.`,
    params: [
      {
        name: 'album_id',
        type: 'string',
        required: true,
        description: `Identifier of the album to add the enrichment item to. Must be an album created by this app. Obtain the id from a prior create_album or list_albums call.`,
      },
      {
        name: 'enrichment_type',
        type: 'string',
        required: true,
        description: `Which kind of enrichment item to create. "text" adds a caption, "location" pins a single place, and "map" draws a route between two places. Exactly one type is created per call, and only the fields for the chosen type are used.`,
      },
      {
        name: 'destination_latitude',
        type: 'number',
        required: false,
        description: `Latitude of the destination place, in decimal degrees. Only used when enrichment_type is "map". Provide both destination latitude and longitude together, or omit both.`,
      },
      {
        name: 'destination_location_name',
        type: 'string',
        required: false,
        description: `Display name of the destination place for a route. Required when enrichment_type is "map" (location_name/latitude/longitude describe the origin, this describes the destination). Ignored otherwise.`,
      },
      {
        name: 'destination_longitude',
        type: 'number',
        required: false,
        description: `Longitude of the destination place, in decimal degrees. Only used when enrichment_type is "map". Provide both destination latitude and longitude together, or omit both.`,
      },
      {
        name: 'latitude',
        type: 'number',
        required: false,
        description: `Latitude of the place named in location_name, in decimal degrees. Optional even for "location"/"map" — provide both latitude and longitude together, or omit both.`,
      },
      {
        name: 'location_name',
        type: 'string',
        required: false,
        description: `Display name of the place to pin. Required when enrichment_type is "location" (the place itself); used as the origin's name when enrichment_type is "map". Ignored for "text".`,
      },
      {
        name: 'longitude',
        type: 'number',
        required: false,
        description: `Longitude of the place named in location_name, in decimal degrees. Optional even for "location"/"map" — provide both latitude and longitude together, or omit both.`,
      },
      {
        name: 'position',
        type: 'string',
        required: false,
        description: `Where in the album to place the new enrichment item. FIRST_IN_ALBUM and LAST_IN_ALBUM place it at either end; AFTER_MEDIA_ITEM requires relative_media_item_id; AFTER_ENRICHMENT_ITEM requires relative_enrichment_item_id. Defaults to LAST_IN_ALBUM.`,
      },
      {
        name: 'relative_enrichment_item_id',
        type: 'string',
        required: false,
        description: `Enrichment item id the new enrichment item should be placed after. Required when position is AFTER_ENRICHMENT_ITEM; ignored otherwise.`,
      },
      {
        name: 'relative_media_item_id',
        type: 'string',
        required: false,
        description: `Media item id the new enrichment item should be placed after. Required when position is AFTER_MEDIA_ITEM; ignored otherwise.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `The caption text to display. Required when enrichment_type is "text"; ignored otherwise.`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlephotos_batch_add_media_items_to_album',
    description: `Add up to 50 media items to an album this app created, in a single call — Google removed access to a user's pre-existing Photos library in March 2025, so both the album and the media items must belong to this app. Returns an empty response on success; calling it again with media items already in the album returns an error rather than silently succeeding. Use batch_add_media_items_to_album after create_album to populate an album, splitting larger sets of media items into batches of 50.`,
    params: [
      {
        name: 'album_id',
        type: 'string',
        required: true,
        description: `Identifier of the album to add media items to. Must be an album created by this app. Obtain the id from a prior create_album or list_albums call.`,
      },
      {
        name: 'media_item_ids',
        type: 'array',
        required: true,
        description: `Media item ids to add to the album, up to 50 per call. Each media item must have been created by this app and must not already belong to the album.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlephotos_batch_create_media_items',
    description: `Add up to 50 media items to this app's Google Photos library in one call, each identified by an upload token obtained beforehand — not by raw file bytes. Returns a per-item result list: each entry carries the original upload token plus either the created media item (filename, MIME type, temporary base URL, creation time, dimensions, and metadata) or a status explaining why that item failed — a 200 response does not guarantee every item succeeded, so check each result's status. Use batch_create_media_items once you already hold upload tokens. First upload each file's raw bytes to the Google Photos uploads endpoint (a raw binary POST with X-Goog-Upload-* headers, at https://photoslibrary.googleapis.com/v1/uploads) to obtain a token for each file — that raw upload step has no JSON/base64 equivalent and is not available as a Scalekit tool, so it must be performed separately before calling this tool. Optionally place the new items into an existing album this app created, at a specific position; omit album_id to add items to the library without placing them in an album.`,
    params: [
      {
        name: 'new_media_items',
        type: 'string',
        required: true,
        description: `JSON array of media items to create, up to 50 per call. Each object must include a simpleMediaItem with an uploadToken obtained from a prior raw-bytes upload to the Google Photos uploads endpoint (not through this tool), and may include an optional fileName and an optional description (max 1000 characters each). Example: [{"description":"Beach sunset","simpleMediaItem":{"uploadToken":"AC0zHRygMYcGkznWyk9AlQNzY2XyZBAsCVc123","fileName":"sunset.jpg"}}].`,
      },
      {
        name: 'album_id',
        type: 'string',
        required: false,
        description: `ID of an existing album (created by this app) to add the new media items to. Omit to add items to the library without placing them in an album.`,
      },
      {
        name: 'album_position_relative_enrichment_item_id',
        type: 'string',
        required: false,
        description: `Enrichment item ID to position the new items after within the album. Only used when album_position_type is AFTER_ENRICHMENT_ITEM.`,
      },
      {
        name: 'album_position_relative_media_item_id',
        type: 'string',
        required: false,
        description: `Media item ID to position the new items after within the album. Only used when album_position_type is AFTER_MEDIA_ITEM.`,
      },
      {
        name: 'album_position_type',
        type: 'string',
        required: false,
        description: `Where to place the new items within the album named by album_id. Only applies when album_id is set; ignored otherwise. One of POSITION_TYPE_UNSPECIFIED, FIRST_IN_ALBUM, LAST_IN_ALBUM (default), AFTER_MEDIA_ITEM (pair with album_position_relative_media_item_id), or AFTER_ENRICHMENT_ITEM (pair with album_position_relative_enrichment_item_id).`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlephotos_batch_get_media_items',
    description: `Retrieve up to 50 media items in a single call by their IDs, restricted to media this app itself created or uploaded — Google removed access to a user's full pre-existing Photos library in March 2025. Returns one result per requested ID: each is either the media item's details (filename, MIME type, a temporary base URL, creation time, dimensions, and photo/video metadata) or an error status if that ID doesn't exist or wasn't created by this app, so check each result's status before assuming success. Use batch_get_media_items to fetch several known items at once. Use get_media_item for a single item, or list_media_items/search_media_items to discover IDs. Requires media item IDs from a prior list_media_items, search_media_items, or batch_create_media_items call.`,
    params: [
      {
        name: 'media_item_ids',
        type: 'array',
        required: true,
        description: `Media item IDs to fetch in one call, up to 50 per request. Each ID must belong to a media item this app created or uploaded. Example: ["AKXeXaGH2op6RtcErdX_S0hu0iF8p1XKln5RfQCcXebK6HH1RwOKAAAA", "AKXeXaHy91C3vXY6rZp2Enb3vXY6rZp2Enrichment"].`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlephotos_batch_remove_media_items_from_album',
    description: `Remove up to 50 media items from an album this app created, in a single call — Google removed access to a user's pre-existing Photos library in March 2025, so this only works on albums this app owns. The media items themselves are not deleted, only their membership in this album. Returns an empty response on success. Use batch_remove_media_items_from_album to undo a prior batch_add_media_items_to_album or to curate an app-owned album, splitting larger removals into batches of 50.`,
    params: [
      {
        name: 'album_id',
        type: 'string',
        required: true,
        description: `Identifier of the album to remove media items from. Must be an album created by this app. Obtain the id from a prior create_album or list_albums call.`,
      },
      {
        name: 'media_item_ids',
        type: 'array',
        required: true,
        description: `Media item ids to remove from the album, up to 50 per call. Each media item must currently belong to the album.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlephotos_create_album',
    description: `Create a new album owned by this app in Google Photos. Only the album title can be set at creation — Google Photos fills in every other field, and since this app cannot see or reuse albums from a user's pre-existing library (Google removed that access in March 2025), the call always creates a brand-new app-owned album. Returns the new album's id, title, product URL, whether it's editable, media item count, and cover photo details. Use create_album to start a new album before adding media items to it with batch_add_media_items_to_album.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title for the new album. This is the only field settable at creation — Google Photos assigns the id, product URL, and other fields automatically.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlephotos_create_picker_session',
    description: `Start a new Google Photos Picker session, which lets the connected user pick any photos or videos from their FULL Google Photos library (unlike the other tools in this connector, which are restricted to app-created content only) and hand just those items to this app. Returns a pickerUri the user must open in a browser to make their selection, plus a session id. After the user opens the link and picks media, poll get_picker_session until mediaItemsSet is true, then call list_picker_media_items with this session's id to retrieve what they picked. The session and its pickerUri expire (see the returned expireTime); create a new session if it does.`,
    params: [
      {
        name: 'max_item_count',
        type: 'integer',
        required: false,
        description: `Maximum number of media items the user is allowed to pick in this session. Google defaults to 2000 if omitted.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlephotos_delete_picker_session',
    description: `Delete a Google Photos Picker session, e.g. after you've retrieved its picked media items with list_picker_media_items or if the user abandoned the picker. This only removes the session bookkeeping — it does not affect any photos or videos in the user's library. Returns no content on success.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Identifier of the picker session to delete, as returned in the id field of create_picker_session's response.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlephotos_get_album',
    description: `Retrieve an album by its ID, restricted to albums this app itself created — Google removed access to a user's full pre-existing Photos library in March 2025. Returns the album's title, product URL, whether it's editable, its media item count, and cover photo details. Use get_album to look up one known album. Use list_albums to browse the albums this app has created. Requires an album ID from a prior list_albums or create_album call; albums created outside this app are not retrievable.`,
    params: [
      {
        name: 'album_id',
        type: 'string',
        required: true,
        description: `Identifier of the album to retrieve. Must be an album created by this app — albums from the user's broader Google Photos library are not accessible via this API. Obtain the ID from a prior create_album or list_albums call.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlephotos_get_media_item',
    description: `Retrieve a single media item by its ID, restricted to media this app itself created or uploaded — Google removed access to a user's full pre-existing Photos library in March 2025. Returns the item's filename, MIME type, a temporary base URL for viewing or downloading it, creation time, dimensions, and photo/video technical metadata. Use get_media_item to look up one known item by ID. Use list_media_items to browse this app's media, batch_get_media_items to fetch several at once, or search_media_items to filter it. Requires a media item ID from a prior list_media_items, search_media_items, or batch_create_media_items call.`,
    params: [
      {
        name: 'media_item_id',
        type: 'string',
        required: true,
        description: `Identifier of the media item to retrieve. Must be a media item this app created or uploaded — items from the user's broader Google Photos library are not accessible via this API. Obtain the ID from a prior list_media_items, search_media_items, or batch_create_media_items call.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlephotos_get_picker_session',
    description: `Check the status of a Google Photos Picker session created by create_picker_session. Returns mediaItemsSet: true once the user has finished picking media in their browser — poll this tool (using the interval in the session's pollingConfig) until it flips true, then call list_picker_media_items with the same session id. Also returns the session's pickerUri and expireTime.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Identifier of the picker session to check, as returned in the id field of create_picker_session's response.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlephotos_list_albums',
    description: `List the albums this app has created in Google Photos, one page at a time. Google removed access to a user's full pre-existing Photos library in March 2025, so only albums this app created are ever returned — albums made in the Google Photos app itself, or by other apps, cannot appear here. Returns each album's id, title, product URL, editability, media item count, and cover photo, plus a token for the next page when more results exist. Use list_albums to browse or locate an album's id; use get_album when the id is already known.`,
    params: [
      {
        name: 'exclude_non_app_created_data',
        type: 'boolean',
        required: false,
        description: `If true, asks the API to exclude albums not created by this app. Included for completeness, but this connection only ever holds the photoslibrary.readonly.appcreateddata scope, which already restricts every result to app-created albums — so this flag has no practical effect here.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of albums to return per page. Defaults to 20 if omitted; the API caps this at 50.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token from a previous list_albums call's nextPageToken, used to fetch the next page of results.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlephotos_list_media_items',
    description: `List media items this app has created or uploaded, paginated in reverse-chronological creation order. Returns each item's filename, MIME type, a temporary base URL for viewing or downloading it, creation time, dimensions, and photo/video technical metadata, plus a token for the next page. Use list_media_items to browse this app's media without filters. Use search_media_items to filter by date, content category, media type, or favorites, or get_media_item/batch_get_media_items to fetch specific known items. Note: Google removed access to a user's full pre-existing Photos library in March 2025 — only media this app itself created or uploaded is returned.`,
    params: [
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of media items to return per page. Defaults to 25 if omitted; the maximum allowed value is 100.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Pagination token from a previous list_media_items response's nextPageToken, used to fetch the next page of results. Omit to fetch the first page.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlephotos_list_picker_media_items',
    description: `Retrieve the photos and videos the user picked during a Google Photos Picker session (from create_picker_session). Only call this once get_picker_session reports mediaItemsSet: true — otherwise the list will be empty even though the session is still valid. Returns each item's type (photo or video), a temporary base URL to fetch its bytes, its filename and MIME type, and technical metadata. Unlike every other tool in this connector, these can be any items from the user's full Google Photos library, not just app-created ones.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Identifier of the picker session whose picked items to list, as returned in the id field of create_picker_session's response.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page. Google defaults to 50 if omitted; values above 100 are capped to 100.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Pagination token from a previous list_picker_media_items call's nextPageToken, to fetch the next page.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlephotos_search_media_items',
    description: `Search this app's media items by album, date range, content category, media type, or favorite status — Google removed access to a user's full pre-existing Photos library in March 2025, so results are limited to media this app itself created or uploaded. Returns a page of matching media items (filename, MIME type, a temporary base URL, creation time, dimensions, and photo/video metadata) plus a token for the next page. Use search_media_items to filter by date, content category, media type, or favorites, or to list everything in one specific album. Use list_media_items for an unfiltered chronological browse, or get_media_item/batch_get_media_items for specific known items. Note: album_id and the other filter fields (dates, categories, media type, favorites, archived) are mutually exclusive in a single call — searching within one album cannot be combined with the other filters.`,
    params: [
      {
        name: 'album_id',
        type: 'string',
        required: false,
        description: `ID of a single album (created by this app) to list all media items from. Mutually exclusive with the filter fields below (start_date, end_date, included_content_categories, excluded_content_categories, media_types, include_favorites_only, include_archived_media, exclude_non_app_created_data) — set either album_id or filters, not both.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End of the date range to search, in YYYY-MM-DD form (calendar date, not a timestamp). If provided together with start_date, matches items created on or between the two dates. If provided alone, matches items created on that single day. This tool supports one contiguous date range per call, not a list of discrete dates.`,
      },
      {
        name: 'exclude_non_app_created_data',
        type: 'boolean',
        required: false,
        description: `When true, excludes media items not created by this app from the results (relevant mainly for shared albums). Defaults to the API's own behavior when omitted.`,
      },
      {
        name: 'excluded_content_categories',
        type: 'array',
        required: false,
        description: `Content categories to exclude from results. Valid values: NONE, LANDSCAPES, RECEIPTS, CITYSCAPES, LANDMARKS, SELFIES, PEOPLE, PETS, WEDDINGS, BIRTHDAYS, DOCUMENTS, TRAVEL, ANIMALS, FOOD, SPORT, NIGHT, PERFORMANCES, WHITEBOARDS, SCREENSHOTS, UTILITY, ARTS, CRAFTS, FASHION, HOUSES, GARDENS, FLOWERS, HOLIDAYS.`,
      },
      {
        name: 'include_archived_media',
        type: 'boolean',
        required: false,
        description: `When true, includes media items the user has archived in their Google Photos library. Defaults to false (archived items excluded) when omitted.`,
      },
      {
        name: 'include_favorites_only',
        type: 'boolean',
        required: false,
        description: `When true, restricts results to media items the user has marked as a favorite. Leave unset or false to include all media regardless of favorite status.`,
      },
      {
        name: 'included_content_categories',
        type: 'array',
        required: false,
        description: `Content categories to restrict results to. Valid values: NONE, LANDSCAPES, RECEIPTS, CITYSCAPES, LANDMARKS, SELFIES, PEOPLE, PETS, WEDDINGS, BIRTHDAYS, DOCUMENTS, TRAVEL, ANIMALS, FOOD, SPORT, NIGHT, PERFORMANCES, WHITEBOARDS, SCREENSHOTS, UTILITY, ARTS, CRAFTS, FASHION, HOUSES, GARDENS, FLOWERS, HOLIDAYS.`,
      },
      {
        name: 'media_types',
        type: 'array',
        required: false,
        description: `Restrict results to photos, videos, or both. Valid values: ALL_MEDIA, PHOTO, VIDEO.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of media items to return per page. Defaults to 25 if omitted; the maximum allowed value is 100.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Pagination token from a previous search_media_items response's nextPageToken, used to fetch the next page of the same search. Omit to fetch the first page.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start of the date range to search, in YYYY-MM-DD form (calendar date, not a timestamp). If provided together with end_date, matches items created on or between the two dates. If provided alone, matches items created on that single day. This tool supports one contiguous date range per call, not a list of discrete dates.`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlephotos_update_album',
    description: `Update the title or cover photo of an album this app itself created — Google removed access to a user's pre-existing Photos library in March 2025, so only app-owned albums can be updated. Requires the album id and an update mask naming which fields to change; only fields listed in the mask are applied, and title and cover_photo_media_item_id are the only fields Google Photos allows changing this way. Returns the updated album object. Use update_album to rename an album or change its cover photo after creating it with create_album.`,
    params: [
      {
        name: 'album_id',
        type: 'string',
        required: true,
        description: `Identifier of the album to update. Must be an album created by this app — albums from the user's broader Google Photos library cannot be updated. Obtain the id from a prior create_album or list_albums call.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of field names to update, in camelCase (e.g. "title" or "coverPhotoMediaItemId" or "title,coverPhotoMediaItemId"). Only fields named here are changed; these are the only two fields Google Photos accepts in this mask.`,
      },
      {
        name: 'cover_photo_media_item_id',
        type: 'string',
        required: false,
        description: `Media item id to use as the album's new cover photo. The media item must already belong to this album. Include "coverPhotoMediaItemId" in update_mask for this to take effect.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the album. Include "title" in update_mask for this to take effect.`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlephotos_update_media_item',
    description: `Update the description of a media item this app created or uploaded — the only field the Google Photos API allows changing on a media item. Returns the updated media item, including its filename, MIME type, temporary base URL, creation time, dimensions, and the new description. Use update_media_item to change the caption/description on a known item. Use get_media_item first if you need to confirm the current description or item ID. Requires the update mask set to "description" (the only supported value) and a media item ID from a prior list_media_items, search_media_items, or batch_create_media_items call.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `New description text for the media item, up to 1000 characters. Replaces the item's existing description entirely.`,
      },
      {
        name: 'media_item_id',
        type: 'string',
        required: true,
        description: `Identifier of the media item to update. Must be a media item this app created or uploaded — items from the user's broader Google Photos library are not accessible via this API.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of field names to update. The Google Photos API currently supports updating only one field on a media item, so this must always be the literal value "description".`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
]
