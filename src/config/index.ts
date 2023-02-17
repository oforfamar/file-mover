import type { Config } from '../types/config.js';

const config: Config = {
  mongoDbUrl: process.env.mongoDbUrl ?? '',
  sourceFolder: process.env.sourceFolder ?? '',
  defaultPath: process.env.defaultPath ?? '',
  provider: process.env.provider ?? '',
  resolution: process.env.resolution ?? '',
  extension: process.env.extension ?? '',
  delimiter: process.env.delimiter ?? ''
};

export default config;
