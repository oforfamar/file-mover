import db, { Mongoose } from 'mongoose';

async function connectToDb(url: string): Promise<Mongoose> {
  db.set('strictQuery', false);
  await db.connect(url);
  return db;
}

export default connectToDb;
