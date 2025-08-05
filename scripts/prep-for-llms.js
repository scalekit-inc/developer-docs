import { runCli } from 'repomix'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Define paths relative to the project root
const projectRoot = join(__dirname, '..')
const docsPath = join(projectRoot, 'src/content/docs')
const outputPath = join(projectRoot, 'public/llms-full.txt')

async function generateLLMText() {
  console.log('🚀 Starting documentation processing with Repomix...')
  console.log(`📁 Processing directory: ${docsPath}`)
  console.log(`📄 Output file: ${outputPath}`)

  try {
    // Configure Repomix options for plain text output
    const options = {
      output: outputPath,
      style: 'plain', // Plain text format
      compress: false, // Keep formatting for better readability
      quiet: false, // Show progress
      instructionFilePath: join(projectRoot, 'scripts/manual/LLM_INSTRUCTIONS.md'),
      // Don't specify include/exclude to use defaults
    }

    // Process the docs directory
    const result = await runCli([docsPath], projectRoot, options)

    if (result.packResult) {
      console.log('✅ Documentation processing completed successfully!')
      console.log(`📊 Statistics:`)
      console.log(`   - Total files processed: ${result.packResult.totalFiles}`)
      console.log(`   - Total characters: ${result.packResult.totalCharacters.toLocaleString()}`)
      console.log(`   - Total tokens: ${result.packResult.totalTokens.toLocaleString()}`)
      console.log(`📄 Output saved to: ${outputPath}`)
    } else {
      console.log('⚠️  Processing completed but no result data available')
    }
  } catch (error) {
    console.error('❌ Error processing documentation:', error)
    process.exit(1)
  }
}

// Run the script
generateLLMText()
