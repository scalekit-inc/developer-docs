#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔧 Setting up git hooks...');

try {
  // Check if we're in a git repository
  try {
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
  } catch (error) {
    console.log('⚠️  Not in a git repository, skipping git hooks setup');
    process.exit(0);
  }

  // Check current hooks path configuration
  let currentHooksPath = '';
  try {
    currentHooksPath = execSync('git config --get core.hooksPath', {
      encoding: 'utf8',
      stdio: 'pipe',
    }).trim();
  } catch (error) {
    // No hooksPath configured, which is what we want
  }

  if (currentHooksPath) {
    console.log(`🔍 Found existing core.hooksPath: ${currentHooksPath}`);

    if (currentHooksPath === '.husky/_' || currentHooksPath.includes('husky')) {
      console.log('🧹 Removing old husky hooks path configuration...');
      execSync('git config --unset core.hooksPath');
      console.log('✅ Removed core.hooksPath configuration');
    } else {
      console.log(
        `⚠️  Warning: core.hooksPath is set to "${currentHooksPath}"`
      );
      console.log('   This might interfere with simple-git-hooks.');
      console.log('   Consider running: git config --unset core.hooksPath');
    }
  }

  // Install hooks using simple-git-hooks
  console.log('📦 Installing git hooks with simple-git-hooks...');
  execSync('npx simple-git-hooks', { stdio: 'inherit' });

  // Verify hooks are installed
  const hooksDir = '.git/hooks';
  const requiredHooks = ['pre-commit', 'pre-push'];
  let allHooksInstalled = true;

  for (const hook of requiredHooks) {
    const hookPath = path.join(hooksDir, hook);
    if (!fs.existsSync(hookPath)) {
      console.log(`❌ ${hook} hook not found`);
      allHooksInstalled = false;
    } else {
      console.log(`✅ ${hook} hook installed`);
    }
  }

  if (allHooksInstalled) {
    console.log('\n🎉 Git hooks setup complete!');
    console.log('   • Pre-commit: Runs prettier on staged files');
    console.log('   • Pre-push: Builds the project before pushing');
  } else {
    console.log('\n⚠️  Some hooks may not be installed correctly');
    console.log('   Try running: npx simple-git-hooks');
  }
} catch (error) {
  console.error('❌ Error setting up git hooks:', error.message);
  process.exit(1);
}
