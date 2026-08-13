import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'cognee_check_status',
    description: `Check the processing status of Cognee datasets' pipelines. Use this to track an Improve run started with runInBackground=true, or to confirm ingestion/graph-building has completed before recalling.`,
    params: [
      {
        name: 'dataset',
        type: 'array',
        required: false,
        description: `JSON array of dataset UUIDs to check (from List datasets). Omit to get status for all datasets you can read.`,
      },
      {
        name: 'pipeline',
        type: 'array',
        required: false,
        description: `JSON array of pipeline names to check: 'add_pipeline' or 'cognify_pipeline'. Omit to default to cognify_pipeline.`,
      },
    ],
  },
  {
    name: 'cognee_create_dataset',
    description: `Create a new, empty Cognee dataset by name. Returns the dataset's UUID. Datasets are also created automatically by Improve, so use this only when you want to provision a dataset up front.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the dataset to create. If a dataset with this name already exists for the account, the existing one is returned.`,
      },
    ],
  },
  {
    name: 'cognee_dataset_schema_update',
    description: `Store or update the graph schema (entity/relationship type constraints) and/or custom extraction prompt for a dataset. The existing Get dataset schema tool only reads this configuration; this tool writes it. Provide graph_schema, custom_prompt, or both — omitted fields are left unchanged.`,
    params: [
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `UUID of the dataset whose schema to update. Get it from List datasets.`,
      },
      {
        name: 'custom_prompt',
        type: 'string',
        required: false,
        description: `Custom entity-extraction prompt to store for this dataset. Used during Improve/Remember instead of the default prompt.`,
      },
      {
        name: 'graph_schema',
        type: 'object',
        required: false,
        description: `JSON object defining the entity/relationship type constraints (graph schema) to store for this dataset.`,
      },
    ],
  },
  {
    name: 'cognee_forget',
    description: `Forget stored data in Cognee memory. Deletes a dataset (by name or UUID), a single data item, or the memory graph of a dataset. This action is permanent and cannot be undone. Provide either dataset or datasetId; set everything only to wipe all datasets.`,
    params: [
      {
        name: 'dataId',
        type: 'string',
        required: false,
        description: `UUID of a single data item to remove from a dataset. Requires datasetId.`,
      },
      {
        name: 'dataset',
        type: 'string',
        required: false,
        description: `Name of the dataset to delete. Provide either this or datasetId. With memoryOnly=true, only the memory graph is cleared and the dataset is kept.`,
      },
      {
        name: 'datasetId',
        type: 'string',
        required: false,
        description: `UUID of the dataset to delete. Alternative to dataset. Also required when deleting a single data item via dataId.`,
      },
      {
        name: 'everything',
        type: 'boolean',
        required: false,
        description: `DANGER: when true, permanently deletes ALL datasets and all memory owned by the account. Use with extreme caution.`,
      },
      {
        name: 'memoryOnly',
        type: 'boolean',
        required: false,
        description: `When true and a dataset is given, delete only the memory graph (graph nodes) while keeping the dataset and its raw data.`,
      },
    ],
  },
  {
    name: 'cognee_get_dataset_data_raw',
    description: `Download the original raw content of a single data item that was ingested into a Cognee dataset. Use List dataset data first to find a data item's ID.`,
    params: [
      {
        name: 'data_id',
        type: 'string',
        required: true,
        description: `UUID of the data item to download. Get it from List dataset data.`,
      },
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `UUID of the dataset that owns the data item. Get it from List datasets.`,
      },
    ],
  },
  {
    name: 'cognee_get_dataset_graph',
    description: `Retrieve the raw knowledge graph structure (nodes and edges) that Improve built for a Cognee dataset. Use this to inspect exactly which entities and relationships were extracted, separate from running a Recall search over them.`,
    params: [
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `UUID of the dataset whose graph structure to retrieve. Get it from List datasets.`,
      },
    ],
  },
  {
    name: 'cognee_get_dataset_schema',
    description: `Retrieve the graph schema configuration (the entity and relationship types recognized when building the knowledge graph) for a Cognee dataset.`,
    params: [
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `UUID of the dataset whose schema to retrieve. Get it from List datasets.`,
      },
    ],
  },
  {
    name: 'cognee_improve',
    description: `Improve stored memory by running Cognee's enrichment pipeline (the 'memify'/cognify step) over a dataset. It re-processes and enriches the knowledge graph with entities and relationships, sharpening later recall. Runs over the existing graph when no data is supplied.`,
    params: [
      {
        name: 'data',
        type: 'string',
        required: false,
        description: `Optional custom text to enrich the graph with. When omitted, the existing knowledge graph is used as the input.`,
      },
      {
        name: 'datasetId',
        type: 'string',
        required: false,
        description: `UUID of the dataset to improve. Alternative to datasetName; required for datasets shared with you.`,
      },
      {
        name: 'datasetName',
        type: 'string',
        required: false,
        description: `Name of the dataset to improve. Resolved against datasets owned by the authenticated user.`,
      },
      {
        name: 'nodeName',
        type: 'array',
        required: false,
        description: `JSON array of node-set tags to scope the enrichment to.`,
      },
      {
        name: 'runInBackground',
        type: 'boolean',
        required: false,
        description: `If true, the request returns immediately while the graph builds server-side. If false (default), the request blocks until enrichment finishes, which can take minutes for large datasets.`,
      },
      {
        name: 'sessionIds',
        type: 'array',
        required: false,
        description: `JSON array of session IDs whose cached memory should be bridged into the permanent graph during this pass.`,
      },
    ],
  },
  {
    name: 'cognee_list_dataset_data',
    description: `List the individual data items stored in a Cognee dataset, with their UUIDs. Use the returned data IDs with Forget to remove a single item, or to inspect what a dataset contains.`,
    params: [
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `UUID of the dataset whose data items to list. Get it from List datasets.`,
      },
    ],
  },
  {
    name: 'cognee_list_datasets',
    description: `List the Cognee datasets accessible to the connected account, with their names and UUIDs. Use this to discover dataset identifiers to pass to Recall, Improve, Forget, or the status check.`,
    params: [],
  },
  {
    name: 'cognee_list_ontologies',
    description: `List the OWL ontology files uploaded to this Cognee account. Ontologies constrain the entity and relationship types extracted when datasets are processed by Improve.`,
    params: [],
  },
  {
    name: 'cognee_ontology_delete',
    description: `Delete an uploaded OWL ontology by its key, exactly as provided at upload time. Use List Ontologies to find available keys.`,
    params: [
      {
        name: 'ontology_key',
        type: 'string',
        required: true,
        description: `Key of the ontology to delete, exactly as provided at upload time.`,
      },
    ],
  },
  {
    name: 'cognee_recall',
    description: `Recall data previously saved to Cognee memory. Runs a semantic search over the knowledge graph (and, optionally, session memory) and returns an answer or matching context. Use searchType to control the retrieval strategy.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The natural-language question or search query to run against stored memory.`,
      },
      {
        name: 'datasets',
        type: 'array',
        required: false,
        description: `JSON array of dataset names to search. Names resolve only to datasets owned by the caller. Omit to search all accessible datasets.`,
      },
      {
        name: 'nodeName',
        type: 'array',
        required: false,
        description: `JSON array of node-set tags to restrict results to (the node_set values used when the data was remembered).`,
      },
      {
        name: 'scope',
        type: 'array',
        required: false,
        description: `JSON array selecting which memory sources to include, e.g. 'graph', 'session', 'triplets'. Omit to use the default graph search.`,
      },
      {
        name: 'searchType',
        type: 'string',
        required: false,
        description: `Retrieval strategy. GRAPH_COMPLETION (default) returns graph context plus an LLM answer. RAG_COMPLETION uses classic retrieval-augmented generation. CHUNKS and SUMMARIES return raw matching content. FEELING_LUCKY auto-selects a strategy.`,
      },
      {
        name: 'sessionId',
        type: 'string',
        required: false,
        description: `Session whose cached memory entries should also be searched. Pair with scope including 'session' to recall data saved with a session_id.`,
      },
      {
        name: 'systemPrompt',
        type: 'string',
        required: false,
        description: `Optional instructions that guide how the answer is generated for completion-type search strategies.`,
      },
      {
        name: 'topK',
        type: 'integer',
        required: false,
        description: `Maximum number of results to consider during retrieval. Defaults to 15.`,
      },
    ],
  },
  {
    name: 'cognee_recall_history',
    description: `Get the authenticated user's history of prior recall (search) queries and results, each with id, text, user, and created_at. Note: verified against the live API — this is a GET on the same path as the existing Recall tool's POST (/api/v1/recall), not a separate /history sub-path; the two are distinguished by HTTP method.`,
    params: [],
  },
  {
    name: 'cognee_remember',
    description: `Save data to Cognee memory. Ingests the provided content into a dataset and builds a knowledge graph from it in a single operation, so it can be recalled later with semantic search. Creates the dataset if it does not already exist. NOTE: Coming soon — Cognee's ingest endpoint (POST /api/v1/remember) uses multipart/form-data, which the Scalekit tool proxy does not yet support (JSON bodies only). Kept internal until multipart proxy support lands; see backend feature request. Until then, use Improve with the data field to add text into a dataset.`,
    params: [
      {
        name: 'data',
        type: 'string',
        required: true,
        description: `The content to remember. Free-form text that Cognee ingests and turns into knowledge-graph memory.`,
      },
      {
        name: 'custom_prompt',
        type: 'string',
        required: false,
        description: `Overrides the default entity-extraction prompt used during graph building. Use it to steer which entities and relationships get extracted. Leave empty for the default.`,
      },
      {
        name: 'datasetName',
        type: 'string',
        required: false,
        description: `Name of the target dataset. Created automatically if it does not exist. Defaults to 'main_dataset'.`,
      },
      {
        name: 'node_set',
        type: 'array',
        required: false,
        description: `JSON array of named node-set tags to attach to the ingested data (e.g. per-agent or per-project groups). Recall can later be restricted to these tags. Leave empty to skip tagging.`,
      },
      {
        name: 'run_in_background',
        type: 'boolean',
        required: false,
        description: `If true, the request returns immediately while ingestion and graph building continue server-side. If false (default), the request blocks until the knowledge graph is fully built, which can take minutes for large inputs.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `Optional session to attribute this memory to (e.g. agent-run-1718000000). When set, the data is stored in the session cache and bridged into the permanent graph in the background. Leave empty for a direct add and build.`,
      },
    ],
  },
  {
    name: 'cognee_remember_entry',
    description: `Store a single typed memory entry directly into the session cache (or, for skill runs, the permanent graph), bypassing the bulk ingest+cognify flow used by Improve/Remember. The entry object must include a 'type' discriminator set to one of: 'qa' (fields: question, answer, context, feedback_text, feedback_score), 'trace' (fields: origin_function, status ['success'|'error'], method_params, method_return_value, memory_query, memory_context, error_message), 'feedback' (fields: qa_id — the entry_id from a prior qa entry — feedback_text, feedback_score), or 'skill_run' (fields: selected_skill_id, task_text, result_summary, success_score [0-1], feedback [-1 to 1], error_type, error_message, started_at_ms, latency_ms, candidate_skill_ids, task_pattern_id, router_version, tool_trace, node_set). session_id is required for qa/trace/feedback entries; skill_run entries can persist with or without one.`,
    params: [
      {
        name: 'entry',
        type: 'object',
        required: true,
        description: `The typed memory entry object. Must include a 'type' key set to 'qa', 'trace', 'feedback', or 'skill_run', plus that type's fields (see tool description for the full field list per type).`,
      },
      {
        name: 'dataset_id',
        type: 'string',
        required: false,
        description: `UUID of an existing writable dataset. Takes precedence over dataset_name and is required to target a dataset shared with you by ID.`,
      },
      {
        name: 'dataset_name',
        type: 'string',
        required: false,
        description: `Target dataset name. Defaults to main_dataset.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `Session this entry belongs to. Required for qa/trace/feedback entries; optional for skill_run entries.`,
      },
      {
        name: 'skill_improvement',
        type: 'object',
        required: false,
        description: `Optional structured feedback for improving a skill, attached alongside a skill_run entry.`,
      },
    ],
  },
  {
    name: 'cognee_skill_ingest',
    description: `Ingest a reusable skill from inline SKILL.md markdown text, without uploading a file. This is the JSON-native companion to the multipart-only Remember endpoint's skills mode (content_type=skills) — it reuses the same skills ingestion pipeline for no-code clients. Either dataset_name or dataset_id must be provided.`,
    params: [
      {
        name: 'skills_text',
        type: 'string',
        required: true,
        description: `Inline SKILL.md markdown content to ingest as a Skill node.`,
      },
      {
        name: 'dataset_id',
        type: 'string',
        required: false,
        description: `Target dataset UUID (alternative to dataset_name).`,
      },
      {
        name: 'dataset_name',
        type: 'string',
        required: false,
        description: `Target dataset name (created if it does not exist). Required unless dataset_id is given.`,
      },
      {
        name: 'skill_name',
        type: 'string',
        required: false,
        description: `Name/slug for the skill. Defaults to 'skill' if omitted.`,
      },
    ],
  },
  {
    name: 'cognee_visualize',
    description: `Generate a human-viewable HTML visualization of a dataset's knowledge graph — an interactive page with nodes and edges — distinct from Get dataset graph, which returns the raw node/edge JSON. By default renders a bounded subgraph around relevant seed nodes (from a semantic query, or the graph's highest-degree nodes); pass full=true to render the entire graph. Note: verified against the live API — this is a GET with query parameters, not a POST as originally listed.`,
    params: [
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `UUID of the dataset to visualize. Get it from List datasets.`,
      },
      {
        name: 'full',
        type: 'boolean',
        required: false,
        description: `Render the entire graph instead of a bounded subgraph around seed nodes.`,
      },
      {
        name: 'max_nodes',
        type: 'integer',
        required: false,
        description: `Hard cap on rendered nodes after neighborhood expansion (1-5000). Defaults to 500.`,
      },
      {
        name: 'neighborhood_depth',
        type: 'integer',
        required: false,
        description: `k-hop neighborhood depth for subgraph expansion around seed nodes (1-10). Defaults to 2.`,
      },
      {
        name: 'neighborhood_seed_top_k',
        type: 'integer',
        required: false,
        description: `Maximum number of seed nodes used to start subgraph expansion (1-100). Defaults to 10.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Query string whose nearest vector-search hits seed the subgraph. Omit to seed from the graph's highest-degree nodes.`,
      },
    ],
  },
]
