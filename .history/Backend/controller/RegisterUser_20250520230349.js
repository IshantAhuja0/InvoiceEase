import { getDB } from '../Mongo/mongo.js';
import bcrypt from 'bcrypt';
import {checkLoginForRegister} from './LoginUser.js';

const registerUser = async(req,res) =>{
  try {
let { name, email, mobile, password }=req.body;

    //check if user is already registered or not

    let checkLogin = await checkLoginForRegister({ email, password });
    console.log('chech login status : '+checkLogin.status);
    if (checkLogin.status == 404) {
      console.log('User is already registered');
      return { status: 404, message: 'User is already registered' }
    }

    const db = await getDB();
    const collection = db.collection('register_users');
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await collection.insertOne({
      name,
      email,
      mobile,
      password: hashedPassword,
      createdAt: new Date()
    });
      return res.status(200).send({
        status: 200,
        message: "User registered successfully",
        result
      });
  } catch (err) {
    console.error('❌ Error in RegisterUser.js:line 27 ', err.message);
        res.status(400).send({
      status: 400,
      message: "Error occurred while registering",
    });
    throw err;
  }
}

export default registerUser;
