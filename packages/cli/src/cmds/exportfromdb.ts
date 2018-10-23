import * as admin from 'firebase-admin';
import * as ensureDefaultCredentials from 'firebase-tools/lib/ensureDefaultCredentials';

export default async (foldername: string): Promise<any> => {
  console.log('  - now exporting');

  console.log('ensureDefaultCredentials');
  ensureDefaultCredentials();

  admin.initializeApp({ projectId: 'accosine' });

  try {
    const collections = await admin.firestore().getCollections();
    for (let collection of collections) {
      console.log(`✔ Found collection with id: ${collection.id}`);
    }
  } catch (err) {
    console.log(err);
  }
};
