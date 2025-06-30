#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

try {
  // Check if we're in a git repository
  try {
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
  } catch (error) {
    process.exit(0);
  }

  // Check and remove old husky configuration
  let currentHooksPath = '';
  try {
    currentHooksPath = execSync('git config --get core.hooksPath', {
      encoding: 'utf8',
      stdio: 'pipe',
    }).trim();
  } catch (error) {
    // No hooksPath configured, which is what we want
  }

  if (
    currentHooksPath &&
    (currentHooksPath === '.husky/_' || currentHooksPath.includes('husky'))
  ) {
    execSync('git config --unset core.hooksPath');
  }

  // Install hooks using simple-git-hooks
  execSync('npx simple-git-hooks', { stdio: 'ignore' });

  // Verify hooks are installed
  const hooksDir = '.git/hooks';
  const requiredHooks = ['pre-commit', 'pre-push'];
  const allHooksInstalled = requiredHooks.every(hook =>
    fs.existsSync(path.join(hooksDir, hook))
  );

  if (allHooksInstalled) {
    console.log('✅ Git hooks installed');
  } else {
    console.log('⚠️  Git hooks installation incomplete');
  }
} catch (error) {
  console.error('❌ Git hooks setup failed:', error.message);
  process.exit(1);
}
