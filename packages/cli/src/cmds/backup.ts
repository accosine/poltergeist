import * as path from 'path';
import * as admin from 'firebase-admin';
import { Storage } from '@google-cloud/storage';
import * as client from 'firebase-tools';
import { getProjectId, initializeAndEnsureAuth, resolveApp } from '../util';
import { materializeAll } from 'firebase-tools/lib/functionsConfig';
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

export const exportConfiguration = async (
  projectId: string,
  foldername: string
) =>
  writeFileSync(
    foldername,
    JSON.stringify(await materializeAll(projectId), null, 2)
  );

// export configuration
// export firestore collections
// export authentication users
// export storage files
export default async (
  foldername: string,
  {
    configuration,
    firestore,
    storage,
    accounts,
  }: {
    configuration?: boolean;
    firestore?: boolean;
    storage?: boolean;
    accounts?: boolean;
  }
): Promise<void> => {
  console.log('  - now exporting');
  // If no arguments are provided everything is false and should get backed up
  const backupAll = !configuration && !firestore && !storage && !accounts;

  ensureDirSync(foldername);

  const projectId = await getProjectId();

  try {
    await initializeAndEnsureAuth(projectId);

    if (configuration || backupAll) {
      console.log('exporting configuration');
      await exportConfiguration(
        projectId,
        path.join(resolveApp(foldername), 'config.json')
      );
    }

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
