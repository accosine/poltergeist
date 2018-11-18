import { prompt } from 'enquirer';
import * as path from 'path';
import * as client from 'firebase-tools';
import chalk from 'chalk';
import { Storage } from '@google-cloud/storage';
import { getProjectId, resolveApp, initializeAndEnsureAuth } from '../util';
import * as admin from 'firebase-admin';
import { readFileSync, readdirSync } from 'fs-extra';

export const deleteFirestore = async () => {
  try {
    await client.firestore.delete('', { allCollections: true });
  } catch (error) {
    console.log(error);
    if (error.message !== 'Unable to list collection IDs') {
      throw error;
    }
  }
};
export const importFirestore = async (foldername: string) => {
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

export const deleteAuthenticationUsers = async () => {
  // TODO: wait for https://github.com/firebase/firebase-tools/issues/595
};

export const importAuthenticationUsers = async (foldername: string) =>
  client.auth.upload(foldername, {});

export const deleteStorage = (projectId: string) => {
  const storage = new Storage({ projectId });
  const bucket = storage.bucket(`gs://${projectId}.appspot.com`);
  // delete all files in storage
  return bucket.deleteFiles();
};

export const importStorage = (projectId: string, foldername: string) => {
  const storage = new Storage({ projectId });
  const bucket = storage.bucket(`gs://${projectId}.appspot.com`);
  // TODO: progress
  const files = readdirSync(foldername);
  files
    .filter(file => !file.endsWith('.metadata'))
    .forEach(async file => {
      try {
        const { shouldResize, ...metadata } = JSON.parse(
          readFileSync(path.join(foldername, file + '.metadata'), 'utf8')
        );
        await bucket.upload(path.join(foldername, file), {
          metadata: { metadata },
        });
      } catch (error) {
        console.log(error);
      }
    });
};

// delete and restore firestore
// delete (TODO) and restore authentication users
// delete and restore storage files
export default async (
  foldername: string,
  {
    firestore,
    storage,
    accounts,
  }: { firestore?: boolean; storage?: boolean; accounts?: boolean }
): Promise<void> => {
  if (
    !(await prompt<{ confirmed: boolean }>([
      {
        type: 'confirm',
        name: 'confirmed',
        message: chalk.underline.bgMagenta(
          'Are you sure you want to restore from a backup? This WILL delete all live data in your firebase project!'
        ),
        initial: false,
      },
    ])).confirmed
  ) {
    return;
  }

  console.log('  - now restoring');

  const restoreAll = !firestore && !storage && !accounts;

  try {
    const projectId = await getProjectId();
    await initializeAndEnsureAuth(projectId);

    if (firestore || restoreAll) {
      console.log('restoring firestore');
      console.log('delete firestore');
      await deleteFirestore();
      console.log('import firestore');
      await importFirestore(
        path.join(resolveApp(foldername), 'firestore.json')
      );
    }

    if (accounts || restoreAll) {
      console.log('restoring authentication users');
      await deleteAuthenticationUsers();
      await importAuthenticationUsers(
        path.join(resolveApp(foldername), 'accounts.json')
      );
    }

    if (storage || restoreAll) {
      console.log('restoring storage');
      await deleteStorage(projectId);

      // upload all files from backup
      await importStorage(
        projectId,
        path.join(resolveApp(foldername), 'storage')
      );
    }
  } catch (error) {
    console.log(error);
  }
};
