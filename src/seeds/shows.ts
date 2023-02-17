import '../env.js';
import mongoose from 'mongoose';
import config from '../config/index.js';
import connectToDb from '../helpers/db.js';
import { AnimeModel } from '../schemas/anime.js';
import type { Anime } from '../types/anime.js';

const HDD1 = '/media/ntfsdrive/Anime';
const HDD2 = '/media/ntfsdrive2/Anime';

async function seedAnime(): Promise<void> {
  const shows: Anime[] = [
    {
      fileName: 'One Piece',
      basePath: HDD1,
      isLongRunning: true
    },
    {
      fileName: 'Boruto - Naruto Next Generations',
      basePath: HDD1,
      isLongRunning: true
    },
    {
      fileName: 'Boku no Hero Academia',
      basePath: HDD1,
      season: '6'
    },
    {
      fileName: 'Spy x Family',
      basePath: HDD2,
      season: '2'
    },
    {
      fileName: 'Mob Psycho 100 S4',
      basePath: HDD1,
      correctName: 'Mob Psycho 100',
      season: '4'
    },
    {
      fileName: 'Jujutsu Kaisen',
      basePath: HDD2,
      season: '2'
    },
    {
      fileName: 'Majutsushi Orphen Hagure Tabi S3',
      basePath: HDD1,
      correctName: 'Majutsushi Orphen Hagure Tabi',
      season: '3'
    },
    {
      fileName: 'Maou Gakuin no Futekigousha S2',
      basePath: HDD1,
      correctName: 'Maou Gakuin no Futekigousha',
      season: '2'
    }
  ];

  try {
    await connectToDb(config.mongoDbUrl);
    await AnimeModel.insertMany(shows);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
}

seedAnime();
