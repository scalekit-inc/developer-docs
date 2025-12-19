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

      // Validate docsPath exists
      if (!existsSync(docsPath)) {
        throw new Error(`Documentation path not found: ${docsPath}`)
      }

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
        // Add timeout and memory constraints for serverless environments
        maxFileSize: 10 * 1024 * 1024, // 10MB max file size
        verbose: false,
        progress: false,
        ...config.repomixOptions,
      }

      // Validate and add instruction file if provided
      if (config.instructionFilePath) {
        const fullInstructionPath = join(projectRoot, config.instructionFilePath)
        if (existsSync(fullInstructionPath)) {
          options.instructionFilePath = fullInstructionPath
          console.log(`Using instruction file: ${fullInstructionPath}`)
        } else {
          console.warn(
            `Instruction file not found at ${fullInstructionPath}, continuing without it`,
          )
        }
      }

      // Use runCli from the Repomix library
      // Add timeout for serverless environments (60 seconds)
      console.log(`Starting documentation generation with Repomix...`)
      console.log(`Output file: ${tempOutputFile}`)
      console.log(`Docs path: ${docsPath}`)

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Documentation generation timeout')), 60000)
      })

      const result = (await Promise.race([
        runCli([docsPath], projectRoot, options),
        timeoutPromise,
      ])) as any

      // Verify output file was created before reading
      if (!existsSync(tempOutputFile)) {
        throw new Error(
          `Repomix did not generate output file at ${tempOutputFile}. Check Repomix logs for errors.`,
        )
      }

      console.log(`Repomix completed successfully, reading output file...`)

      // Read the generated file content
      const content = await readFile(tempOutputFile, 'utf-8')

      // Clean up the temporary file
      if (existsSync(tempOutputFile)) {
        await unlink(tempOutputFile)
      }

      // Check content size and potentially compress for large outputs
      const contentSize = Buffer.byteLength(content, 'utf8')
      console.log(`Generated documentation size: ${(contentSize / 1024 / 1024).toFixed(2)} MB`)

      if (contentSize > 5 * 1024 * 1024) {
        // 5MB
        console.warn(
          'Large documentation output detected, may cause issues in serverless environment',
        )
      }

      return new Response(content, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
      })
    } catch (error) {
      const err = error as Error & { code?: string; errno?: number; path?: string }
      console.error('Failed to generate documentation with Repomix:', err)
      console.error('Error details:', {
        name: err.name,
        message: err.message,
        stack: err.stack,
        code: err.code,
        errno: err.errno,
        path: err.path,
      })

      // Clean up the temporary file in case of error
      try {
        if (existsSync(tempOutputFile)) {
          await unlink(tempOutputFile)
        }
      } catch (cleanupError) {
        console.error('Failed to clean up temporary file:', cleanupError)
      }

      const errorMessage = `Unable to generate documentation. Error: ${err.message || 'Unknown error'}`
      return new Response(errorMessage, {
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      })
    }
  }
}
