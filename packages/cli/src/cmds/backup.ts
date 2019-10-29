import * as path from 'path';
import * as admin from 'firebase-admin';
import { Storage } from '@google-cloud/storage';
import * as client from 'firebase-tools';
import { getProjectId, initializeAndEnsureAuth, resolveApp } from '../util';
import { ensureDirSync, writeFileSync } from 'fs-extra';

export const exportFirestore = async (foldername: string) => {
  const firestore = admin.firestore();
  firestore.settings({ timestampsInSnapshots: true });
  const collections = await firestore.listCollections();
  const data = {};
  for (let collection of collections) {
    const test = await firestore.collection(collection.id).get();
    data[collection.id] = {};
    test.forEach(doc => {
      data[collection.id][doc.id] = doc.data();
    });
  }
  writeFileSync(foldername, JSON.stringify(data, null, 2));
};

export const exportStorage = async (projectId: string, foldername: string) => {
  const storage = new Storage({ projectId });

  const bucket = storage.bucket(`gs://${projectId}.appspot.com`);
  const [files] = await bucket.getFiles();
  ensureDirSync(foldername);
  files.forEach(async file => {
    try {
      await bucket.file(file.name).download({
        destination: path.join(foldername, `${file.name}`),
      });
      writeFileSync(
        path.join(foldername, `${file.name}.metadata`),
        JSON.stringify(file.metadata.metadata || {}, null, 2)
      );
    } catch (error) {
      console.log(error);
    }
  });
};

export const exportAuthenticationUsers = (foldername: string) =>
  client.auth.export(foldername, { format: 'json' });

// export firestore collections
// export authentication users
// export storage files
export default async (
  foldername: string,
  {
    firestore,
    storage,
    accounts,
  }: { firestore?: boolean; storage?: boolean; accounts?: boolean }
): Promise<void> => {
  console.log('  - now exporting');

  const backupAll = !firestore && !storage && !accounts;

  ensureDirSync(foldername);

  const projectId = await getProjectId();

  try {
    await initializeAndEnsureAuth(projectId);

    if (firestore || backupAll) {
      console.log('exporting firestore');
      await exportFirestore(
        path.join(resolveApp(foldername), 'firestore.json')
      );
    }

    if (accounts || backupAll) {
      console.log('exporting authentication users');
      exportAuthenticationUsers(
        path.join(resolveApp(foldername), 'accounts.json')
      );
    }

    if (storage || backupAll) {
      console.log('exporting storage');
      await exportStorage(
        projectId,
        path.join(resolveApp(foldername), 'storage')
      );
    }
  } catch (err) {
    console.log(err);
  }
};
