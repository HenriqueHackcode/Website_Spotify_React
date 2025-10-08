import { MongoClient } from 'mongodb';

const URI =
  'mongodb+srv://spotify_db:7GxcxB289Lii3TvH@cluster0.rbgks9x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(URI);

export const db = client.db('spotfydb');

// const songCollection = await db.collection('songs').find({}).toArray();

// console.log(songCollection);
