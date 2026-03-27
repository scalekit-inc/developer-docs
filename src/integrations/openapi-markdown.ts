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
        const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'))
        const markdown = await createMarkdownFromOpenApi(spec)
        const distPath = fileURLToPath(dir)
        const outputPath = path.join(distPath, 'apis.md')
        fs.writeFileSync(outputPath, markdown)
        console.log(`\nGenerated apis.md (${(markdown.length / 1024).toFixed(1)} KB)`)
      },
    },
  }
}
