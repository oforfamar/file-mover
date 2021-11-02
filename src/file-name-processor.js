class FileProcessor {
  constructor(file) {
    this.file = file;

    this.folder = '';
    this.finalName = '';
  }

  get() {
    return `${this.folder}/${this.finalName}`;
  }

  removeProvider() {
    this.finalName = this.file.replace(`${process.env.provider} `, '');
    return this;
  }

  addFolderName() {
    this.folder = this.finalName.split(' - ')[0];
    return this;
  }

  removeResolutionAndRest() {
    const indexOfResolution = this.finalName.indexOf(process.env.resolution);

    if (indexOfResolution === -1) {
      throw new Error(`File: ${this.file} doesn't have the resolution inside it.`);
    }

    this.finalName = this.finalName.slice(0, indexOfResolution-1); // removing the space in front as well
    this.finalName += `.${process.env.extension}`;

    return this;
  }

  addSeason() {
    this.finalName = this.finalName.replace(' - ', ' - s01e');
    return this;
  }
}

export default file => {
  const processor = new FileProcessor(file);
  const finalName = processor.removeProvider()
    .addFolderName()
    .removeResolutionAndRest()
    .addSeason()
    .get();

  return finalName;
};
