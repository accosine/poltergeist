import { getProjectId, resolveApp, initializeAndEnsureAuth } from '../util';
import { Storage } from '@google-cloud/storage';
import { existsSync, lstatSync, readdirSync } from 'fs-extra';
import * as path from 'path';

const getShallowFiles = (foldername: string) =>
  readdirSync(foldername)
    .map(file => path.join(foldername, file))
    .filter(file => !lstatSync(file).isDirectory());

export const uploadFile = (projectId: string, foldername: string) => {
  const storage = new Storage({ projectId });
  const bucket = storage.bucket(`gs://${projectId}.appspot.com`);
  return bucket.upload(foldername);
};

export default async (foldername: string): Promise<void> => {
  if (!existsSync(resolveApp(foldername))) {
    console.log('No such file or directory.');
    return;
  }

  const isDirectory = lstatSync(resolveApp(foldername)).isDirectory();

  console.log('  - now uploading');
  //TODO: progress bar for uploads
  try {
    const projectId = await getProjectId();
    await initializeAndEnsureAuth(projectId);

    if (isDirectory) {
      getShallowFiles(resolveApp(foldername)).forEach(async file => {
        try {
          await uploadFile(projectId, file);
        } catch (error) {
          console.log(file, error);
        }
      });
    } else {
      await uploadFile(projectId, resolveApp(foldername));
    }
  } catch (error) {
    console.log(error);
  }
};
