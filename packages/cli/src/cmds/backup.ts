import * as path from 'path';
import * as admin from 'firebase-admin';
import { Storage } from '@google-cloud/storage';
import * as client from 'firebase-tools';
import { getProjectId, initializeAndEnsureAuth, resolveApp } from '../util';
import { ensureDirSync, writeFileSync } from 'fs-extra';

const exportFirestore = async (foldername: string) => {
  const firestore = admin.firestore();
  firestore.settings({ timestampsInSnapshots: true });
  const collections = await firestore.getCollections();
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

const exportStorage = async (projectId: string, foldername: string) => {
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

export default async (foldername: string): Promise<void> => {
  console.log('  - now exporting');

  ensureDirSync(foldername);

  const projectId = await getProjectId();

  try {
    await initializeAndEnsureAuth(projectId);

    console.log('exporting firestore');
    await exportFirestore(path.join(resolveApp(foldername), 'firestore.json'));

    console.log('exporting authentication users');
    await client.auth.export(
      path.join(resolveApp(foldername), 'accounts.json'),
      { format: 'json' }
    );

    console.log('exporting storage');
    await exportStorage(
      projectId,
      path.join(resolveApp(foldername), 'storage')
    );
  } catch (err) {
    console.log(err);
  }
};
