import * as fs from 'node:fs';
import * as path from 'node:path';

export async function moveFile(src: string, dest: string): Promise<void> {
  try {
    const stat = await fs.promises.stat(src);

    if (!stat.isFile()) {
      throw new Error(`${src} is not a file`);
    }

    await fs.promises.copyFile(src, dest);
    await fs.promises.unlink(src);

    console.log(`${src} moved to ${dest}`);
  } catch (error) {
    console.log(error);
  }
}
