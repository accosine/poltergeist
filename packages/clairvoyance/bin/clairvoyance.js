#!/usr/bin/env node

const { join, resolve } = require('path');
const { renameSync, copyFileSync, realpathSync } = require('fs');
const { emptyDirSync, removeSync, copySync } = require('fs-extra');
const spawn = require('cross-spawn').sync;

const args = process.argv.slice(2);
const appDirectory = realpathSync(process.cwd());
const resolveApp = relativePath => resolve(appDirectory, relativePath);
const resolveOwn = relativePath => resolve(__dirname, '..', relativePath);

const prepareApp = cmd => {
  removeSync(resolveOwn('.poltergeist'));
  copySync(resolveOwn('.'), resolveApp('.poltergeist/'));
  copyFileSync(
    resolveApp('config.json'),
    resolveApp('.poltergeist/src/config.json')
  );
  copyFileSync(resolveApp('.env'), resolveApp('.poltergeist/.env'));
  spawn('npm', ['--prefix', join(appDirectory, '.poltergeist'), 'run', cmd], {
    stdio: 'inherit',
  });
};

switch (args[0]) {
  case 'develop':
    prepareApp('start');
    break;
  case 'build':
    prepareApp('build');
    emptyDirSync(resolveApp('public'));
    renameSync(resolveApp('.poltergeist/build'), resolveApp('public/admin'));
    break;
  default:
    console.log(`Unknown command ${args[0]}`);
    process.exit(1);
}
