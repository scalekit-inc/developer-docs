import { createLlmsRoute } from '../utils/llms.js'

/**
 * Full Scalekit documentation in an LLM-friendly plain-text format.
 * Uses Repomix to package the entire codebase with custom instructions.
 */
export const GET = createLlmsRoute({
  title: 'Scalekit Full Documentation',
  description: 'Complete developer documentation for Scalekit presented in an LLM-friendly format.',
  include: '**/*.mdx,**/*.md',
  instructionFilePath: 'scripts/manual/LLM_INSTRUCTIONS.md',
  style: 'plain',
  // Reduce memory usage for Netlify functions
  repomixOptions: {
    verbose: false,
    progress: false,
  },
})

export const prerender = true
