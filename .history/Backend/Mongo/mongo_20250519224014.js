const {MongoClient} =require('mongodb')
require('dotenv').config()
const url=process.env.MONGO_URI;
const dbName='invoice_backend';
const client=new MongoClient(url)
async function connectDB(){
  try{
await client.connect();
db=client.db(dbName);
console.log("connected to mongo db");
return db;
  }
  catch(err){
    console.log('error occured while connecting to DB in backend mongo.js file line 7'+err);
  }
}
export default connectDB;