import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'scitemcp_add_dois_to_collection',
    description: `Add DOIs to a Collection. Works on both DOI-list and saved-search Collections. Requires EDITOR or ADMIN access.

For a DOI-list Collection the DOIs are added to the list. For a saved-search Collection they are force-included
(added to the manual include list) so they appear even if the search would not return them. DOIs already present are
ignored. Use \`create_collection\` to make a new Collection or \`remove_dois_from_collection\` to take DOIs out.

**Parameters:**
- slug: The Collection slug (required).
- dois: List of DOI strings to add (required, non-empty).

**Returns:** The updated Collection with id, slug, name, and DOI counts.`,
    params: [
      {
        name: 'dois',
        type: 'array',
        required: true,
        description: `List of DOIs to add, e.g. ['10.1038/s41586-020-2649-2']`,
      },
      { name: 'slug', type: 'string', required: true, description: `The Collection slug` },
    ],
  },
  {
    name: 'scitemcp_create_collection',
    description: `Create a new Collection owned by the signed-in user.

Use this to start a Collection from a list of DOIs the user wants to group, track, and analyze together. The
caller becomes the Collection ADMIN. The returned \`slug\` identifies the Collection for \`get_collection\`,
\`update_collection\`, \`add_dois_to_collection\`, and the other Collection tools.

**DOI validation.** Provided DOIs are validated and resolved against scite; unknown DOIs are dropped and surfaced
via the \`unmatchedDoiCount\` in the response. An empty \`dois\` list creates an empty Collection the user can add to later.

**Scope.** This tool creates DOI-list Collections. Collections backed by a saved search query are created in the
scite web app, not via MCP.

**Parameters:**
- name: Collection name (required).
- description: Optional free-text description.
- dois: Optional list of DOI strings to seed the Collection.
- is_public: If true, anyone with the slug can view the Collection (default: false).

**Returns:** The created Collection with id, slug, name, description, isPublic, doiQueryType, accessType, and DOI counts.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Collection name` },
      { name: 'description', type: 'string', required: false, description: `Optional description` },
      {
        name: 'dois',
        type: 'array',
        required: false,
        description: `Optional list of DOIs to seed the Collection, e.g. ['10.1038/s41586-020-2649-2']`,
      },
      {
        name: 'is_public',
        type: 'boolean',
        required: false,
        description: `If true, anyone with the slug can view (default: false)`,
      },
    ],
  },
  {
    name: 'scitemcp_delete_collection',
    description: `Permanently delete a Collection. Requires ADMIN access on the Collection.

This cannot be undone. The Collection and its DOI membership are removed. Only the Collection ADMIN may delete it.

**Parameters:**
- slug: The Collection slug (required).

**Returns:** \`{deleted: true, slug: "..."}\` on success.`,
    params: [{ name: 'slug', type: 'string', required: true, description: `The Collection slug` }],
  },
  {
    name: 'scitemcp_get_510k_summary',
    description: `Fetch the full text of a single FDA 510(k) summary PDF by document ID.

Use this after \`search_510k_summaries\` or \`search_device510k\` when you need the complete narrative text of a 510(k)
summary, not just search snippets or structured metadata. Returns the full extracted text organized by page.

**Parameters:**
- id: Document identifier (the K number, e.g. \`K192757\`). Can be obtained from either \`search_510k_summaries\` or
  \`search_device510k\` results.

**Returns:** The full-text content of the 510(k) summary PDF, organized by page, with file metadata and ontology
tags.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Document identifier, e.g. K192757.`,
      },
    ],
  },
  {
    name: 'scitemcp_get_clinical_trial',
    description: `Fetch full details for a single clinical trial by NCT id.

Use this after \`search_clinical_trials\` when you need the complete record for a specific trial, including the full
\`description\`, study \`design\`, \`enrollment\`, \`outcomes\` (primary/secondary), full \`eligibility\` inclusion/exclusion
criteria, \`reportedEvents\` (adverse events when the trial has posted results), principal investigator (\`pi\`),
\`contacts\`, \`citations\` (related publications), and \`resultsUrl\`.

The search tool returns a slim summary to save tokens; call this tool for a specific NCT id when you need those verbose
fields for deeper analysis or patient-trial matching.

**Parameters:**
- id: NCT identifier (e.g. \`NCT02986230\`).

**Returns:** A compact detail record preserving all trial fields except the low-signal \`ontology\` classifications.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `NCT identifier of the clinical trial, e.g. NCT02986230.`,
      },
    ],
  },
  {
    name: 'scitemcp_get_collection',
    description: `Fetch a single Collection (a saved, named set of papers) by its slug.

Use the \`slug\` returned by \`create_collection\` or \`search_collections\`. Returns the Collection's identity, sharing,
access level, and DOI counts. The caller must have at least VIEWER access (own it, be shared on it, or it is public).

**Parameters:**
- slug: The Collection slug (required).

**Returns:** The Collection with id, slug, name, description, isPublic, accessType, and DOI counts.`,
    params: [{ name: 'slug', type: 'string', required: true, description: `The Collection slug` }],
  },
  {
    name: 'scitemcp_get_device510k',
    description: `Fetch full details for a single FDA 510(k) clearance by K number.

Use this after \`search_device510k\` when you need the complete record for a specific clearance, including the full
\`summaryText\` (the complete 510(k) summary statement, often very long), full \`applicant\` details (address, contact,
country), \`registration\` info (FEI and registration numbers), and the complete \`decision\` object (code, description,
committee, review flags).

The search tool returns a brief highlighted snippet of the summary text; call this tool for a specific K number when you
need the full text or detailed applicant/registration information.

**Parameters:**
- id: K number identifier (e.g. \`K210674\`).

**Returns:** A compact detail record with full summary text, complete applicant information,
registration details, and decision metadata.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `K number identifier of the 510(k) clearance, e.g. K210674.`,
      },
    ],
  },
  {
    name: 'scitemcp_get_drug',
    description: `Fetch full details for a single FDA drug record by ID.

Use this after \`search_drugs\` when you need the complete record for a specific drug, including every approved
product (product number, applicant, approval date, dosage form, route, active ingredients, TE code) and the full
Structured Product Label text sections. The search tool returns a slim view; this tool adds detail-only fields.

**Parameters:**
- id: Drug record ID (the UUID from search_drugs results, e.g. \`4dd865ec-8889-49ac-8c8f-4438875937ac\`).

**Returns:** A detailed drug record with the application's products and the main label sections (indications and
usage, dosage and administration, contraindications, boxed warning, warnings and cautions, adverse reactions, drug
interactions, use in specific populations, pharmacology, clinical studies, how supplied, overdosage, description).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Drug record ID (UUID from search_drugs results, e.g. '4dd865ec-8889-49ac-8c8f-4438875937ac')`,
      },
    ],
  },
  {
    name: 'scitemcp_get_faers_report',
    description: `Fetch full details for a single FAERS adverse event report by ID.

Use this after \`search_faers\` when you need the complete record for a specific report, including patient
demographics, full drug dosage details, the reporting source, and any duplicate-report references. The search
tool returns a slim view; this tool adds detail-only fields.

**Parameters:**
- id: FAERS safety report ID (e.g. \`26185565\`). Obtained from search_faers results.

**Returns:** A detailed FAERS report with patient demographics (sex, age group, onset age, weight, death date),
report dates (receiveDate, receiptDate, transmissionDate), expedited flag, primarySource (reporter qualification
and country), reportDuplicates, and enriched drugs (dosage text, start/end dates, NDC, application number,
pharmacologic class).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `FAERS safety report ID (e.g. '26185565')`,
      },
    ],
  },
  {
    name: 'scitemcp_get_grant',
    description: `Fetch full details for a single grant by id.

Call this after \`search_grants\` only when you need something the search result does not already have. Specifically, this
returns:

- Full \`abstract\` (search returns only a ~300-char highlighted preview; the full text is typically 1-3 KB).
- Source-specific identifiers that search does not include: \`awardYear\`, \`agencyTrackingNumber\`, \`contract\`,
  \`nihProgramCode\`, \`nihrApplicationId\`.

All other fields (title, agency, organization, piName, country, dates, awardAmount, tags, externalLink, etc.) are
already present in search results — don't call \`get_grant\` just to get those.

Also use this to pull siblings listed in \`siblingGrantIds\` on a search result: call \`get_grant\` once per sibling id you
need.

**Parameters:**
- id: Grant identifier returned by \`search_grants\` (e.g. \`5201339\`, \`nsf.0646294\`, \`wellcome.214402.Z.18.Z\`).

**Returns:** A compact detail record with the full abstract and the source-specific identifiers listed above; drops the
low-signal \`categories\` ontology.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Grant identifier returned by search_grants, e.g. 5201339 or nsf.0646294.`,
      },
    ],
  },
  {
    name: 'scitemcp_get_maude_report',
    description: `Fetch full details for a single MAUDE adverse event report by ID.

Use this after \`search_maude\` when you need the complete record for a specific report, including the full
narrative text (MDR text with text type codes), reporter information, device availability, patient treatment,
and tags. The search tool returns truncated text snippets; this tool returns the full narratives which can be
much longer.

**Parameters:**
- id: MAUDE report ID (e.g. \`17343805\`). Obtained from search_maude results.

**Returns:** A detailed MAUDE report with full narrative text entries (with text type codes like "Description of
Event or Problem"), reporter occupation, health professional flag, device medical specialty and availability,
patient treatment, product problem flag, and tags.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `MAUDE report ID (e.g. '17343805')`,
      },
    ],
  },
  {
    name: 'scitemcp_get_mhra_alert',
    description: `Fetch the full text of a single MHRA alert or publication by document ID.

Use this after \`search_mhra\` when you need the complete text of an alert, including the full article body (contentHtml),
not just search snippets. Returns the full extracted text organized by page.

**Parameters:**
- id: Document identifier from \`search_mhra\` results.

**Returns:** The full-text content of the MHRA alert, including headline, description, article body, tags, and per-page
content.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Document identifier from search_mhra results.`,
      },
    ],
  },
  {
    name: 'scitemcp_remove_dois_from_collection',
    description: `Remove DOIs from a Collection. Works on both DOI-list and saved-search Collections. Requires EDITOR or ADMIN access.

For a DOI-list Collection the DOIs are dropped from the list. For a saved-search Collection they are excluded (added to
the exclude list) so they no longer appear even if the search would return them. DOIs not present are ignored. This
removes papers from the Collection; it does not delete the Collection itself (use \`delete_collection\` for that).

**Parameters:**
- slug: The Collection slug (required).
- dois: List of DOI strings to remove (required, non-empty).

**Returns:** The updated Collection with id, slug, name, and DOI counts.`,
    params: [
      {
        name: 'dois',
        type: 'array',
        required: true,
        description: `List of DOIs to remove, e.g. ['10.1038/s41586-020-2649-2']`,
      },
      { name: 'slug', type: 'string', required: true, description: `The Collection slug` },
    ],
  },
  {
    name: 'scitemcp_search_510k_summaries',
    description: `Search the full text of FDA 510(k) summary PDF documents.

This dataset contains OCR'd full-text content from FDA 510(k) premarket notification summary PDFs. Unlike
\`search_device510k\` which returns structured clearance metadata (device class, applicant, decision codes), this tool
searches the actual narrative text of 510(k) submissions and returns matching page-level snippets.

Use this tool when the question involves the *content* of a 510(k) submission rather than its metadata. Common triggers:
test results, performance data, biocompatibility, substantial equivalence comparisons, indications for use, predicate
device comparisons, sterilization methods, software descriptions, bench testing, or clinical study summaries.

When you already have a K number from \`search_device510k\`, use \`get_510k_summary\` to read the full document instead of
searching again.

**Parameters:**
- q: Search query (technical terms, device descriptions, test methods, etc.)
- f: Space-delimited filters in \`field:"value"\` format
- p: Page number (default: 1)

**Returns:** Documents with id, filename, tags, and page-level content snippets showing where
the query matched within each 510(k) summary PDF.`,
    params: [
      {
        name: 'f',
        type: 'string',
        required: false,
        description: `Space-delimited filters in \`field:"value"\` format.`,
      },
      { name: 'p', type: 'integer', required: false, description: `Page number (default: 1)` },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Search query (technical terms, device descriptions, test methods, etc.)`,
      },
    ],
  },
  {
    name: 'scitemcp_search_clinical_trials',
    description: `Search clinical trials from the scite clinical trials database (ClinicalTrials.gov).

Use this tool to find clinical trials related to diseases, interventions, sponsors, or research topics. Returns trials
with titles, brief descriptions, sponsors, facilities, conditions, interventions, phase, and dates. Highlighted
\`<strong>...</strong>\` snippets indicate which fields matched the query.

**Parameters:**
- q: Search query string (keywords, condition, intervention, sponsor, NCT id, etc.)
- f: Space-delimited filters in \`field:"value"\` format (e.g. \`conditions:"Cancer" trialState.phase:"Phase III"\`)
- p: Page number (default: 1)
- s: Sort field (default: _relevance). Options:
  - _relevance: relevance score (sortDir ignored)
  - dates.startDate: trial start date
  - dates.completedDate: trial completed date
  - dates.lastUpdatedDate: last update date
- sortDir: Sort direction, asc or desc (default: desc). Ignored when s is _relevance.

**Returns:** Clinical trials with nctId, title, briefDescription, phase, sponsors, facilities, conditions,
interventions, tags, startDate, completedDate, and publicationCount.`,
    params: [
      {
        name: 'f',
        type: 'string',
        required: false,
        description: `Space-delimited filters in \`field:"value"\` format. Example: 'conditions:"Cancer" trialState.phase:"Phase III"'`,
      },
      { name: 'p', type: 'integer', required: false, description: `Page number (default: 1)` },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Search query (keywords, condition, intervention, sponsor, NCT id, etc.)`,
      },
      {
        name: 's',
        type: 'string',
        required: false,
        description: `Sort field (default: _relevance)`,
      },
      {
        name: 'sortDir',
        type: 'string',
        required: false,
        description: `Sort direction (default: desc). Ignored when s is _relevance.`,
      },
    ],
  },
  {
    name: 'scitemcp_search_collections',
    description: `List the Collections the signed-in user can access, with an optional name filter.

Returns Collections the user owns, is shared on, or that are shared with their organization. Pass \`q\` to filter by a
case-insensitive substring of the Collection name. This is a filter over the caller's own Collections, not a full-text
search of all Collections.

**Parameters:**
- q: Optional case-insensitive name substring to filter by.

**Returns:** \`{collections: [...], total: N}\` where each Collection has id, slug, name, accessType, and DOI counts.`,
    params: [
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Optional case-insensitive name substring filter`,
      },
    ],
  },
  {
    name: 'scitemcp_search_device510k',
    description: `Search FDA 510(k) premarket notification clearances from the scite device database.

Use this tool to find medical device clearances by device name, product code, applicant, clearance type, or K number.
Returns clearances with device details, decision info, applicant information, and regulatory classifications.

510(k) is the FDA's premarket notification process -- manufacturers must demonstrate that their device is substantially
equivalent to a legally marketed device before it can be sold.

**Parameters:**
- q: Search query string (device name, product code, applicant, K number, etc.)
- f: Space-delimited filters in \`field:"value"\` format (e.g. \`device.deviceClass:"2" decision.decisionCode:"SESE"\`)
- p: Page number (default: 1)
- s: Sort field (default: _relevance). Options:
  - _relevance: relevance score (sortDir ignored)
  - device.device_class: device risk classification
  - device.date_received: date FDA received the submission
  - decision.decision_date: date of FDA decision
- sortDir: Sort direction, asc or desc (default: desc). Ignored when s is _relevance.

**Returns:** Device 510(k) clearances with kNumber, title, summaryText, device info (name, class, productCode,
clearanceType, regulationNumber), decision info (code, description, date, committee), applicant details, and tags.

**Note:** This tool returns structured clearance metadata only. For the actual narrative content of 510(k) summary
documents (test results, substantial equivalence reasoning, indications for use, performance data), use
\`search_510k_summaries\` instead.`,
    params: [
      {
        name: 'f',
        type: 'string',
        required: false,
        description: `Space-delimited filters in \`field:"value"\` format. Example: 'device.deviceClass:"2" decision.decisionCode:"SESE"'`,
      },
      { name: 'p', type: 'integer', required: false, description: `Page number (default: 1)` },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Search query (device name, product code, applicant, K number, etc.)`,
      },
      {
        name: 's',
        type: 'string',
        required: false,
        description: `Sort field (default: _relevance)`,
      },
      {
        name: 'sortDir',
        type: 'string',
        required: false,
        description: `Sort direction (default: desc). Ignored when s is _relevance.`,
      },
    ],
  },
  {
    name: 'scitemcp_search_drugs',
    description: `Search FDA drug records: Structured Product Labels, the Orange Book, and Drugs@FDA.

Each result bundles an FDA drug application (approved products, applicant, approval dates, marketing status)
with its Structured Product Label (indications, warnings, pharmacology, etc.). Use this to find approved drugs
by name, active substance, manufacturer, pharmacologic class, or indication.

**Parameters:**
- q: Search query (brand name, generic name, active substance, indication, etc.)
- f: Space-delimited filters in \`field:"value"\` format. Facet fields: labels.brand_name, labels.generic_name,
  labels.substance_name, labels.manufacturer_name, labels.product_type, labels.route, labels.pharm_class_epc,
  labels.pharm_class_moa, labels.pharm_class_cs, labels.rxcui, labels.unii, labels.product_ndc, labels.package_ndc,
  application.application_number, application.sponsor_name, application.products.marketing_status,
  application.products.dosage_form, application.products.route, application.products.product_type,
  application.products.te_code, tags, categories. Date range: use labels.effective_time or
  application.products.approval_date with gte/lt suffix (e.g. labels.effective_timegte:"2024-01-01").
- p: Page number (default: 1)

**Returns:** Drug records, each bundling an FDA application (approved products, applicant, approval dates, marketing
status) with its Structured Product Label (indications, warnings, pharmacology). Sorted by relevance only.`,
    params: [
      {
        name: 'f',
        type: 'string',
        required: false,
        description: `Space-delimited filters in \`field:"value"\` format. Facet fields: labels.brand_name, labels.generic_name, labels.substance_name, labels.manufacturer_name, labels.product_type, labels.route, labels.pharm_class_epc, labels.pharm_class_moa, labels.pharm_class_cs, labels.rxcui, labels.unii, labels.product_ndc, labels.package_ndc, application.application_number, application.sponsor_name, application.products.marketing_status, application.products.dosage_form, application.products.route, application.products.product_type, application.products.te_code, tags, categories. Date range: use labels.effective_time or application.products.approval_date with gte/lt suffix (e.g. labels.effective_timegte:"2024-01-01").`,
      },
      { name: 'p', type: 'integer', required: false, description: `Page number (default: 1)` },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Search query (brand name, generic name, active substance, indication, etc.)`,
      },
    ],
  },
  {
    name: 'scitemcp_search_faers',
    description: `Search FDA FAERS (FDA Adverse Event Reporting System) drug adverse event reports.

Use this tool to find adverse event and medication error reports submitted to the FDA for drugs and therapeutic
biologics. Each report links one or more suspect/concomitant drugs to the patient reactions that were observed.
Returns reports with the drugs involved, patient reactions (MedDRA preferred terms), seriousness, and report metadata.

**Parameters:**
- q: Search query string (drug brand or generic name, active substance, reaction term, etc.)
- f: Space-delimited filters in \`field:"value"\` format
  - Facet filters:
    - \`drug.medicinalproduct\` -- reported drug name (e.g. "IBUPROFEN")
    - \`drug.brand_name\` / \`drug.generic_name\` / \`drug.substance_name\` -- product names
    - \`drug.manufacturer_name\` -- manufacturer/labeler
    - \`drug.drugindication\` -- reported reason for use (e.g. "Pain")
    - \`drug.pharm_class_epc\` / \`drug.pharm_class_moa\` -- pharmacologic class
    - \`reaction.reactionmeddrapt\` -- patient reaction MedDRA term (e.g. "Nausea")
    - \`reaction.reactionoutcome\` -- reaction outcome (e.g. "Recovered/Resolved", "Fatal")
    - \`event.reporttype\` -- report type (e.g. "Spontaneous")
    - \`event.seriousness_type\` -- seriousness category (e.g. "Death", "Hospitalization")
    - \`event.occurcountry\` -- country where the event occurred
    - \`event.patientsex\` -- patient sex
    - \`primarysource.qualification\` -- reporter type (e.g. "Physician", "Consumer")
  - Date range filters on \`event.receivedate\`, \`event.receiptdate\`, \`drug.drugstartdate\`, \`drug.drugenddate\`:
    - Suffix notation: append \`gte\` (>=) or \`lt\` (<) to the field name.
      Example for H1 2024: \`event.receivedategte:"2024-01-01" event.receivedatelt:"2024-07-01"\`
- p: Page number (default: 1)

**Returns:** FAERS reports with safetyReportId, title, reportType, serious flag, seriousnessType, receiveDate,
occurCountry, reactions (reaction term + outcome), and drugs (medicinalProduct, brandName, genericName,
substanceName, indication, actionDrug, route, pharmacologic class). FAERS sorts by relevance only.`,
    params: [
      {
        name: 'f',
        type: 'string',
        required: false,
        description: `Space-delimited filters in \`field:"value"\` format. Facet fields: drug.medicinalproduct, drug.brand_name, drug.generic_name, drug.substance_name, drug.manufacturer_name, drug.drugindication, drug.pharm_class_epc, drug.pharm_class_moa, reaction.reactionmeddrapt, reaction.reactionoutcome, event.reporttype, event.seriousness_type, event.occurcountry, event.patientsex, primarysource.qualification, primarysource.reportercountry. Date range: use event.receivedate, event.receiptdate, drug.drugstartdate, or drug.drugenddate with gte/lt suffix (e.g. event.receivedategte:"2024-01-01" event.receivedatelt:"2024-07-01").`,
      },
      { name: 'p', type: 'integer', required: false, description: `Page number (default: 1)` },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Search query (drug name, active substance, reaction term, etc.)`,
      },
    ],
  },
  {
    name: 'scitemcp_search_grants',
    description: `Search research grants from the scite grants database (NIH RePORTER, NSF, SBIR/STTR, Wellcome, EU, and more).

Use this tool to find grants by research topic, PI, organization, agency, or funding keywords. Returns grants with
title, a short abstract preview, agency, organization, PI, country, dates, awardAmount, tags, and externalLink.
Highlighted \`<strong>...</strong>\` fragments indicate which fields matched the query.

**Grouping.** Resolute groups related grants under one shared slug (e.g. NIH subprojects of one center grant, or
renewals of the same award). Each search result returns **only one representative grant** per group. \`grantsInGroup\`
tells you how many total grants exist in the group; \`siblingGrantIds\` (when present) lists the other grant ids in the
group. To pull the full record for a specific sibling, call \`get_grant\` with its id — do not re-search.

**Abstract in search is a ~300-char highlighted preview, not the full text.** Call \`get_grant\` when you need the full
abstract (often 1-3 KB) or source-specific identifiers (\`awardYear\`, \`agencyTrackingNumber\`, \`contract\`,
\`nihProgramCode\`, \`nihrApplicationId\`). If the search result already contains the fields you need, do not call
\`get_grant\`.

**Parameters:**
- q: Search query string (keywords, PI name, organization, agency, etc.)
- f: Space-delimited filters in \`field:"value"\` format (e.g. \`agency:"NIH" country:"United States"\`)
- p: Page number (default: 1)
- s: Sort field (default: _relevance). Options:
  - _relevance: relevance score (sortDir ignored)
  - awardStartDate: grant start date
  - awardCloseDate: grant close date
  - awardNoticeDate: grant notice date
  - awardAmount: total award amount
  - employeeCount: PI employee count
- sortDir: Sort direction, asc or desc (default: desc). Ignored when s is _relevance.

**Returns:** Grants with id, title, abstract snippet, agency, organization, piName, country, award dates, awardAmount,
tags, groupSlug, and grantsInGroup.`,
    params: [
      {
        name: 'f',
        type: 'string',
        required: false,
        description: `Space-delimited filters in \`field:"value"\` format. Example: 'agency:"NIH" country:"United States"'`,
      },
      { name: 'p', type: 'integer', required: false, description: `Page number (default: 1)` },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Search query (keywords, PI name, organization, agency, etc.)`,
      },
      {
        name: 's',
        type: 'string',
        required: false,
        description: `Sort field (default: _relevance)`,
      },
      {
        name: 'sortDir',
        type: 'string',
        required: false,
        description: `Sort direction (default: desc). Ignored when s is _relevance.`,
      },
    ],
  },
  {
    name: 'scitemcp_search_literature',
    description: `Search scientific literature and read full-text content from peer-reviewed papers.

Use \`dois\` (preferred) or \`titles\` with targeted \`term\` queries to extract full-text passages from specific papers. Each call returns up to 5 relevant excerpts (~500 chars each) — vary search terms across calls to read through a paper section by section.

**IMPORTANT — keep \`limit\` small.** Use \`limit: 10-50\` with \`offset\` for pagination. Large limits with full citations and excerpts produce very large payloads that consume significant LLM context.

**Calling with no parameters browses the corpus** (210M+ papers, relevance-sorted). This is allowed for broad exploration but rarely what you want — pass \`term\`, \`dois\`, \`titles\`, or other filters for targeted results.

**What This Tool Returns:**

- Paper metadata: title, authors (first 3), abstract, DOI, journal, year, volume, issue, page
- \`fulltextExcerpts\`: up to 5 passages (~500 chars) from the paper matching your query (OA only)
- \`access\`: resolved access link with source, type (open/institutional/purchase), content type, and pricing
- \`citations\`: Smart Citation statements — actual quoted text from citing papers, classified as supporting/contrasting/mentioning/unclassified (unclassified = statement present but classifier hasn't assigned a type)
- \`tally\`: citation metrics (total, supporting, contrasting, mentioning, citing publications)
- \`editorialNotices\`: editorial notices (retraction, correction, concern, erratum), each with status, noticeDoi, date
- \`isOa\`, \`oaStatus\`, \`license\`: open access information

**Fetching Paper Metadata (no search term needed):**

Pass \`dois\` or \`titles\` WITHOUT a \`term\` to retrieve metadata for specific papers.
Example: \`dois: ["10.1038/s41586-020-2012-7"]\`

**Full-Text Excerpts:**

For OA papers, \`fulltextExcerpts\` contains passages matching your query. If empty, the full text is not indexed or terms didn't match — use the \`access\` field for the best link to the PDF or full text.

**Smart Citations ARE Full-Text Evidence:**

- \`snippet\`: exact sentence/paragraph from the citing paper's full text
- \`type\`: classification (supporting, contrasting, mentioning, unclassified)
- \`section\`: paper section (Introduction, Methods, Results, Discussion)
- \`sourceDoi\`: paper containing this snippet; \`targetDoi\`: paper being cited

**Search Capabilities:**

- Boolean operators: AND, OR, NOT
- Phrase search: "exact phrase"
- Proximity: "term1 term2"~5
- Field filters: title, abstract, author, journal, year, affiliation
- Citation filters: supporting_from/to, contrasting_from/to, mentioning_from/to
- Editorial filters: has_retraction, has_concern, has_correction, has_erratum

**Parameters:**
- \`term\`: cross-field search query (optional when \`dois\`/\`titles\` provided)
- \`dois\`: array of DOIs to filter to specific papers
- \`titles\`: array of titles to filter (use when DOIs unavailable)
- \`limit\`: max results (default: 10, max: 1000)
- \`offset\`: pagination offset
- Plus 20+ filter parameters (see schema)

**Response Format:**

\`\`\`json
{
  "hits": [{
    "doi": "10.1234/example",
    "title": "Paper Title",
    "authors": [{"authorName": "Jane Smith"}],
    "abstract": "Full abstract text...",
    "year": 2023,
    "journal": "Nature",
    "tally": {"supporting": 32, "contrasting": 8, "mentioning": 5},
    "fulltextExcerpts": ["Relevant passage..."],
    "access": {"url": "https://...", "accessType": "open", "contentType": "pdf"},
    "citations": [{"snippet": "These findings...", "type": "supporting", "section": "Results"}],
    "editorialNotices": [{"status": "retracted", "noticeDoi": "10.1234/notice", "date": "2021"}]
  }]
}
\`\`\``,
    params: [
      {
        name: 'abstract',
        type: 'string',
        required: false,
        description: `Filter by text in publication abstract. Example: 'neural networks'`,
      },
      {
        name: 'affiliation',
        type: 'string',
        required: false,
        description: `Filter by author institutional affiliation. Example: 'Stanford University' or 'MIT'`,
      },
      {
        name: 'author',
        type: 'string',
        required: false,
        description: `Filter by author name. Partial names work. Example: 'Einstein' or 'Albert Einstein'`,
      },
      {
        name: 'citing_publications_from',
        type: 'integer',
        required: false,
        description: `Minimum number of total citing publications (traditional citation count)`,
      },
      {
        name: 'citing_publications_to',
        type: 'integer',
        required: false,
        description: `Maximum number of total citing publications (traditional citation count)`,
      },
      {
        name: 'collection_slug',
        type: 'string',
        required: false,
        description: `Restrict the search to the papers in one of the user's Collections (a saved, named set of papers). Pass the Collection slug from \`create_collection\` or \`search_collections\`. Combine with \`term\` and other filters to search within that Collection.`,
      },
      {
        name: 'contrasting_from',
        type: 'integer',
        required: false,
        description: `Minimum number of contrasting Smart Citations. Example: 5 = papers with at least 5 contrasting citations`,
      },
      {
        name: 'contrasting_to',
        type: 'integer',
        required: false,
        description: `Maximum number of contrasting Smart Citations. Example: 20 = papers with up to 20 contrasting citations`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Filter papers published from this date onwards. Format: YYYY-MM-DD or YYYY. Example: '2015-01-01' or '2015'`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `Filter papers published up to this date. Format: YYYY-MM-DD or YYYY. Example: '2023-12-31' or '2023'`,
      },
      {
        name: 'dois',
        type: 'array',
        required: false,
        description: `Filter results to specific DOIs. Use WITHOUT \`term\` to fetch paper metadata (title, abstract, citations, access URL). Use WITH \`term\` to search within those papers for full-text excerpts. Prefer DOIs over titles as they are exact matches. Example: ['10.1038/s41586-020-2649-2'].`,
      },
      {
        name: 'has_concern',
        type: 'boolean',
        required: false,
        description: `Filter papers with editorial concerns. true = papers with concerns`,
      },
      {
        name: 'has_correction',
        type: 'boolean',
        required: false,
        description: `Filter papers with corrections. true = papers with published corrections`,
      },
      {
        name: 'has_erratum',
        type: 'boolean',
        required: false,
        description: `Filter papers with errata. true = papers with published errata`,
      },
      {
        name: 'has_retraction',
        type: 'boolean',
        required: false,
        description: `Filter papers with retraction notices. true = retracted papers only`,
      },
      {
        name: 'has_tally',
        type: 'boolean',
        required: false,
        description: `Filter papers with Smart Citations (tally > 0). true = papers that have been cited with context`,
      },
      {
        name: 'journal',
        type: 'string',
        required: false,
        description: `Filter by journal name. Example: 'Nature' or 'Science'`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return. Default: 10, Maximum: 1000. For better performance, use smaller limits (10-50) and pagination.`,
      },
      {
        name: 'mentioning_from',
        type: 'integer',
        required: false,
        description: `Minimum number of mentioning Smart Citations. Example: 50 = papers with at least 50 mentioning citations`,
      },
      {
        name: 'mentioning_to',
        type: 'integer',
        required: false,
        description: `Maximum number of mentioning Smart Citations`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Pagination offset for result sets. Use with limit for pagination. Example: offset=20, limit=10 returns results 21-30.`,
      },
      {
        name: 'paper_type',
        type: 'string',
        required: false,
        description: `Filter by publication type. Examples: 'Article', 'Review', 'Clinical Trial', 'Meta-Analysis', 'Case Report'`,
      },
      {
        name: 'publisher',
        type: 'string',
        required: false,
        description: `Filter by publisher name. Example: 'Elsevier' or 'Springer'`,
      },
      {
        name: 'supporting_from',
        type: 'integer',
        required: false,
        description: `Minimum number of supporting Smart Citations. Example: 10 = papers with at least 10 supporting citations`,
      },
      {
        name: 'supporting_to',
        type: 'integer',
        required: false,
        description: `Maximum number of supporting Smart Citations. Example: 100 = papers with up to 100 supporting citations`,
      },
      {
        name: 'term',
        type: 'string',
        required: false,
        description: `Cross-field search query. Optional when \`dois\` or \`titles\` is provided (omit to fetch metadata only). IMPORTANT: Use domain-specific technical terms, not broad phrases — the index covers all academic fields so ambiguous terms return irrelevant results. Supports Boolean operators (AND, OR, NOT), phrase search ("exact phrase"), proximity search ("term1 term2"~5). Searches across title, abstract, and full-text. Example: "PAC learning" AND "generalization bounds" AND "neural networks"`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Filter by text in publication title. Example: 'climate change'`,
      },
      {
        name: 'titles',
        type: 'array',
        required: false,
        description: `Filter results to papers matching these titles. Use WITHOUT \`term\` to fetch paper metadata, or WITH \`term\` to search within those papers. Use when DOIs are not available — prefer \`dois\` when possible. Example: ['Attention is all you need'].`,
      },
      {
        name: 'topic',
        type: 'string',
        required: false,
        description: `Filter by research topic/subject area. Example: 'Oncology' or 'Neuroscience'`,
      },
      {
        name: 'year',
        type: 'integer',
        required: false,
        description: `Filter by specific publication year. Example: 2020. Cannot be combined with date_from/date_to.`,
      },
    ],
  },
  {
    name: 'scitemcp_search_maude',
    description: `Search FDA MAUDE (Manufacturer and User Facility Device Experience) adverse event reports.

Use this tool to find medical device adverse event reports, including device malfunctions, patient injuries, and deaths
reported to the FDA. Returns reports with device information, event descriptions, patient problems, and narrative text
snippets.

**Parameters:**
- q: Search query string (device name, manufacturer, event description, product code, etc.)
- f: Space-delimited filters in \`field:"value"\` format
  - Facet filters:
    - \`event_type\` -- Injury, Death, Malfunction, Other, No answer provided
    - \`device.device_class\` -- device risk class: 1, 2, or 3
    - \`device.manufacturer_d_name\` -- manufacturer (e.g. "Medtronic")
    - \`device.device_report_product_code\` -- FDA product code (e.g. "DTB")
    - \`device.regulation_number\` -- regulation number (e.g. "870.3680")
    - \`report_source_code\` -- Voluntary report, Manufacturer report, etc.
    - \`product_problems\` -- reported device problems (e.g. "High Capture Threshold")
    - \`patient.problems\` -- patient problems (e.g. "Death", "Atrial Fibrillation")
  - Date range filters on \`date_received\` or \`date_report\`:
    - Suffix notation: append \`gte\` (>=) or \`lt\` (<) to the field name.
      Example for H1 2024: \`date_receivedgte:"2024-01-01" date_receivedlt:"2024-07-01"\`
    - Comma notation: \`date_received:"2024-01-01,2024-07-01"\` (gte,lt)
- p: Page number (default: 1)
- s: Sort field (default: _relevance). Options:
  - _relevance: relevance score (sortDir ignored)
  - date_received: date FDA received the report
  - date_report: date of the original report
- sortDir: Sort direction, asc or desc (default: desc). Ignored when s is _relevance.

**Returns:** MAUDE reports with id, title, reportNumber, eventType, adverseEventFlag, productProblems, device info
(brandName, genericName, manufacturer, deviceClass, productCode, modelNumber), patientProblems, dates, and narrative
text snippets.`,
    params: [
      {
        name: 'f',
        type: 'string',
        required: false,
        description: `Space-delimited filters in \`field:"value"\` format. Facet fields: event_type, device.device_class, device.manufacturer_d_name, device.device_report_product_code, device.regulation_number, report_source_code, product_problems, patient.problems. Date range: use date_received or date_report with gte/lt suffix (e.g. date_receivedgte:"2024-01-01" date_receivedlt:"2024-07-01") or comma notation (e.g. date_received:"2024-01-01,2024-07-01").`,
      },
      { name: 'p', type: 'integer', required: false, description: `Page number (default: 1)` },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Search query (device name, manufacturer, event description, product code, etc.)`,
      },
      {
        name: 's',
        type: 'string',
        required: false,
        description: `Sort field (default: _relevance)`,
      },
      {
        name: 'sortDir',
        type: 'string',
        required: false,
        description: `Sort direction (default: desc). Ignored when s is _relevance.`,
      },
    ],
  },
  {
    name: 'scitemcp_search_mhra',
    description: `Search MHRA (Medicines and Healthcare products Regulatory Agency) safety alerts and publications.

This dataset contains full-text content from MHRA drug safety alerts, medical device alerts, field safety notices, and
regulatory publications. Search covers headlines, descriptions, and page-level document content.

Use this tool when the question involves UK drug safety communications, MHRA medical device alerts, field safety
notices, drug recalls, or MHRA regulatory guidance.

**Parameters:**
- q: Search query (drug names, device types, safety issues, alert topics, etc.)
- f: Space-delimited filters in \`field:"value"\` format.
  - Facet filters: \`ontology.tags\`, \`ontology.categories\`, \`domain\`
  - Date range filters on \`attachments.file.createdAt\` or \`attachments.file.modifiedAt\`:
    - Suffix notation: append \`gte\` (>=) or \`lt\` (<) to the field name.
      Example for Q4 2025: \`attachments.file.createdAtgte:"2025-10-01" attachments.file.createdAtlt:"2026-01-01"\`
    - Comma notation: \`attachments.file.createdAt:"2025-10-01,2026-01-01"\` (gte,lt)
    - Accepted date formats: YYYY-MM-DD, YYYY-MM-DDTHH:MM:SS, YYYY-MM-DDTHH:MM:SS+ZZZZ, or epoch milliseconds.
- p: Page number (default: 1)

**Example queries:**
- Immunosuppressant alerts in Q4 2025: q="immunosuppressant", f='attachments.file.createdAtgte:"2025-10-01" attachments.file.createdAtlt:"2026-01-01"'
- All drug safety updates since March 2025: q="drug safety update", f='attachments.file.createdAtgte:"2025-03-01"'
- Medical device alerts from gov.uk: q="medical device alert", f='domain:"gov.uk"'

**Returns:** Alerts with id, headline, description, tags, categories, date, and page-level content snippets showing
where the query matched.`,
    params: [
      {
        name: 'f',
        type: 'string',
        required: false,
        description: `Space-delimited filters in \`field:"value"\` format. Facet fields: ontology.tags, ontology.categories, domain. Date range: use attachments.file.createdAt or attachments.file.modifiedAt with gte/lt suffix (e.g. attachments.file.createdAtgte:"2025-10-01" attachments.file.createdAtlt:"2026-01-01") or comma notation (e.g. attachments.file.createdAt:"2025-10-01,2026-01-01"). Accepts YYYY-MM-DD, ISO datetime, or epoch millis.`,
      },
      { name: 'p', type: 'integer', required: false, description: `Page number (default: 1)` },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Search query (drug names, device types, safety issues, etc.)`,
      },
    ],
  },
  {
    name: 'scitemcp_search_patents',
    description: `Search patent families from the scite patents database.

Use this tool to find patents related to scientific research topics. Returns patent families with titles, abstracts,
inventors, assignees, filing status, and citation counts.

**Parameters:**
- q: Search query string (keywords, inventor name, assignee, etc.)
- f: Space-delimited filters in key:value format (e.g. "assignee:Pfizer filing_status:granted")
- p: Page number (default: 1)
- s: Sort field (default: _relevance). Options:
  - _relevance: relevance score (sortDir ignored)
  - forwardCitationCount: number of forward citations
  - familySize: number of patents in the family
  - patents.publications.pubRef.date: publication date
  - patents.appRef.filingDate: application filing date
- sortDir: Sort direction, asc or desc (default: desc). Ignored when s is _relevance.

**Returns:** Patent families with metadata including title, abstract, inventors, assignees, classifications, and publication references.`,
    params: [
      {
        name: 'f',
        type: 'string',
        required: false,
        description: `Space-delimited filters in key:value format. Example: 'assignee:Pfizer filing_status:granted'`,
      },
      { name: 'p', type: 'integer', required: false, description: `Page number (default: 1)` },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Search query (keywords, inventor, assignee, CPC code, etc.)`,
      },
      {
        name: 's',
        type: 'string',
        required: false,
        description: `Sort field (default: _relevance)`,
      },
      {
        name: 'sortDir',
        type: 'string',
        required: false,
        description: `Sort direction (default: desc). Ignored when s is _relevance.`,
      },
    ],
  },
  {
    name: 'scitemcp_update_collection',
    description: `Update a DOI-list Collection the signed-in user can edit.

Partial update: only the fields you supply change; omitted fields keep their current values. Omitting \`dois\` leaves the
DOI list untouched; supplying \`dois\` replaces it (unknown DOIs are dropped and surfaced via \`unmatchedDoiCount\`). Requires
EDITOR or ADMIN access. Only DOI-list Collections can be updated here — saved-search Collections are managed in the scite web app.

**Parameters:**
- slug: The Collection slug (required).
- name: New name (optional).
- description: New description (optional).
- dois: Replacement DOI list (optional; omit to leave DOIs unchanged).
- is_public: New public flag (optional).

**Returns:** The updated Collection with id, slug, name, accessType, and DOI counts.`,
    params: [
      { name: 'slug', type: 'string', required: true, description: `The Collection slug` },
      { name: 'description', type: 'string', required: false, description: `New description` },
      {
        name: 'dois',
        type: 'array',
        required: false,
        description: `Replacement DOI list (omit to leave DOIs unchanged), e.g. ['10.1038/s41586-020-2649-2']`,
      },
      {
        name: 'is_public',
        type: 'boolean',
        required: false,
        description: `If true, anyone with the slug can view`,
      },
      { name: 'name', type: 'string', required: false, description: `New Collection name` },
    ],
  },
]
