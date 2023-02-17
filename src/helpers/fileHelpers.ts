import fs from 'node:fs/promises';
import path from 'node:path';

export async function getFilesInFolder(folderPath: string): Promise<string[]> {
  try {
    const files = await fs.readdir(folderPath);
    return files;
  } catch (error) {
    console.error(`Error reading files from directory: ${error}`);
    return [];
  }
}

async function createFolders(dest: string): Promise<void> {
  const dir = path.dirname(dest);

  try {
    await fs.stat(dir);
  } catch (error) {
    await fs.mkdir(dir, { recursive: true });
  }
}

export async function moveFile(src: string, dest: string): Promise<void> {
  try {
    const stat = await fs.stat(src);

    if (!stat.isFile()) {
      throw new Error(`${src} is not a file`);
    }

    await createFolders(dest);
    await fs.copyFile(src, dest);
    await fs.chown(dest, 999, 999);
    await fs.unlink(src);

    console.log(`${src} -> ${dest}`);
  } catch (error) {
    console.log(error);
  }
}
