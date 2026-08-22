import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'planningcentermcp_calendar_calendars',
    description: `List the calendars configured in Planning Center Calendar (e.g. "Youth Ministry", "Staff", "Worship"). Calendars partition an organization's events by ministry or context. Use this tool to see which calendars exist, resolve a calendar name to its id, or look up a calendar's description, color, or default status.

This tool returns the full list of calendars; there is no server-side filtering by name or any other attribute. Organizations have only a small handful of calendars, so retrieve them all and match the one you want by name client-side.`,
    params: [
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_calendar_conflicts',
    description: `Read booking conflicts in Planning Center Calendar — situations where two events have overlapping resource requests for the same room or piece of equipment. A conflict carries the contested \`resource\`, the \`winner\` event once staff have picked one, and \`resolved_at\` when the conflict has been settled.

Use \`filter: ["unresolved"]\` to answer "what's overbooked right now" — that's the operationally interesting set, and it inherently scopes to conflicts on upcoming events (past-only conflicts drop out). \`filter: ["resolved"]\` returns conflicts that have been settled.

The \`resource\` relationship id chains to the calendar_resources tool; the \`winner\` event id chains to calendar_events. Both are surfaced as JSON:API relationship linkages on every response.`,
    params: [
      {
        name: 'filter',
        type: 'array',
        required: false,
        description: `Restrict to "unresolved" (currently overbooked, scoped to upcoming events) or "resolved" (settled).`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
    ],
  },
  {
    name: 'planningcentermcp_calendar_event_instances',
    description: `Search specific occurrences of events in Planning Center Calendar — the "what is happening at this date and time" surface. An event instance is one occurrence of a parent event: a single Wednesday of a weekly Bible Study, next Sunday's service, or the one date of a one-off event. Recurring instances expose \`recurrence\` and \`compact_recurrence_description\` for human-readable patterns.

Prefer this tool over \`calendar_events\` when the question is about specific dates or times ("what's happening next Sunday?", "when does the youth retreat happen?", "the next four Wednesdays of Bible Study"). Use \`calendar_events\` instead when the question is about the parent event template regardless of when it occurs.

For questions about one particular event, resolve it with \`calendar_events\` and pass its id as \`event_id\` — more reliable than an \`event_name\` substring match when several events share a word. Pair it with \`filter: ["future"]\` for "when does this happen next?".

Use \`filter: ["future"]\` for upcoming instances without computing a date filter yourself. Filter by name via \`event_name\` (a phrase-substring match — pass a bare substring like "bible study"; wildcards are not supported), by kind, by date range, by tag, or by calendar. To filter by tag, call \`calendar_tags\` to resolve a tag name to a tag id, then pass \`tag_ids\` here to narrow to that ministry, audience, or category. To filter by calendar, call \`calendar_calendars\` to resolve a calendar name to a calendar id, then pass \`calendar_ids\` here.

\`description\`, \`image_url\`, and \`kind\` are heavier fields (rich HTML, image URL, event kind) and are only returned when you list them explicitly in \`output_fields\`.`,
    params: [
      {
        name: 'calendar_ids',
        type: 'array',
        required: false,
        description: `Filter instances by calendar ids. A single id is the common case. Passing multiple ids returns instances on ANY of those calendars (a union) — \`[worship_id, youth_id]\` returns instances on either calendar. Resolve calendar names to ids via \`calendar_calendars\`.`,
      },
      {
        name: 'created_at_end',
        type: 'string',
        required: false,
        description: `Latest created at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'created_at_start',
        type: 'string',
        required: false,
        description: `Earliest created at to include (inclusive), as YYYY-MM-DD. Pair with created_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
      {
        name: 'ends_at_end',
        type: 'string',
        required: false,
        description: `Latest ends at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'ends_at_start',
        type: 'string',
        required: false,
        description: `Earliest ends at to include (inclusive), as YYYY-MM-DD. Pair with ends_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
      {
        name: 'event_id',
        type: 'string',
        required: false,
        description: `Limit to occurrences of this event, resolved via the calendar_events tool. Prefer this over event_name whenever you already know which event you mean. Only the "future" filter value is supported when scoped to an event; the approval-status filter values cannot be combined with event_id.`,
      },
      {
        name: 'event_name',
        type: 'string',
        required: false,
        description: `Filter instances by name (defaults to the parent event's name; can be overridden per instance). Phrase-substring match — pass a bare substring like "bible study"; wildcards are not supported.`,
      },
      {
        name: 'filter',
        type: 'array',
        required: false,
        description: `Named filter scopes. Use ["future"] to return only instances that have not yet ended. Approval-status scopes filter by each instance's booking status: "approved" also includes shared instances, "pending" also includes unresolved conflicts, and "rejected" also includes lost instances. The approval-status scopes are not available when event_id is supplied.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'kind',
        type: 'string',
        required: false,
        description: `Filter instances by their parent event's kind.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'starts_at_end',
        type: 'string',
        required: false,
        description: `Latest starts at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'starts_at_start',
        type: 'string',
        required: false,
        description: `Earliest starts at to include (inclusive), as YYYY-MM-DD. Pair with starts_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
      {
        name: 'tag_ids',
        type: 'array',
        required: false,
        description: `Filter instances by tag ids. A single id is the common case. When you pass multiple ids, upstream composes them as OR within a tag group and AND across tag groups (ungrouped tags each count as their own group) — so \`[youth_ministry_id, sunday_service_id]\` returns instances tagged with BOTH, not either. Resolve tag names via \`calendar_tags\`.`,
      },
      {
        name: 'updated_at_end',
        type: 'string',
        required: false,
        description: `Latest updated at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'updated_at_start',
        type: 'string',
        required: false,
        description: `Earliest updated at to include (inclusive), as YYYY-MM-DD. Pair with updated_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_calendar_events',
    description: `Search events in Planning Center Calendar. Calendar is the organization-wide event discovery surface and absorbs events originating in Services, Groups, and Registrations — a Sunday service plan, a small group meeting, and an event signup all appear here alongside Calendar-native events. Use this tool to find events across products: by name, approval status, Church Center visibility, feed, created/updated date, or the \`future\` named scope for upcoming events.

Two views of the same record are simultaneously true: an event surfaced here may also be the source-of-truth for a product-native tool. When the user wants product-specific detail — a Services plan's order of service, a Registrations signup's attendees, a Group's roster — chain into \`services_plans\`, \`registrations_signups\`, or \`groups_events\` after discovering the event here.

This tool doesn't surface which calendar an event belongs to — no calendar field or include here. To work by calendar, resolve the calendar id with \`calendar_calendars\` and pass it to \`calendar_event_instances\` as \`calendar_ids\`. That returns one row per occurrence, so dedupe on the \`event\` relationship id to count events.`,
    params: [
      {
        name: 'approval_status',
        type: 'string',
        required: false,
        description: `Filter by approval status: 'A' approved, 'P' pending, 'R' rejected.`,
      },
      {
        name: 'created_at_end',
        type: 'string',
        required: false,
        description: `Latest created at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'created_at_start',
        type: 'string',
        required: false,
        description: `Earliest created at to include (inclusive), as YYYY-MM-DD. Pair with created_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
      {
        name: 'featured',
        type: 'boolean',
        required: false,
        description: `Filter by whether the event is featured on Church Center.`,
      },
      {
        name: 'feed_id',
        type: 'string',
        required: false,
        description: `Filter events by the feed they belong to (e.g. the Services, Groups, or Registrations feed that absorbs them into Calendar).`,
      },
      {
        name: 'filter',
        type: 'array',
        required: false,
        description: `Use ["future"] to return only events that have not yet ended, excluding past events.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'link_only',
        type: 'boolean',
        required: false,
        description: `Filter by whether the event is published to Church Center through a direct link only.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter events by name. Matches exactly unless you include a '%' wildcard for partial matches.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'updated_at_end',
        type: 'string',
        required: false,
        description: `Latest updated at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'updated_at_start',
        type: 'string',
        required: false,
        description: `Earliest updated at to include (inclusive), as YYYY-MM-DD. Pair with updated_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
      {
        name: 'visible_in_church_center',
        type: 'boolean',
        required: false,
        description: `Filter by whether the event's Church Center visibility is Published (true) or Hidden (false).`,
      },
    ],
  },
  {
    name: 'planningcentermcp_calendar_resource_bookings',
    description: `Search resource bookings in Planning Center Calendar — a successful reservation of a room or piece of equipment for an event, over a start/end time range. Use this tool to answer "what's booked?" questions, e.g. whether a room is reserved during a time window, or what's reserved for a particular event or occurrence.

Provide \`resource_id\` (resolved via \`calendar_resources\`) to scope to a single room or resource, \`event_id\` (resolved via \`calendar_events\`) to scope to a single event's bookings, or \`event_instance_id\` (resolved via \`calendar_event_instances\`) to scope to one specific occurrence — provide at most one of the three. Omit all three to search bookings across the whole organization. Recurring events (weekly services, ongoing classes) attach their bookings to the individual event instance rather than the parent event, so prefer \`event_instance_id\` for "what's booked for this Sunday/this occurrence?" questions. Use the \`event_resource_request\` include to identify what was reserved and its approval status; chain into \`calendar_events\` for richer event detail — this tool does not include the full event record.

A booking is a successful reservation, distinct from a scheduling conflict (overlapping reservations awaiting staff resolution) — for "what's overbooked?" questions, use \`calendar_conflicts\` instead.`,
    params: [
      {
        name: 'approval_status',
        type: 'string',
        required: false,
        description: `Limit to bookings with this approval status. This is a single value, not a list — use a compound value such as "approved_pending" to match multiple statuses in one call, since the API ORs statuses within a single value but ANDs separate filter values. Cannot be combined with event_id or event_instance_id (neither route supports approval-status scopes).`,
      },
      {
        name: 'ends_at_end',
        type: 'string',
        required: false,
        description: `Latest ends at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'ends_at_start',
        type: 'string',
        required: false,
        description: `Earliest ends at to include (inclusive), as YYYY-MM-DD. Pair with ends_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
      {
        name: 'event_id',
        type: 'string',
        required: false,
        description: `Limit to bookings for this event, resolved via the calendar_events tool. Provide at most one of resource_id/event_id/event_instance_id. Only the "future" filter value is supported when scoped to an event; approval_status cannot be combined with event_id.`,
      },
      {
        name: 'event_instance_id',
        type: 'string',
        required: false,
        description: `Limit to bookings for this specific occurrence of an event, resolved via the calendar_event_instances tool. Provide at most one of resource_id/event_id/event_instance_id. Prefer this over event_id for recurring events — their bookings attach to the instance, not the parent event. Only the "future" filter value is supported when scoped to an event instance; approval_status cannot be combined with event_instance_id.`,
      },
      {
        name: 'filter',
        type: 'array',
        required: false,
        description: `Use ["future"] to limit to bookings that haven't ended yet.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'resource_id',
        type: 'string',
        required: false,
        description: `Limit to bookings of this room or resource, resolved via the calendar_resources tool. Provide at most one of resource_id/event_id/event_instance_id.`,
      },
      {
        name: 'starts_at_end',
        type: 'string',
        required: false,
        description: `Latest starts at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'starts_at_start',
        type: 'string',
        required: false,
        description: `Earliest starts at to include (inclusive), as YYYY-MM-DD. Pair with starts_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_calendar_resources',
    description: `Search rooms and equipment available for booking in Planning Center Calendar. A "resource" is either a physical space (kind='Room') or an item of equipment (kind='Resource'). Each resource carries a \`path_name\` in the output showing its folder location (e.g. "Main Campus/Sanctuary"); path-based filtering isn't supported server-side, but you can scope to a specific folder via \`resource_folder_id\` (chain from \`include: resource_folder\`).

Use this tool when the question is about *space or equipment booking* — "what rooms can we book?", "list all our A/V equipment", "which resources do we have?". If instead the question is about *check-in setup* (where kids get dropped off, which station a family checks in at), that's a Check-Ins locations concept and belongs to a separate Check-Ins tool.

Resource ids returned here chain forward to Calendar tools that answer "is this resource booked at time X."`,
    params: [
      {
        name: 'created_at_end',
        type: 'string',
        required: false,
        description: `Latest created at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'created_at_start',
        type: 'string',
        required: false,
        description: `Earliest created at to include (inclusive), as YYYY-MM-DD. Pair with created_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
      {
        name: 'filter',
        type: 'array',
        required: false,
        description: `Use ["rooms"] for rooms only or ["resources"] for equipment only. Named scopes on the organization endpoint; equivalent to \`kind=Room\` / \`kind=Resource\`.`,
      },
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Specific resource IDs to retrieve`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'kind',
        type: 'string',
        required: false,
        description: `Filter by kind: 'Room' for physical bookable spaces, 'Resource' for equipment.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter resources by name. Matches exactly unless you include a '%' wildcard for partial matches.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'resource_folder_id',
        type: 'string',
        required: false,
        description: `Filter to resources in a specific folder. Chain from a prior response's \`include: resource_folder\` linkage, or from a folder id you already have.`,
      },
      {
        name: 'updated_at_end',
        type: 'string',
        required: false,
        description: `Latest updated at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'updated_at_start',
        type: 'string',
        required: false,
        description: `Earliest updated at to include (inclusive), as YYYY-MM-DD. Pair with updated_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_calendar_tags',
    description: `Read tags used to organize events in Planning Center Calendar. Tags are the vocabulary an organization uses to categorize events by ministry, audience, or context (e.g. "Youth Ministry", "All-Church"). Use this tool to resolve a tag name to a tag id, browse the available tags, or find tags within a specific tag group.

Tag ids chain forward to \`calendar_event_instances\` via its \`tag_ids\` filter for server-side filtering of event instances by tag. Server-side filtering of \`calendar_events\` by tag id is not supported; use the \`tags\` include on \`calendar_events\` if you need tag data alongside events.

Include \`tag_group\` to see how tags are grouped (e.g. "Audience", "Ministry"); the "Individual Tags" bucket in the UI corresponds to tags with no tag group and can be filtered via \`filter: "individual"\`. To list the tag groups themselves, call this tool with \`include: ["tag_group"]\` and dedupe the \`tag_group\` relationships client-side.`,
    params: [
      {
        name: 'church_center_category',
        type: 'boolean',
        required: false,
        description: `Filter by whether the tag is used as a Church Center category.`,
      },
      {
        name: 'created_at_end',
        type: 'string',
        required: false,
        description: `Latest created at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'created_at_start',
        type: 'string',
        required: false,
        description: `Earliest created at to include (inclusive), as YYYY-MM-DD. Pair with created_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Use "individual" to return only tags with no tag group (the "Individual Tags" bucket in the UI).`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Filter to a specific tag by its ID.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter tags by name. Exact match unless you include a '%' wildcard for partial matches.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'tag_group_id',
        type: 'string',
        required: false,
        description: `Filter to tags belonging to a specific tag group.`,
      },
      {
        name: 'updated_at_end',
        type: 'string',
        required: false,
        description: `Latest updated at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'updated_at_start',
        type: 'string',
        required: false,
        description: `Earliest updated at to include (inclusive), as YYYY-MM-DD. Pair with updated_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_check_ins_check_ins',
    description: `Search individual check-in records — one row per person per event session, showing who checked in to which event, when, where, and whether they were checked out. Use for attendance questions where individual identity matters (e.g. "who checked in to the 9am service last Sunday", "did the Smith family check in this morning"). Each record covers regular attendees, guests, or volunteers; filter by event, person, date, or check-in category.

\`checked_out_at\` is ambiguous when null: it can mean the person hasn't been picked up yet, OR that the org doesn't record check-outs at all (many don't — they only badge people in). Report what the data shows and surface the ambiguity rather than asserting someone wasn't picked up. Use \`include=checked_out_by\` to surface the picker-upper when it was recorded.

\`security_code\`, \`medical_notes\`, \`emergency_contact_name\`, and \`emergency_contact_phone_number\` are stripped from every response before it reaches you — the upstream API exposes them to admins, but this tool removes them on both the primary check-in record and any included resources.

Sibling tools to disambiguate:
- \`check_ins_check_ins\` (this tool) — one row per person per event session. Use for "who" and "how many" when individual identity matters.
- \`check_ins_headcounts\` — pre-aggregated totals by event/category. Use for "how many" when only the count matters and no PII is needed (and the org actually recorded headcounts).
- \`services_plans\` — planning-side schedules (who's scheduled to play / on the rotation), NOT attendance.

To find check-ins for a Registrations signup, follow the chain: \`registrations_signups\` returns a signup id → pass that as \`registration_event_id\` on \`check_ins_events\` → take the resulting Check-Ins event's id → pass it as \`event_id\` here. The reverse direction (a Check-Ins event back to its source signup) is not exposed.`,
    params: [
      {
        name: 'account_center_person_id',
        type: 'integer',
        required: false,
        description: `Limit to check-ins for a specific person. Pass a value returned by \`people_search\`. Note: one-time-guest check-ins have no person id and are excluded by this filter.`,
      },
      {
        name: 'created_at_end',
        type: 'string',
        required: false,
        description: `Latest created at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'created_at_start',
        type: 'string',
        required: false,
        description: `Earliest created at to include (inclusive), as YYYY-MM-DD. Pair with created_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
      {
        name: 'event_id',
        type: 'integer',
        required: false,
        description: `Limit to check-ins for a specific Check-Ins event. Pass a value returned by \`check_ins_events\`.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Limit to a check-in category: regular, guest, volunteer, attendee (regular + guest combined), first_time, one_time_guest, not_one_time_guest, checked_out, or not_checked_out.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'location_ids',
        type: 'array',
        required: false,
        description: `Limit to check-ins at specific locations. Pass values returned by \`check_ins_locations\`.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
    ],
  },
  {
    name: 'planningcentermcp_check_ins_event_times',
    description: `List the individual sessions (event times) configured within a Check-Ins event — e.g. the 9:00 and 11:00 services of a Sunday Service event, or each night of VBS. Returns start times, when the session is visible in check-in UIs (\`shows_at\`/\`hides_at\`), and per-session attendance counts (\`regular_count\`, \`guest_count\`, \`volunteer_count\`).

Pass \`event_id\` from \`check_ins_events\` to drill into a specific event's sessions. Only the current period's sessions are returned when scoped this way — historical sessions from past occurrences of a recurring event aren't available on this route. Omit \`event_id\` for an organization-wide list.`,
    params: [
      {
        name: 'event_id',
        type: 'integer',
        required: false,
        description: `Limit to sessions for a specific event. Returns the event's current period's sessions only. Pass an id returned by \`check_ins_events\`.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
    ],
  },
  {
    name: 'planningcentermcp_check_ins_events',
    description: `Search events configured in Check-Ins (e.g. Sunday Service, Wednesday VBS). Returns events that are set up for check-in — not Calendar events, Services plans, or Registrations signups.

Events may be native to Check-Ins or auto-created from a Registrations signup. To find the Check-Ins event spawned by a specific signup, pass the signup's event id as \`registration_event_id\`. (Going the other direction — a Check-Ins event back to its source signup — is not exposed on this endpoint.)`,
    params: [
      {
        name: 'campus_id',
        type: 'integer',
        required: false,
        description: `Limit to events for a specific campus.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Limit to archived, not-archived, headcount-enabled, or Registrations-spawned events.`,
      },
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Specific event IDs to retrieve.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Match events whose name contains this substring.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'registration_event_id',
        type: 'integer',
        required: false,
        description: `The Registrations event id of a signup. Use to find the Check-Ins event auto-created from that signup. Pass a value returned by \`registrations_signups\`.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_check_ins_headcounts',
    description: `Search manually-recorded headcount tallies for Check-Ins event times — counts that staff explicitly entered in the Headcounts app (e.g. "9am service / Adults = 187"). Each row pairs one event_time with one attendance_type and a total. An absent row may mean the count was zero.

Use this only for explicit-tally counts. For attendance derived from individual people scanning in at a station, use \`check_ins_check_ins\` and aggregate. For who is *scheduled* on a service team for that service time, use \`services_plans\` instead.

Pass \`event_time_id\` (an id from \`check_ins_event_times\`) to scope tallies to one session — the direct way to read or compare specific sessions (9am vs 11am). Headcount itself is only queryable by \`created_at\` / \`updated_at\`, so a time-window prompt ("last Sunday's 9am service") still means finding the session in \`check_ins_event_times\` first (by its \`starts_at\`) and passing its \`event_time_id\` here.

Attendance-type names come from the included \`attendance_type\` resource (included by default); there is no separate MCP tool that lists attendance types, so this include is the only source of attendance-type names.`,
    params: [
      {
        name: 'created_at_end',
        type: 'string',
        required: false,
        description: `Latest created at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'created_at_start',
        type: 'string',
        required: false,
        description: `Earliest created at to include (inclusive), as YYYY-MM-DD. Pair with created_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
      {
        name: 'event_time_id',
        type: 'integer',
        required: false,
        description: `Scope to a single event time (session), returning only that session's headcount tallies. Pass an id from \`check_ins_event_times\`.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'updated_at_end',
        type: 'string',
        required: false,
        description: `Latest updated at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'updated_at_start',
        type: 'string',
        required: false,
        description: `Earliest updated at to include (inclusive), as YYYY-MM-DD. Pair with updated_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_check_ins_locations',
    description: `Search check-in locations configured for a single Check-Ins event — rooms, age groups, and other places people check in to. Each location has age, grade, and gender gating that determines who's allowed to check in there. Requires an \`event_id\`; look one up with \`check_ins_events\`.

Some locations have \`kind="Folder"\`, meaning they don't accept check-ins themselves — they contain other locations. Use \`include=locations\` to descend into a folder's children and \`include=parent\` to walk back up. To drop folders and return only check-in-able locations, pass \`filter="locations"\`; to keep only top-level entries (no parent folder), pass \`filter="root"\`.

Note: Check-Ins locations are distinct from Calendar resources (physically bookable spaces like the sanctuary) — if a prompt says "rooms," confirm which is meant.`,
    params: [
      {
        name: 'event_id',
        type: 'integer',
        required: true,
        description: `List locations configured for this single event (see check_ins_events).`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `\`locations\` drops folders (keeps only check-in-able locations); \`root\` keeps only top-level entries (no parent folder).`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
    ],
  },
  {
    name: 'planningcentermcp_giving_batch_groups',
    description: `List giving batch groups — optional, customizable collections of giving batches that share common characteristics.
Each group carries \`total_cents\`/\`total_currency\` totals and a \`committed\`/\`status\` state (\`uncommitted\`, \`updating\`, or \`committed\`), and committing a group commits all of its batches and donations.
Limit to \`committed\` or \`in_progress\` (uncommitted) groups, find a group by a partial match on its \`description\`, narrow by \`updated_at\` range, include the \`owner\` (the Giving admin who created it), and sort by \`updated_at\`.
Use \`giving_batches\` to drill into the individual batches within a group.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Partial (substring) match on a batch group's description.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Limit to \`committed\` batch groups or \`in_progress\` (uncommitted) batch groups.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'updated_at_end',
        type: 'string',
        required: false,
        description: `Latest updated at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'updated_at_start',
        type: 'string',
        required: false,
        description: `Earliest updated at to include (inclusive), as YYYY-MM-DD. Pair with updated_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_giving_batches',
    description: `List giving batches — groupings of donations. A batch starts uncommitted (\`status\` \`in_progress\`), acting as a staging area where its donations aren't yet visible to donors, and becomes visible once committed (\`status\` \`committed\`, with a \`committed_at\` timestamp). Each batch carries \`total_cents\`/\`total_currency\` totals (and \`donations_count\` on request). Filter to \`committed\` or \`in_progress\` batches, narrow by \`updated_at\` or \`committed_at\` range, and include the \`batch_group\` it belongs to or its \`owner\` (the Giving admin who created it). Sort by \`committed_at\` to surface the most recently committed batches.`,
    params: [
      {
        name: 'committed_at_end',
        type: 'string',
        required: false,
        description: `Latest committed at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'committed_at_start',
        type: 'string',
        required: false,
        description: `Earliest committed at to include (inclusive), as YYYY-MM-DD. Pair with committed_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Limit to \`committed\` batches or \`in_progress\` (uncommitted) batches.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'updated_at_end',
        type: 'string',
        required: false,
        description: `Latest updated at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'updated_at_start',
        type: 'string',
        required: false,
        description: `Earliest updated at to include (inclusive), as YYYY-MM-DD. Pair with updated_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_giving_donations',
    description: `Search donations in Planning Center Giving - the individual gifts a church has received, with the amount, how it was paid, when it arrived, and whether it was refunded.

All money is in cents (\`amount_cents\` 5000 is $50.00). \`received_at\` is the business date a gift counts toward and what the Giving admin UI filters on - prefer it over \`created_at\`, which is when the record was entered.

Searches the whole organization by default. Pass at most one of \`person_id\` (one donor's giving history), \`batch_id\` (the gifts in one batch), or \`campus_id\` - none of these is filterable org-wide, so scoping to one changes which endpoint is used.

A donation carries a single total with no fund attribution of its own: include \`designations.fund\` to see which funds a gift was split across, or filter by \`fund_id\` to answer "how much came into one fund".

For totals, set \`include_totals\` - the response \`meta\` then carries \`received_total_amount_cents\` across everything matching the filters, ignoring pagination. Use it rather than paging through results to sum them by hand.`,
    params: [
      {
        name: 'batch_id',
        type: 'integer',
        required: false,
        description: `List the donations in this batch (see giving_batches). Pass at most one of person_id, batch_id, or campus_id.`,
      },
      {
        name: 'campus_id',
        type: 'integer',
        required: false,
        description: `List the donations credited to this campus (see people_church_campuses). Pass at most one of person_id, batch_id, or campus_id.`,
      },
      {
        name: 'created_at_end',
        type: 'string',
        required: false,
        description: `Latest created at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'created_at_start',
        type: 'string',
        required: false,
        description: `Earliest created at to include (inclusive), as YYYY-MM-DD. Pair with created_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Limit to \`succeeded\` donations - gifts that actually settled. Can't be combined with person_id, batch_id, or campus_id.`,
      },
      {
        name: 'fund_id',
        type: 'integer',
        required: false,
        description: `Only donations designated to this fund (see giving_funds). Can't be combined with include_totals.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response. Include \`designations.fund\` to see which funds a gift was split across. \`note\` requires permission to manage donation notes in Giving, and is silently absent otherwise.`,
      },
      {
        name: 'include_totals',
        type: 'boolean',
        required: false,
        description: `Add \`received_total_amount_cents\` to the response meta - the total received across every donation matching the filters, excluding refunded and failed gifts. Can't be combined with fund_id.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'payment_method',
        type: 'string',
        required: false,
        description: `Only donations paid this way.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `List the donations this person has given (see people_search). Pass at most one of person_id, batch_id, or campus_id.`,
      },
      {
        name: 'received_at_end',
        type: 'string',
        required: false,
        description: `Latest received at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'received_at_start',
        type: 'string',
        required: false,
        description: `Earliest received at to include (inclusive), as YYYY-MM-DD. Pair with received_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
      {
        name: 'updated_at_end',
        type: 'string',
        required: false,
        description: `Latest updated at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'updated_at_start',
        type: 'string',
        required: false,
        description: `Earliest updated at to include (inclusive), as YYYY-MM-DD. Pair with updated_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_giving_donors',
    description: `Per-donor giving totals in Planning Center Giving. Each row is one person who gave inside a date range, with their total, how many donations it came from, and when they first ever gave.

Set \`received_at_start\` and \`received_at_end\` to the window you mean. The applied window isn't echoed back, so name the range you used.

There is no combined household row. Each person in a couple is their own row with their own total, so a couple's combined giving means fetching both and adding \`total_received_donation_amount_cents\` yourself.

Read \`total_received_donation_amount_cents\` with \`total_received_donation_amount_currency\`; it is in that currency's minor units. \`donation_count\` includes refunded and failed donations while the total counts only what was received, so the two don't divide into an average gift. \`first_donated\` is the lifetime first gift, not the first inside the range, and can be null even for someone with donations — a missing value doesn't mean they never gave.

Rows carry no \`links.html\`, so don't promise a donor a page or construct a URL for one. For what someone committed to give rather than what they gave, use giving_pledges.`,
    params: [
      {
        name: 'campus_id',
        type: 'integer',
        required: false,
        description: `Count only donations made at this campus. Takes a Planning Center campus id (see people_church_campuses); an id that matches no campus returns an error rather than being ignored.`,
      },
      {
        name: 'filter',
        type: 'array',
        required: false,
        description: `Restrict to donors who give as part of a joint giving unit — a couple giving together.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order. Sorting by \`name\` orders by last name, not by the full name shown in the \`name\` field.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `Return only this person's row. Use a person id from people_search — it is also the \`id\` on each row returned here.`,
      },
      {
        name: 'received_at_end',
        type: 'string',
        required: false,
        description: `Latest received at to include (inclusive), as YYYY-MM-DD. If neither received_at_start nor received_at_end is given, the API falls back to the last 30 days.`,
      },
      {
        name: 'received_at_start',
        type: 'string',
        required: false,
        description: `Earliest received at to include (inclusive), as YYYY-MM-DD. Pair with received_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range. If neither received_at_start nor received_at_end is given, the API falls back to the last 30 days.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_giving_funds',
    description: `List the giving funds configured for the organization. Funds track the intent of a donation (e.g. "General", "Building", "Missions") and let donors allocate gifts to a specific cause. Use \`default: true\` to find the organization's default fund.`,
    params: [
      {
        name: 'default',
        type: 'boolean',
        required: false,
        description: `Filter by whether the fund is the organization's default.`,
      },
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Specific fund IDs to retrieve.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter funds by name. Substring match, partial names work.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Filter by how the fund is visible on Church Center. \`everywhere\`: anyone can donate; \`admin_only\`: hidden from donors, permitted Giving users only; \`nowhere\`: no new donations, retained in historical reports; \`hidden\`: hidden from the default donation form but reachable via direct link or Text-to-Give.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_giving_payment_sources',
    description: `List the payment sources configured for the organization. A payment source is the platform a donation originated from — donations made through Giving carry the built-in "Planning Center" source, while donations imported from an external platform (Stripe, Pushpay, Tithe.ly, etc.) carry a source identifying that platform. This is organization-level configuration only and returns no donor or donation data.

\`status\` is either \`active\` or \`archived\`. Archived sources can't be assigned to new donations, but their historical donations are retained. One exception: the built-in "Planning Center" source returns \`status\` as the number \`0\` (meaning active) and returns no \`created_at\`/\`updated_at\` — treat it as always-active and always-present rather than filtering on those fields. \`payment_source_type\` is only returned by organizations that have that feature enabled, so it may be absent from results.

In practice organizations have a handful of sources. The endpoint offers no filters or sorting, so narrow the results yourself after fetching. \`giving_donations\` can't filter by payment source, but each donation carries its \`payment_source\` relationship — to split totals by source, group the donations by that id and match it against the sources here.`,
    params: [
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
    ],
  },
  {
    name: 'planningcentermcp_giving_pledge_campaigns',
    description: `List pledge campaigns in Planning Center Giving — long-term commitment drives toward a goal (a building campaign, a missions push). Each campaign carries its \`goal_cents\` target and two running totals: \`received_total_from_pledges_cents\` (gifts that closed against a pledge) and \`received_total_outside_of_pledges_cents\` (gifts to the same fund with no pledge behind them). Reach for this for campaign-level progress questions like "how are we tracking against the building campaign goal?"

Each campaign belongs to a fund. Filter by \`fund_id\` to find every campaign supporting a specific fund (look the fund up with giving_funds first), or include \`fund\` to see its name alongside each campaign. This tool returns campaign-level aggregates only — for the individual pledges behind a campaign, use giving_pledges.

There is no "active" filter, so compose one from the date bounds — and set **both** together, not just one. A campaign is active when it has started and has not yet ended, so send \`starts_at_end\` = today (started on or before today) **and** \`ends_at_start\` = today (ends on or after today) in the same call. Sending only one bound returns campaigns that may already be over or not yet started, not active ones. To surface the campaigns wrapping up soonest, sort by \`ends_at\` ascending with no date bounds — that is a separate question from "active", so don't add the date filters unless the user asked only for active campaigns.`,
    params: [
      {
        name: 'ends_at_end',
        type: 'string',
        required: false,
        description: `Latest ends at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'ends_at_start',
        type: 'string',
        required: false,
        description: `Earliest ends at to include (inclusive), as YYYY-MM-DD. Pair with ends_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
      {
        name: 'fund_id',
        type: 'integer',
        required: false,
        description: `Only return campaigns supporting this fund. Look the fund up with giving_funds first.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'starts_at_end',
        type: 'string',
        required: false,
        description: `Latest starts at to include (inclusive), as YYYY-MM-DD.`,
      },
      {
        name: 'starts_at_start',
        type: 'string',
        required: false,
        description: `Earliest starts at to include (inclusive), as YYYY-MM-DD. Pair with starts_at_end; set both to the same day to match a single date, or pass just one side for an open-ended range.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_giving_pledges',
    description: `Look up pledges in Planning Center Giving - a person's commitment to give a set amount toward a pledge campaign, alongside how much they have actually donated against that commitment so far.

Provide exactly one of \`person_id\` (the pledges one person has made) or \`pledge_campaign_id\` (everyone who pledged to one campaign).

Each pledge carries \`amount_cents\` (the amount committed) and \`donated_total_cents\` (the amount delivered so far). To find donors who are behind on their commitments, compare those two fields on the returned records - there is no server-side filter for it, so the arithmetic has to be done here.

When the pledger belongs to a joint giving unit - the "and Jane" half of "John and Jane pledged $5,000" - \`joint_giver_amount_cents\` and \`joint_giver_donated_total_cents\` carry that second person's amounts; both are 0 otherwise. Include \`joint_giver\` to see who they are.`,
    params: [
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `List the pledges this person has made (see people_search). Provide either this or pledge_campaign_id, not both.`,
      },
      {
        name: 'pledge_campaign_id',
        type: 'integer',
        required: false,
        description: `List the pledges made toward this campaign (see giving_pledge_campaigns). Provide either this or person_id, not both.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_giving_recurring_donations',
    description: `Look up recurring donations in Planning Center Giving - a donor's scheduled, repeating gift (weekly, monthly, etc.), including the amount, the schedule, when the last gift came in, and when the next one is due. Recurring donations are read-only.

Reach for this for questions about scheduled future giving ("who gives monthly?", "whose recurring gift is paused?", "what is this person's recurring gift?"). For gifts that have actually been received, use giving_donations instead.

\`status\` is \`active\`, \`indefinite_hold\` (paused with no end date), or \`temporary_hold\` (paused until \`release_hold_at\`). Include \`designations\` to see how a recurring gift is split across funds. Each designation carries its fund as a relationship id, so use giving_funds to get fund names. The donor is likewise returned as a person id - use people_search to resolve names.

\`amount_cents\` on the gift is its total across every fund it is split between, so it does not answer how much goes to one fund. For that, include \`designations\` and read the amount on the designation whose \`fund\` is the one in question.`,
    params: [
      {
        name: 'fund_id',
        type: 'integer',
        required: false,
        description: `Only return recurring donations that designate part of the gift to this fund (see giving_funds). Matching gifts may be split across other funds too, so to report the amount going to this fund, include \`designations\` and read the amount on the designation for it rather than the gift's \`amount_cents\`.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `List the recurring donations set up by this person (see people_search). Omit to list them across the whole organization.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by whether the recurring donation is running or paused. \`active\` is giving on schedule. \`indefinite_hold\` is paused with no end date. \`temporary_hold\` is paused until \`release_hold_at\`.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_giving_refunds',
    description: `Get the refund on a single donation in Planning Center Giving - the amount refunded, the payment processing fee returned, and when the refund was processed. A donation has at most one refund.

Requires a donation ID, so reach for this when a specific donation is already in hand and the question needs the refund record's own fields (the refund fee, the exact time the refund was processed). For aggregate questions like "how much did we refund last month?", use giving_donations to find refunded donations instead.

A not-found result means the donation has no refund, the donation ID is invalid, or you don't have permission to manage donations in Giving (administrator or bookkeeper).`,
    params: [
      {
        name: 'donation_id',
        type: 'integer',
        required: true,
        description: `Get the refund on this donation (see giving_donations).`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_groups_event_attendances',
    description: `Look up individual attendance records for a single event in Planning Center Groups - whether each person attended and their role (member, leader, visitor, or applicant) at the time of the event.`,
    params: [
      {
        name: 'event_id',
        type: 'integer',
        required: true,
        description: `The ID of the event to look up attendance records for.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter attendance records. Use 'attended' to return only people who attended.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to order results by. Prefix with '-' for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Use the value returned in the previous response to get the next page.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results to return per page (1-100, default 10).`,
      },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `Filter attendance records by the role of the attendee.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_groups_events',
    description: `Search events in Planning Center Groups. An event is a single meeting of a group with a start and end time, an optional location, and a cancellation status. By default searches events across every group. Provide group_id or person_id to list events for a specific group or person.`,
    params: [
      {
        name: 'campus_ids',
        type: 'array',
        required: false,
        description: `Filter events by one or more campus IDs.`,
      },
      {
        name: 'ends_at_end',
        type: 'string',
        required: false,
        description: `Return events that end on or before this date (ISO 8601 date format).`,
      },
      {
        name: 'ends_at_start',
        type: 'string',
        required: false,
        description: `Return events that end on or after this date (ISO 8601 date format).`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter events by cancellation status.`,
      },
      {
        name: 'group_id',
        type: 'integer',
        required: false,
        description: `Filter events to a specific group by its ID.`,
      },
      {
        name: 'group_type_ids',
        type: 'array',
        required: false,
        description: `Filter events by one or more group type IDs.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      { name: 'name', type: 'string', required: false, description: `Search events by name.` },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to order results by. Prefix with '-' for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response (e.g. id, name, description, starts_at, ends_at, canceled).`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Use the value returned in the previous response to get the next page.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `Filter events to a specific person by their ID.`,
      },
      {
        name: 'starts_at_end',
        type: 'string',
        required: false,
        description: `Return events that start on or before this date (ISO 8601 date format).`,
      },
      {
        name: 'starts_at_start',
        type: 'string',
        required: false,
        description: `Return events that start on or after this date (ISO 8601 date format).`,
      },
    ],
  },
  {
    name: 'planningcentermcp_groups_group_types',
    description: `List or fetch group type categories (e.g. "Small Groups", "Classes") from Planning Center Groups. Group types define the default settings, visibility, and color theme for the groups within them.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Fetch a specific group type by its ID.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to order results by. Prefix with '-' for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response (e.g. id, name, color, church_center_map_visible).`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Use the value returned in the previous response to get the next page.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_groups_memberships',
    description: `Look up group memberships in Planning Center Groups - the association of a person to a group, with the member's role and the date they joined. Provide exactly one of group_id (to list a group's members) or person_id (to list the groups a person belongs to).`,
    params: [
      {
        name: 'group_id',
        type: 'integer',
        required: false,
        description: `List members of a specific group by its ID. Provide either group_id or person_id, not both.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to order results by. Prefix with '-' for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response (e.g. id, joined_at, role).`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Use the value returned in the previous response to get the next page.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `List groups that a specific person belongs to, by their ID. Provide either group_id or person_id, not both.`,
      },
      { name: 'role', type: 'string', required: false, description: `Filter memberships by role.` },
    ],
  },
  {
    name: 'planningcentermcp_groups_search',
    description: `Search for groups. Groups are collections of people that meet together regularly (small groups, classes, Bible studies, etc.). Returns details like name, description, schedule, contact email, and membership count.`,
    params: [
      {
        name: 'archive_status',
        type: 'string',
        required: false,
        description: `Control whether archived groups are included. Use 'not_archived' (default), 'only' for archived only, or 'include' to include both.`,
      },
      {
        name: 'campus_ids',
        type: 'array',
        required: false,
        description: `Filter groups by one or more campus IDs.`,
      },
      {
        name: 'enrollment_status',
        type: 'array',
        required: false,
        description: `Filter groups by enrollment status.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Additional filter options for groups.`,
      },
      {
        name: 'group_type_ids',
        type: 'array',
        required: false,
        description: `Filter groups by one or more group type IDs.`,
      },
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Filter groups to specific IDs.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      { name: 'name', type: 'string', required: false, description: `Search groups by name.` },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to order results by. Prefix with '-' for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Use the value returned in the previous response to get the next page.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_background_checks',
    description: `Search for background checks. Optionally filter by a specific person using person_id. Current denotes the background check that best represents a person's current standing.`,
    params: [
      {
        name: 'expires_on_end',
        type: 'string',
        required: false,
        description: `Filter background checks that expire on or before this date (ISO 8601 date format).`,
      },
      {
        name: 'expires_on_start',
        type: 'string',
        required: false,
        description: `Filter background checks that expire on or after this date (ISO 8601 date format).`,
      },
      {
        name: 'filter',
        type: 'array',
        required: false,
        description: `Filter background checks by status.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to order results by. Prefix with '-' for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Use the value returned in the previous response to get the next page.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `Filter background checks by a specific person's ID.`,
      },
      {
        name: 'status_updated_at_end',
        type: 'string',
        required: false,
        description: `Filter background checks whose status was updated on or before this date (ISO 8601 date format).`,
      },
      {
        name: 'status_updated_at_start',
        type: 'string',
        required: false,
        description: `Filter background checks whose status was updated on or after this date (ISO 8601 date format).`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_church_campuses',
    description: `List the church campuses (physical sites) configured for the organization. The returned campus IDs are what campus_id/campus_ids filters on other tools expect.`,
    params: [
      {
        name: 'created_at_end',
        type: 'string',
        required: false,
        description: `Filter campuses created on or before this date (ISO 8601 date format).`,
      },
      {
        name: 'created_at_start',
        type: 'string',
        required: false,
        description: `Filter campuses created on or after this date (ISO 8601 date format).`,
      },
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Filter to specific campus IDs.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to order results by. Prefix with '-' for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response (e.g. name, city, state, zip, time_zone).`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Use the value returned in the previous response to get the next page.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'updated_at_end',
        type: 'string',
        required: false,
        description: `Filter campuses updated on or before this date (ISO 8601 date format).`,
      },
      {
        name: 'updated_at_start',
        type: 'string',
        required: false,
        description: `Filter campuses updated on or after this date (ISO 8601 date format).`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_current_organization',
    description: `Get information about the authenticated user's organization.`,
    params: [
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response (e.g. name, avatar_url, church_center_subdomain, country_code, time_zone, date_format, created_at).`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_field_data',
    description: `Search custom field data — the actual values of custom fields on people's profiles. Each field datum is tied to a field definition, which belongs to a custom tab. Use this to look up the values of custom fields for people.`,
    params: [
      {
        name: 'field_definition_id',
        type: 'integer',
        required: false,
        description: `Filter field data to a specific field definition by its ID.`,
      },
      {
        name: 'file_content_type',
        type: 'string',
        required: false,
        description: `Filter field data by file content type (for file-type fields).`,
      },
      {
        name: 'file_name',
        type: 'string',
        required: false,
        description: `Filter field data by file name (for file-type fields).`,
      },
      {
        name: 'file_size',
        type: 'integer',
        required: false,
        description: `Filter field data by file size in bytes (for file-type fields).`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to order results by. Prefix with '-' for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response (e.g. id, file, file_content_type, file_name, file_size, value).`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Use the value returned in the previous response to get the next page.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `Filter field data to a specific person by their ID.`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `Filter field data by value.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_field_definitions',
    description: `Search the custom field definitions configured for the organization. A field definition represents a custom field — its name, data type, sequence, and which tab it belongs to. Use this to discover what custom fields exist on people profiles, then read a person's values with people_field_data.`,
    params: [
      {
        name: 'data_type',
        type: 'string',
        required: false,
        description: `Filter field definitions by data type.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Additional filter options. Use 'include_deleted' to include soft-deleted field definitions.`,
      },
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Filter to specific field definition IDs.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Search field definitions by name.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to order results by. Prefix with '-' for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response (e.g. id, config, data_type, deleted_at, name, sequence, slug, tab_id).`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Use the value returned in the previous response to get the next page.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'slug',
        type: 'string',
        required: false,
        description: `Filter field definitions by slug.`,
      },
      {
        name: 'tab_id',
        type: 'integer',
        required: false,
        description: `Filter field definitions to a specific custom tab by its ID.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_form_fields',
    description: `Search the fields that make up a specific people form. Each form field describes a single input on the form, including its label, field type, whether it is required, and its display order. Requires a form_id. Use to understand a form's structure before reading submissions.`,
    params: [
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the form whose fields should be retrieved.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to sort results by. Prefix with '-' for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (1–100). Defaults to 10.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_form_submissions',
    description: `Search for people form submissions. A form submission represents an individual person's response to a specific people form. Use people_form_fields to see the questions.`,
    params: [
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the form whose submissions should be retrieved.`,
      },
      {
        name: 'created_at_end',
        type: 'string',
        required: false,
        description: `Return submissions created on or before this date (ISO 8601).`,
      },
      {
        name: 'created_at_start',
        type: 'string',
        required: false,
        description: `Return submissions created on or after this date (ISO 8601).`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to sort results by. Prefix with '-' for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (1–100). Defaults to 10.`,
      },
      {
        name: 'person_ids',
        type: 'array',
        required: false,
        description: `Filter submissions to these person IDs.`,
      },
      {
        name: 'updated_at_end',
        type: 'string',
        required: false,
        description: `Return submissions updated on or before this date (ISO 8601).`,
      },
      {
        name: 'updated_at_start',
        type: 'string',
        required: false,
        description: `Return submissions updated on or after this date (ISO 8601).`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_form_submissions_create',
    description: `Record a submission to a people form, for submissions captured outside of Church Center (e.g. a paper form). The caller must be able to manage the target form. Identify the submitter with either person_id (existing person) or person_attributes. Submitting triggers notification/confirmation emails, workflow cards, and profile updates.`,
    params: [
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the form to submit.`,
      },
      {
        name: 'person_attributes',
        type: 'object',
        required: false,
        description: `Submitter details when person_id is unknown. Required fields: first_name, last_name, email.`,
      },
      {
        name: 'person_id',
        type: 'string',
        required: false,
        description: `ID of an existing person to associate with the submission. Use this or person_attributes, not both.`,
      },
      {
        name: 'values',
        type: 'array',
        required: false,
        description: `Array of form field responses. Each entry maps a form_field_id to its submitted value.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_forms',
    description: `Search for people forms. Forms is a tool for gathering information from people via customizable online forms.`,
    params: [
      {
        name: 'campus_id',
        type: 'string',
        required: false,
        description: `Filter forms by campus ID.`,
      },
      { name: 'filter', type: 'string', required: false, description: `Filter forms by status.` },
      { name: 'ids', type: 'array', required: false, description: `Filter to specific form IDs.` },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter forms by name (partial match).`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to sort results by. Prefix with '-' for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (1–100). Defaults to 10.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_households',
    description: `Search households — groups of people who live together (typically a family), each with a primary contact. Filter by household or primary-contact name.`,
    params: [
      {
        name: 'created_at_end',
        type: 'string',
        required: false,
        description: `Return households created on or before this date (ISO 8601).`,
      },
      {
        name: 'created_at_start',
        type: 'string',
        required: false,
        description: `Return households created on or after this date (ISO 8601).`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter households by name (partial match).`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to sort results by. Prefix with '-' for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (1–100). Defaults to 10.`,
      },
      {
        name: 'primary_contact_name',
        type: 'string',
        required: false,
        description: `Filter households by the name of the primary contact.`,
      },
      {
        name: 'updated_at_end',
        type: 'string',
        required: false,
        description: `Return households updated on or before this date (ISO 8601).`,
      },
      {
        name: 'updated_at_start',
        type: 'string',
        required: false,
        description: `Return households updated on or after this date (ISO 8601).`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_list_results',
    description: `Retrieves the people that appear in a specific Planning Center People list. Requires a list_id (find one via people_lists).`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the list whose members should be retrieved.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to sort results by. Prefix with '-' for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (1–100). Defaults to 10.`,
      },
      {
        name: 'person_id',
        type: 'string',
        required: false,
        description: `Filter results to a specific person ID.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_lists',
    description: `Search for people lists. A list is a powerful tool for finding and grouping people together. To get the people in a list, use people_list_results.`,
    params: [
      {
        name: 'campus_id',
        type: 'string',
        required: false,
        description: `Filter lists by campus ID.`,
      },
      {
        name: 'created_at_end',
        type: 'string',
        required: false,
        description: `Return lists created on or before this date (ISO 8601).`,
      },
      {
        name: 'created_at_start',
        type: 'string',
        required: false,
        description: `Return lists created on or after this date (ISO 8601).`,
      },
      { name: 'ids', type: 'array', required: false, description: `Filter to specific list IDs.` },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter lists by name (partial match).`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to sort results by. Prefix with '-' for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (1–100). Defaults to 10.`,
      },
      {
        name: 'updated_at_end',
        type: 'string',
        required: false,
        description: `Return lists updated on or before this date (ISO 8601).`,
      },
      {
        name: 'updated_at_start',
        type: 'string',
        required: false,
        description: `Return lists updated on or after this date (ISO 8601).`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_note_categories',
    description: `Search note categories in Planning Center People. Note categories organize and classify notes on people profiles.`,
    params: [
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter note categories by name (partial match).`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to sort results by. Prefix with '-' for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (1–100). Defaults to 10.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_notes',
    description: `Search for notes attached to people's profiles. A note is text with a category connected to a person's profile.`,
    params: [
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'note',
        type: 'string',
        required: false,
        description: `Filter notes by content text (partial match).`,
      },
      {
        name: 'note_category_id',
        type: 'string',
        required: false,
        description: `Filter notes by note category ID.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to sort results by. Prefix with '-' for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (1–100). Defaults to 10.`,
      },
      {
        name: 'person_id',
        type: 'string',
        required: false,
        description: `Filter notes to a specific person ID.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_notes_create',
    description: `Create a note on a person's profile. A note is text filed under a note category and attached to a specific person. Use people_notes to read existing notes and people_note_categories to discover which category to file the note under.`,
    params: [
      {
        name: 'note',
        type: 'string',
        required: true,
        description: `The text content of the note.`,
      },
      {
        name: 'note_category_id',
        type: 'string',
        required: true,
        description: `The ID of the note category to file this note under. Use people_note_categories to find valid IDs.`,
      },
      {
        name: 'person_id',
        type: 'string',
        required: true,
        description: `The ID of the person to attach the note to.`,
      },
      {
        name: 'display_date',
        type: 'string',
        required: false,
        description: `Optional date the note should be displayed under (ISO 8601 date format).`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_search',
    description: `Search for people by name, contact info, status, campus, membership, and more.`,
    params: [
      {
        name: 'age_type',
        type: 'string',
        required: false,
        description: `Filter by age type: child or adult.`,
      },
      {
        name: 'campus_ids',
        type: 'array',
        required: false,
        description: `Filter by one or more campus IDs.`,
      },
      {
        name: 'created_at_end',
        type: 'string',
        required: false,
        description: `Return people created on or before this date (ISO 8601).`,
      },
      {
        name: 'created_at_start',
        type: 'string',
        required: false,
        description: `Return people created on or after this date (ISO 8601).`,
      },
      { name: 'email', type: 'string', required: false, description: `Filter by email address.` },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `Filter by first name (partial match supported).`,
      },
      {
        name: 'gender',
        type: 'string',
        required: false,
        description: `Filter by gender: Male, Female, or Unspecified.`,
      },
      {
        name: 'grade',
        type: 'integer',
        required: false,
        description: `Filter by school grade (-1 for pre-K, 0 for kindergarten, 1–12 for grades 1–12).`,
      },
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Filter by one or more person IDs.`,
      },
      {
        name: 'inactivated_at_end',
        type: 'string',
        required: false,
        description: `Return people inactivated on or before this date (ISO 8601).`,
      },
      {
        name: 'inactivated_at_start',
        type: 'string',
        required: false,
        description: `Return people inactivated on or after this date (ISO 8601).`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: `Filter by last name (partial match supported).`,
      },
      {
        name: 'membership_type',
        type: 'string',
        required: false,
        description: `Filter by membership type name.`,
      },
      { name: 'order_by', type: 'string', required: false, description: `Sort order for results.` },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (1–100, default 10).`,
      },
      {
        name: 'phone_number',
        type: 'string',
        required: false,
        description: `Filter by phone number.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by person status: active or inactive.`,
      },
      {
        name: 'updated_at_end',
        type: 'string',
        required: false,
        description: `Return people updated on or before this date (ISO 8601).`,
      },
      {
        name: 'updated_at_start',
        type: 'string',
        required: false,
        description: `Return people updated on or after this date (ISO 8601).`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_tabs',
    description: `Search people custom tabs. A tab groups field definitions on the profile (e.g., 'Volunteer Info', 'Church Info'). Tabs contain field definitions which describe the custom fields whose per-person values come from people_field_data.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Filter by one or more tab IDs.`,
      },
      { name: 'name', type: 'string', required: false, description: `Filter by tab name.` },
      { name: 'order_by', type: 'string', required: false, description: `Sort order for results.` },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
      {
        name: 'slug',
        type: 'string',
        required: false,
        description: `Filter by tab slug (URL-safe identifier).`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_workflow_cards',
    description: `Search people workflow cards. Cards are workflow steps assigned to a staff member to perform for a specific person. Requires a workflow_id (find one via people_workflows).`,
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: `The ID of the workflow to search cards within. Required. Use people_workflows to find a workflow ID.`,
      },
      {
        name: 'after_moved_to_step_at',
        type: 'string',
        required: false,
        description: `Return cards moved to their current step on or after this date (ISO 8601).`,
      },
      {
        name: 'assignee_ids',
        type: 'array',
        required: false,
        description: `Filter by one or more assignee person IDs.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      { name: 'order_by', type: 'string', required: false, description: `Sort order for results.` },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response.`,
      },
      {
        name: 'overdue',
        type: 'boolean',
        required: false,
        description: `Filter for overdue cards. Only supports true.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
      {
        name: 'stage',
        type: 'string',
        required: false,
        description: `Filter cards by stage: ready, snoozed, completed, or removed.`,
      },
      {
        name: 'step_ids',
        type: 'array',
        required: false,
        description: `Filter by one or more workflow step IDs.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_workflow_categories',
    description: `Search the categories that organize people workflows. Use this to find a category by name; then filter people_workflows by its workflow_category_id.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Filter by one or more workflow category IDs.`,
      },
      { name: 'name', type: 'string', required: false, description: `Filter by category name.` },
      { name: 'order_by', type: 'string', required: false, description: `Sort order for results.` },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_people_workflows',
    description: `Search for people workflows. A workflow consists of a series of steps to complete a specific task. Steps consist of cards assigned to a staff member for a specific person. Use people_workflow_cards for per-person cards, and people_workflow_categories for categories.`,
    params: [
      { name: 'campus_id', type: 'string', required: false, description: `Filter by campus ID.` },
      {
        name: 'created_at_end',
        type: 'string',
        required: false,
        description: `Return workflows created on or before this date (ISO 8601).`,
      },
      {
        name: 'created_at_start',
        type: 'string',
        required: false,
        description: `Return workflows created on or after this date (ISO 8601).`,
      },
      {
        name: 'filter',
        type: 'array',
        required: false,
        description: `Predefined filters to narrow results.`,
      },
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Filter by one or more workflow IDs.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      { name: 'name', type: 'string', required: false, description: `Filter by workflow name.` },
      { name: 'order_by', type: 'string', required: false, description: `Sort order for results.` },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
      {
        name: 'updated_at_end',
        type: 'string',
        required: false,
        description: `Return workflows updated on or before this date (ISO 8601).`,
      },
      {
        name: 'updated_at_start',
        type: 'string',
        required: false,
        description: `Return workflows updated on or after this date (ISO 8601).`,
      },
      {
        name: 'workflow_category_id',
        type: 'string',
        required: false,
        description: `Filter by workflow category ID.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_publishing_channels',
    description: `Search sermon channels in Planning Center Publishing. A "channel" is a top-level content grouping for sermons (e.g. "Sunday Morning", "Wednesday Bible Study"). Each channel carries its own feature flags (enable_audio, enable_on_demand_video, enable_watch_live, general_chat_enabled/group_chat_enabled, sermon_notes_enabled, podcast configuration) and a lifecycle pair (published, archived).

This is the foundational Publishing tool. \`publishing_episode_statistics\` requires a channel id from here. \`publishing_episodes\` and \`publishing_series\` can't filter by channel — request their \`channel\` include and group by it client-side.

For lifecycle questions ("is this channel published or archived?", "show me archived channels") use the \`filter\` param (archived, not_archived, published, podcast_enabled) rather than fetching every channel and inspecting the published/archived attributes yourself — the filter dispatches server-side. Pass multiple values to combine scopes, e.g. \`["published", "podcast_enabled"]\` for published channels with podcasting enabled.

A channel's \`services_service_type_remote_identifier\` links it to a Planning Center Services service type. To answer "which channel is paired with our Sunday 9am service type?", call \`services_service_types\` first to find that service type's id, then match it against a channel's \`services_service_type_remote_identifier\` here.

\`general_chat_enabled\`/\`group_chat_enabled\` read \`false\` both when chat is off and when the org lacks a Groups subscription; check \`can_enable_chat\` to tell those two cases apart.`,
    params: [
      {
        name: 'filter',
        type: 'array',
        required: false,
        description: `Limit channels to one or more lifecycle or feature scopes: "archived", "not_archived", "published", "podcast_enabled". Pass multiple values to combine them. Omit to include all.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter channels by name (partial match).`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
    ],
  },
  {
    name: 'planningcentermcp_publishing_episode_statistics',
    description: `Church Center viewership statistics for the episodes in a single Publishing channel. Returns one entry per episode with its Church Center live watch count (live_watch_count), library watch count (library_watch_count), and a per-EpisodeTime breakdown (times, each carrying its own watch_count).

Counts are Church Center plays only. Views on YouTube, Vimeo, Facebook, or other external platforms are NOT included — this mirrors the per-episode statistics panel the Publishing admin sees.

This tool takes a channel_id. First call \`publishing_channels\` to pick the relevant channel (typically the main Sunday channel), then call this tool with that channel's id. Answer questions like "most-watched episodes this month" or "average listen count per episode" by fetching a channel's statistics and aggregating client-side — do NOT fan out per episode. Aggregates cover only the episodes you have fetched, so set \`per_page\` to 100 and keep paging with \`page_after\` until \`has_more\` is false before summarizing.

Use \`type\` and the after/before date range to narrow server-side: \`type: "live"\` bounds by when episodes were published live, \`type: "library"\` bounds by when they were added to the library, and omitting \`type\` returns episodes matching either. \`after\` is an inclusive lower bound (includes the whole named day). \`before\` is an exclusive upper bound: it cuts off at the start of the named day, so episodes published on the \`before\` date itself are NOT included. Both are YYYY-MM-DD.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `ID of the channel whose episode statistics to return. Get channel ids from \`publishing_channels\`.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Earliest publish date to include, as YYYY-MM-DD. Inclusive — the whole named day is included. Applies to the column selected by \`type\`.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Upper bound on publish date, as YYYY-MM-DD. Exclusive — episodes published on this date are NOT included (the bound is the start of the named day). Applies to the column selected by \`type\`.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Restrict to episodes published live ("live", bounds by published_live_at) or added to the library ("library", bounds by published_to_library_at). Omit to include episodes matching either.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_publishing_episodes',
    description: `Search episodes in Planning Center Publishing. An episode is a single sermon — it carries title, description, art, audio/video URLs (both live-stream and on-demand library), and publication timestamps (\`published_live_at\`, \`published_to_library_at\`). Use \`search\` to find sermons by topic, book, or passage (e.g. "sermons on Romans") — it matches against the episode's title only (not description, and not speaker or preacher name).

Use \`church_center_url\` for a link to the episode on Church Center. \`page_actions\` is intentionally not exposed — two of its three actions are admin-write actions (remove from series, edit); \`church_center_url\` covers the one navigation action.

Cross-product chaining: an episode carries \`services_plan_remote_identifier\` (the Services Plan that was live for this sermon) and \`services_service_type_remote_identifier\` (the Services Service Type its channel is paired with) — resolve a plan or service type id from \`services_plans\` / \`services_service_types\` first, then pass it here (e.g. "last Sunday's sermon" resolves by first finding the Sunday-service plan, then matching its id here). Filter by \`series_id\` to get all episodes in a sermon series — resolve the series by name with \`publishing_series\` first, then pass its id here.

Filter by speaker with \`speaker_id\` and \`speaker_type\` together — both are required (a speaker id alone is ambiguous because a Person and a Guest can share the same id). Resolve them from \`publishing_speakers\` first, which returns each speaker's \`id\` and \`speaker_type\`, then pass both here. For a prompt naming both a speaker and a topic (e.g. "Find Pastor John's sermons on Romans"), resolve the speaker via \`publishing_speakers\`, then call this tool with the speaker pair plus \`search\` on the topic (\`{"speaker_id": "...", "speaker_type": "Person", "search": "Romans"}\`).

To surface the most recent sermons, pair \`order_by: -published_live_at\` with \`filter: published_live\`. Without the filter, episodes that never went live or are only scheduled can sort above the genuinely most-recent sermons. Only add the filter when the user wants sermons that have already aired; omit it to sort across all episodes.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Limit episodes to a lifecycle or connection scope: "published_live", "connected_to_services", or "published_on_church_center". These are lifecycle states, not date ranges — "published_live" means the episode has gone live at some point, not that it went live within any specific period. Omit to include all.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Filter episodes by title (partial match). Does not match against the episode description.`,
      },
      {
        name: 'series_id',
        type: 'string',
        required: false,
        description: `Filter to episodes in a specific series. Chain from \`publishing_series\` — resolve the series id there, then pass it here.`,
      },
      {
        name: 'services_plan_remote_identifier',
        type: 'string',
        required: false,
        description: `Filter to the episode linked to a specific Services plan. Chain from \`services_plans\` — resolve the plan id there, then pass it here.`,
      },
      {
        name: 'services_service_type_remote_identifier',
        type: 'string',
        required: false,
        description: `Filter to episodes whose channel is paired with a specific Services service type. Chain from \`services_service_types\`.`,
      },
      {
        name: 'speaker_id',
        type: 'string',
        required: false,
        description: `Filter to episodes by a specific speaker. Must be sent together with \`speaker_type\` (a speaker id alone is ambiguous). Chain from \`publishing_speakers\` — resolve the speaker's \`id\` there, then pass it here along with its \`speaker_type\`.`,
      },
      {
        name: 'speaker_type',
        type: 'string',
        required: false,
        description: `The speaker's type, from \`publishing_speakers\`. Required whenever \`speaker_id\` is set; sending one without the other returns an error.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_publishing_series',
    description: `Search sermon series in Planning Center Publishing. A "series" is a collection of episodes organized around a theme (e.g. "Romans", "Easter", "Advent"), scoped to a single channel. Each series carries a title, description, art, the run window (started_at / ended_at), an episodes_count, and a published lifecycle flag.

Use this tool for questions about series metadata: "what's the current sermon series?", "how many episodes are in the Romans series?", "show me all the series we've done this year". Filter by title with the \`title\` param (partial match on the series title).

For lifecycle questions use the \`filter\` param ("published", "not_published", "published_on_church_center") rather than fetching every series and inspecting the published attribute yourself — the filter dispatches server-side. Pass multiple values to combine scopes.

To find the *current* series, request filter=["published"] with order_by="-started_at", then pick the most recent series whose window covers today (started_at on or before today, and ended_at empty or on/after today) — there is no server-side "current" filter.

To list the episodes within a series, resolve the series id here first, then pass it to \`publishing_episodes\` as \`series_id\`.`,
    params: [
      {
        name: 'filter',
        type: 'array',
        required: false,
        description: `Limit series to one or more scopes: "published", "not_published", "published_on_church_center". Pass multiple values to combine them. Omit to include all.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Specify which relationships to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Filter series by title (partial match).`,
      },
    ],
  },
  {
    name: 'planningcentermcp_publishing_speakers',
    description: `Search speakers in Planning Center Publishing. A "speaker" is a unified abstraction over two underlying record types, distinguished by \`speaker_type\`: \`"Person"\` (a PCO People record) or \`"Guest"\` (an ad-hoc record for external speakers with no People record).

Use the \`search\` param to filter by name (matches first_name or last_name, partial match) — this resolves name-based prompts directly, e.g. "has Pastor John preached recently?" → \`search: "John"\`. For sermon-content questions about a specific speaker, resolve the speaker's \`id\` and \`speaker_type\` here first, then chain both into \`publishing_episodes\`'s \`speaker_id\` and \`speaker_type\` filters (both are required together) to find their sermons.

For \`"Person"\` speakers, \`id\` is the same People account-center id \`people_search\` returns, so you can alternatively resolve via \`people_search\` first and match the account-center id against a speaker here. \`"Guest"\` speakers only exist in Publishing — they have no People record, so \`people_search\` will never find them, and the response has no \`links.html\` for them (Person speakers do have one, pointing at the People record).

Requires Publishing administrator access; other org members will get a permission error.`,
    params: [
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort results by field. Use '-' prefix for descending order.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Specify which fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination token from previous response's next_page_token field`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Filter speakers by name (matches first_name or last_name, partial match).`,
      },
    ],
  },
  {
    name: 'planningcentermcp_registrations_attendees',
    description: `Search the attendees registered for a specific Planning Center signup. An attendee is a person registered for a signup, with status flags for whether they are active, canceled, complete, or waitlisted. Requires a signup_id.`,
    params: [
      {
        name: 'signup_id',
        type: 'string',
        required: true,
        description: `The ID of the signup to search attendees for. Required.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter attendees by status: active, waitlist, or canceled.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      { name: 'order_by', type: 'string', required: false, description: `Sort order for results.` },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
      {
        name: 'registration_id',
        type: 'string',
        required: false,
        description: `Filter attendees by a specific registration ID.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_registrations_registrations',
    description: `Search registrations for a specific signup. A registration is a single submission to a signup. Requires a signup_id.`,
    params: [
      {
        name: 'signup_id',
        type: 'string',
        required: true,
        description: `The ID of the signup to search registrations for. Required.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_registrations_signups',
    description: `Search signups. A signup is an ongoing program, opportunity, or event that people can register for.`,
    params: [
      { name: 'campus_id', type: 'string', required: false, description: `Filter by campus ID.` },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter signups by archived status: archived or unarchived.`,
      },
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Filter by one or more signup IDs.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_services_blockouts',
    description: `Search the blockout dates for a specific person. A blockout is a date or recurring date range when a person is unavailable to be scheduled to serve (e.g. vacation). Requires a person_id.`,
    params: [
      {
        name: 'person_id',
        type: 'string',
        required: true,
        description: `The ID of the person whose blockouts to retrieve. Required.`,
      },
      {
        name: 'filter',
        type: 'array',
        required: false,
        description: `Predefined filters to narrow results.`,
      },
      {
        name: 'group_identifier',
        type: 'string',
        required: false,
        description: `Filter by group identifier (groups recurring blockouts together).`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_services_plan_items',
    description: `Search the items (the order of service) within a specific plan in Planning Center Services. Each item is one element in a plan's sequence — a song, header, media, or announcement. Requires a service_type_id and plan_id; items are returned in plan sequence order.`,
    params: [
      {
        name: 'plan_id',
        type: 'string',
        required: true,
        description: `The ID of the plan whose items to retrieve. Required.`,
      },
      {
        name: 'service_type_id',
        type: 'string',
        required: true,
        description: `The ID of the service type containing the plan. Required.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `List of fields to include in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_services_plan_people',
    description: `List the people scheduled to serve on a specific plan in Planning Center Services — the plan's roster. Each entry includes the person's name, the team and position they're filling, and their confirmation status. Requires a service_type_id and plan_id. Use filter or read each person's status to narrow by confirmation state.`,
    params: [
      {
        name: 'plan_id',
        type: 'integer',
        required: true,
        description: `The ID of the plan whose roster you want to list.`,
      },
      {
        name: 'service_type_id',
        type: 'integer',
        required: true,
        description: `The ID of the service type that contains the plan.`,
      },
      {
        name: 'filter',
        type: 'array',
        required: false,
        description: `Filter scheduled people by confirmation state.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Limit which fields are returned in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination cursor from the previous response to fetch the next page.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results to return per page (1–100).`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `Filter results to a specific team within the plan.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_services_plans',
    description: `Search plans within a Planning Center Services service type. A plan is a single worship service or event (e.g. "Sunday Morning, June 8") containing its dates, series, item and people counts, and length. Requires a service_type_id. Note: sort_date is the plan's service date; plans are commonly scheduled into the future. To find the most recent service, combine filter "past" with order_by -sort_date.`,
    params: [
      {
        name: 'service_type_id',
        type: 'integer',
        required: true,
        description: `The ID of the service type to search plans within.`,
      },
      {
        name: 'created_at_end',
        type: 'string',
        required: false,
        description: `Return plans created on or before this date (ISO 8601).`,
      },
      {
        name: 'created_at_start',
        type: 'string',
        required: false,
        description: `Return plans created on or after this date (ISO 8601).`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter plans by time period.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field and direction to sort results by.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Limit which fields are returned in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination cursor from the previous response to fetch the next page.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'series_title',
        type: 'string',
        required: false,
        description: `Filter plans by series title (partial match).`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Filter plans by title (partial match).`,
      },
      {
        name: 'updated_at_end',
        type: 'string',
        required: false,
        description: `Return plans updated on or before this date (ISO 8601).`,
      },
      {
        name: 'updated_at_start',
        type: 'string',
        required: false,
        description: `Return plans updated on or after this date (ISO 8601).`,
      },
    ],
  },
  {
    name: 'planningcentermcp_services_schedules',
    description: `Retrieve a person's schedule in Planning Center Services — the worship service plans they are scheduled to serve in. Defaults to the authenticated user's own schedule when person_id is omitted. Provide a person_id to look up someone else's schedule.`,
    params: [
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field and direction to sort results by.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Limit which fields are returned in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination cursor from the previous response to fetch the next page.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `Planning Center person ID. Omit to return the authenticated user's own schedule.`,
      },
      {
        name: 'plan_id',
        type: 'integer',
        required: false,
        description: `Filter schedule results to a specific plan.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_services_service_types',
    description: `Search for service types. A Service Type is a container for plans, typically a recurring worship event like Sunday AM, Wednesday Service, or Christmas Eve. Service Types group all the plans, teams, schedules, and song lists for that service.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Filter to only return service types with these IDs.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter service types by name (partial match).`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field and direction to sort results by.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Limit which fields are returned in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination cursor from the previous response to fetch the next page.`,
      },
      {
        name: 'parent_id',
        type: 'integer',
        required: false,
        description: `Filter service types by parent folder ID.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_services_songs',
    description: `Search the Planning Center Services song library. A song is a reusable piece of music (title, author, CCLI number, copyright, and themes) that can be scheduled into service plans. Use to find songs by title, author, theme, or CCLI number.`,
    params: [
      {
        name: 'author',
        type: 'string',
        required: false,
        description: `Filter songs by author name (partial match).`,
      },
      {
        name: 'ccli_number',
        type: 'integer',
        required: false,
        description: `Filter songs by their CCLI license number.`,
      },
      {
        name: 'hidden',
        type: 'boolean',
        required: false,
        description: `Filter songs by whether they are hidden in the library.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field and direction to sort results by.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Limit which fields are returned in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination cursor from the previous response to fetch the next page.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'themes',
        type: 'string',
        required: false,
        description: `Filter songs by theme keywords.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Filter songs by title (partial match).`,
      },
    ],
  },
  {
    name: 'planningcentermcp_services_team_positions',
    description: `Search the team positions within a service type in Planning Center Services. A team position is a role within a team that people are scheduled into — for example "Acoustic Guitar", "Vocals", or "Camera 1". Requires a service_type_id.`,
    params: [
      {
        name: 'service_type_id',
        type: 'integer',
        required: true,
        description: `The ID of the service type whose team positions you want to list.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field and direction to sort results by.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Limit which fields are returned in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination cursor from the previous response to fetch the next page.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
    ],
  },
  {
    name: 'planningcentermcp_services_teams',
    description: `Search teams in Planning Center Services. A team is a group within a service type that people are scheduled into to serve (e.g. Band, Vocals, Production, Hospitality). Pass a service_type_id to limit results to a single service type, or omit to search across the whole organization.`,
    params: [
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Related resources to include in the response.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter teams by name (partial match).`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field and direction to sort results by.`,
      },
      {
        name: 'output_fields',
        type: 'array',
        required: false,
        description: `Limit which fields are returned in the response.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Pagination cursor from the previous response to fetch the next page.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'service_type_id',
        type: 'integer',
        required: false,
        description: `Filter teams to a specific service type. Omit to search across the whole organization.`,
      },
    ],
  },
]
