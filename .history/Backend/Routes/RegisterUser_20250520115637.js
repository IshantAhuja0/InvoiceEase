// const getDB = require('../Mongo/mongo.js')
import { getDB } from '../Mongo/mongo.js';
// const bcrypt = require('bcrypt')
import bcrypt from "bcrypt"
async function registerUser({ name, email, mobile, password }) {
  try {
    let db = await getDB();
    let connection = db.connection('register_users');
    const hashedPassword = await bcrypt.hash(password, 10);
    //this is syntax the key will be "name" and value inside name will be value which is stored corrospinding to name
    const result = await connection.insertOne({
      //this mean "name":name;
      name,
      email,
      mobile,
      password: hashedPassword,
      createdAt: new Date()
    });
    return result;
  }
  catch (err) {
console.log('error occured while register user backend RegisterUser.js file line 20')
  }
}
export default registerUser;