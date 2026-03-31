import { AGENT_PLUGIN_VISIBLE_MD, AGENT_DOCS_FOOTER } from '../configs/agent-instructions'
import type { AstroIntegration } from 'astro'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

async function* walkMdFiles(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walkMdFiles(full)
    else if (entry.name.endsWith('.md')) yield full
  }
}

export function injectAgentHeader(): AstroIntegration {
  return {
    name: 'inject-agent-header',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distPath = fileURLToPath(dir)
        let count = 0
        for await (const file of walkMdFiles(distPath)) {
          const content = await readFile(file, 'utf-8')
          // Skip if already injected (idempotent for incremental builds)
          if (content.trimStart().startsWith(AGENT_PLUGIN_VISIBLE_MD.trimStart())) continue
          await writeFile(file, AGENT_PLUGIN_VISIBLE_MD + content + AGENT_DOCS_FOOTER)
          count++
        }
        logger.info(`Injected agent header into ${count} .md files`)
      },
    },
  }
}
