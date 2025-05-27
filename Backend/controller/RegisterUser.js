import { getDB } from '../Mongo/mongo.js';
import bcrypt from 'bcrypt';
import { checkLoginForRegister } from './LoginUser.js';
import jwt from "jsonwebtoken"
const registerUser = async (req, res) => {
  try { 
    const { name, email, mobile, password } = req.body;

    // Check if user is already registered
    const checkLogin = await checkLoginForRegister({ email, password });
    console.log('Check login status:', checkLogin.status);

    if (checkLogin.status !== 404) {
      console.log('User is already registered');
      return res.status(409).send({ status: 409, message: 'User is already registered' });
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
 
    if(!result.acknowledged){
  console.log("problem while register_users in db")
  return res.status(500).send({
    status:500,
    message:"user not registered problem while insertig in db RegisterUser.js",
    insertId:result.insertedId,
  })
}
      const option = {
        expiresIn: "1d",
      };
      const token = jwt.sign(user, process.env.JWT_SECRET, option);

    return res.status(200).send({
      status: 200,
      message: "User registered successfully",
      result,
      token
    });
  } catch (err) {
    console.error('❌ Error in RegisterUser.js:', err.message);
    return res.status(500).send({
      status: 500,
      message: "Error occurred while registering",
    });
  }
};

export default registerUser;
