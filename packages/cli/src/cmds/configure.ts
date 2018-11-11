import { checkFile, getProjectId, writeEnvFile } from '../util';
import * as inquirer from 'inquirer';
import chalk from 'chalk';

export default async () => {
  // check if this folder contains an already bootstrapped project
  // check if config.json exists
  // validate config.json
  // ask if config should be modified
  // walk config tree and ask questions
  console.log('  - now configuring 👩🏿‍🎓');
  if (
    ![
      checkFile('package.json'),
      checkFile('firebase.json'),
      checkFile('firestore.rules'),
      checkFile('firestore.indexes.json'),
      checkFile('storage.rules'),
      checkFile('.firebaserc'),
    ].every(Boolean)
  ) {
    return;
  }

  const projectId = await getProjectId();

  const { apiKey } = await inquirer.prompt<{ apiKey: string }>([
    {
      type: 'input',
      name: 'apiKey',
      message: `Visit this page ${chalk.underline(
        `https://console.firebase.google.com/project/${projectId}/settings/general/`
      )} and paste the variable ${chalk.italic('apiKey')} here:`,
    },
  ]);

  let overwriteEnv = true;
  if (checkFile('.env', false)) {
    overwriteEnv = (await inquirer.prompt<{ overwriteEnv: boolean }>({
      type: 'confirm',
      name: 'overwriteEnv',
      message: 'File .env already exists. Do you want to overwrite it?',
      default: false,
    })).overwriteEnv;
  }
  if (overwriteEnv) {
    writeEnvFile(projectId, apiKey);
  }

  // TODO: generate config.json
  // TODO: upload cloud functions config
  // TODO: run npm build to generate editor in public folder

  console.log('Please enable Firestore in the Firebase console');
  console.log('Then, run firebase deploy');
};
