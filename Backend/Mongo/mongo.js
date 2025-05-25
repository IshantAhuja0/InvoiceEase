import { MongoClient } from 'mongodb';
// import dotenv from 'dotenv';

// dotenv.config();
//or use direct uri of mongo
const url = 'mongodb+srv://first:first@democluster.dsslt6c.mongodb.net';
const dbName = 'invoice_backend';
let db;
const client = new MongoClient(url);

async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err.message);
    throw err;
  }
}

async function getDB() {
  
    await client.connect();
    db = client.db(dbName);
  if (!db) throw new Error("DB not initialized. Call connectDB() first.");
  return db;
}

export { connectDB, getDB };
