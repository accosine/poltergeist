#!/usr/bin/env node

const { join, resolve } = require('path');
const { renameSync, copyFileSync, realpathSync } = require('fs');
const spawn = require('cross-spawn').sync;

const args = process.argv.slice(2);
const appDirectory = realpathSync(process.cwd());
const resolveApp = relativePath => resolve(appDirectory, relativePath);
const resolveOwn = relativePath => resolve(__dirname, '..', relativePath);

switch (args[0]) {
  case 'build':
    copyFileSync(resolveApp('logos'), resolveOwn('logos'));
    copyFileSync(resolveApp('.env'), resolveOwn('.env'));
    spawn('npm', ['--prefix', join(__dirname, '..'), 'run', 'start'], {
      stdio: 'inherit',
    });
    break;
  default:
    console.log(`Unknown command ${args[0]}`);
    process.exit(1);
}
