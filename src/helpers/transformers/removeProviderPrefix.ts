import type { TransformCallback } from 'node:stream';
import config from '../../config/index.js';

function removeProviderPrefix(
  chunk: string | Buffer,
  _: BufferEncoding,
  callback: TransformCallback
): void {
  const file = chunk.toString().replace(config.provider, '').trim();
  callback(null, file);
}

export default removeProviderPrefix;
