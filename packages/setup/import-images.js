const fs = require('fs'),
  path = require('path'),
  matter = require('gray-matter'),
  admin = require('firebase-admin'),
  gcs = require('@google-cloud/storage')({
    keyFilename: '../serviceAccountKey.json',
    projectId: 'nausika-5918e',
  }),
  Shortcode = require('../src/util/shortcode-parser');

const serviceAccount = require('../serviceAccountKey.json');

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://nausika-5918e.firebaseio.com',
});

const imagesdir = path.join(__dirname, 'import-images');
const articlesdir = path.join(__dirname, 'import');
const articles = fs.readdirSync(articlesdir);

const imagePrefixes = ['s-', 'm-', 'l-'];

const addSizeSuffix = (name, suffix) => {
  const split = name.split('.');
  return (
    split.slice(0, split.length - 1).join('.') +
    suffix +
    '.' +
    split[split.length - 1]
  );
};

const addSizePrefix = (name, prefix) => `${prefix}${name}`;

let articletexts = '';
const frontmatterImages = [];
for (let file of articles) {
  const filename = file.split('.');
  const fileextension = filename[filename.length - 1];

  if (fileextension === 'md') {
    const doc = matter.read(path.join(articlesdir, file));
    articletexts += doc.content;
    const { picture, attribution } = doc.data;
    frontmatterImages.push({
      name: picture,
      attribution: attribution || '',
      alt: attribution || '',
      width: 4,
      height: 3,
    });
  }
}

const articleImages = [];
Shortcode.add('image', (str, { name, attribution, alt, width, height }) => {
  articleImages.push({
    name,
    attribution: attribution || '',
    alt: alt || '',
    width: width || 4,
    height: height || 3,
  });
});

Shortcode.parse(articletexts);

const db = admin.database();
const imagesRef = db.ref('images');
const bucket = gcs.bucket('nausika-5918e.appspot.com');

const uploadFiles = async files => {
  for (let { name, attribution, alt, width, height } of [
    ...articleImages,
    ...frontmatterImages,
  ]) {
    let fileExists = true;
    for (let size of imagePrefixes) {
      const source = path.join(imagesdir, addSizePrefix(name, size));
      const destination = addSizeSuffix(
        name,
        size.split('').reverse().join('')
      );
      if (fs.existsSync(source)) {
        await bucket.upload(source, {
          destination: destination,
          metadata: { metadata: { isResized: true } },
        });
        console.log('Uploaded', destination);
      } else {
        fileExists = false;
      }
    }

    if (fileExists) {
      await imagesRef.child(imagesRef.push().key).set({
        name: name,
        attribution: attribution,
        alt: alt,
        width: width,
        height: height,
      });
      console.log('Saved attributes in Database');
    }
  }

  firebase.delete();
  return `Successfully uploaded ${files.length} files.`;
};

const files = [...articleImages, ...frontmatterImages].reduce(
  (uploads, { name, attribution, alt, width, height }) => [
    ...uploads,
    ...imagePrefixes.map(size => ({
      source: path.join(imagesdir, addSizePrefix(name, size)),
      destination: addSizeSuffix(name, size.split('').reverse().join('')),
      name,
      attribution,
      alt,
      width,
      height,
    })),
  ],
  []
);

uploadFiles(files).then(console.log).catch(console.log);
