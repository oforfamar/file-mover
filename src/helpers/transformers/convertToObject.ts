import type { TransformCallback } from 'node:stream';
import config from '../../config/index.js';
import type { File } from '../../types/file.js';

function fixPossibleSplitErrors(parts: string[]): string[] {
  if (parts.length === 2) {
    return parts;
  }

  const episode = parts.pop() as string;
  const showName = parts.join(config.delimiter);

  return [showName, episode];
}

function convertToObject(
  chunk: string | Buffer,
  _: BufferEncoding,
  callback: TransformCallback
): void {
  const input = chunk.toString();
  const parts = input.split(config.delimiter);

  const [showName, episode] = fixPossibleSplitErrors(parts);

  const fileObj: File = {
    basePath: config.defaultPath,
    showName,
    season: 'Season 01',
    file: {
      name: parts[0],
      season: '01',
      episode,
      extension: config.extension
    }
  };

  callback(null, JSON.stringify(fileObj));
}

export default convertToObject;
