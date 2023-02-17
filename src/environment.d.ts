declare global {
  namespace NodeJS {
    interface ProcessEnv {
      mongoDbUrl: string;
      sourceFolder: string;
      defaultPath: string;
      provider: string;
      resolution: string;
      extension: string;
      delimiter: string;
    }
  }
}

export {};
