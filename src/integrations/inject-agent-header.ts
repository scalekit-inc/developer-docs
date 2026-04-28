import { AGENT_PLUGIN_VISIBLE_MD, AGENT_DOCS_FOOTER } from '../configs/agent-instructions'
import type { AstroIntegration } from 'astro'
import { access, readdir, readFile, writeFile } from 'node:fs/promises'
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

async function* walkAgentMdFiles(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walkAgentMdFiles(full)
    else if (entry.name.endsWith('.agent.md')) yield full
  }
}

export function injectAgentHeader(): AstroIntegration {
  return {
    name: 'inject-agent-header',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distPath = fileURLToPath(dir)

        // Override .md with .agent.md where both exist.
        // starlight-page-actions copies raw .mdx source as .md but can't render custom
        // components like <ProviderCatalog /> or <ToolList />. The agent-markdown system
        // produces fully rendered .agent.md counterparts — copy those over the raw .md so
        // the public .md URL returns the same high-quality content.
        let overrides = 0
        for await (const agentFile of walkAgentMdFiles(distPath)) {
          const mdFile = agentFile.replace(/\.agent\.md$/, '.md')
          try {
            await access(mdFile)
          } catch (err) {
            if ((err as NodeJS.ErrnoException).code === 'ENOENT') continue
            throw err
          }
          const content = await readFile(agentFile, 'utf-8')
          await writeFile(mdFile, content)
          overrides++
        }
        logger.info(`Overrode ${overrides} .md files with rendered .agent.md content`)

        // Inject the agent plugin discovery header into every .md file that doesn't have it yet.
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
