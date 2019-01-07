#!/usr/bin/env node

const pkg = require('../package.json');
const { join, resolve } = require('path');
const {
  copySync,
  existsSync,
  realpathSync,
  moveSync,
  removeSync,
  writeFileSync,
} = require('fs-extra');
const spawn = require('cross-spawn').sync;

const args = process.argv.slice(2);
const appDirectory = realpathSync(process.cwd());
const resolveApp = relativePath => resolve(appDirectory, relativePath);
const resolveOwn = relativePath => resolve(__dirname, '..', relativePath);

switch (args[0]) {
  case 'pack':
    const themeName = args[1];
    const logosDir = args[2];
    const outDir = resolveApp(`${themeName}-${pkg.version}.tgz`);
    if (!themeName) {
      console.log('Please provide theme name');
      break;
    }
    if (existsSync(outDir)) {
      console.log(`Destination file '${outDir}.gz' exists`);
      break;
    }

    // create temp dir
    const tmpDir = join(
      require('os').tmpdir(),
      `television-pack-${Math.round(Math.random() * 36 ** 12).toString(36)}`
    );

    // copy package to temp dir and change name in package.json
    copySync(resolveOwn('.'), tmpDir);
    pkg.name = themeName;
    writeFileSync(join(tmpDir, 'package.json'), JSON.stringify(pkg), 'utf8');

    // replace logos if folder was passed
    if (logosDir && existsSync(logosDir)) {
      removeSync(join(tmpDir, 'logos'));
      copySync(resolveApp(logosDir), join(tmpDir, 'logos'));
    }

    // create tarball
    spawn('npm', ['pack', tmpDir], {
      stdio: 'inherit',
    });
    console.log('Created theme package');

    // delete temp dir
    removeSync(tmpDir);
    break;
  default:
    console.log(`Unknown command ${args[0]}`);
    process.exit(1);
}
