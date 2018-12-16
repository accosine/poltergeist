const gcs = require('@google-cloud/storage')();
const path = require('path');
const sharp = require('sharp');

const addSizeSuffix = (name, suffix) => {
  const split = name.split('.');
  return (
    split.slice(0, split.length - 1).join('.') +
    suffix +
    '.' +
    split[split.length - 1]
  );
};

const streamAsPromise = stream =>
  new Promise((resolve, reject) =>
    stream.on('finish', resolve).on('error', reject)
  );

const runtimeOpts = {
  memory: '1GB',
};

module.exports = (exp, functions, admin) => {
  const config = functions.config();

  exp.thoughtography = functions
    .runWith(runtimeOpts)
    .storage.object()
    .onFinalize(
      ({
        metadata: fileMetadata,
        bucket: fileBucket,
        name: filePath,
        contentType,
      }) => {
        const imageSizes = config.application.images;

        // Exit if this is triggered on a file that is not an image.
        if (!contentType.startsWith('image/')) {
          console.log('This is not an image.');
          return null;
        }

        // Get the file name.
        const fileName = path.basename(filePath);

        // Exit if the image is already a thumbnail.
        if (!fileMetadata || !fileMetadata.shouldResize) {
          console.log('Resize not needed.');
          return null;
        }

        // Download file from bucket.
        const bucket = gcs.bucket(fileBucket);

        const metadata = { metadata: { contentType } };

        const pipeline = sharp();
        const promises = Promise.all(
          Object.keys(imageSizes).map(key => {
            const { width, suffix } = imageSizes[key];
            const thumbFilePath = path.join(
              path.dirname(filePath),
              addSizeSuffix(fileName, suffix)
            );
            const uploadStream = bucket
              .file(thumbFilePath)
              .createWriteStream(metadata);
            return streamAsPromise(
              pipeline
                .clone()
                .resize(Number(width))
                .pipe(uploadStream)
            );
          })
        );

        // pipe file through pipelines
        bucket
          .file(filePath)
          .createReadStream()
          .pipe(pipeline);

        return promises;
      }
    );
};
