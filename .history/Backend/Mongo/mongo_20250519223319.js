const {MongoClient} =require('mongodb')
require('dotenv').config()
const url=process.env.
const dbName='invoice_backend'

function connectDB(){
  try{

  }
  catch(err){
    console.log('error occured while connecting to DB in backend mongo.js file line 7'+err);
  }
}