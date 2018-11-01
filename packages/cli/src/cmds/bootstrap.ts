import { copySync, existsSync } from 'fs-extra';
import { join } from 'path';

import { resolveApp, resolveOwn, npmInstall } from '../util';

export default async (foldername: string): Promise<void> => {
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
