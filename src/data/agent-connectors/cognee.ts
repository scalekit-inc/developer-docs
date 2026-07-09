import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'cognee_forget',
    description: `Forget stored data by permanently deleting an entire dataset from Cognee memory, including its data items and the knowledge graph built from them. This action cannot be undone.`,
    params: [
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `The UUID of the dataset to delete. Look up dataset IDs via the list-datasets endpoint (GET /api/v1/datasets).`,
      },
    ],
  },
  {
    name: 'cognee_improve',
    description: `Improve stored memory by running Cognee's cognify step over one or more datasets. This re-processes ingested data to enrich and consolidate the knowledge graph with entities and relationships, sharpening later recall.`,
    params: [
      {
        name: 'datasetIds',
        type: 'array',
        required: false,
        description: `JSON array of dataset UUIDs to process. Required for datasets shared with you. Takes precedence over the datasets name list when both are provided.`,
      },
      {
        name: 'datasets',
        type: 'array',
        required: false,
        description: `JSON array of dataset names to process. Resolved against datasets owned by the authenticated user. Defaults to ['main_dataset'] when omitted.`,
      },
      {
        name: 'runInBackground',
        type: 'boolean',
        required: false,
        description: `If true, the request returns immediately while the graph builds server-side. If false (default), the request blocks until the knowledge graph is fully built, which can take minutes for large datasets.`,
      },
    ],
  },
  {
    name: 'cognee_recall',
    description: `Recall data previously saved to Cognee memory. Runs a semantic search over the knowledge graph and returns an answer or matching context. Use searchType to control the retrieval strategy.`,
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
        description: `JSON array of dataset names to search. Names resolve only to datasets owned by the caller. Leave empty to search all accessible datasets.`,
      },
      {
        name: 'nodeName',
        type: 'array',
        required: false,
        description: `JSON array of node-set tags to restrict results to (the node_set values used when the data was remembered).`,
      },
      {
        name: 'searchType',
        type: 'string',
        required: false,
        description: `Retrieval strategy. GRAPH_COMPLETION (default) returns graph context plus an LLM answer. RAG_COMPLETION uses classic retrieval-augmented generation. CHUNKS and SUMMARIES return raw matching content. FEELING_LUCKY auto-selects a strategy.`,
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
    name: 'cognee_remember',
    description: `Save data to Cognee memory. Ingests the provided content into a dataset and builds a knowledge graph from it in a single operation, so it can be recalled later with semantic search. Creates the dataset if it does not already exist.`,
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
]
