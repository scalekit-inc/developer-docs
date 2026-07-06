import type { AstroIntegration } from 'astro'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createMarkdownFromOpenApi } from '@scalar/openapi-to-markdown'

interface SpecEntry {
  /** Path to the OpenAPI JSON spec (relative to project root) */
  specPath: string
  /** Output filename (e.g. 'apis.md', 'agentkit/apis.md') */
  outputFile: string
}

const SPECS: SpecEntry[] = [
  { specPath: 'public/api/scalekit.scalar.json', outputFile: 'apis.md' },
  { specPath: 'public/api/agentkit.scalar.json', outputFile: 'agentkit/apis.md' },
  { specPath: 'public/api/saaskit.scalar.json', outputFile: 'saaskit/apis.md' },
]

export default function openapiToMarkdown(): AstroIntegration {
  return {
    name: 'openapi-to-markdown',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const distPath = fileURLToPath(dir)
        const publicPath = path.resolve('public')

        for (const { specPath, outputFile } of SPECS) {
          const fullSpecPath = path.resolve(specPath)
          if (!fs.existsSync(fullSpecPath)) {
            console.warn(`openapi-to-markdown: skipping ${outputFile} — ${specPath} not found`)
            continue
          }

          let spec: ReturnType<typeof JSON.parse> | undefined
          let markdown: string | undefined
          try {
            spec = JSON.parse(fs.readFileSync(fullSpecPath, 'utf8'))
            markdown = await createMarkdownFromOpenApi(spec)

            // Write to dist/ for the current build
            const distOutput = path.join(distPath, outputFile)
            fs.mkdirSync(path.dirname(distOutput), { recursive: true })
            fs.writeFileSync(distOutput, markdown)

            // Write to public/ so the file is a static asset on subsequent builds
            // and is always served by the CDN without hitting SSR
            const publicOutput = path.join(publicPath, outputFile)
            fs.mkdirSync(path.dirname(publicOutput), { recursive: true })
            fs.writeFileSync(publicOutput, markdown)

            console.log(`Generated ${outputFile} (${(markdown.length / 1024).toFixed(1)} KB)`)
          } catch (error) {
            const message = error instanceof Error ? error.message : String(error)
            console.error(
              `openapi-to-markdown: failed to generate ${outputFile} — specPath=${fullSpecPath} specLoaded=${spec !== undefined} markdownGenerated=${markdown !== undefined} — ${message}`,
              error,
            )
            throw error
          }
        }
      },
    },
  }
}
