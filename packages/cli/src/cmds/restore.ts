import * as inquirer from 'inquirer';
import * as path from 'path';
import * as client from 'firebase-tools';
import chalk from 'chalk';
import { getProjectId, initializeAndEnsureAuth, resolveApp } from '../util';
import * as admin from 'firebase-admin';
import { readFileSync } from 'fs-extra';

const importFirestore = async (foldername: string) => {
  const data = JSON.parse(readFileSync(foldername, 'utf8'));
  const firestore = admin.firestore();
  firestore.settings({ timestampsInSnapshots: true });

  Object.entries(data).forEach(([collection, value]) => {
    Object.entries(value).forEach(async ([name, content]) => {
      try {
        await firestore
          .collection(collection)
          .doc(name)
          .set(content);
      } catch (error) {
        console.log(error);
      }
    });
  });
};

const deleteAllUsers = async () => {
  // TODO: wait for https://github.com/firebase/firebase-tools/issues/595
};

export default async (foldername: string): Promise<void> => {
  if (
    !(await inquirer.prompt<{ confirmed: boolean }>([
      {
        type: 'confirm',
        name: 'confirmed',
        message: chalk.underline.bgMagenta(
          'Are you sure you want to restore from a backup? This WILL delete all live data in your firebase project!'
        ),
        default: false,
      },
    ])).confirmed
  ) {
    return;
  }

  console.log('  - now restoring');

  try {
    await initializeAndEnsureAuth();
    // const projectId = await getProjectId();

    console.log('restoring firestore');
    await client.firestore.delete('', { allCollections: true });
    await importFirestore(path.join(resolveApp(foldername), 'firestore.json'));

    console.log('restoring authentication users');
    await deleteAllUsers();
    await client.auth.upload(
      path.join(resolveApp(foldername), 'accounts.json'),
      {}
    );

    console.log('restoring storage');
    // TODO: delete all files in storage
    // TODO: upload all files from backup
  } catch (err) {
    console.log(err);
  }
};
