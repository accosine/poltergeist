#!/usr/bin/env node
import * as program from 'commander';
import * as inquirer from 'inquirer';

// TODO
// bootstrap:
// Check whether config.json exists
// If config.json exists, import it
// Ask which categories in .runtimeconfig.json should be imported
  // Ask which new categories (names) should be created
  // Ask for the slug for each category
  // Add name/slug objects to .runtimeconfig.json
// Save .runtimeconfig.json

const bootstrap = () => {
  // ask for the name of the new project
  // create the following files from templates:
  // - package.json
  // - firebase.json
  // - firestore.rules
  // - database.rules.json
  // - firestore.indexes.json
  // - storage.rules
  console.log('  - now bootstrapping 👢 🎀')
}

const configure = () => {
  // check if this folder contains an already bootstrapped project
  // check if config.json exists
  // validate config.json
  // ask if config should be modified
  // walk config tree and ask questions
  console.log('  - now configuring 👩🏿‍🎓')
}

program
  .version('0.0.0', '-v, --version')
  .option('-b, --bootstrap', 'bootstrap project')
  .option('-c, --configure', 'configure project')
  .parse(process.argv);

console.log("Gettin' spooky 👻  with poltergeist:");
if (program.bootstrap) bootstrap();
if (program.configure) configure();


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
