import { copySync, existsSync } from 'fs-extra';
import { join } from 'path';

import { resolveApp, resolveOwn, npmInstall } from '../util';

export default async (foldername: string): Promise<void> => {
  console.log('  - now bootstrapping 👢 🎀');
  console.log('Bootstrapping into:', resolveApp(foldername));

  if (existsSync(resolveApp(foldername))) {
    console.log('folder exists');
    return;
  }

  copySync(resolveOwn('template'), resolveApp(foldername));

  await Promise.all([
    npmInstall(resolveApp(foldername)),
    npmInstall(resolveApp(join(foldername, 'functions'))),
  ]);

  console.log(
    'To get started, run poltergeist configure in the',
    foldername,
    'directory'
  );

  // ask for the name of the new project
  // create the following files from templates:
  // - package.json
  // - firebase.json
  // - firestore.rules
  // - database.rules.json
  // - firestore.indexes.json
  // - storage.rules
  //
};
