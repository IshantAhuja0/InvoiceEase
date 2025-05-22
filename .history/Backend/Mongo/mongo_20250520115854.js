import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const url = process.env.MONGO_URI;
const dbName = 'invoice_backend';

let db;
const client = new MongoClient(url)
let dbConnection;
async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("connected to mongo db invoice_backend");
    dbConnection = db;
  }
  catch (err) {
    console.log('error occured while connecting to DB in backend mongo.js file line 15' + err);
  }
}

async function getDB() {
  try {
    return await dbConnection;
  }
  catch (err) {
    console.log('error occured while connecting to DB in backend mongo.js getDB function file line 23' + err);
  }
}
export {getDB,connectDB}