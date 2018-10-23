import {
  existsSync,
  realpathSync,
  readFileSync,
  writeFileSync,
} from 'fs-extra';
import { resolve } from 'path';
import * as spawn from 'cross-spawn';

export const npmInstall = (cwd: string) =>
  spawn('npm', ['--prefix', cwd, 'install'], {
    stdio: 'inherit',
  });

export const appDirectory = realpathSync(process.cwd());
export const resolveApp = (relativePath: string) =>
  resolve(appDirectory, relativePath);
export const resolveOwn = (relativePath: string) =>
  resolve(__dirname, '../..', relativePath);

export const checkFile = (
  filename: string,
  shouldLog: boolean = true
): boolean => {
  const exists = existsSync(resolveApp(filename));
  if (!exists && shouldLog) {
    console.log(`${filename} missing 🤦🏽‍♀️`);
  }
  return exists;
};

export const getProjectIds = (): string[] =>
  Object.values(
    JSON.parse(readFileSync(resolveApp('.firebaserc'), 'utf8')).projects
  );

export const writeEnvFile = (projectId: string, apiKey: string) =>
  writeFileSync(
    resolveApp('.env'),
    `REACT_APP_FIREBASE_PROJECT_ID=${projectId}
REACT_APP_FIREBASE_API_KEY=${apiKey}
REACT_APP_FIREBASE_AUTH_DOMAIN=${projectId}.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://${projectId}.firebaseio.com
REACT_APP_FIREBASE_STORAGE_BUCKET=${projectId}.appspot.com`
  );
