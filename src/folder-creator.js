import path from 'path';
import { existsSync, mkdirSync } from 'fs';

const ensureDirectoryExistence = filePath => {
  const dirName = path.dirname(filePath);

  if (existsSync(dirName)) {
    return true;
  }

  ensureDirectoryExistence(dirName);
  mkdirSync(dirName);
};

export default ensureDirectoryExistence;
