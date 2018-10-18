#!/usr/bin/env node
import * as program from 'commander';
// import * as inquirer from 'inquirer';
import { copySync, existsSync, realpathSync } from 'fs-extra';
import { join, resolve } from 'path';
import * as spawn from 'cross-spawn';

const npmInstall = (cwd: string) =>
  spawn('npm', ['--prefix', cwd, 'install'], {
    stdio: 'inherit',
  });

const appDirectory = realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
  resolve(appDirectory, relativePath);
const resolveOwn = (relativePath: string) =>
  resolve(__dirname, '../..', relativePath);

// TODO
// bootstrap:
// Check whether config.json exists
// If config.json exists, import it
// Ask which categories in .runtimeconfig.json should be imported
//   - Ask which new categories (names) should be created
//   - Ask for the slug for each category
//   - Add name/slug objects to .runtimeconfig.json
// Save .runtimeconfig.json

const checkFile = (filename: string) => {
  if (existsSync(resolveApp(filename))) {
    console.log(filename + ' exists');
    // Do something
  } else {
    console.error(filename + ' is missing');
    // Do something
  }
};

const bootstrap = async (foldername: string): Promise<any> => {
  console.log('Bootstrapping into:', resolveApp(foldername));

  if (existsSync(resolveApp(foldername))) {
    console.log('folder exists');
    return;
  }

  copySync(resolveOwn('template'), resolveApp(foldername));

  await npmInstall(resolveApp(foldername));
  await npmInstall(resolveApp(join(foldername, 'functions')));

  // ask for the name of the new project
  // create the following files from templates:
  // - package.json
  // - firebase.json
  // - firestore.rules
  // - database.rules.json
  // - firestore.indexes.json
  // - storage.rules
  //
  console.log('  - now bootstrapping 👢 🎀');
};

// const importIntoDB = (): void => {
//   // import content (articles/pages)
//   console.log('  - now importing');
// };
//
// const exportFromDB = (): void => {
//   // export content (articles/pages)
//   console.log('  - now exporting');
// };

const configure = () => {
  // check if this folder contains an already bootstrapped project
  // check if config.json exists
  // validate config.json
  // ask if config should be modified
  // walk config tree and ask questions
  console.log('  - now configuring 👩🏿‍🎓');
  checkFile('package.json');
  checkFile('firebase.json');
  checkFile('firestore.rules');
  checkFile('firestore.indexes.json');
  checkFile('storage.rules');
  checkFile('.firebaserc');
};

program.version('0.0.0', '-v, --version');

program
  .command('bootstrap [destination]')
  .description('bootstrap project')
  .action(bootstrap);

program
  .command('configure')
  .description('configure project')
  .action(configure);
// .command('-c, --configure', 'configure project')
// .command('-i, --import', 'import data into database')
// .command('-e, --export', 'export data form database')

program.parse(process.argv);

console.log("Gettin' spooky 👻  with poltergeist:");
// program
//   .version('0.0.1')
//   .option('-C, --chdir <path>', 'change the working directory')
//   .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
//   .option('-T, --no-tests', 'ignore test hook');
//
// program
//   .command('setup')
//   .description('run remote setup commands')
//   .action(function() {
//     console.log('setup');
//   });
//
// program
//   .command('exec <cmd>')
//   .description('run the given remote command')
//   .action(function(cmd) {
//     console.log('exec "%s"', cmd);
//   });
//
// program
//   .command('teardown <dir> [otherDirs...]')
//   .description('run teardown commands')
//   .action(function(dir, otherDirs) {
//     console.log('dir "%s"', dir);
//     if (otherDirs) {
//       otherDirs.forEach(function(oDir: any) {
//         console.log('dir "%s"', oDir);
//       });
//     }
//   });
//
// program
//   .command('*')
//   .description('deploy the given env')
//   .action(function(env) {
//     console.log('deploying "%s"', env);
//   });
//
// program.parse(process.argv);
// if (program.bootstrap) bootstrap(destination);
// if (program.configure) configure();
// if (program.import) importIntoDB();
// if (program.export) exportFromDB();

// const OUTPUT = require('./config.json');

// TODO
// Check whether config.json exists
// If .runtimeconfig.json exists, import it
// Ask which categories in .runtimeconfig.json should be imported
// Ask which new categories (names) should be created
// Ask for the slug for each category
// Add name/slug objects to .runtimeconfig.json
// Save .runtimeconfig.json
//

// const INITIALIZECONFIG = (output, key) => {
//   //Check whether
//   output[key] =
//     typeof output[key] != 'undefined' && output[key] instanceof Object
//       ? output[key]
//       : [];
// };
//
// const ASK = () => {
//   const QUESTIONS = [
//     {
//       type: 'input',
//       name: 'category',
//       message: "What's the name of your category?",
//     },
//     {
//       type: 'input',
//       name: 'slug',
//       message: 'Which slug does this category receive?',
//     },
//     {
//       type: 'confirm',
//       name: 'askAgain',
//       message: 'Want to enter category (just hit enter for YES)?',
//       default: true,
//     },
//   ];
//
//   return INQUIRER.prompt(QUESTIONS).then(async function(answers) {
//     // OUTPUT.categories[answers.category] = answers.slug;
//     // d
//     if (answers.askAgain) {
//       return await ASK();
//     }
//     else {
//       console.log('Your categories:', JSON.stringify(OUTPUT));
//     }
//   });
// };
//
// const CREATEMENU = item => {
//   OUTPUT[item.category] = item.slug;
// };
//
// const CREATETREE = (obj, key, func) => {
//   console.log(JSON.stringify(obj));
//     if (obj.askAgain) {
//       func();
//     }
//   console.log('traversed shit');
//
//   // return new Promise((resolve, reject) => {
//   //   resolve(someValue);
//   //   reject("failure reason");
//   // });
// };
//
// INITIALIZECONFIG(OUTPUT, 'categories');
// INITIALIZECONFIG(OUTPUT, 'asdf');
//
// // START
// const START = async (OUTPUT, CREATEMENU) => {
//   const answers = await ASK();
//   CREATETREE(answers, 'categories', START(answers, CREATEMENU));
// };
//
// START(OUTPUT, CREATEMENU);
