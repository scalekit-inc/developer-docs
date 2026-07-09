import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
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
  // cognee_remember is intentionally omitted: visibility is "internal" (coming soon).
  // Cognee's ingest endpoint requires multipart/form-data, which the Scalekit tool
  // proxy doesn't support yet (JSON bodies only). Tracked in SK-1178. See the
  // "Remember is coming soon" note on the connector page for the workaround.
]
