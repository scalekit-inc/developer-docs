import { join } from 'path'
import { readFile, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import { runCli, type CliOptions } from 'repomix'
import type { APIRoute } from 'astro'

export interface LlmsConfig {
  title: string
  description?: string
  include?: string
  instructionFilePath?: string
  style?: 'plain' | 'markdown' | 'xml'
  repomixOptions?: Record<string, unknown>
}

export function createLlmsRoute(config: LlmsConfig): APIRoute {
  return async function GET() {
    const projectRoot = process.cwd()
    const tempOutputFile = join(projectRoot, `repomix-temp-${Date.now()}.txt`)

    try {
      const docsPath = join(projectRoot, 'src/content/docs')

      let headerText = `# ${config.title}\n\n`
      if (config.description) {
        headerText += `> ${config.description}\n\n`
      }

      // Configure Repomix options using the library API
      const options: CliOptions = {
        output: tempOutputFile,
        style: config.style || 'plain',
        include: config.include || '**/*.mdx,**/*.md, scalekit.swagger.json',
        compress: true,
        directoryStructure: false,
        headerText,
        security: {
          enableSecurityCheck: false, // Disable security check for docs
        },
        quiet: true,
        ...config.repomixOptions,
      }

      if (config.instructionFilePath) {
        options.instructionFilePath = join(projectRoot, config.instructionFilePath)
      }

      // Use runCli from the Repomix library
      const result = await runCli([docsPath], projectRoot, options)

      // Read the generated file content
      const content = await readFile(tempOutputFile, 'utf-8')

      // Clean up the temporary file
      if (existsSync(tempOutputFile)) {
        await unlink(tempOutputFile)
      }

      return new Response(content, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      })
    } catch (error) {
      console.error('Failed to generate documentation with Repomix:', error)

      // Clean up the temporary file in case of error
      try {
        if (existsSync(tempOutputFile)) {
          await unlink(tempOutputFile)
        }
      } catch (cleanupError) {
        console.error('Failed to clean up temporary file:', cleanupError)
      }

      return new Response('Unable to generate documentation.', {
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      })
    }
  }
}
