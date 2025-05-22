import bcrypt from 'bcrypt';
import { getDB } from '../../Backend/Mongo/mongo.js';

const login=async(req,res)=> {
  try {
    let { email, password }=req.body;
    let db = getDB();
    let collection = db.collection('register_users');
    let result = await collection.findOne({ email });
    if (!result) {
      throw new Error('User not found!')
    }
    let matchPassword = await bcrypt.compare(password, result.password);
    if (!matchPassword) {
      throw new Error(`Password doesn't match`)
    }
    res.send(
       { status: 200, message: 'Login successful', userId: user._id ,response:result
       }
    )
  } catch (error) {
    console.log('error occured while login user in LoginUser.js line 17' + err)
  }
}

async function checkLoginForRegister({ email, password }) {
  try {
    let db = getDB();
    let collection = db.collection('register_users');
    let result = await collection.findOne({ email });

    if (!result) {
      return { status: 404, message: 'User not found, all set for register' };
    }

    return { status: 200, message: 'User exists', userId: result._id }; // fixed user._id
  } catch (error) {
    console.log('Error occurred in checkLoginForRegister:', error);
    return { status: 500, message: 'Internal server error' }; // ✅ Ensure something is always returned
  }
}
export  {login,checkLoginForRegister};
