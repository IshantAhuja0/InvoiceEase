import { getDB } from '../Mongo/mongo.js';
import bcrypt from 'bcrypt';
import {login} from './LoginUser.js';

async function registerUser({ name, email, mobile, password }) {
  try {

    //check if user is already registered or not
    let checkLogin = await login({ email, password });
    if (checkLogin.status == 404) {
      return { status: 404, message: 'User is already registered' }
    }

    const db = getDB();
    const collection = db.collection('register_users');
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await collection.insertOne({
      name,
      email,
      mobile,
      password: hashedPassword,
      createdAt: new Date()
    });

    return result;
  } catch (err) {
    console.error('❌ Error in RegisterUser.js:line 27 ', err.message);
    throw err;
  }
}

export default registerUser;
