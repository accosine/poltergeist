const fs = require('fs'),
  path = require('path'),
  matter = require('gray-matter'),
  admin = require('firebase-admin');
const dir = path.join(__dirname, 'import');
const files = fs.readdirSync(dir);

// Fetch the service account key JSON file contents
const serviceAccount = require('../serviceAccountKey.json');

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://nausika-5918e.firebaseio.com',
});

const db = admin.database();
const articlesRef = db.ref('articles');

let promises = [];

for (let file of files) {
  const filename = file.split('.');
  const fileextension = filename[filename.length - 1];

  if (fileextension === 'md') {
    const doc = matter.read(path.join(dir, file));
    const article = docu => {
      return Object.assign({}, docu.data, {
        content: docu.content,
      });
    };

    promises.push(
      articlesRef.child(doc.data.slug).set(article(doc), function(error) {
        if (error) {
          console.log('Data could not be saved.' + error);
        } else {
          console.log('Data saved successfully.');
        }
      })
    );
  }
}

Promise.all(promises)
  .then(() => {
    console.log('all done');
    firebase.delete();
  })
  .catch(() => console.error('fark'));
