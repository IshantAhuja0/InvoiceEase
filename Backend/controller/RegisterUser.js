import { getDB } from '../Mongo/mongo.js';
import bcrypt from 'bcrypt';
import { checkLoginForRegister } from './LoginUser.js';
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).send({
        status: 400,
        message: "All fields are required",
      });
    }

    // Check if user is already registered
const checkLogin = await checkLoginForRegister({ email });

if (checkLogin.status !== 404) {
  return res.status(409).send({
    status: 409,
    message: 'User is already registered'
  });
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

    if (!result.acknowledged) {
      console.error("Problem inserting user into DB");
      return res.status(500).send({
        status: 500,
        message: "User not registered, problem while inserting in DB (RegisterUser.js)"
      });
    }

    const payload = {
      name,
      email,
      mobile,
      id: result.insertedId,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.status(201).send({
      status: 201,
      message: "User registered successfully",
      userId: result.insertedId,
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
