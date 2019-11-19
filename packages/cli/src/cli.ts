#!/usr/bin/env node
import { Command } from 'commander';
import bootstrap from './cmds/bootstrap';
import configure from './cmds/configure';
import backup from './cmds/backup';
import restore from './cmds/restore';
import upload from './cmds/upload';
import chalk from 'chalk';

const program = new Command();

// TODO
// bootstrap:
// Check whether config.json exists
// If config.json exists, import it
// Ask which categories in .runtimeconfig.json should be imported
//   - Ask which new categories (names) should be created
//   - Ask for the slug for each category
//   - Add name/slug objects to .runtimeconfig.json
// Save .runtimeconfig.json

console.log(`Gettin' spooky 👻  with ${chalk.hex('#fedc5d').bold('poltergeist')}`);

program.version('0.0.0', '-v, --version');

program
  .command('bootstrap [destination]')
  .description('bootstrap project')
  .action(bootstrap);

program
  .command('configure')
  .description('configure project')
  .action(configure);

program
  .command('backup [destination]')
  .option('--configuration', 'backup configuration')
  .option('--firestore', 'backup Firestore')
  .option('--storage', 'backup storage')
  .option('--accounts', 'backup accounts')
  .description('backup project data')
  .action(backup);

program
  .command('restore [source]')
  .option('--configuration', 'restore configuration')
  .option('--firestore', 'restore Firestore')
  .option('--storage', 'restore storage')
  .option('--accounts', 'restore accounts')
  .description('restore backup folder to project')
  .action(restore);

program
  .command('upload')
  .description('upload file or directory content')
  .action(upload);

program.parse(process.argv);
