import type { TransformCallback } from 'node:stream';
import config from '../../config/index.js';

function removeResolutionSuffix(
  chunk: string | Buffer,
  _: BufferEncoding,
  callback: TransformCallback
): void {
  const file = chunk.toString();
  const indexOfResolution = file.indexOf(config.resolution);

  if (indexOfResolution === -1) {
    return callback(null, file);
  }

  const newFile = file.slice(0, indexOfResolution - 1).trim();

  callback(null, newFile);
}

export default removeResolutionSuffix;
