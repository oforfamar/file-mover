import { readdir } from 'fs/promises';
import path from 'path';
import move from './move';

const sourceFolder = path.resolve(__dirname, process.env.sourceFolder);

const now = new Date();
console.log(`Starting execution at - ${now}`);

(async () => {
  try {
    const files = await readdir(sourceFolder);
    for (const file of files) {
      await move(file);
    }
  } catch (error) {
    console.log(error);
  }
})();
