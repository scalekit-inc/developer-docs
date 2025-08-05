import { createLlmsRoute } from '../utils/llms'

// Re-export the generic LLMs route with configuration for the **full** variant.
export const GET = createLlmsRoute({
  title: 'Scalekit Full Documentation',
  description:
    'Complete developer documentation for Scalekit, generated automatically from source files.',
  // Include all sections by default (empty sections array = all)
  sections: [],
  exclude: ['apis/**/*'], // exclude auto-generated API reference pages
  // Use Repomix to get better processing with LLM instructions
  useRepomix: true,
  repomixOptions: {
    instructionFilePath: 'scripts/manual/LLM_INSTRUCTIONS.md',
  },
})
