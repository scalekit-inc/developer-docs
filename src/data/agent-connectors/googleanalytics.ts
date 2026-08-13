import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googleanalytics_accounts_run_access_report',
    description: `Run a Data Access Record Report for a Google Analytics account: an audit log of who accessed report data and when, across every property in the account. Useful for compliance/security reviews. Returns rows broken down by the requested access-report dimensions and metrics (e.g. userEmail, accessCount) over a date range.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `End of the report date range (YYYY-MM-DD, or relative: today/yesterday/NdaysAgo).`,
      },
      {
        name: 'entity',
        type: 'string',
        required: true,
        description: `The account to run the access report for, in the form accounts/{accountId}.`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: true,
        description: `Access-report metric names, e.g. ["accessCount"]. At least one metric is required. See the Data Access API schema docs for valid names.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `Start of the report date range (YYYY-MM-DD, or relative: today/yesterday/NdaysAgo).`,
      },
      {
        name: 'dimension_filter',
        type: 'object',
        required: false,
        description: `Advanced: a raw FilterExpression object to filter rows by dimension values.`,
      },
      {
        name: 'dimensions',
        type: 'array',
        required: false,
        description: `Access-report dimension names, e.g. ["userEmail", "propertyId"]. See the Data Access API schema docs for valid names.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum rows to return. Defaults to 10000; the API returns at most 100000 rows regardless.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Row offset for pagination. Omit or set to 0 for the first page.`,
      },
      {
        name: 'return_entity_quota',
        type: 'boolean',
        required: false,
        description: `If true, the response includes this account's current Data Access API quota consumption.`,
      },
      {
        name: 'time_zone',
        type: 'string',
        required: false,
        description: `IANA time zone (e.g. America/New_York) used to interpret start/end dates. Defaults to the property's time zone if omitted.`,
      },
    ],
  },
  {
    name: 'googleanalytics_acknowledge_user_data_collection',
    description: `Acknowledge that the caller has the necessary privacy disclosures and rights from end users for the collection and processing of their data on this property. Required before certain data-collection features (such as user-ID reporting) can be used.`,
    params: [
      {
        name: 'acknowledgement',
        type: 'string',
        required: true,
        description: `Required. The exact acknowledgement text confirming the caller has the necessary privacy disclosures and rights from end users for the collection and processing of their data, including associating that data with the visitation information Google Analytics collects. Must match exactly: "I acknowledge that I have the necessary privacy disclosures and rights from my end users for the collection and processing of their data, including the association of such data with the visitation information Google Analytics collects from my site and/or app property."`,
      },
      {
        name: 'property',
        type: 'string',
        required: true,
        description: `Property for which to acknowledge user data collection, in the form properties/{propertyId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_archive_custom_dimension',
    description: `Archive a custom dimension on a property. Archived custom dimensions are permanently removed and cannot be restored, but historical data collected under them remains available in reports.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the custom dimension to archive, in the form properties/{propertyId}/customDimensions/{customDimensionId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_archive_custom_metric',
    description: `Archive a custom metric on a property. Archived custom metrics are permanently removed and cannot be restored, but historical data collected under them remains available in reports.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the custom metric to archive, in the form properties/{propertyId}/customMetrics/{customMetricId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_batch_run_pivot_reports',
    description: `Run multiple GA4 pivot reports against the same property in a single call. Provide an array of RunPivotReportRequest-shaped objects (each with dimensions, metrics, pivots, dateRanges, etc. using the GA4 Data API's own field names); each entry's property, if set, must match the top-level property.`,
    params: [
      {
        name: 'property',
        type: 'string',
        required: true,
        description: `The GA4 property identifier all requests in the batch run against, in the form properties/{propertyId}.`,
      },
      {
        name: 'requests',
        type: 'array',
        required: true,
        description: `Array of RunPivotReportRequest objects, one per pivot report, using the GA4 Data API's native field names (dimensions: [{name}], metrics: [{name}], pivots: [...], dateRanges: [{startDate,endDate}], etc). Example: [{"dimensions":[{"name":"country"}],"metrics":[{"name":"activeUsers"}],"pivots":[{"fieldNames":["country"],"limit":"5"}],"dateRanges":[{"startDate":"7daysAgo","endDate":"today"}]}]`,
      },
    ],
  },
  {
    name: 'googleanalytics_batch_run_reports',
    description: `Run multiple GA4 reports against the same property in a single call. Provide an array of RunReportRequest-shaped objects (each with dimensions, metrics, dateRanges, etc. using the GA4 Data API's own field names); each entry's property, if set, must match the top-level property.`,
    params: [
      {
        name: 'property',
        type: 'string',
        required: true,
        description: `The GA4 property identifier all requests in the batch run against, in the form properties/{propertyId}.`,
      },
      {
        name: 'requests',
        type: 'array',
        required: true,
        description: `Array of RunReportRequest objects, one per report, using the GA4 Data API's native field names (dimensions: [{name}], metrics: [{name}], dateRanges: [{startDate,endDate}], etc). Example: [{"dimensions":[{"name":"country"}],"metrics":[{"name":"activeUsers"}],"dateRanges":[{"startDate":"7daysAgo","endDate":"today"}]}]`,
      },
    ],
  },
  {
    name: 'googleanalytics_check_compatibility',
    description: `Check which dimensions and metrics are compatible with each other for a GA4 property before running a report. Pass the same dimensions/metrics/filters you intend to use in Run Report to preview which combinations are valid.`,
    params: [
      {
        name: 'property',
        type: 'string',
        required: true,
        description: `The GA4 property identifier to check against, in the form properties/{propertyId}. Should match the property you intend to use in Run Report.`,
      },
      {
        name: 'compatibility_filter',
        type: 'string',
        required: false,
        description: `Restrict results to only this compatibility level. Valid values: COMPATIBILITY_UNSPECIFIED, COMPATIBLE, INCOMPATIBLE. Commonly set to COMPATIBLE to only return usable dimensions/metrics.`,
      },
      {
        name: 'dimension_filter',
        type: 'object',
        required: false,
        description: `Advanced: a raw GA4 FilterExpression object matching what you intend to use in Run Report's dimension filter.`,
      },
      {
        name: 'dimensions',
        type: 'array',
        required: false,
        description: `Dimension names to check, e.g. ["country", "city"]. Should be the same value you intend to use in Run Report.`,
      },
      {
        name: 'metric_filter',
        type: 'object',
        required: false,
        description: `Advanced: a raw GA4 FilterExpression object matching what you intend to use in Run Report's metric filter.`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: false,
        description: `Metric names to check, e.g. ["activeUsers", "sessions"]. Should be the same value you intend to use in Run Report.`,
      },
    ],
  },
  {
    name: 'googleanalytics_create_audience_export',
    description: `Create an audience export for a GA4 audience, listing the users currently in that audience along with the requested dimension values. Creation is asynchronous — the export moves from CREATING to ACTIVE (typically within ~15 minutes); poll Get Audience Export or List Audience Exports until state is ACTIVE, then use Query Audience Export to read the rows.`,
    params: [
      {
        name: 'audience',
        type: 'string',
        required: true,
        description: `The audience resource name to export, in the form properties/{propertyId}/audiences/{audienceId}. Find audience IDs via the Admin API's List Audiences.`,
      },
      {
        name: 'dimensions',
        type: 'array',
        required: true,
        description: `Dimension API names to include for each exported user, e.g. ["deviceCategory", "country"]. At least one dimension is required.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The GA4 property under which to create the audience export, in the form properties/{propertyId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_create_conversion_event',
    description: `Deprecated: prefer the equivalent Key Event tool. Create a conversion event for an existing GA4 event name.`,
    params: [
      {
        name: 'event_name',
        type: 'string',
        required: true,
        description: `The GA4 event name this conversion event tracks, e.g. "purchase" or "sign_up". The event must already be recorded on the property.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `Resource name of the parent property to create the conversion event under, in the form properties/{propertyId}.`,
      },
      {
        name: 'counting_method',
        type: 'string',
        required: false,
        description: `How conversions are counted across multiple events within a session. One of CONVERSION_COUNTING_METHOD_UNSPECIFIED, ONCE_PER_EVENT, or ONCE_PER_SESSION. Defaults to ONCE_PER_EVENT if omitted.`,
      },
      {
        name: 'default_conversion_value',
        type: 'object',
        required: false,
        description: `Default conversion value as a raw DefaultConversionValue object: {"value": <number>, "currencyCode": "<ISO4217>"}. Both fields are required together if set.`,
      },
    ],
  },
  {
    name: 'googleanalytics_create_custom_dimension',
    description: `Create a custom dimension on a property to track a custom event parameter, user property, or eCommerce item parameter as a report dimension.`,
    params: [
      {
        name: 'display_name',
        type: 'string',
        required: true,
        description: `Required. Display name shown for this custom dimension in the Analytics UI. Max 82 characters, alphanumeric plus spaces and underscores, starting with a letter.`,
      },
      {
        name: 'parameter_name',
        type: 'string',
        required: true,
        description: `Required. Immutable. The event parameter, user property, or item parameter name being tracked by this custom dimension. Must be alphanumeric plus underscores, starting with a letter. Max 24 characters for user-scoped dimensions, 40 characters for event-scoped dimensions.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `Resource name of the parent property to create the custom dimension on, in the form properties/{propertyId}.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `Required. Immutable. The scope of this custom dimension — which kind of entity the tracked parameter belongs to.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of this custom dimension shown in the Analytics UI. Max 150 characters.`,
      },
      {
        name: 'disallow_ads_personalization',
        type: 'boolean',
        required: false,
        description: `If true, sets this dimension as NPA (No Personalized Ads) and excludes it from ads personalization. Only supported for user-scoped dimensions.`,
      },
    ],
  },
  {
    name: 'googleanalytics_create_custom_metric',
    description: `Create a custom metric on a property to track a custom event parameter as a report metric.`,
    params: [
      {
        name: 'display_name',
        type: 'string',
        required: true,
        description: `Required. Display name shown for this custom metric in the Analytics UI. Max 82 characters, alphanumeric plus spaces and underscores, starting with a letter.`,
      },
      {
        name: 'measurement_unit',
        type: 'string',
        required: true,
        description: `Required. The unit of measurement for this custom metric's value.`,
      },
      {
        name: 'parameter_name',
        type: 'string',
        required: true,
        description: `Required. Immutable. The event parameter name being tracked by this custom metric. Must be alphanumeric plus underscores, starting with a letter. Max 40 characters.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `Resource name of the parent property to create the custom metric on, in the form properties/{propertyId}.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `Required. Immutable. The scope of this custom metric. Currently only EVENT is supported.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of this custom metric shown in the Analytics UI. Max 150 characters.`,
      },
      {
        name: 'restricted_metric_type',
        type: 'array',
        required: false,
        description: `Types of restricted data this metric may contain, e.g. ["COST_DATA"] or ["REVENUE_DATA"]. Required and non-empty if measurement_unit is CURRENCY; must be empty otherwise.`,
      },
    ],
  },
  {
    name: 'googleanalytics_create_data_stream',
    description: `Create a new WEB data stream for a Google Analytics 4 property. Note: Google's Admin API only supports creating WEB_DATA_STREAM directly here — creating ANDROID_APP_DATA_STREAM or IOS_APP_DATA_STREAM through this endpoint is rejected by Google with "To create app streams, use the Firebase API" (confirmed live); app streams must be created via Firebase, then they appear here read-only through Get/List Data Stream.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The resource name of the parent property to create the data stream under, in the form properties/{propertyId}.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type of data stream to create. This is immutable once the stream is created. In practice only WEB_DATA_STREAM can be created through this API — Google rejects ANDROID_APP_DATA_STREAM/IOS_APP_DATA_STREAM here with "To create app streams, use the Firebase API".`,
      },
      {
        name: 'android_app_stream_data',
        type: 'object',
        required: false,
        description: `Raw AndroidAppStreamData object, required when type is ANDROID_APP_DATA_STREAM. Example: {"packageName": "com.example.myapp"}.`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `Human-readable display name for the stream, up to 255 UTF-16 code units. Required for web streams.`,
      },
      {
        name: 'ios_app_stream_data',
        type: 'object',
        required: false,
        description: `Raw IosAppStreamData object, required when type is IOS_APP_DATA_STREAM. Example: {"bundleId": "com.example.myapp"}.`,
      },
      {
        name: 'web_stream_data',
        type: 'object',
        required: false,
        description: `Raw WebStreamData object, required when type is WEB_DATA_STREAM. Example: {"defaultUri": "https://www.example.com"}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_create_firebase_link',
    description: `Link a Firebase project to a Google Analytics property.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `Resource name of the parent property to create the Firebase link under, in the form properties/{propertyId}.`,
      },
      {
        name: 'project',
        type: 'string',
        required: true,
        description: `Immutable. The Firebase project resource name to link, e.g. "projects/1234". Either a project number or a project ID works when creating the link.`,
      },
    ],
  },
  {
    name: 'googleanalytics_create_google_ads_link',
    description: `Link a Google Ads customer account to a Google Analytics property.`,
    params: [
      {
        name: 'customer_id',
        type: 'string',
        required: true,
        description: `Immutable. The Google Ads customer ID to link, provided as digits only with no dashes, e.g. "1234567890".`,
      },
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `Resource name of the parent property to create the Google Ads link under, in the form properties/{propertyId}.`,
      },
      {
        name: 'ads_personalization_enabled',
        type: 'boolean',
        required: false,
        description: `Whether personalized advertising features are enabled for this link — publishing GA4 audiences and remarketing data to the linked Google Ads account. Defaults to true if omitted.`,
      },
    ],
  },
  {
    name: 'googleanalytics_create_key_event',
    description: `Create a key event for an existing GA4 event name. Key Events (formerly Conversion Events) mark events that represent valuable user actions.`,
    params: [
      {
        name: 'counting_method',
        type: 'string',
        required: true,
        description: `Required. How this key event is counted across multiple events within a session. One of COUNTING_METHOD_UNSPECIFIED, ONCE_PER_EVENT, or ONCE_PER_SESSION.`,
      },
      {
        name: 'event_name',
        type: 'string',
        required: true,
        description: `The GA4 event name this key event tracks, e.g. "purchase" or "sign_up". The event must already be recorded on the property.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `Resource name of the parent property to create the key event under, in the form properties/{propertyId}.`,
      },
      {
        name: 'default_value',
        type: 'object',
        required: false,
        description: `Default value for this key event as a raw KeyEventDefaultValue object: {"numericValue": <number>, "currencyCode": "<ISO4217>"}. Both fields are required together if set.`,
      },
    ],
  },
  {
    name: 'googleanalytics_create_measurement_protocol_secret',
    description: `Create a Measurement Protocol secret for a data stream. The generated secret value is used as the api_secret parameter when sending Measurement Protocol hits to this stream.`,
    params: [
      {
        name: 'display_name',
        type: 'string',
        required: true,
        description: `Required human-readable display name for this Measurement Protocol secret.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The resource name of the parent data stream to create the secret under, in the form properties/{propertyId}/dataStreams/{streamId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_create_property',
    description: `Create a new Google Analytics 4 property under an existing account.`,
    params: [
      {
        name: 'display_name',
        type: 'string',
        required: true,
        description: `Human-readable display name for the new property. Max 100 UTF-16 code units.`,
      },
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `Resource name of the parent account under which to create the property, in the form accounts/{accountId}.`,
      },
      {
        name: 'time_zone',
        type: 'string',
        required: true,
        description: `IANA reporting time zone for the property, e.g. America/Los_Angeles. Used for the boundaries of every day in reports, regardless of where the data originated.`,
      },
      {
        name: 'currency_code',
        type: 'string',
        required: false,
        description: `ISO 4217 currency code used to display currency-denominated metrics in reports, e.g. USD.`,
      },
      {
        name: 'industry_category',
        type: 'string',
        required: false,
        description: `Industry associated with this property.`,
      },
      {
        name: 'property_type',
        type: 'string',
        required: false,
        description: `Type of the property to create. Defaults to PROPERTY_TYPE_ORDINARY if unspecified.`,
      },
    ],
  },
  {
    name: 'googleanalytics_delete_account',
    description: `Soft-delete a Google Analytics account. The account and all its properties are marked for deletion; Google permanently purges them after roughly 35 days unless the account is restored before then.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the account to delete, in the form accounts/{accountId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_delete_conversion_event',
    description: `Deprecated: prefer the equivalent Key Event tool. Permanently delete a conversion event. Only events where 'deletable' is true can be deleted (custom events created by the property admin).`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the conversion event to delete, in the form properties/{propertyId}/conversionEvents/{conversionEventId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_delete_data_stream',
    description: `Permanently delete a data stream (web, Android app, or iOS app) from a property. Data collection tied to this stream's measurement ID stops immediately and cannot be undone.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The data stream resource name to delete, in the form properties/{propertyId}/dataStreams/{streamId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_delete_firebase_link',
    description: `Unlink a Firebase project from a Google Analytics property.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the Firebase link to delete, in the form properties/{propertyId}/firebaseLinks/{firebaseLinkId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_delete_google_ads_link',
    description: `Unlink a Google Ads account from a Google Analytics property.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the Google Ads link to delete, in the form properties/{propertyId}/googleAdsLinks/{googleAdsLinkId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_delete_key_event',
    description: `Permanently delete a key event. Only events where 'deletable' is true can be deleted (custom events created by the property admin).`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the key event to delete, in the form properties/{propertyId}/keyEvents/{keyEventId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_delete_measurement_protocol_secret',
    description: `Permanently delete a Measurement Protocol secret. Any Measurement Protocol hits sent with this secret's api_secret value are rejected once it is deleted, and this action cannot be undone.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The Measurement Protocol secret resource name to delete, in the form properties/{propertyId}/dataStreams/{streamId}/measurementProtocolSecrets/{secretId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_delete_property',
    description: `Soft-delete a Google Analytics property. The property is marked for deletion and Google permanently purges it after approximately 35 days unless it is restored before then.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the property to delete, in the form properties/{propertyId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_get_account',
    description: `Fetch a single Google Analytics account's details by resource name.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the account to fetch, in the form accounts/{accountId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_get_audience_export',
    description: `Fetch the configuration and current state (CREATING, ACTIVE, or FAILED) of a GA4 audience export. Use this to poll a newly created export until it becomes ACTIVE before querying its rows.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The audience export resource name, in the form properties/{propertyId}/audienceExports/{audienceExportId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_get_conversion_event',
    description: `Deprecated: prefer the equivalent Key Event tool. Fetch a single Google Analytics conversion event by its resource name.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the conversion event to fetch, in the form properties/{propertyId}/conversionEvents/{conversionEventId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_get_custom_dimension',
    description: `Fetch a single custom dimension by resource name.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the custom dimension to fetch, in the form properties/{propertyId}/customDimensions/{customDimensionId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_get_custom_metric',
    description: `Fetch a single custom metric by resource name.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the custom metric to fetch, in the form properties/{propertyId}/customMetrics/{customMetricId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_get_data_retention_settings',
    description: `Get a property's event-level and user-level data retention settings.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the data retention settings, in the form properties/{propertyId}/dataRetentionSettings.`,
      },
    ],
  },
  {
    name: 'googleanalytics_get_data_sharing_settings',
    description: `Get the data-sharing settings for a Google Analytics account. These settings control what account data Google may use for benchmarking, technical support, and other Google products.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the data sharing settings to fetch, in the form accounts/{accountId}/dataSharingSettings.`,
      },
    ],
  },
  {
    name: 'googleanalytics_get_data_stream',
    description: `Fetch a single Google Analytics 4 data stream (web, Android app, or iOS app) by its resource name.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The data stream resource name to fetch, in the form properties/{propertyId}/dataStreams/{streamId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_get_key_event',
    description: `Fetch a single key event by resource name, in the form properties/{propertyId}/keyEvents/{keyEventId}.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the key event to fetch, in the form properties/{propertyId}/keyEvents/{keyEventId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_get_measurement_protocol_secret',
    description: `Fetch a single Measurement Protocol secret by resource name. The response includes the secret value itself, which is used as the api_secret parameter when sending Measurement Protocol hits.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The Measurement Protocol secret resource name to fetch, in the form properties/{propertyId}/dataStreams/{streamId}/measurementProtocolSecrets/{secretId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_get_metadata',
    description: `Fetch the dimensions and metrics available for a GA4 property, including custom dimensions/metrics defined on that property. Use this to discover valid dimension/metric API names before calling Run Report.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The metadata resource name, in the form properties/{propertyId}/metadata. Set the property ID to 0 (properties/0/metadata) to retrieve dimensions/metrics common to all properties, excluding custom ones.`,
      },
    ],
  },
  {
    name: 'googleanalytics_get_property',
    description: `Fetch a single Google Analytics property's details by resource name.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the property to fetch, in the form properties/{propertyId}.`,
      },
    ],
  },
  {
    name: 'googleanalytics_list_account_summaries',
    description: `List account summaries for all accounts the caller has access to — a convenient combined view of accounts and their properties without needing separate List Accounts / List Properties calls. This is the easiest way to discover which properties you can query.`,
    params: [
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of account summaries to return in one page. Defaults to 50 if omitted; the maximum allowed value is 200.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token received from a previous list_account_summaries call, used to fetch the next page of results.`,
      },
    ],
  },
  {
    name: 'googleanalytics_list_accounts',
    description: `List all Google Analytics accounts accessible by the caller. Soft-deleted (trashed) accounts are excluded from the results unless show_deleted is set to true.`,
    params: [
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of accounts to return per page. Defaults to 50 if omitted; the API caps this at 200.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token from a previous List Accounts call, used to retrieve the next page of results.`,
      },
      {
        name: 'show_deleted',
        type: 'boolean',
        required: false,
        description: `Whether to include soft-deleted (trashed) accounts in the results. Defaults to false — trashed accounts are hidden unless this is set to true.`,
      },
    ],
  },
  {
    name: 'googleanalytics_list_audience_exports',
    description: `List all audience exports for a GA4 property, showing each export's state (CREATING, ACTIVE, FAILED) and row count.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The GA4 property whose audience exports to list, in the form properties/{propertyId}.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of audience exports to return. Defaults to 200 if omitted; the API caps this at 1000.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token from a previous List Audience Exports call, used to retrieve the next page of results.`,
      },
    ],
  },
  {
    name: 'googleanalytics_list_conversion_events',
    description: `Deprecated: prefer the equivalent Key Event tool. List the conversion events defined on a Google Analytics property.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `Resource name of the parent property whose conversion events to list, in the form properties/{propertyId}.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of conversion events to return. Defaults to 50 if omitted; the maximum value is 200.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token received from a previous list_conversion_events call, used to fetch the next page of results.`,
      },
    ],
  },
  {
    name: 'googleanalytics_list_custom_dimensions',
    description: `List custom dimensions defined on a property.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `Resource name of the parent property to list custom dimensions for, in the form properties/{propertyId}.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of custom dimensions to return per page. Defaults to 50 if omitted; the API caps this at 200.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token from a previous List Custom Dimensions call, used to retrieve the next page of results.`,
      },
    ],
  },
  {
    name: 'googleanalytics_list_custom_metrics',
    description: `List custom metrics defined on a property.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `Resource name of the parent property to list custom metrics for, in the form properties/{propertyId}.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of custom metrics to return per page. Defaults to 50 if omitted; the API caps this at 200.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token from a previous List Custom Metrics call, used to retrieve the next page of results.`,
      },
    ],
  },
  {
    name: 'googleanalytics_list_data_streams',
    description: `List all data streams (web, Android app, iOS app) for a Google Analytics 4 property, with pagination support.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The resource name of the parent property whose data streams to list, in the form properties/{propertyId}.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of data streams to return. Defaults to 50 if omitted; the API caps this at 200.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token received from a previous list_data_streams call, used to fetch the next page of results.`,
      },
    ],
  },
  {
    name: 'googleanalytics_list_firebase_links',
    description: `List Firebase project links for a property. A property can have at most one Firebase link.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `Resource name of the parent property to list Firebase links for, in the form properties/{propertyId}.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of Firebase links to return in one page. Defaults to 50 if omitted; the maximum allowed value is 200.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token received from a previous list_firebase_links call, used to fetch the next page of results.`,
      },
    ],
  },
  {
    name: 'googleanalytics_list_google_ads_links',
    description: `List Google Ads account links for a property.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `Resource name of the parent property to list Google Ads links for, in the form properties/{propertyId}.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of Google Ads links to return in one page. Defaults to 50 if omitted; the maximum allowed value is 200.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token received from a previous list_google_ads_links call, used to fetch the next page of results.`,
      },
    ],
  },
  {
    name: 'googleanalytics_list_key_events',
    description: `List the key events defined on a Google Analytics property.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `Resource name of the parent property whose key events to list, in the form properties/{propertyId}.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of key events to return. Defaults to 50 if omitted; the maximum value is 200.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token received from a previous list_key_events call, used to fetch the next page of results.`,
      },
    ],
  },
  {
    name: 'googleanalytics_list_measurement_protocol_secrets',
    description: `List all Measurement Protocol secrets registered for a data stream, with pagination support.`,
    params: [
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `The resource name of the parent data stream whose secrets to list, in the form properties/{propertyId}/dataStreams/{streamId}.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of secrets to return. Defaults to 10 if omitted; the API caps this at 10 since this resource is small by design.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token received from a previous list_measurement_protocol_secrets call, used to fetch the next page of results.`,
      },
    ],
  },
  {
    name: 'googleanalytics_list_properties',
    description: `List Google Analytics properties matching a filter, such as those belonging to a parent account/property or linked to a Firebase project. For a simple list of everything you can access, Get Account Summaries is usually more convenient.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: true,
        description: `Required filter expression restricting which properties are returned. Eligible fields: parent: (resource name of the parent account or property), ancestor: (resource name of the parent account), firebase_project: (linked Firebase project ID or number). Examples: "parent:accounts/123", "parent:properties/123", "ancestor:accounts/123", "firebase_project:my-project".`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of properties to return per page. Defaults to 50 if omitted; the API caps this at 200 (larger values are coerced down).`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Page token from a previous list call, used to fetch the next page of results. Omit for the first page.`,
      },
      {
        name: 'show_deleted',
        type: 'boolean',
        required: false,
        description: `If true, includes soft-deleted (trashed) properties in the results. Defaults to false if omitted.`,
      },
    ],
  },
  {
    name: 'googleanalytics_properties_run_access_report',
    description: `Run a Data Access Record Report for a single Google Analytics property: an audit log of who accessed report data and when. Useful for compliance/security reviews. Returns rows broken down by the requested access-report dimensions and metrics (e.g. userEmail, accessCount) over a date range.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `End of the report date range (YYYY-MM-DD, or relative: today/yesterday/NdaysAgo).`,
      },
      {
        name: 'entity',
        type: 'string',
        required: true,
        description: `The property to run the access report for, in the form properties/{propertyId}.`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: true,
        description: `Access-report metric names, e.g. ["accessCount"]. At least one metric is required. See the Data Access API schema docs for valid names.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `Start of the report date range (YYYY-MM-DD, or relative: today/yesterday/NdaysAgo).`,
      },
      {
        name: 'dimension_filter',
        type: 'object',
        required: false,
        description: `Advanced: a raw FilterExpression object to filter rows by dimension values.`,
      },
      {
        name: 'dimensions',
        type: 'array',
        required: false,
        description: `Access-report dimension names, e.g. ["userEmail", "propertyId"]. See the Data Access API schema docs for valid names.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum rows to return. Defaults to 10000; the API returns at most 100000 rows regardless.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Row offset for pagination. Omit or set to 0 for the first page.`,
      },
      {
        name: 'return_entity_quota',
        type: 'boolean',
        required: false,
        description: `If true, the response includes this account's current Data Access API quota consumption.`,
      },
      {
        name: 'time_zone',
        type: 'string',
        required: false,
        description: `IANA time zone (e.g. America/New_York) used to interpret start/end dates. Defaults to the property's time zone if omitted.`,
      },
    ],
  },
  {
    name: 'googleanalytics_provision_account_ticket',
    description: `Request a ticket for creating a new Google Analytics account. Returns an account ticket ID; the user must complete account creation by visiting Google's Terms of Service acceptance flow at https://analytics.google.com/analytics/web/?provisioningSignup=false#/termsofservice/{account_ticket_id} before the account actually exists.`,
    params: [
      {
        name: 'display_name',
        type: 'string',
        required: true,
        description: `Human-readable display name for the account to be created.`,
      },
      {
        name: 'redirect_uri',
        type: 'string',
        required: true,
        description: `Redirect URI where the user is sent after accepting the Terms of Service. Must be configured in Google Cloud Console as an authorized redirect URI for this OAuth client.`,
      },
      {
        name: 'region_code',
        type: 'string',
        required: true,
        description: `Country of business for the new account, as a Unicode CLDR region code.`,
      },
    ],
  },
  {
    name: 'googleanalytics_query_audience_export',
    description: `Retrieve the rows (users and their dimension values) from a GA4 audience export that is in the ACTIVE state. Supports pagination via limit/offset.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The audience export resource name to read rows from, in the form properties/{propertyId}/audienceExports/{audienceExportId}. The export must be in the ACTIVE state.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of rows to return. Defaults to 10000 if omitted; the API returns at most 250000 rows regardless of this value.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Row offset for pagination. The first request should omit this or set it to 0; subsequent pages set it to the previous request's limit.`,
      },
    ],
  },
  {
    name: 'googleanalytics_run_pivot_report',
    description: `Run a GA4 pivot report: returns a report with pivot tables built from the requested dimensions and metrics. Unlike Run Report, results are organized into pivot dimension headers rather than flat rows — use this for cross-tabulated views (e.g. sessions by country x device category).`,
    params: [
      {
        name: 'dimensions',
        type: 'array',
        required: true,
        description: `Dimension names available to the pivots, e.g. ["country", "deviceCategory"]. Referenced by name in the pivots field.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `End of the reporting date range. Accepts an ISO date (YYYY-MM-DD) or a relative value like today, yesterday, or NdaysAgo.`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: true,
        description: `Metric names to include in the report, e.g. ["activeUsers", "sessions"]. At least one metric is required.`,
      },
      {
        name: 'pivots',
        type: 'array',
        required: true,
        description: `Array of raw GA4 Pivot objects describing how to cross-tabulate the dimensions, e.g. [{"fieldNames":["country"],"limit":"5"},{"fieldNames":["deviceCategory"],"limit":"3"}]. Each pivot's fieldNames must reference names from Dimensions above.`,
      },
      {
        name: 'property',
        type: 'string',
        required: true,
        description: `The GA4 property identifier to query, in the form properties/{propertyId}.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `Start of the reporting date range. Accepts an ISO date (YYYY-MM-DD) or a relative value like today, yesterday, or NdaysAgo.`,
      },
      {
        name: 'dimension_filter',
        type: 'object',
        required: false,
        description: `Advanced: a raw GA4 FilterExpression object to filter rows by dimension values.`,
      },
      {
        name: 'metric_filter',
        type: 'object',
        required: false,
        description: `Advanced: a raw GA4 FilterExpression object to filter rows by metric values.`,
      },
    ],
  },
  {
    name: 'googleanalytics_run_realtime_report',
    description: `Run a GA4 realtime report: returns event data from the last 30 minutes (or a custom minute range) for a property, broken down by the requested dimensions and metrics. Use this for live/active-user dashboards rather than historical reporting.`,
    params: [
      {
        name: 'metrics',
        type: 'array',
        required: true,
        description: `Realtime metric names to include, e.g. ["activeUsers", "screenPageViews"]. At least one metric is required.`,
      },
      {
        name: 'property',
        type: 'string',
        required: true,
        description: `The GA4 property identifier to query, in the form properties/{propertyId}.`,
      },
      {
        name: 'dimension_filter',
        type: 'object',
        required: false,
        description: `Advanced: a raw GA4 FilterExpression object to filter rows by dimension values.`,
      },
      {
        name: 'dimensions',
        type: 'array',
        required: false,
        description: `Realtime dimension names to break the report down by, e.g. ["country", "unifiedScreenName"]. Optional — omit for a totals-only report.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of rows to return. Defaults to 10000 if omitted.`,
      },
      {
        name: 'metric_filter',
        type: 'object',
        required: false,
        description: `Advanced: a raw GA4 FilterExpression object to filter rows by metric values.`,
      },
      {
        name: 'minute_ranges',
        type: 'array',
        required: false,
        description: `Advanced: a raw array of GA4 MinuteRange objects (each optionally with startMinutesAgo/endMinutesAgo). If omitted, the API defaults to the last 30 minutes.`,
      },
      {
        name: 'return_property_quota',
        type: 'boolean',
        required: false,
        description: `If true, the response includes the property's current Realtime API quota consumption.`,
      },
    ],
  },
  {
    name: 'googleanalytics_run_report',
    description: `Run a Google Analytics 4 (GA4) report: returns a customized table of event data for a property, broken down by the requested dimensions and metrics over a date range. Use this for standard analytics queries like sessions by country, active users by day, or conversions by channel.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `End of the reporting date range. Accepts an ISO date (YYYY-MM-DD) or a relative value like today, yesterday, or NdaysAgo (e.g. 7daysAgo).`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: true,
        description: `Metric names to include in the report, e.g. ["activeUsers", "sessions", "screenPageViews"]. At least one metric is required. See the Google Analytics Data API dimensions & metrics reference for valid names.`,
      },
      {
        name: 'property',
        type: 'string',
        required: true,
        description: `The GA4 property identifier to query, in the form properties/{propertyId}. Find the numeric property ID in Google Analytics Admin settings.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `Start of the reporting date range. Accepts an ISO date (YYYY-MM-DD) or a relative value like today, yesterday, or NdaysAgo (e.g. 7daysAgo).`,
      },
      {
        name: 'currency_code',
        type: 'string',
        required: false,
        description: `A currency code in ISO 4217 format (e.g. USD, EUR, JPY) used for currency-denominated metrics. Defaults to the property's own currency if omitted.`,
      },
      {
        name: 'dimension_filter',
        type: 'object',
        required: false,
        description: `Advanced: a raw GA4 FilterExpression object to filter rows by dimension values. Example: {"filter":{"fieldName":"country","stringFilter":{"value":"United States"}}}`,
      },
      {
        name: 'dimensions',
        type: 'array',
        required: false,
        description: `Dimension names to break the report down by, e.g. ["country", "date"]. Optional — omit for a totals-only report with no breakdown.`,
      },
      {
        name: 'keep_empty_rows',
        type: 'boolean',
        required: false,
        description: `If true, rows where every metric is 0 are still returned (unless removed by a filter). If false or omitted, all-zero rows are dropped.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of rows to return. Defaults to 10000 if omitted. The API returns at most 250000 rows regardless of this value.`,
      },
      {
        name: 'metric_filter',
        type: 'object',
        required: false,
        description: `Advanced: a raw GA4 FilterExpression object to filter rows by metric values. Example: {"filter":{"fieldName":"sessions","numericFilter":{"operation":"GREATER_THAN","value":{"int64Value":"10"}}}}`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Row offset for pagination. The first request should omit this or set it to 0.`,
      },
      {
        name: 'order_bys',
        type: 'array',
        required: false,
        description: `Advanced: a raw array of GA4 OrderBy objects controlling row ordering in the response. Example: [{"metric":{"metricName":"sessions"},"desc":true}]`,
      },
      {
        name: 'return_property_quota',
        type: 'boolean',
        required: false,
        description: `If true, the response includes the property's current Analytics Data API quota consumption.`,
      },
    ],
  },
  {
    name: 'googleanalytics_search_change_history_events',
    description: `Search the configuration change history for a Google Analytics account or its child properties (e.g. property created, data stream updated). Does not include Data Access records — use Run Account Access Report for those.`,
    params: [
      {
        name: 'account',
        type: 'string',
        required: true,
        description: `The account to search change history for, in the form accounts/{accountId}.`,
      },
      {
        name: 'action',
        type: 'array',
        required: false,
        description: `Optional list of action types to filter changes by. Only change events of these action types are returned, e.g. ["CREATED", "UPDATED"].`,
      },
      {
        name: 'actor_email',
        type: 'array',
        required: false,
        description: `Optional list of actor email addresses to filter changes by. Only changes made by users with these emails are returned, e.g. ["user@example.com"].`,
      },
      {
        name: 'earliest_change_time',
        type: 'string',
        required: false,
        description: `Optional. Only return changes made after this time, as an RFC 3339 UTC "Zulu" datetime (e.g. 2024-01-01T00:00:00Z).`,
      },
      {
        name: 'latest_change_time',
        type: 'string',
        required: false,
        description: `Optional. Only return changes made before this time, as an RFC 3339 UTC "Zulu" datetime (e.g. 2024-12-31T23:59:59Z).`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of change history events to return per page. Defaults to 50 if omitted; the API caps this at 200.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token from a previous Search Change History Events call, used to retrieve the next page of results.`,
      },
      {
        name: 'property',
        type: 'string',
        required: false,
        description: `Optional resource name of a property to filter changes for, in the form properties/{propertyId}. If omitted, returns changes for the whole account and all its properties.`,
      },
      {
        name: 'resource_type',
        type: 'array',
        required: false,
        description: `Optional list of resource types to filter changes by. Only change events touching these resource types are returned. Pass a raw array of strings, e.g. ["PROPERTY", "DATA_STREAM"].`,
      },
    ],
  },
  {
    name: 'googleanalytics_update_account',
    description: `Update an existing Google Analytics account's editable fields (display name, region code). Requires the account resource name and an update mask listing which fields to change; only the fields named in the mask are applied.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The account resource name to update, in the form accounts/{accountId}.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of field names to update, in snake_case (e.g. "display_name,region_code"). Only fields named here are changed; use "*" to replace the entire entity.`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `New human-readable display name for the account. Include this field's name in update_mask (display_name) for it to take effect.`,
      },
      {
        name: 'region_code',
        type: 'string',
        required: false,
        description: `New country of business as a Unicode CLDR region code (e.g. US, GB, IN). Include this field's name in update_mask (region_code) for it to take effect.`,
      },
    ],
  },
  {
    name: 'googleanalytics_update_conversion_event',
    description: `Deprecated: prefer the equivalent Key Event tool. Update a conversion event's counting method or default conversion value. Requires the event resource name and an update mask listing which fields to change; only the fields named in the mask are applied.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the conversion event to update, in the form properties/{propertyId}/conversionEvents/{conversionEventId}.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of field names to update, in snake_case (e.g. "counting_method"). Only fields named here are changed.`,
      },
      {
        name: 'counting_method',
        type: 'string',
        required: false,
        description: `How conversions are counted across multiple events within a session. One of CONVERSION_COUNTING_METHOD_UNSPECIFIED, ONCE_PER_EVENT, or ONCE_PER_SESSION. Include this field's name in update_mask (counting_method) for it to take effect.`,
      },
      {
        name: 'default_conversion_value',
        type: 'object',
        required: false,
        description: `New default conversion value as a raw DefaultConversionValue object: {"value": <number>, "currencyCode": "<ISO4217>"}. Both fields are required together if set. Include this field's name in update_mask (default_conversion_value) for it to take effect.`,
      },
    ],
  },
  {
    name: 'googleanalytics_update_custom_dimension',
    description: `Update a custom dimension's display name or description. Scope and parameter name are immutable and cannot be changed. Note: disallow_ads_personalization cannot be changed after creation either — confirmed live, Google rejects it in update_mask with "One or more values in the field 'update_mask.paths_list' was invalid" even though the field itself is not documented as immutable; set it at creation time via Create Custom Dimension instead.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the custom dimension to update, in the form properties/{propertyId}/customDimensions/{customDimensionId}.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of field names to update, in snake_case (e.g. "display_name,description"). Only fields named here are changed.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description shown in the Analytics UI. Include description in update_mask for it to take effect.`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `New display name shown in the Analytics UI. Include display_name in update_mask for it to take effect.`,
      },
    ],
  },
  {
    name: 'googleanalytics_update_custom_metric',
    description: `Update a custom metric's display name or description. Parameter name, scope, and measurement unit are immutable and cannot be changed.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the custom metric to update, in the form properties/{propertyId}/customMetrics/{customMetricId}.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of field names to update, in snake_case (e.g. "display_name,description"). Only fields named here are changed.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description shown in the Analytics UI. Include description in update_mask for it to take effect.`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `New display name shown in the Analytics UI. Include display_name in update_mask for it to take effect.`,
      },
    ],
  },
  {
    name: 'googleanalytics_update_data_retention_settings',
    description: `Update a property's event-level and user-level data retention settings. Requires the settings resource name and an update mask listing which fields to change; only the fields named in the mask are applied.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the data retention settings to update, in the form properties/{propertyId}/dataRetentionSettings.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of field names to update, in snake_case (e.g. "event_data_retention,user_data_retention"). Only fields named here are changed.`,
      },
      {
        name: 'event_data_retention',
        type: 'string',
        required: false,
        description: `New retention duration for event-level data before it is automatically deleted. Include this field's name in update_mask (event_data_retention) for it to take effect. The 26/38/50-month values are available only to GA4 360 properties.`,
      },
      {
        name: 'reset_user_data_on_new_activity',
        type: 'boolean',
        required: false,
        description: `If true, the retention period for a given user's identifier resets to the full duration every time that user sends a new event to the property (a rolling window instead of a fixed one). Include this field's name in update_mask (reset_user_data_on_new_activity) for it to take effect.`,
      },
      {
        name: 'user_data_retention',
        type: 'string',
        required: false,
        description: `New retention duration for user-level data (including user-ID and advertising-ID associated data) before it is automatically deleted. Include this field's name in update_mask (user_data_retention) for it to take effect.`,
      },
    ],
  },
  {
    name: 'googleanalytics_update_data_stream',
    description: `Update a data stream's display name, or its type-specific web/Android/iOS stream data (e.g. the default URI for a web stream). Only fields named in the update mask are applied.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The data stream resource name to update, in the form properties/{propertyId}/dataStreams/{streamId}.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of field names to update, in snake_case (e.g. "display_name,web_stream_data"). Only fields named here are changed.`,
      },
      {
        name: 'android_app_stream_data',
        type: 'object',
        required: false,
        description: `Raw AndroidAppStreamData object carrying Android-app-stream-specific settings, e.g. {"packageName": "com.example.myapp"}. Only settable when this stream's type is ANDROID_APP_DATA_STREAM. Include this field's name in update_mask (android_app_stream_data) for it to take effect.`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `New display name for the stream, up to 255 UTF-16 code units. Include this field's name in update_mask (display_name) for it to take effect.`,
      },
      {
        name: 'ios_app_stream_data',
        type: 'object',
        required: false,
        description: `Raw IosAppStreamData object carrying iOS-app-stream-specific settings, e.g. {"bundleId": "com.example.myapp"}. Only settable when this stream's type is IOS_APP_DATA_STREAM. Include this field's name in update_mask (ios_app_stream_data) for it to take effect.`,
      },
      {
        name: 'web_stream_data',
        type: 'object',
        required: false,
        description: `Raw WebStreamData object carrying web-stream-specific settings, e.g. {"defaultUri": "https://www.example.com"}. Only settable when this stream's type is WEB_DATA_STREAM. Include this field's name in update_mask (web_stream_data) for it to take effect.`,
      },
    ],
  },
  {
    name: 'googleanalytics_update_google_ads_link',
    description: `Update a Google Ads link's personalized-advertising setting.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the Google Ads link to update, in the form properties/{propertyId}/googleAdsLinks/{googleAdsLinkId}.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of field names to update, in snake_case (e.g. "ads_personalization_enabled"). Only fields named here are changed.`,
      },
      {
        name: 'ads_personalization_enabled',
        type: 'boolean',
        required: false,
        description: `New value for whether personalized advertising features are enabled for this link. Include this field's name in update_mask (ads_personalization_enabled) for it to take effect.`,
      },
    ],
  },
  {
    name: 'googleanalytics_update_key_event',
    description: `Update a key event's counting method or default value. Requires the event resource name and an update mask listing which fields to change; only the fields named in the mask are applied.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the key event to update, in the form properties/{propertyId}/keyEvents/{keyEventId}.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of field names to update, in snake_case (e.g. "counting_method"). Only fields named here are changed.`,
      },
      {
        name: 'counting_method',
        type: 'string',
        required: false,
        description: `How this key event is counted across multiple events within a session. One of COUNTING_METHOD_UNSPECIFIED, ONCE_PER_EVENT, or ONCE_PER_SESSION. Include this field's name in update_mask (counting_method) for it to take effect.`,
      },
      {
        name: 'default_value',
        type: 'object',
        required: false,
        description: `New default value for this key event as a raw KeyEventDefaultValue object: {"numericValue": <number>, "currencyCode": "<ISO4217>"}. Include this field's name in update_mask (default_value) for it to take effect.`,
      },
    ],
  },
  {
    name: 'googleanalytics_update_measurement_protocol_secret',
    description: `Update a Measurement Protocol secret's display name. Only fields named in the update mask are applied; the secret value itself cannot be changed.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The Measurement Protocol secret resource name to update, in the form properties/{propertyId}/dataStreams/{streamId}/measurementProtocolSecrets/{secretId}.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of field names to update, in snake_case (e.g. "display_name"). Only fields named here are changed.`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `New human-readable display name for this secret. Include this field's name in update_mask (display_name) for it to take effect.`,
      },
    ],
  },
  {
    name: 'googleanalytics_update_property',
    description: `Update an existing Google Analytics property's editable fields (display name, industry category, time zone, currency code). Requires the property resource name and an update mask listing which fields to change; only the fields named in the mask are applied.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Resource name of the property to update, in the form properties/{propertyId}.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of field names to update, in snake_case (e.g. "display_name,time_zone"). Only fields named here are changed.`,
      },
      {
        name: 'currency_code',
        type: 'string',
        required: false,
        description: `New ISO 4217 currency code for the property, e.g. USD. Include this field's name in update_mask (currency_code) for it to take effect.`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `New human-readable display name for the property (max 100 UTF-16 code units). Include this field's name in update_mask (display_name) for it to take effect.`,
      },
      {
        name: 'industry_category',
        type: 'string',
        required: false,
        description: `New industry category for the property. Include this field's name in update_mask (industry_category) for it to take effect.`,
      },
      {
        name: 'time_zone',
        type: 'string',
        required: false,
        description: `New IANA reporting time zone for the property, e.g. America/Los_Angeles. Include this field's name in update_mask (time_zone) for it to take effect.`,
      },
    ],
  },
]
