import type { AstroIntegration } from 'astro'
import { createMarkdownFromOpenApi } from '@scalar/openapi-to-markdown'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export default function openapiToMarkdown(): AstroIntegration {
  return {
    name: 'openapi-to-markdown',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const specPath = path.resolve('public/api/scalekit.scalar.json')
        const distPath = fileURLToPath(dir)
        const outputPath = path.join(distPath, 'apis.md')
        let spec: ReturnType<typeof JSON.parse> | undefined
        let markdown: string | undefined
        try {
          spec = JSON.parse(fs.readFileSync(specPath, 'utf8'))
          markdown = await createMarkdownFromOpenApi(spec)
          fs.writeFileSync(outputPath, markdown)
          console.log(`\nGenerated apis.md (${(markdown.length / 1024).toFixed(1)} KB)`)
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error)
          console.error(
            `openapi-to-markdown: astro:build:done failed — specPath=${specPath} outputPath=${outputPath} specLoaded=${spec !== undefined} markdownGenerated=${markdown !== undefined} — ${message}`,
            error,
          )
          throw error
        }
      },
    },
  }
}
