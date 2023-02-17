import './env.js';
import mongoose from 'mongoose';
import config from './config/index.js';
import connectToDb from './helpers/db.js';
import { getFilesInFolder, moveFile } from './helpers/fileHelpers.js';
import { getTransformedName } from './helpers/nameHelpers.js';

async function main(): Promise<void> {
  try {
    await connectToDb(config.mongoDbUrl);

    const files = await getFilesInFolder(config.sourceFolder);

    for (const file of files) {
      const sourceFile = `${config.sourceFolder}/${file}`;
      const destinationFile = await getTransformedName(file);

      await moveFile(sourceFile, destinationFile);
    }
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
}

main();
