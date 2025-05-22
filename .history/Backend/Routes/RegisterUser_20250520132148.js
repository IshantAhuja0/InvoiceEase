import { getDB } from '../Mongo/mongo.js';
import bcrypt from 'bcrypt';

async function registerUser({ name, email, mobile, password }) {
  try {
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
    console.error('❌ Error in RegisterUser.js:', err.message);
    throw err;
  }
}

export default registerUser;
