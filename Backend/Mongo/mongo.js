import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://first:first@democluster.dsslt6c.mongodb.net';
const dbName = 'invoice_backend';

let client;
let db;

async function connectDB() {
  try {
    if (!client) {
      client = new MongoClient(url);
      await client.connect();
      db = client.db(dbName);
      console.log('✅ Connected to MongoDB Atlas');
    }
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err.message);
    throw err;
  }
}

function getDB() {
  if (!db) throw new Error("DB not initialized. Call connectDB() first.");
  return db;
}

export { connectDB, getDB };
