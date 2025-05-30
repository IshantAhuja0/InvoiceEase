import bcrypt from 'bcrypt';
import { getDB } from '../../Backend/Mongo/mongo.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let db = await getDB();
    let collection = db.collection('register_users');
    let result = await collection.findOne({ email });

    if (!result) {
      console.log('User not found!');
     return res.status(401).json({
        status:401,
        message:"User not found . Invalid email !"
      })
    }
    
    let matchPassword = await bcrypt.compare(password, result.password);
    if (!matchPassword) {
      console.log("Password doesn't match");
      return res.status(402).json({
        status:402,
        message:"Password doesn't matched!"
      })
    }
    const payload = {
      name:result.name,
      mobile:result.mobile,
      email:result.email,
      id:result._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
   return res.status(200).send({
      status: 200,
      message: 'Login successful',
      userId: result._id,
      response: result,
      token
    });
  } catch (error) {
    console.log('Error occurred while logging in user:', error);
    res.status(500).send({ status: 500, message: 'Login failed', error: error.message });
  }
};

async function checkLoginForRegister({ email }) {
  try {
    let db = await getDB();
    let collection = db.collection('register_users');
    let result = await collection.findOne({ email });

    if (!result) {
      return { status: 404, message: 'User not found, all set for register' };
    }

    return { status: 200, message: 'User exists', userId: result._id };
  } catch (error) {
    console.log('Error occurred in checkLoginForRegister:', error);
    return { status: 500, message: 'Internal server error' };
  }
}

export { login, checkLoginForRegister };
