import * as fs from 'node:fs';
import * as yaml from 'js-yaml';

export async function readConfig(filePath: string): Promise<object> {
  try {
    const config = await fs.promises.readFile(filePath, 'utf-8');
    return yaml.safeLoad(config);
  } catch (error) {
    console.error(`Could not read configuration file ${filePath}.`, err);
    process.exit(1);
  }
}
