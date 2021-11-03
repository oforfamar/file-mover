import { load } from 'js-yaml';
import path from 'path';
import { readFileSync } from 'fs';

export default () => {
  try {
    const file = path.resolve(__dirname, process.env.configFile);
    const config = load(readFileSync(file, 'utf-8'));
    return config;
  } catch (error) {
    console.log('Could not load config file.');
    throw error;
  }
};
