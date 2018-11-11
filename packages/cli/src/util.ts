import {
  existsSync,
  realpathSync,
  readFileSync,
  writeFileSync,
} from 'fs-extra';
import { resolve } from 'path';
import * as spawn from 'cross-spawn';
import * as inquirer from 'inquirer';

import * as admin from 'firebase-admin';
import * as client from 'firebase-tools';
import * as ensureDefaultCredentials from 'firebase-tools/lib/ensureDefaultCredentials';
import * as logger from 'firebase-tools/lib/logger';
import * as winston from 'winston';

// enable console logging for firebase-tools
logger.add(winston.transports.Console, {
  level: process.env.DEBUG ? 'debug' : 'info',
  showLevel: false,
  colorize: true,
});

export const npmInstall = (cwd: string) =>
  new Promise((resolve, reject) => {
    const npm = spawn('npm', ['--prefix', cwd, 'install'], {
      stdio: 'inherit',
    });
    npm.on('close', resolve);
    npm.on('error', reject);
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

export const getProjectId = async () => {
  const projectIds = getProjectIds();
  let projectId;
  if (projectIds.length > 1) {
    projectId = (await inquirer.prompt<{ projectId: string }>([
      {
        type: 'list',
        name: 'projectId',
        message: 'Which project?',
        choices: projectIds,
      },
    ])).projectId;
  } else {
    projectId = projectIds[0];
  }
  try {
    await client.use(projectId, {});
  } catch (error) {
    if (
      error.message.startsWith('Command requires authentication, please run')
    ) {
      await initializeAndEnsureAuth(projectId);
      await client.use(projectId, {});
    } else {
      throw error;
    }
  }
  return projectId;
};

const initializeApp = (projectId: string) => {
  try {
    admin.initializeApp({ projectId });
  } catch (error) {
    if (error.code !== 'app/duplicate-app') {
      throw error;
    }
  }
};

export const writeEnvFile = (projectId: string, apiKey: string) =>
  writeFileSync(
    resolveApp('.env'),
    `REACT_APP_FIREBASE_PROJECT_ID=${projectId}
REACT_APP_FIREBASE_API_KEY=${apiKey}
REACT_APP_FIREBASE_AUTH_DOMAIN=${projectId}.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://${projectId}.firebaseio.com
REACT_APP_FIREBASE_STORAGE_BUCKET=${projectId}.appspot.com`
  );

export const initializeAndEnsureAuth = async (projectId: string) => {
  ensureDefaultCredentials();
  try {
    initializeApp(projectId);
  } catch (error) {
    if (error.code === 'app/invalid-credential') {
      await client.login({ localhost: false });
      ensureDefaultCredentials();
      initializeApp(projectId);
    } else {
      console.log(error);
    }
  }
};
