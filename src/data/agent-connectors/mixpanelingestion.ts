import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'mixpanelingestion_feature_flags_definitions',
    description: `Get the full definitions of every feature flag/experiment configured in a Mixpanel project, including each flag's variants, rollout rules, and linked experiment. Provide either 'project_token' or 'project_id' to authenticate (project_id uses your Service Account credentials).`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `Your numeric Mixpanel Project ID, used if authenticating with a Service Account. Provide this or 'project_token'.`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: false,
        description: `Your Mixpanel Project Token, used if authenticating without a Service Account. Provide this or 'project_id'.`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_feature_flags_evaluate',
    description: `Evaluate all enabled Mixpanel feature flags and experiments for a given user, returning the variant each flag assigns them. Provide either 'project_token' or 'project_id' to authenticate (project_id uses your Service Account credentials).`,
    params: [
      {
        name: 'context',
        type: 'object',
        required: true,
        description: `JSON object describing the user to evaluate flags for. Must include 'distinct_id'; may include 'device_id' and 'custom_properties' (used for targeting rules). Example: {"distinct_id": "user_00123", "custom_properties": {"plan": "pro"}}.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `Your numeric Mixpanel Project ID, used if authenticating with a Service Account. Provide this or 'project_token'.`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: false,
        description: `Your Mixpanel Project Token, used if authenticating without a Service Account. Provide this or 'project_id'.`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_group_batch_update',
    description: `Send a batch of mixed group-profile updates to Mixpanel in a single call, analogous to 'mixpanelingestion_profile_batch_update' for user profiles. Each item in 'updates' is a fully-formed update object with its own "$token", "$group_key", "$group_id", and one operation key ($set, $set_once, $add, $union, $remove, $unset, or $delete). Example: [{"$token": "...", "$group_key": "Company", "$group_id": "Acme", "$set": {"Plan": "Enterprise"}}].`,
    params: [
      {
        name: 'updates',
        type: 'array',
        required: true,
        description: `Array of fully-formed group update objects, each with $token, $group_key, $group_id, and one operation key ($set/$set_once/$add/$union/$remove/$unset/$delete).`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_group_delete',
    description: `Permanently delete a Mixpanel group profile and all of its properties, analogous to 'mixpanelingestion_profile_delete' for user profiles. This does not delete historical events associated with the group.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The value identifying this specific group, e.g. the company name or account ID.`,
      },
      {
        name: 'group_key',
        type: 'string',
        required: true,
        description: `The name of the group key as configured in Mixpanel, e.g. "Company" or "Account ID".`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview). Embedded in the payload to authenticate the request.`,
      },
      {
        name: 'verbose',
        type: 'integer',
        required: false,
        description: `Set to 1 to receive a JSON object describing success/failure instead of a bare "1"/"0".`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_group_remove',
    description: `Remove a specific value from a list-valued property on a Mixpanel group profile, analogous to 'mixpanelingestion_profile_remove' for user profiles. If the value is not present, no change is made.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The value identifying this specific group, e.g. the company name or account ID.`,
      },
      {
        name: 'group_key',
        type: 'string',
        required: true,
        description: `The name of the group key as configured in Mixpanel, e.g. "Company" or "Account ID".`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview). Embedded in the payload to authenticate the request.`,
      },
      {
        name: 'removals',
        type: 'object',
        required: true,
        description: `JSON object mapping list-property names to the single value to remove from each. Example: {"Enabled Features": "beta-search"}.`,
      },
      {
        name: 'ip',
        type: 'integer',
        required: false,
        description: `Set to 1 to let Mixpanel geolocate the group profile from the request IP. Recommended to leave at 0 for server-side calls.`,
      },
      {
        name: 'strict',
        type: 'integer',
        required: false,
        description: `Set to 1 to have Mixpanel validate the record and return per-record error messages if validation fails.`,
      },
      {
        name: 'verbose',
        type: 'integer',
        required: false,
        description: `Set to 1 to receive a JSON object describing success/failure instead of a bare "1"/"0".`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_group_set',
    description: `Set (overwrite) properties on a Mixpanel group profile (e.g. a company or team account), analogous to 'mixpanelingestion_profile_set' for user profiles. Creates the group profile if it does not already exist. Requires Group Analytics to be enabled on your Mixpanel project.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The value identifying this specific group, e.g. the company name or account ID.`,
      },
      {
        name: 'group_key',
        type: 'string',
        required: true,
        description: `The name of the group key as configured in Mixpanel, e.g. "Company" or "Account ID".`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview). Embedded in the payload to authenticate the request.`,
      },
      {
        name: 'properties',
        type: 'object',
        required: true,
        description: `JSON object of property names and values to set on the group profile, overwriting any existing values. Example: {"Plan": "Enterprise", "Seats": 50}.`,
      },
      {
        name: 'ip',
        type: 'integer',
        required: false,
        description: `Set to 1 to let Mixpanel geolocate the group profile from the request IP. Recommended to leave at 0 for server-side calls.`,
      },
      {
        name: 'strict',
        type: 'integer',
        required: false,
        description: `Set to 1 to have Mixpanel validate the record and return per-record error messages if validation fails.`,
      },
      {
        name: 'verbose',
        type: 'integer',
        required: false,
        description: `Set to 1 to receive a JSON object describing success/failure instead of a bare "1"/"0".`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_group_set_once',
    description: `Set properties on a Mixpanel group profile only if they are not already set — existing values are never overwritten, analogous to 'mixpanelingestion_profile_set_once' for user profiles. Creates the group profile if it does not already exist.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The value identifying this specific group, e.g. the company name or account ID.`,
      },
      {
        name: 'group_key',
        type: 'string',
        required: true,
        description: `The name of the group key as configured in Mixpanel, e.g. "Company" or "Account ID".`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview). Embedded in the payload to authenticate the request.`,
      },
      {
        name: 'properties',
        type: 'object',
        required: true,
        description: `JSON object of property names and values to set only if not already present on the group profile. Example: {"First Seen": "2026-01-01"}.`,
      },
      {
        name: 'ip',
        type: 'integer',
        required: false,
        description: `Set to 1 to let Mixpanel geolocate the group profile from the request IP. Recommended to leave at 0 for server-side calls.`,
      },
      {
        name: 'strict',
        type: 'integer',
        required: false,
        description: `Set to 1 to have Mixpanel validate the record and return per-record error messages if validation fails.`,
      },
      {
        name: 'verbose',
        type: 'integer',
        required: false,
        description: `Set to 1 to receive a JSON object describing success/failure instead of a bare "1"/"0".`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_group_union',
    description: `Add values to a list-valued property on a Mixpanel group profile, ensuring each value only appears once, analogous to 'mixpanelingestion_profile_union' for user profiles. Creates the group profile if it does not already exist.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The value identifying this specific group, e.g. the company name or account ID.`,
      },
      {
        name: 'group_key',
        type: 'string',
        required: true,
        description: `The name of the group key as configured in Mixpanel, e.g. "Company" or "Account ID".`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview). Embedded in the payload to authenticate the request.`,
      },
      {
        name: 'unions',
        type: 'object',
        required: true,
        description: `JSON object mapping list-property names to arrays of values to add (duplicates are not re-added). Example: {"Enabled Features": ["beta-search", "dark-mode"]}.`,
      },
      {
        name: 'ip',
        type: 'integer',
        required: false,
        description: `Set to 1 to let Mixpanel geolocate the group profile from the request IP. Recommended to leave at 0 for server-side calls.`,
      },
      {
        name: 'strict',
        type: 'integer',
        required: false,
        description: `Set to 1 to have Mixpanel validate the record and return per-record error messages if validation fails.`,
      },
      {
        name: 'verbose',
        type: 'integer',
        required: false,
        description: `Set to 1 to receive a JSON object describing success/failure instead of a bare "1"/"0".`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_group_unset',
    description: `Permanently remove one or more named properties (and their values) from a Mixpanel group profile, analogous to 'mixpanelingestion_profile_unset' for user profiles.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The value identifying this specific group, e.g. the company name or account ID.`,
      },
      {
        name: 'group_key',
        type: 'string',
        required: true,
        description: `The name of the group key as configured in Mixpanel, e.g. "Company" or "Account ID".`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview). Embedded in the payload to authenticate the request.`,
      },
      {
        name: 'property_names',
        type: 'array',
        required: true,
        description: `Array of property names to permanently remove from the group profile. Example: ["Trial Ends At"].`,
      },
      {
        name: 'ip',
        type: 'integer',
        required: false,
        description: `Set to 1 to let Mixpanel geolocate the group profile from the request IP. Recommended to leave at 0 for server-side calls.`,
      },
      {
        name: 'strict',
        type: 'integer',
        required: false,
        description: `Set to 1 to have Mixpanel validate the record and return per-record error messages if validation fails.`,
      },
      {
        name: 'verbose',
        type: 'integer',
        required: false,
        description: `Set to 1 to receive a JSON object describing success/failure instead of a bare "1"/"0".`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_identity_create',
    description: `Link an anonymous distinct_id to a known, identified distinct_id by sending a Mixpanel $identify event via /track. Use this the first time you learn a user's real identifier (e.g. after login or signup) so that pre-login and post-login activity is merged onto one profile. Returns the literal text "1" on success or "0" on failure.`,
    params: [
      {
        name: 'anon_id',
        type: 'string',
        required: true,
        description: `The anonymous distinct_id that was used before the user was identified (mapped to $anon_id).`,
      },
      {
        name: 'identified_id',
        type: 'string',
        required: true,
        description: `The known, identified distinct_id to link the anonymous ID to (mapped to $identified_id).`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview). Embedded in the event payload to authenticate the request.`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_identity_create_alias',
    description: `Create a legacy alias linking a new distinct_id to an existing one by sending a Mixpanel $create_alias event via /track. This is the legacy identity-linking mechanism; for new integrations prefer 'mixpanelingestion_identity_create' ($identify) or 'mixpanelingestion_identity_merge'. Returns the literal text "1" on success or "0" on failure.`,
    params: [
      {
        name: 'alias',
        type: 'string',
        required: true,
        description: `The new alias distinct_id to associate with the existing distinct_id.`,
      },
      {
        name: 'distinct_id',
        type: 'string',
        required: true,
        description: `The existing distinct_id that the alias should resolve to.`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview). Embedded in the event payload to authenticate the request.`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_identity_merge',
    description: `Merge two distinct_ids into a single identity using Mixpanel's modern Identity Merge API (a $merge event sent through /import, authenticated with your Service Account). All historical events and profile data from both distinct_ids are combined under one identity. Use this instead of the legacy 'mixpanelingestion_identity_create_alias' for new integrations. Requires your Mixpanel project to use 'Original ID Merge' (Project Settings > Identity Merge) — projects on 'Simplified ID Merge' reject $merge events outright ("identity events are not allowed when project is using simplified identity management"); use 'mixpanelingestion_identity_create_alias' instead on those projects.`,
    params: [
      {
        name: 'distinct_id_1',
        type: 'string',
        required: true,
        description: `The first distinct_id to merge (order does not matter).`,
      },
      {
        name: 'distinct_id_2',
        type: 'string',
        required: true,
        description: `The second distinct_id to merge (order does not matter).`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Your numeric Mixpanel Project ID, required to authenticate Service Account requests. Find it in Mixpanel under Project Settings > Overview.`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_import_events',
    description: `Import a batch of up to 2000 events into Mixpanel via the modern, Service Account-authenticated /import endpoint. This is Mixpanel's recommended way to send events from a trusted server-side integration (unlike the classic /track endpoint). Each event needs an 'event' name and a 'properties' object containing at minimum 'time' (epoch seconds/ms), 'distinct_id', and '$insert_id' (a unique string used for deduplication). With strict=1 (default, recommended), Mixpanel validates every event and returns per-record errors for any that fail.`,
    params: [
      {
        name: 'events',
        type: 'array',
        required: true,
        description: `Array of event objects to import (max 2000 per call, 10MB uncompressed total). Each object must have 'event' (string) and 'properties' (object) with 'properties.time' (epoch seconds/ms), 'properties.distinct_id', and 'properties.$insert_id' for deduplication, plus any custom properties. Example: [{"event": "Purchased", "properties": {"time": 1719859200, "distinct_id": "user_00123", "$insert_id": "a1b2c3", "amount": 19.99}}]`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Your numeric Mixpanel Project ID, required to authenticate Service Account requests. Find it in Mixpanel under Project Settings > Overview.`,
      },
      {
        name: 'strict',
        type: 'string',
        required: false,
        description: `When "1" (recommended), Mixpanel validates the whole batch and returns per-event errors for any records that fail. When "0", invalid records are silently dropped.`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_lookup_table_replace',
    description: `Replace the entire contents of a Mixpanel Lookup Table with new CSV data. This overwrites all existing rows in the table — use 'mixpanelingestion_lookup_tables_list' first to find the table's id. The first column of the CSV must be the table's key (matching the property it enriches); subsequent columns become additional properties joined onto matching events or profiles.`,
    params: [
      {
        name: 'csv_data',
        type: 'string',
        required: true,
        description: `The full replacement contents of the lookup table as CSV text, including a header row. Example: "id,field1,field2\\nkey1,v1,z1\\nkey2,z1,z2\\n".`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Your numeric Mixpanel Project ID, required to authenticate Service Account requests. Find it in Mixpanel under Project Settings > Overview.`,
      },
      {
        name: 'table_id',
        type: 'string',
        required: true,
        description: `The UUID of the lookup table to replace. Retrieve it with 'mixpanelingestion_lookup_tables_list' or from Lexicon under the lookup table's details.`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_lookup_tables_list',
    description: `List the Lookup Tables defined in a Mixpanel project. Returns each table's id and name. Use the id with 'mixpanelingestion_lookup_table_replace' to update a table's contents, or find it in Lexicon under the lookup table's details.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Your numeric Mixpanel Project ID, required to authenticate Service Account requests. Find it in Mixpanel under Project Settings > Overview.`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_profile_append',
    description: `Append a value to a list-valued property on a Mixpanel user profile via Engage $append. If the property does not yet exist, it is created as a single-element list. Unlike $union, duplicate values are allowed. Useful for ordered logs like "Recent Searches".`,
    params: [
      {
        name: 'appends',
        type: 'object',
        required: true,
        description: `JSON object mapping list-property names to the single value to append to each. Example: {"Recent Searches": "running shoes"}.`,
      },
      {
        name: 'distinct_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the profile to update.`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview). Embedded in the payload to authenticate the request.`,
      },
      {
        name: 'ip',
        type: 'integer',
        required: false,
        description: `Set to 1 to let Mixpanel geolocate the profile from the request IP. Recommended to leave at 0 for server-side calls.`,
      },
      {
        name: 'strict',
        type: 'integer',
        required: false,
        description: `Set to 1 to have Mixpanel validate the record and return per-record error messages if validation fails.`,
      },
      {
        name: 'verbose',
        type: 'integer',
        required: false,
        description: `Set to 1 to receive a JSON object describing success/failure instead of a bare "1"/"0".`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_profile_batch_update',
    description: `Send a batch of mixed user-profile updates to Mixpanel Engage in a single call. Each item in 'updates' is a fully-formed update object with its own "$token", "$distinct_id", and one operation key ($set, $set_once, $add, $union, $append, $remove, $unset, or $delete) — the same shapes used by 'mixpanelingestion_profile_set' etc. Example: [{"$token": "...", "$distinct_id": "u1", "$set": {"Plan": "Pro"}}, {"$token": "...", "$distinct_id": "u2", "$add": {"Coins": 13}}]. Use this to reduce round trips when updating many profiles at once.`,
    params: [
      {
        name: 'updates',
        type: 'array',
        required: true,
        description: `Array of fully-formed profile update objects, each with $token, $distinct_id, and one operation key ($set/$set_once/$add/$union/$append/$remove/$unset/$delete).`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_profile_delete',
    description: `Permanently delete a Mixpanel user profile and all of its properties via Engage $delete. This does not delete the user's historical events, only their profile. If duplicate profiles exist due to identity merging, set 'ignore_alias' to true so you don't accidentally delete the original profile when the distinct_id passed in is actually an alias.`,
    params: [
      {
        name: 'distinct_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the profile to permanently delete.`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview). Embedded in the payload to authenticate the request.`,
      },
      {
        name: 'ignore_alias',
        type: 'boolean',
        required: false,
        description: `Set to true if the distinct_id may be an alias, to avoid deleting the original profile it resolves to.`,
      },
      {
        name: 'strict',
        type: 'integer',
        required: false,
        description: `Set to 1 to have Mixpanel validate the record and return per-record error messages if validation fails.`,
      },
      {
        name: 'verbose',
        type: 'integer',
        required: false,
        description: `Set to 1 to receive a JSON object describing success/failure instead of a bare "1"/"0".`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_profile_increment',
    description: `Increment (or decrement, using a negative value) numeric properties on a Mixpanel user profile via Engage $add. The given amounts are added to the existing values; if a property is not yet present it is treated as 0. Useful for counters such as "Number of Logins" or "Files Uploaded".`,
    params: [
      {
        name: 'distinct_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the profile to update.`,
      },
      {
        name: 'increments',
        type: 'object',
        required: true,
        description: `JSON object mapping property names to numeric amounts to add (use a negative number to decrement). Example: {"Number of Logins": 1, "Credits": -5}.`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview). Embedded in the payload to authenticate the request.`,
      },
      {
        name: 'ip',
        type: 'integer',
        required: false,
        description: `Set to 1 to let Mixpanel geolocate the profile from the request IP. Recommended to leave at 0 for server-side calls.`,
      },
      {
        name: 'strict',
        type: 'integer',
        required: false,
        description: `Set to 1 to have Mixpanel validate the record and return per-record error messages if validation fails.`,
      },
      {
        name: 'verbose',
        type: 'integer',
        required: false,
        description: `Set to 1 to receive a JSON object describing success/failure instead of a bare "1"/"0".`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_profile_remove',
    description: `Remove a specific value from a list-valued property on a Mixpanel user profile via Engage $remove. If the value is not present, no change is made. The opposite of 'mixpanelingestion_profile_append'.`,
    params: [
      {
        name: 'distinct_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the profile to update.`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview). Embedded in the payload to authenticate the request.`,
      },
      {
        name: 'removals',
        type: 'object',
        required: true,
        description: `JSON object mapping list-property names to the single value to remove from each. Example: {"Recent Searches": "running shoes"}.`,
      },
      {
        name: 'ip',
        type: 'integer',
        required: false,
        description: `Set to 1 to let Mixpanel geolocate the profile from the request IP. Recommended to leave at 0 for server-side calls.`,
      },
      {
        name: 'strict',
        type: 'integer',
        required: false,
        description: `Set to 1 to have Mixpanel validate the record and return per-record error messages if validation fails.`,
      },
      {
        name: 'verbose',
        type: 'integer',
        required: false,
        description: `Set to 1 to receive a JSON object describing success/failure instead of a bare "1"/"0".`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_profile_set',
    description: `Set (overwrite) properties on a Mixpanel user profile via Engage $set. Creates the profile if it does not already exist. Use this for properties that should always reflect the latest value, such as "Plan" or "Last Login". For properties that should only be set the first time, use 'mixpanelingestion_profile_set_once' instead.`,
    params: [
      {
        name: 'distinct_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the profile to update.`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview). Embedded in the payload to authenticate the request.`,
      },
      {
        name: 'properties',
        type: 'object',
        required: true,
        description: `JSON object of property names and values to set on the profile, overwriting any existing values. Example: {"Plan": "Pro", "$email": "user@example.com"}.`,
      },
      {
        name: 'ip',
        type: 'integer',
        required: false,
        description: `Set to 1 to let Mixpanel geolocate the profile from the request IP. Recommended to leave at 0 for server-side calls to avoid overwriting the profile's real geolocation with your server's location.`,
      },
      {
        name: 'strict',
        type: 'integer',
        required: false,
        description: `Set to 1 to have Mixpanel validate the record and return per-record error messages if validation fails.`,
      },
      {
        name: 'verbose',
        type: 'integer',
        required: false,
        description: `Set to 1 to receive a JSON object describing success/failure instead of a bare "1"/"0".`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_profile_set_once',
    description: `Set properties on a Mixpanel user profile via Engage $set_once, but only if they are not already set — existing values are never overwritten. Creates the profile if it does not already exist. Useful for properties like "First Login Date" that should be recorded once and never changed.`,
    params: [
      {
        name: 'distinct_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the profile to update.`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview). Embedded in the payload to authenticate the request.`,
      },
      {
        name: 'properties',
        type: 'object',
        required: true,
        description: `JSON object of property names and values to set only if not already present on the profile. Example: {"First Login Date": "2026-06-01"}.`,
      },
      {
        name: 'ip',
        type: 'integer',
        required: false,
        description: `Set to 1 to let Mixpanel geolocate the profile from the request IP. Recommended to leave at 0 for server-side calls.`,
      },
      {
        name: 'strict',
        type: 'integer',
        required: false,
        description: `Set to 1 to have Mixpanel validate the record and return per-record error messages if validation fails.`,
      },
      {
        name: 'verbose',
        type: 'integer',
        required: false,
        description: `Set to 1 to receive a JSON object describing success/failure instead of a bare "1"/"0".`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_profile_union',
    description: `Add values to a list-valued property on a Mixpanel user profile via Engage $union, ensuring each value only appears once in the resulting list. Creates the profile if it does not already exist. Useful for properties like "Purchased Categories" that accumulate unique values over time.`,
    params: [
      {
        name: 'distinct_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the profile to update.`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview). Embedded in the payload to authenticate the request.`,
      },
      {
        name: 'unions',
        type: 'object',
        required: true,
        description: `JSON object mapping list-property names to arrays of values to add (duplicates are not re-added). Example: {"Purchased Categories": ["Books", "Electronics"]}.`,
      },
      {
        name: 'ip',
        type: 'integer',
        required: false,
        description: `Set to 1 to let Mixpanel geolocate the profile from the request IP. Recommended to leave at 0 for server-side calls.`,
      },
      {
        name: 'strict',
        type: 'integer',
        required: false,
        description: `Set to 1 to have Mixpanel validate the record and return per-record error messages if validation fails.`,
      },
      {
        name: 'verbose',
        type: 'integer',
        required: false,
        description: `Set to 1 to receive a JSON object describing success/failure instead of a bare "1"/"0".`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_profile_unset',
    description: `Permanently remove one or more named properties (and their values) from a Mixpanel user profile via Engage $unset. This deletes the properties themselves, not the profile — use 'mixpanelingestion_profile_delete' to delete the whole profile.`,
    params: [
      {
        name: 'distinct_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the profile to update.`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview). Embedded in the payload to authenticate the request.`,
      },
      {
        name: 'property_names',
        type: 'array',
        required: true,
        description: `Array of property names to permanently remove from the profile. Example: ["$email", "Trial Ends At"].`,
      },
      {
        name: 'ip',
        type: 'integer',
        required: false,
        description: `Set to 1 to let Mixpanel geolocate the profile from the request IP. Recommended to leave at 0 for server-side calls.`,
      },
      {
        name: 'strict',
        type: 'integer',
        required: false,
        description: `Set to 1 to have Mixpanel validate the record and return per-record error messages if validation fails.`,
      },
      {
        name: 'verbose',
        type: 'integer',
        required: false,
        description: `Set to 1 to receive a JSON object describing success/failure instead of a bare "1"/"0".`,
      },
    ],
  },
  {
    name: 'mixpanelingestion_track_event',
    description: `Send a single event to Mixpanel via the classic /track endpoint, authenticated with your Mixpanel Project Token (not your Service Account). Use this for lightweight, fire-and-forget event tracking. For reliable server-side ingestion with validation and duplicate protection, prefer 'mixpanelingestion_import_events' instead. Returns the literal text "1" on success or "0" on failure unless 'verbose' is set to 1.`,
    params: [
      {
        name: 'event',
        type: 'string',
        required: true,
        description: `The name of the event to track, e.g. "Signed up" or "Purchased item".`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview). This is embedded in the event payload and is how /track authenticates the request — it is not your Service Account.`,
      },
      {
        name: 'distinct_id',
        type: 'string',
        required: false,
        description: `The unique identifier of the user who performed the event. If omitted and 'ip' is set to 1, Mixpanel derives one from the request IP.`,
      },
      {
        name: 'insert_id',
        type: 'string',
        required: false,
        description: `A unique identifier for this event used for deduplication (mapped to $insert_id). Events with identical (event, time, distinct_id, insert_id) are deduplicated; only the latest is kept. Max 36 bytes, alphanumeric or dash.`,
      },
      {
        name: 'ip',
        type: 'integer',
        required: false,
        description: `Set to 1 to have Mixpanel derive geolocation and distinct_id from the request's IP address. Recommended to leave at 0 for server-side calls to avoid attributing your server's location to the event.`,
      },
      {
        name: 'profile_properties',
        type: 'object',
        required: false,
        description: `Additional custom event properties to merge into the event's properties object, as a JSON object. Example: {"Plan": "Pro", "Referrer": "google"}.`,
      },
      {
        name: 'time',
        type: 'integer',
        required: false,
        description: `The time the event occurred, in seconds or milliseconds since the UTC epoch. If omitted, Mixpanel uses the ingestion time. Future timestamps are overwritten with the current time.`,
      },
      {
        name: 'verbose',
        type: 'integer',
        required: false,
        description: `Set to 1 to receive a JSON object describing success/failure instead of a bare "1"/"0".`,
      },
    ],
  },
]
