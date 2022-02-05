import getConfig from './config-loader';
import {
  seasonSubFolderCalculator,
  subFolderCalculator
} from './folder-names-calculator';

const config = getConfig();

class FileProcessor {
  folder = '';
  finalName = '';
  originalName = '';

  constructor(file) {
    this.file = file;
  }

  get() {
    return `${this.folder}/${this.finalName}`;
  }

  removeProvider() {
    this.finalName = this.file.replace(`${process.env.provider} `, '');
    return this;
  }

  addFolderName() {
    const parts = this.finalName.split(' - ');
    const episodeNumberWithResolution = parts.pop();
    this.folder = parts.join(' - ');

    if (config.changeName?.[this.folder]) {
      this.finalName = this.finalName.replace(
        this.folder,
        config.changeName[this.folder]
      );

      this.folder = this.folder.replace(
        this.folder,
        config.changeName[this.folder]
      );
    }

    this.originalName = this.folder;

    if (config.needsNumberFolder.indexOf(this.folder) === -1) {
      return this;
    }

    const episodeNumber = Number(episodeNumberWithResolution.split(' ')[0]);
    const subFolder = subFolderCalculator(episodeNumber);

    this.folder += `/${subFolder}`;

    return this;
  }

  removeResolutionAndRest() {
    const indexOfResolution = this.finalName.indexOf(process.env.resolution);

    if (indexOfResolution === -1) {
      throw new Error(
        `File: ${this.file} doesn't have the resolution inside it.`
      );
    }

    this.finalName = this.finalName.slice(0, indexOfResolution - 1); // removing the space in front as well
    this.finalName += `.${process.env.extension}`;

    return this;
  }

  addSeason() {
    const seasonNumber = config.seasons?.[this.originalName] ?? 1;
    const seasonFolder = seasonSubFolderCalculator(seasonNumber);
    this.finalName = this.finalName.replace(
      `${this.originalName} - `,
      `${seasonFolder}${this.originalName} - s0${seasonNumber}e`
    );
    return this;
  }
}

export default file => {
  const processor = new FileProcessor(file);
  const finalName = processor
    .removeProvider()
    .addFolderName()
    .removeResolutionAndRest()
    .addSeason()
    .get();

  return finalName;
};
