import path from 'path';
// import { createReadStream, createWriteStream } from 'fs';
// import { rm } from 'fs/promises';
import getFinalName from './file-name-processor';

const sourcePath = path.resolve(__dirname, process.env.sourceFolder);
const destPath = path.resolve(__dirname, process.env.destinationFolder);

export default async file => {
  const sourceFile = path.resolve(sourcePath, file);
  const destinationFile = path.resolve(destPath, getFinalName(file));

  console.log(destinationFile);

  // const readStream = createReadStream(sourceFile);
  // const writeStream = createWriteStream(destinationFile);

  // readStream.pipe(writeStream);

  // writeStream.on('close', async () => {
  //   console.log(`New file created: ${destinationFile}`);

  //   await rm(sourceFile);
  //   console.log(`Deleted file: ${sourceFile}`);
  // });
};
