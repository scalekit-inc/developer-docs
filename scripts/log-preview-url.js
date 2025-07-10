#!/usr/bin/env node

import { execSync } from 'child_process'

try {
  // Get current branch name
  const currentBranch = execSync('git branch --show-current', {
    encoding: 'utf8',
    stdio: 'pipe',
  }).trim()

  if (!currentBranch.startsWith('preview/')) {
    // Not a preview branch – silently exit
    process.exit(0)
  }

  // Replace slashes with hyphens
  const formattedBranch = currentBranch.replace(/\//g, '-')

  console.log('\n📝 Preview URL')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Your changes will be available at:')
  console.log(`https://${formattedBranch}--scalekit-starlight.netlify.app/`)
  console.log('\n⏳ Build status: In Progress')
  console.log('Expected completion: 2-5 minutes')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
} catch (error) {
  // Ignore errors – we don't want to block the push for URL logging
  process.exit(0)
}
