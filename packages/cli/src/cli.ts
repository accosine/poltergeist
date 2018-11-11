#!/usr/bin/env node
import { Command } from 'commander';
import bootstrap from './cmds/bootstrap';
import configure from './cmds/configure';
import backup from './cmds/backup';
import restore from './cmds/restore';

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

console.log("Gettin' spooky 👻  with poltergeist:");

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
  .description('backup all project data')
  .action(backup);

program
  .command('restore [source]')
  .description('restore backup folder to project')
  .action(restore);

program.parse(process.argv);
