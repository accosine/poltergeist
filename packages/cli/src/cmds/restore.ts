import * as inquirer from 'inquirer';
import * as path from 'path';
import * as client from 'firebase-tools';
import chalk from 'chalk';
import { Storage } from '@google-cloud/storage';
import { getProjectId, initializeAndEnsureAuth, resolveApp } from '../util';
import * as admin from 'firebase-admin';
import { readFileSync, readdirSync } from 'fs-extra';

const deleteFirestore = async () => {
  try {
    await client.firestore.delete('', { allCollections: true });
  } catch (error) {
    console.log(error);
    if (error.message !== 'Unable to list collection IDs') {
      throw error;
    }
  }
};
const importFirestore = async (foldername: string) => {
  const data = JSON.parse(readFileSync(foldername, 'utf8'));
  const firestore = admin.firestore();
  firestore.settings({ timestampsInSnapshots: true });

  Object.entries(data).forEach(([collection, value]) => {
    Object.entries(value).forEach(async ([name, content]) => {
      try {
        console.log('set', collection, name);
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
    const projectId = await getProjectId();
    console.log(projectId);
    await initializeAndEnsureAuth(projectId);

    console.log('restoring firestore');
    console.log('delete firestore');
    await deleteFirestore();
    console.log('import firestore');
    await importFirestore(path.join(resolveApp(foldername), 'firestore.json'));

    console.log('restoring authentication users');
    await deleteAllUsers();
    await client.auth.upload(
      path.join(resolveApp(foldername), 'accounts.json'),
      {}
    );

    console.log('restoring storage');
    const storage = new Storage({ projectId });

    const bucket = storage.bucket(`gs://${projectId}.appspot.com`);
    // delete all files in storage
    await bucket.deleteFiles();

    // upload all files from backup
    // TODO: progress
    const storagePath = path.join(resolveApp(foldername), 'storage');
    const files = readdirSync(storagePath);
    files.filter(file => !file.endsWith('.metadata')).forEach(async file => {
      try {
        const { shouldResize, ...metadata } = JSON.parse(
          readFileSync(path.join(storagePath, file + '.metadata'), 'utf8')
        );
        await bucket.upload(path.join(storagePath, file), {
          metadata: { metadata },
        });
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
