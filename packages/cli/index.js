'use strict';
const INQUIRER = require('inquirer');
const OUTPUT = require('../functions/.runtimeconfig.json');

// TODO
// Check whether .runtimeconfig.json exists
// If .runtimeconfig.json exists, import it
// Ask which categories in .runtimeconfig.json should be imported
  // Ask which new categories (names) should be created
  // Ask for the slug for each category
  // Add name/slug objects to .runtimeconfig.json
// Save .runtimeconfig.json
//

const INITIALIZECONFIG = (output, key) => {
  //Check whether
  output[key] =
    typeof output[key] != 'undefined' && output[key] instanceof Object
      ? output[key]
      : [];
};

const ASK = () => {
  const QUESTIONS = [
    {
      type: 'input',
      name: 'category',
      message: "What's the name of your category?",
    },
    {
      type: 'input',
      name: 'slug',
      message: 'Which slug does this category receive?',
    },
    {
      type: 'confirm',
      name: 'askAgain',
      message: 'Want to enter category (just hit enter for YES)?',
      default: true,
    },
  ];

  return INQUIRER.prompt(QUESTIONS).then(async function(answers) {
    // OUTPUT.categories[answers.category] = answers.slug;
    // d
    if (answers.askAgain) {
      return await ASK();
    }
    else {
      console.log('Your categories:', JSON.stringify(OUTPUT));
    }
  });
};

const CREATEMENU = item => {
  OUTPUT[item.category] = item.slug;
};

const CREATETREE = (obj, key, func) => {
  console.log(JSON.stringify(obj));
    if (obj.askAgain) {
      func();
    }
  console.log('traversed shit');

  // return new Promise((resolve, reject) => {
  //   resolve(someValue);
  //   reject("failure reason");
  // });
};

INITIALIZECONFIG(OUTPUT, 'categories');
INITIALIZECONFIG(OUTPUT, 'asdf');

// START
const START = async (OUTPUT, CREATEMENU) => {
  const answers = await ASK();
  CREATETREE(answers, 'categories', START(answers, CREATEMENU));
};

START(OUTPUT, CREATEMENU);
