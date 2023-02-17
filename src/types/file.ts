export interface File {
  basePath?: string;
  showName: string;
  season?: string;
  file: {
    name: string;
    season?: string;
    episode: string;
    extension: string;
  };
}
