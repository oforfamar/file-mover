import { pipeline, Readable, Transform, Writable } from 'node:stream';
import { promisify } from 'node:util';
import type { File } from '../types/file.js';
import {
  removeProviderPrefixTransformer,
  removeResolutionSuffixTransformer,
  convertToObjectTransformer,
  overwriteWithInfoFromDbTransformer
} from './transformers/index.js';

const pipelinePromise = promisify(pipeline);

export async function getTransformedName(file: string): Promise<string> {
  let finalName = '';

  const removeProviderPrefix = new Transform({
    transform: removeProviderPrefixTransformer
  });

  const removeResolutionSuffix = new Transform({
    transform: removeResolutionSuffixTransformer
  });

  const convertToObject = new Transform({
    transform: convertToObjectTransformer
  });

  const overwriteWithInfoFromDb = new Transform({
    transform: overwriteWithInfoFromDbTransformer
  });

  const saveFullnameToVariable = new Writable({
    write(chunk, _, callback): void {
      const {
        basePath,
        showName,
        season,
        file: { name, episode, extension, season: fileSeason }
      }: File = JSON.parse(chunk.toString());
      finalName = [
        basePath,
        showName,
        season,
        `${name} - s${fileSeason}e${episode}.${extension}`
      ].join('/');
      callback();
    }
  });

  await pipelinePromise(
    Readable.from(file),
    removeProviderPrefix,
    removeResolutionSuffix,
    convertToObject,
    overwriteWithInfoFromDb,
    saveFullnameToVariable
  );

  return finalName;
}
