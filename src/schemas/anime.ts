import { Schema, model } from 'mongoose';
import { Anime } from '../types/anime.js';

const schema = new Schema<Anime>(
  {
    fileName: { type: String, required: true, unique: true },
    basePath: { type: String, required: true },
    correctName: { type: String, required: false },
    season: { type: String, required: false },
    isLongRunning: { type: Boolean, required: false }
  },
  {
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true, versionKey: false }
  }
);

export const AnimeModel = model<Anime>('Anime', schema);
