import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googlebusinessprofile_accept_invitation',
    description: `Accept a pending invitation to become an administrator (owner or manager) of a Google Business Profile account. Requires the invitation resource name in the form accounts/{account_id}/invitations/{invitation_id}. The request body is empty. Returns an empty response on success; once accepted, the invitation is consumed and the caller becomes an admin of the account.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The resource name of the invitation to accept, in the form accounts/{account_id}/invitations/{invitation_id}. Example: accounts/106234523651626475467/invitations/109876543210987654321.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_create_account',
    description: `Create a new Business Profile account using the Account Management API. Requires an account name and a type (e.g. ORGANIZATION or LOCATION_GROUP). PERSONAL accounts cannot typically be created via this API; use ORGANIZATION, LOCATION_GROUP, or USER_GROUP for programmatic account creation.`,
    params: [
      {
        name: 'accountName',
        type: 'string',
        required: true,
        description: `The name of the account to create. For an ORGANIZATION this is typically the business's legal or brand name. Example: Cascade Coffee Holdings.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type of account to create. PERSONAL accounts cannot generally be created via this API.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_create_location',
    description: `Create a new location under a Google Business Profile account. Requires the parent account resource name and a business title. Optionally supply a storefront address, phone numbers, primary/additional categories, and regular business hours. Set validateOnly to true to validate the request without creating the location.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The account resource name under which to create the location, in the form accounts/{account_id}. Example: accounts/106234523651626475467.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The business name (title) for the new location, reflecting the real-world business name as used consistently on the storefront. No taglines or special characters. Example: Cascade Coffee Roasters.`,
      },
      {
        name: 'language_code',
        type: 'string',
        required: false,
        description: `The BCP 47 language code for the location's data (e.g. "en", "fr", "de"). Required by Google — defaults to "en" if not specified.`,
      },
      {
        name: 'primary_category_name',
        type: 'string',
        required: false,
        description: `Primary category resource name for the location, e.g. categories/gcid:restaurant. Maps to categories.primaryCategory.name. Optional but recommended.`,
      },
      {
        name: 'primary_phone',
        type: 'string',
        required: false,
        description: `Primary phone number for the location, in E.164 or local format. Maps to phoneNumbers.primaryPhone. Optional.`,
      },
      {
        name: 'regular_hours_periods',
        type: 'array',
        required: false,
        description: `Regular business hours as an array of time periods. Each period is an object: {"openDay": "MONDAY", "openTime": "09:00", "closeDay": "MONDAY", "closeTime": "17:00"}. openDay/closeDay must be one of MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY. openTime/closeTime are 24-hour HH:MM strings. Optional.`,
      },
      {
        name: 'requestId',
        type: 'string',
        required: false,
        description: `Optional unique request ID (max 50 chars) used to detect duplicate creation requests. Leave blank to omit.`,
      },
      {
        name: 'storefront_address_lines',
        type: 'array',
        required: false,
        description: `Street address lines for the location's storefront address (up to 5 lines), e.g. ["1600 Amphitheatre Pkwy"]. Required together with storefront_locality and storefront_region_code if providing a storefront address.`,
      },
      {
        name: 'storefront_administrative_area',
        type: 'string',
        required: false,
        description: `State or administrative area of the storefront address, e.g. CA. Optional even when providing an address.`,
      },
      {
        name: 'storefront_locality',
        type: 'string',
        required: false,
        description: `City/locality of the storefront address. Required together with storefront_address_lines and storefront_region_code if providing a storefront address.`,
      },
      {
        name: 'storefront_postal_code',
        type: 'string',
        required: false,
        description: `Postal/ZIP code of the storefront address. Optional even when providing an address.`,
      },
      {
        name: 'storefront_region_code',
        type: 'string',
        required: false,
        description: `CLDR region code (ISO 3166-1 alpha-2) of the storefront address's country, e.g. US. Required together with storefront_address_lines and storefront_locality if providing a storefront address.`,
      },
      {
        name: 'validateOnly',
        type: 'boolean',
        required: false,
        description: `If true, validates the request without actually creating the location. Useful for checking field values before committing. Defaults to false.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_create_media',
    description: `Add a new media item (photo or video, referenced by a publicly accessible source URL) to a Google Business Profile location using the legacy My Business API v4. Requires the account ID, location ID, media format, source URL, and a location association category describing what the media depicts. Note: this legacy v4 endpoint requires separate Google allow-list approval for the OAuth client; a 403 response may indicate the client has not been allow-listed rather than a tool defect.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `The Business Profile account ID that owns the location. Example: 106234523651626475467.`,
      },
      {
        name: 'category',
        type: 'string',
        required: true,
        description: `The category describing what this media item depicts, used for locationAssociation.category. Example: EXTERIOR.`,
      },
      {
        name: 'locationId',
        type: 'string',
        required: true,
        description: `The location ID to add the media item to. Example: 12345678901234567890.`,
      },
      {
        name: 'mediaFormat',
        type: 'string',
        required: true,
        description: `The format of the media item being added.`,
      },
      {
        name: 'sourceUrl',
        type: 'string',
        required: true,
        description: `A publicly accessible URL where the media item can be retrieved from. Example: https://example.com/photo.jpg.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_create_post',
    description: `Create a local post (What's New update) for a Google Business Profile location using the legacy My Business API v4. Requires the parent resource name (accounts/{account_id}/locations/{location_id}), a topicType, and a summary. Supports STANDARD posts with an optional call-to-action button and photo/video media. EVENT and OFFER post types can be attempted by also supplying the event or offer object as raw JSON, but are not deeply validated by this tool. Note: this legacy v4 endpoint requires separate Google allow-list approval for the OAuth client; a 403 response may indicate the client has not been allow-listed rather than a tool defect.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The parent resource name under which to create the local post, in the form accounts/{account_id}/locations/{location_id}. Example: accounts/106234523651626475467/locations/12345678901234567890.`,
      },
      {
        name: 'summary',
        type: 'string',
        required: true,
        description: `The main text content of the local post. Required for all topic types. Example: 'Join us this weekend for our summer sale!'`,
      },
      {
        name: 'topicType',
        type: 'string',
        required: true,
        description: `The topic type of the local post. STANDARD is a general update. EVENT requires the event field to also be set. OFFER requires the offer field to also be set. ALERT is used for urgent announcements (e.g. COVID-19).`,
      },
      {
        name: 'callToActionType',
        type: 'string',
        required: false,
        description: `The type of call-to-action button to show on the post. One of BOOK, ORDER, SHOP, LEARN_MORE, SIGN_UP, CALL. Omit for no call-to-action button.`,
      },
      {
        name: 'callToActionUrl',
        type: 'string',
        required: false,
        description: `The target URL for the call-to-action button. Required if callToActionType is set to a value other than CALL. Example: https://example.com/summer-sale.`,
      },
      {
        name: 'event',
        type: 'object',
        required: false,
        description: `Required when topicType is EVENT. A JSON object describing the event: {"title": string, "schedule": {"startDate": {"year":Y,"month":M,"day":D}, "startTime": {"hours":H,"minutes":M}, "endDate": {...}, "endTime": {...}}}. Example: {"title": "Summer Sale Kickoff", "schedule": {"startDate": {"year":2026,"month":7,"day":10}, "endDate": {"year":2026,"month":7,"day":10}}}.`,
      },
      {
        name: 'languageCode',
        type: 'string',
        required: false,
        description: `The language of the local post content, as a BCP 47 language code. Example: en-US. If omitted, the account's default language is used.`,
      },
      {
        name: 'media',
        type: 'array',
        required: false,
        description: `Optional array of media items (photos or videos) to attach to the post. Each item is an object with mediaFormat (PHOTO or VIDEO) and sourceUrl (a publicly accessible URL to the media file). Example: [{"mediaFormat": "PHOTO", "sourceUrl": "https://example.com/photo.jpg"}].`,
      },
      {
        name: 'offer',
        type: 'object',
        required: false,
        description: `Optional when topicType is OFFER. A JSON object describing the offer: {"couponCode": string, "redeemOnlineUrl": string, "termsConditions": string}. Example: {"couponCode": "SUMMER26", "redeemOnlineUrl": "https://example.com/redeem", "termsConditions": "Valid through July 31, 2026."}.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_delete_location',
    description: `Delete a location from a Google Business Profile account. Requires the location resource name in the form locations/{location_id}. This is a destructive, generally irreversible operation that removes the location's presence from Search and Maps. Some locations cannot be deleted via the API (per their LocationState) and must instead be removed via the Google Business Profile website. Returns an empty response on success.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The resource name of the location to delete, in the form locations/{location_id}. Example: locations/12345678901234567890.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_delete_media',
    description: `Delete a media item (photo or video) from a Google Business Profile location using the legacy My Business API v4. Requires the account ID, location ID, and media key. This is a destructive, irreversible operation -- the media item is permanently removed from the location's profile. Note: this legacy v4 endpoint requires separate Google allow-list approval for the OAuth client; a 403 response may indicate the client has not been allow-listed rather than a tool defect. Returns an empty response on success.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `The Business Profile account ID that owns the location. Example: 106234523651626475467.`,
      },
      {
        name: 'locationId',
        type: 'string',
        required: true,
        description: `The location ID that owns the media item. Example: 12345678901234567890.`,
      },
      {
        name: 'mediaKey',
        type: 'string',
        required: true,
        description: `The unique identifier (media key) of the media item to delete. Example: AF1QipN8k7...`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_delete_post',
    description: `Delete a local post (What's New update) from a Google Business Profile location using the legacy My Business API v4. Requires the account ID, location ID, and post ID. This is a destructive, irreversible operation -- the post is permanently removed from Search and Maps. Note: this legacy v4 endpoint requires separate Google allow-list approval for the OAuth client; a 403 response may indicate the client has not been allow-listed rather than a tool defect. Returns an empty response on success.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `The Business Profile account ID that owns the location. Example: 106234523651626475467.`,
      },
      {
        name: 'locationId',
        type: 'string',
        required: true,
        description: `The location ID that owns the post. Example: 12345678901234567890.`,
      },
      {
        name: 'postId',
        type: 'string',
        required: true,
        description: `The ID of the local post to delete. Example: 987654321098765432.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_fetch_verification_options',
    description: `Report the eligible verification methods (ADDRESS, EMAIL, PHONE_CALL, SMS, AUTO) available for a Google Business Profile location, in a specific language. Requires the location resource name (locations/{location_id}) and a BCP 47 language code. Returns a list of VerificationOption objects describing, for each eligible method, the destination the PIN would be sent to (e.g. masked email address or phone number, or postcard mailing address) -- use these exact values as inputs to the Verify Location tool.`,
    params: [
      {
        name: 'languageCode',
        type: 'string',
        required: true,
        description: `Required. The BCP 47 language code representing the language to use for the verification process. Available options may vary by language. Example: en-US.`,
      },
      {
        name: 'location',
        type: 'string',
        required: true,
        description: `The resource name of the location to check verification options for, in the form locations/{location_id}. Example: locations/12345678901234567890.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_get_account',
    description: `Fetch details for a single Google Business Profile account by its resource name. Returns the account's display name, type (PERSONAL, LOCATION_GROUP, USER_GROUP, ORGANIZATION), the caller's role (PRIMARY_OWNER, OWNER, MANAGER, SITE_MANAGER), verification state, vetted state, and account number.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The account resource name to fetch, in the form accounts/{account_id}. Example: accounts/106234523651626475467.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_get_daily_metric',
    description: `Fetch a time series for a single daily performance metric (views, searches, calls, direction requests, bookings, food orders, etc.) for a Google Business Profile location over a specified daily date range. Requires the location resource name, exactly one DailyMetric enum value, and a complete start/end date (year, month, day for each). Returns a time series of daily values for the requested metric. Use Get Location Insights instead if you need multiple metrics in one call.`,
    params: [
      {
        name: 'dailyMetric',
        type: 'string',
        required: true,
        description: `The single DailyMetric enum value to fetch a time series for. Valid values: BUSINESS_IMPRESSIONS_DESKTOP_MAPS, BUSINESS_IMPRESSIONS_DESKTOP_SEARCH, BUSINESS_IMPRESSIONS_MOBILE_MAPS, BUSINESS_IMPRESSIONS_MOBILE_SEARCH, BUSINESS_CONVERSATIONS, BUSINESS_DIRECTION_REQUESTS, CALL_CLICKS, WEBSITE_CLICKS, BUSINESS_BOOKINGS, BUSINESS_FOOD_ORDERS, BUSINESS_FOOD_MENU_CLICKS.`,
      },
      {
        name: 'end_day',
        type: 'integer',
        required: true,
        description: `Day of the end date for the metric range (1-31), e.g. 30. Required together with end_year and end_month.`,
      },
      {
        name: 'end_month',
        type: 'integer',
        required: true,
        description: `Month of the end date for the metric range (1-12), e.g. 6. Required together with end_year and end_day.`,
      },
      {
        name: 'end_year',
        type: 'integer',
        required: true,
        description: `Year of the end date for the metric range, e.g. 2026. Required together with end_month and end_day to form a complete end date.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The location resource name to fetch the metric for, in the form locations/{location_id}. Example: locations/12345678901234567890.`,
      },
      {
        name: 'start_day',
        type: 'integer',
        required: true,
        description: `Day of the start date for the metric range (1-31), e.g. 1. Required together with start_year and start_month.`,
      },
      {
        name: 'start_month',
        type: 'integer',
        required: true,
        description: `Month of the start date for the metric range (1-12), e.g. 6. Required together with start_year and start_day.`,
      },
      {
        name: 'start_year',
        type: 'integer',
        required: true,
        description: `Year of the start date for the metric range, e.g. 2026. Required together with start_month and start_day to form a complete start date.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_get_insights',
    description: `Fetch one or more daily performance metrics (views, searches, calls, direction requests, bookings, food orders, etc.) for a Google Business Profile location over a specified daily date range. Requires the location resource name, at least one DailyMetric enum value, and a complete start/end date (year, month, day for each). Returns a time series of daily values per requested metric.`,
    params: [
      {
        name: 'dailyMetrics',
        type: 'array',
        required: true,
        description: `One or more DailyMetric enum values to fetch time series for. At least one is required. Valid values: BUSINESS_IMPRESSIONS_DESKTOP_MAPS, BUSINESS_IMPRESSIONS_DESKTOP_SEARCH, BUSINESS_IMPRESSIONS_MOBILE_MAPS, BUSINESS_IMPRESSIONS_MOBILE_SEARCH, BUSINESS_CONVERSATIONS, BUSINESS_DIRECTION_REQUESTS, CALL_CLICKS, WEBSITE_CLICKS, BUSINESS_BOOKINGS, BUSINESS_FOOD_ORDERS, BUSINESS_FOOD_MENU_CLICKS.`,
      },
      {
        name: 'end_day',
        type: 'integer',
        required: true,
        description: `Day of the end date for the metrics range (1-31), e.g. 30. Required together with end_year and end_month.`,
      },
      {
        name: 'end_month',
        type: 'integer',
        required: true,
        description: `Month of the end date for the metrics range (1-12), e.g. 6. Required together with end_year and end_day.`,
      },
      {
        name: 'end_year',
        type: 'integer',
        required: true,
        description: `Year of the end date for the metrics range, e.g. 2026. Required together with end_month and end_day to form a complete end date.`,
      },
      {
        name: 'location',
        type: 'string',
        required: true,
        description: `The location resource name to fetch performance metrics for, in the form locations/{location_id}. Example: locations/12345678901234567890.`,
      },
      {
        name: 'start_day',
        type: 'integer',
        required: true,
        description: `Day of the start date for the metrics range (1-31), e.g. 1. Required together with start_year and start_month.`,
      },
      {
        name: 'start_month',
        type: 'integer',
        required: true,
        description: `Month of the start date for the metrics range (1-12), e.g. 6. Required together with start_year and start_day.`,
      },
      {
        name: 'start_year',
        type: 'integer',
        required: true,
        description: `Year of the start date for the metrics range, e.g. 2026. Required together with start_month and start_day to form a complete start date.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_get_location',
    description: `Fetch merchant-set data for a single Google Business Profile location by its resource name. Requires a readMask specifying which Location fields to return (e.g. name,title,storefrontAddress,phoneNumbers,regularHours,categories). Returns only the requested fields.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The location resource name to fetch, in the form locations/{location_id}. Example: locations/12345678901234567890.`,
      },
      {
        name: 'readMask',
        type: 'string',
        required: false,
        description: `Required. Comma-separated list of Location fields to return, using the Location resource's field names. Defaults to name,title,storefrontAddress,phoneNumbers,regularHours,categories if not specified.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_get_location_attributes',
    description: `Fetch the merchant-set attributes for a Google Business Profile location, such as amenities, payment options, accessibility features, and other category-specific attributes. Requires the attributes resource name in the form locations/{location_id}/attributes. Returns the current attribute values (booleans, enums, URLs, or repeated-enum selections) for the location.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The resource name of the attributes to fetch, in the form locations/{location_id}/attributes. Example: locations/12345678901234567890/attributes.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_get_notification_settings',
    description: `Fetch the Google Pub/Sub notification settings configured for a Google Business Profile account. Requires the notification setting resource name in the form accounts/{account_id}/notificationSetting. Returns the Pub/Sub topic that receives notifications and the list of NotificationType events subscribed (e.g. NEW_REVIEW, NEW_QUESTION, GOOGLE_UPDATE).`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The resource name of the notification setting to fetch, in the form accounts/{account_id}/notificationSetting. Example: accounts/106234523651626475467/notificationSetting.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_get_post',
    description: `Fetch a single local post (What's New update) for a Google Business Profile location using the legacy My Business API v4. Requires the account ID, location ID, and post ID. Note: this legacy v4 endpoint requires separate Google allow-list approval for the OAuth client; a 403 response may indicate the client has not been allow-listed rather than a tool defect.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `The Business Profile account ID that owns the location. Example: 106234523651626475467.`,
      },
      {
        name: 'locationId',
        type: 'string',
        required: true,
        description: `The location ID under the account that owns the post. Example: 12345678901234567890.`,
      },
      {
        name: 'postId',
        type: 'string',
        required: true,
        description: `The ID of the local post to retrieve. Example: 9876543210987654321.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_get_review',
    description: `Fetch a single customer review by ID for a Google Business Profile location using the legacy My Business API v4. Requires the account ID, location ID, and review ID. Returns the reviewer, star rating, comment text, create/update time, and any existing business reply. Note: this legacy v4 endpoint requires separate Google allow-list approval for the OAuth client; a 403 response may indicate the client has not been allow-listed rather than a tool defect.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `The Business Profile account ID that owns the location, without the accounts/ prefix. Example: 106234523651626475467.`,
      },
      {
        name: 'locationId',
        type: 'string',
        required: true,
        description: `The location ID that owns the review, without the locations/ prefix. Example: 12345678901234567890.`,
      },
      {
        name: 'reviewId',
        type: 'string',
        required: true,
        description: `The ID of the review to fetch. Example: AbFvOqk1a2b3c4d5e6f7.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_invite_account_admin',
    description: `Invite a user to become an administrator of a Business Profile account using the Account Management API. The invitee receives an email invitation which they must accept before becoming an active admin. Requires the account resource name, the invitee's email address, and the role to grant.`,
    params: [
      {
        name: 'admin',
        type: 'string',
        required: true,
        description: `The email address of the user to invite as an administrator. Example: jane.doe@example.com.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The account resource name to invite the admin to, in the form accounts/{account_id}. Example: accounts/106234523651626475467.`,
      },
      {
        name: 'role',
        type: 'string',
        required: true,
        description: `The role to grant the invited administrator. OWNER has full control, MANAGER can manage most settings, COMMUNITY_MANAGER can only manage posts/reviews/Q&A.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_list_account_admins',
    description: `List the administrators (owners, managers, site managers) of a Business Profile account using the Account Management API.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The account resource name to list admins for, in the form accounts/{account_id}. Example: accounts/106234523651626475467.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_list_accounts',
    description: `List all Google Business Profile accounts accessible to the authenticated user, including personal accounts and any location groups, user groups, or organizations they belong to. Supports pagination and an optional filter (e.g. by account type). Returns each account's resource name, display name, type, role, and verification/vetted state.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Optional filter expression to constrain results, e.g. by account type. Supports filtering on the 'type' field, e.g. type=USER_GROUP. Leave blank to return all accessible accounts.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Maximum number of accounts to fetch per page. The API default and maximum is 20. Example: 20.`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Token from a previous list_accounts response's nextPageToken field, used to fetch the next page of results. Leave blank to fetch the first page.`,
      },
      {
        name: 'parentAccount',
        type: 'string',
        required: false,
        description: `Resource name of the Organization or User Group whose accounts should be listed, in the form accounts/{account_id}. Leave blank to list accounts directly accessible to the authenticated user.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_list_attribute_metadata',
    description: `List the metadata describing which attributes are available to set for a location, based on its category and/or country/language. Use this to discover valid attribute names and their expected value types before calling Update Location Attributes. At least one of parent (a location resource name) or categoryName is typically needed to get a useful result; regionCode and languageCode further narrow the localized results. Returns a page of AttributeMetadata objects (attribute name, display name, value type, whether it's repeatable) plus a next page token.`,
    params: [
      {
        name: 'categoryName',
        type: 'string',
        required: false,
        description: `The primary category stable ID to look up available attributes for, in the form categories/{category_id}. Example: categories/gcid:restaurant. Leave blank if using parent instead.`,
      },
      {
        name: 'languageCode',
        type: 'string',
        required: false,
        description: `BCP 47 language code to localize the attribute display names for, e.g. en. Leave blank to use the default language.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Maximum number of attribute metadata entries to return. Default 200, minimum 1. Leave blank to use the API default.`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Token from a previous list_attribute_metadata call's response to fetch the next page of results. Leave blank to fetch the first page.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: false,
        description: `Resource name of the location to look up available attributes for, in the form locations/{location_id}. When supplied, results reflect the attributes available for that specific location's category and country. Leave blank to look up by categoryName instead.`,
      },
      {
        name: 'regionCode',
        type: 'string',
        required: false,
        description: `ISO 3166-1 alpha-2 country code to localize the attribute metadata for, e.g. US. Leave blank to use the default region.`,
      },
      {
        name: 'showAll',
        type: 'boolean',
        required: false,
        description: `If true, metadata for all available attributes is returned regardless of whether they are commonly used. Leave blank for default behavior.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_list_categories',
    description: `List the Google Business Profile categories available for a given region and language, for use when creating or updating a location's primary or additional categories. Requires regionCode, languageCode, and view. Optionally filter by displayName. Returns a page of Category objects (name, displayName) plus a next page token.`,
    params: [
      {
        name: 'languageCode',
        type: 'string',
        required: true,
        description: `BCP 47 language code to localize category display names, e.g. en.`,
      },
      {
        name: 'regionCode',
        type: 'string',
        required: true,
        description: `ISO 3166-1 alpha-2 country code to list categories for, e.g. US.`,
      },
      {
        name: 'view',
        type: 'string',
        required: true,
        description: `The level of detail to return for each category. BASIC returns only name; FULL also returns additional details like service types. Valid values: CATEGORY_VIEW_UNSPECIFIED, BASIC, FULL.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter string to search categories by displayName, e.g. displayName=restaurant. The only field supported is displayName. Leave blank to list all categories.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Maximum number of categories to return per page. Default 100, maximum 100. Leave blank to use the API default.`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Token from a previous list_categories call's response to fetch the next page of results. Leave blank to fetch the first page.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_list_locations',
    description: `List locations belonging to a Google Business Profile account. Requires the account resource name and a readMask specifying which Location fields to return (e.g. name,title,storefrontAddress). Supports pagination, filtering, and ordering by title or store_code.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The account resource name to fetch locations from, in the form accounts/{account_id}. Example: accounts/106234523651626475467.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Optional filter expression to constrain results, following the Location Data Guide filter syntax (e.g. labels:"store front"). Leave blank to return all locations.`,
      },
      {
        name: 'orderBy',
        type: 'string',
        required: false,
        description: `Optional comma-separated ordering fields using SQL syntax. Valid fields: title, store_code. Example: title desc.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Maximum number of locations to fetch per page. Default is 10, minimum 1, maximum 100. Example: 25.`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Token from a previous list_locations response's nextPageToken field, used to fetch the next page of results. Leave blank to fetch the first page.`,
      },
      {
        name: 'readMask',
        type: 'string',
        required: false,
        description: `Required. Comma-separated list of Location fields to return, using the Location resource's field names (e.g. name,title,storefrontAddress,phoneNumbers,categories). Defaults to name,title,storefrontAddress if not specified.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_list_media',
    description: `List media items (photos and videos) associated with a Google Business Profile location using the legacy My Business API v4, with pagination support. Note: this legacy v4 endpoint requires separate Google allow-list approval for the OAuth client; a 403 response may indicate the client has not been allow-listed rather than a tool defect.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `The Business Profile account ID that owns the location. Example: 106234523651626475467.`,
      },
      {
        name: 'locationId',
        type: 'string',
        required: true,
        description: `The location ID whose media items should be listed. Example: 12345678901234567890.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Maximum number of media items to return per page. If omitted, the API default is used.`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `A page token from a previous list_media call, used to fetch the next page of results.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_list_posts',
    description: `List local posts (What's New updates) for a Google Business Profile location using the legacy My Business API v4. Requires the account ID and location ID. Supports pagination via pageSize and pageToken. Returns each post's topic type, summary, state, and call-to-action/media details. Note: this legacy v4 endpoint requires separate Google allow-list approval for the OAuth client; a 403 response may indicate the client has not been allow-listed rather than a tool defect.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `The Business Profile account ID that owns the location, without the accounts/ prefix. Example: 106234523651626475467.`,
      },
      {
        name: 'locationId',
        type: 'string',
        required: true,
        description: `The location ID to list local posts for, without the locations/ prefix. Example: 12345678901234567890.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Maximum number of local posts to fetch per page. Example: 20.`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Token from a previous list_posts response's nextPageToken field, used to fetch the next page of results. Leave blank to fetch the first page.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_list_reviews',
    description: `List customer reviews for a Google Business Profile location using the legacy My Business API v4. Requires the account ID and location ID. Supports pagination via pageSize and pageToken. Returns each review's reviewer, star rating, comment, create/update time, and any existing reply. Note: this legacy v4 endpoint requires separate Google allow-list approval for the OAuth client; a 403 response may indicate the client has not been allow-listed rather than a tool defect.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `The Business Profile account ID that owns the location, without the accounts/ prefix. Example: 106234523651626475467.`,
      },
      {
        name: 'locationId',
        type: 'string',
        required: true,
        description: `The location ID to list reviews for, without the locations/ prefix. Example: 12345678901234567890.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Maximum number of reviews to fetch per page. Example: 20.`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Token from a previous list_reviews response's nextPageToken field, used to fetch the next page of results. Leave blank to fetch the first page.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_remove_account_admin',
    description: `Remove an administrator from a Google Business Profile account, revoking their access. Requires the admin resource name in the form accounts/{account_id}/admins/{admin_id}. This is a destructive, irreversible operation -- the removed admin will need to be re-invited to regain access. Returns an empty response on success.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The resource name of the admin to remove from the account, in the form accounts/{account_id}/admins/{admin_id}. Example: accounts/106234523651626475467/admins/109876543210987654321.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_reply_to_review',
    description: `Create or update the business's reply to a customer review on a Google Business Profile location, using the legacy My Business API v4. Requires the account ID, location ID, review ID, and the reply comment text. Calling this again for the same review overwrites the existing reply. Note: this legacy v4 endpoint requires separate Google allow-list approval for the OAuth client; a 403 response may indicate the client has not been allow-listed rather than a tool defect.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `The Business Profile account ID that owns the location, without the accounts/ prefix. Example: 106234523651626475467.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: true,
        description: `The text of the business's reply to the review. Replaces any existing reply. Example: 'Thank you for your feedback! We're glad you enjoyed your visit.'`,
      },
      {
        name: 'locationId',
        type: 'string',
        required: true,
        description: `The location ID that owns the review, without the locations/ prefix. Example: 12345678901234567890.`,
      },
      {
        name: 'reviewId',
        type: 'string',
        required: true,
        description: `The ID of the review to reply to. Example: AbFvOqk1a2b3c4d5e6f7.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_search_chains',
    description: `Search for a business chain by name, to associate a Google Business Profile location with it. Requires chainName (the chain's display name to search for, e.g. Starbucks). Returns a list of matching Chain objects (chain resource name, display name, and associated location counts by group) ranked by relevance.`,
    params: [
      {
        name: 'chainName',
        type: 'string',
        required: true,
        description: `The chain name to search for, e.g. Starbucks. Search is not case-sensitive and returns chains whose name matches or is similar.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Maximum number of matching chains to return. Default 10, maximum 500. Leave blank to use the API default.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_search_keywords',
    description: `List the search keywords customers used to find a Google Business Profile location on Search or Maps, with monthly aggregated impression counts. Requires the location resource name and a complete start/end month (year and month for each). Supports pagination via pageSize and pageToken. Returns a page of keyword/impression-count entries plus a next page token.`,
    params: [
      {
        name: 'end_month',
        type: 'integer',
        required: true,
        description: `Month of the end month for the impressions range (1-12), e.g. 6. Required together with end_year.`,
      },
      {
        name: 'end_year',
        type: 'integer',
        required: true,
        description: `Year of the end month for the impressions range, e.g. 2026. Required together with end_month.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The location resource name to fetch keyword impressions for, in the form locations/{location_id}. Example: locations/12345678901234567890.`,
      },
      {
        name: 'start_month',
        type: 'integer',
        required: true,
        description: `Month of the start month for the impressions range (1-12), e.g. 1. Required together with start_year.`,
      },
      {
        name: 'start_year',
        type: 'integer',
        required: true,
        description: `Year of the start month for the impressions range, e.g. 2026. Required together with start_month.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Maximum number of keyword impression entries to return per page. Default 100, maximum 100. Leave blank to use the API default.`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Token from a previous search_keywords call's response to fetch the next page of results. Leave blank to fetch the first page.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_transfer_location',
    description: `Move a Google Business Profile location from an account the caller owns to another account the caller also administers (at least as a manager). Requires the location resource name (locations/{location_id}) and the destination account resource name (accounts/{account_id}). This is a destructive operation with respect to the source account's association -- the location is removed from the source account and attached to the destination account. Returns an empty response on success.`,
    params: [
      {
        name: 'destination_account',
        type: 'string',
        required: true,
        description: `The resource name of the account to transfer the location to, in the form accounts/{account_id}. The caller must be at least a manager of this destination account. Example: accounts/106234523651626475467.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The resource name of the location to transfer, in the form locations/{location_id}. Example: locations/12345678901234567890.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_update_account',
    description: `Update a Business Profile account's display name using the Account Management API (PATCH). Only accountName is supported for update by this API, so the updateMask query parameter is statically set to 'accountName' (unlike googlebusinessprofile_update_listing, which dynamically covers multiple maskable fields, this tool's underlying Account resource only exposes one writable field beyond immutable/read-only ones, so a static mask is correct and sufficient).`,
    params: [
      {
        name: 'accountName',
        type: 'string',
        required: true,
        description: `The new display name for the account. Example: Cascade Coffee Holdings.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The account resource name to update, in the form accounts/{account_id}. Example: accounts/106234523651626475467.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_update_listing',
    description: `Update a Google Business Profile location's business information (a partial update via PATCH). Provide the location resource name, only the fields you want to change, and an update_mask naming exactly those fields — Google clears any field named in update_mask that is left blank in the request body, so update_mask must match the fields you actually supply. Supports updating the business title, primary phone number, website URL, regular hours (as a list of open/close periods), storefront address, and primary category.`,
    params: [
      {
        name: 'location',
        type: 'string',
        required: true,
        description: `The location resource name to update, in the form locations/{location_id}. Example: locations/12345678901234567890.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of top-level Location fields to update, matching exactly the fields you supply in this request (e.g. "title" if you only set title; "title,phoneNumbers" if you set both title and primary_phone). Valid field names: title, phoneNumbers, websiteUri, regularHours, storefrontAddress, categories. WARNING: Google clears any field named here that you leave blank — do not include a field name unless you are also supplying its value.`,
      },
      {
        name: 'primary_category_name',
        type: 'string',
        required: false,
        description: `New primary category resource name for the location, e.g. categories/gcid:restaurant. Maps to categories.primaryCategory.name. Leave blank to keep the existing primary category.`,
      },
      {
        name: 'primary_phone',
        type: 'string',
        required: false,
        description: `New primary phone number for the location, in E.164 or local format. Maps to phoneNumbers.primaryPhone. Leave blank to keep the existing phone number.`,
      },
      {
        name: 'regular_hours_periods',
        type: 'array',
        required: false,
        description: `New regular business hours as an array of time periods, replacing the existing regularHours entirely. Each period is an object: {"openDay": "MONDAY", "openTime": "09:00", "closeDay": "MONDAY", "closeTime": "17:00"}. openDay/closeDay must be one of MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY. openTime/closeTime are 24-hour HH:MM strings. Leave blank to keep existing hours.`,
      },
      {
        name: 'storefront_address_lines',
        type: 'array',
        required: false,
        description: `New street address lines for the location's storefront address (e.g. ["1600 Amphitheatre Pkwy"]). Required together with storefront_locality and storefront_region_code if updating the storefront address.`,
      },
      {
        name: 'storefront_administrative_area',
        type: 'string',
        required: false,
        description: `State or administrative area of the storefront address, e.g. CA. Optional even when updating the address.`,
      },
      {
        name: 'storefront_locality',
        type: 'string',
        required: false,
        description: `City/locality of the storefront address. Required together with storefront_address_lines if updating the storefront address.`,
      },
      {
        name: 'storefront_postal_code',
        type: 'string',
        required: false,
        description: `Postal/ZIP code of the storefront address. Optional even when updating the address.`,
      },
      {
        name: 'storefront_region_code',
        type: 'string',
        required: false,
        description: `CLDR region code (ISO 3166-1 alpha-2) of the storefront address's country, e.g. US. Required together with storefront_address_lines and storefront_locality if updating the storefront address.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New business name (title) for the location. Google does not allow marketing taglines or special characters. Leave blank to keep the existing title.`,
      },
      {
        name: 'website_uri',
        type: 'string',
        required: false,
        description: `New website URL for the location. Leave blank to keep the existing website URL.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_update_location_attributes',
    description: `Update the merchant-set attributes for a Google Business Profile location (e.g. wheelchair accessible, wifi, outdoor seating, payment options). Requires the attributes resource name, an array of attribute objects to set, and an attributeMask naming exactly the attribute IDs being updated (comma-separated, e.g. attributes/has_wifi,attributes/has_wheelchair_accessible_entrance). Each attribute has a name (the attribute ID, e.g. attributes/has_wifi) and one of: values (for BOOL/ENUM attributes, e.g. [true] or ["attributes/has_wifi/enum/1"]), uriValues (for URL attributes, e.g. [{"uri": "https://example.com/menu"}]), or repeatedEnumValue (for REPEATED_ENUM attributes, e.g. {"setValues": [...], "unsetValues": [...]}). Google clears any attribute named in attributeMask that is left out of the attributes array, so attributeMask must match the attribute names you actually supply.`,
    params: [
      {
        name: 'attributeMask',
        type: 'string',
        required: true,
        description: `Comma-separated list of attribute IDs being updated, matching the 'name' values inside the attributes array, e.g. attributes/has_wifi,attributes/has_wheelchair_accessible_entrance. Google clears any attribute listed here that is not included in the attributes array, so this must match exactly the attributes you are setting.`,
      },
      {
        name: 'attributes',
        type: 'array',
        required: true,
        description: `Array of attribute objects to set on the location. Each object must have a 'name' (attribute ID, e.g. attributes/has_wifi) and one of 'values' (array, for BOOL/ENUM types), 'uriValues' (array of {"uri": string}, for URL type), or 'repeatedEnumValue' ({"setValues": [string], "unsetValues": [string]}, for REPEATED_ENUM type). Example: [{"name": "attributes/has_wifi", "values": [true]}].`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The resource name of the attributes to update, in the form locations/{location_id}/attributes. Example: locations/12345678901234567890/attributes.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_update_post',
    description: `Update an existing local post (What's New update) for a Google Business Profile location using the legacy My Business API v4 (PATCH). Provide the account ID, location ID, post ID, only the fields you want to change (summary, callToActionType/callToActionUrl, topicType), and an update_mask naming exactly those fields — Google clears any field named in update_mask that is left blank in the request body, so update_mask must match the fields you actually supply. Note: this legacy v4 endpoint requires separate Google allow-list approval for the OAuth client; a 403 response may indicate the client has not been allow-listed rather than a tool defect.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `The Business Profile account ID that owns the location. Example: 106234523651626475467.`,
      },
      {
        name: 'locationId',
        type: 'string',
        required: true,
        description: `The location ID under the account that owns the post. Example: 12345678901234567890.`,
      },
      {
        name: 'postId',
        type: 'string',
        required: true,
        description: `The ID of the local post to update. Example: 9876543210987654321.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of top-level LocalPost fields to update, matching exactly the fields you supply in this request (e.g. "summary" if you only set summary; "summary,topicType" if you set both). Valid field names: summary, callToAction, topicType. WARNING: Google clears any field named here that you leave blank — do not include a field name unless you are also supplying its value.`,
      },
      {
        name: 'callToActionType',
        type: 'string',
        required: false,
        description: `New call-to-action button type for the post. One of BOOK, ORDER, SHOP, LEARN_MORE, SIGN_UP, CALL. Leave blank to keep the existing call-to-action.`,
      },
      {
        name: 'callToActionUrl',
        type: 'string',
        required: false,
        description: `New target URL for the call-to-action button. Required if callToActionType is set to a value other than CALL. Leave blank to keep the existing URL.`,
      },
      {
        name: 'summary',
        type: 'string',
        required: false,
        description: `New body text of the local post. Leave blank to keep the existing summary.`,
      },
      {
        name: 'topicType',
        type: 'string',
        required: false,
        description: `New topic type of the local post. STANDARD is a general update. EVENT requires an event object to already be set on the post. OFFER requires an offer object to already be set. ALERT is used for urgent announcements. Leave blank to keep the existing topic type.`,
      },
    ],
  },
  {
    name: 'googlebusinessprofile_verify_location',
    description: `Start the verification process for a Google Business Profile location using a chosen method. Requires the location resource name (locations/{location_id}) and a verification method (ADDRESS, EMAIL, PHONE_CALL, SMS, or AUTO). EMAIL requires emailAddress, PHONE_CALL/SMS require phoneNumber, ADDRESS optionally accepts mailerContact; the emailAddress/phoneNumber values must be one of the options previously returned by Fetch Verification Options. AUTO requires no additional identifying field. Returns the created Verification resource, including its verification ID and state, which is needed to complete verification (e.g. submitting the received PIN) via a separate API call.`,
    params: [
      {
        name: 'method',
        type: 'string',
        required: true,
        description: `The verification method to use. ADDRESS sends a postcard with a PIN. EMAIL sends a PIN to an email address (requires emailAddress). PHONE_CALL/SMS send a PIN via call or text (requires phoneNumber). AUTO verifies without extra user action, if eligible for the location.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The resource name of the location to verify, in the form locations/{location_id}. Example: locations/12345678901234567890.`,
      },
      {
        name: 'emailAddress',
        type: 'string',
        required: false,
        description: `Required when method is EMAIL. The email address the verification PIN should be sent to. Must be one of the email addresses previously returned by Fetch Verification Options for this location. Example: owner@example.com.`,
      },
      {
        name: 'languageCode',
        type: 'string',
        required: false,
        description: `The BCP 47 language code representing the language to use for the verification process. Example: en-US. Optional; if omitted, Google chooses a default.`,
      },
      {
        name: 'mailerContact',
        type: 'string',
        required: false,
        description: `Optional, used only with the ADDRESS method. The contact name the postcard should be addressed to.`,
      },
      {
        name: 'phoneNumber',
        type: 'string',
        required: false,
        description: `Required when method is PHONE_CALL or SMS. The phone number the verification PIN should be sent to via call or text. Must be one of the phone numbers previously returned by Fetch Verification Options for this location. Example: +14155551234.`,
      },
    ],
  },
]
