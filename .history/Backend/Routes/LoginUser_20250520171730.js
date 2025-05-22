import bcrypt from 'bcrypt';
import { getDB } from '../Mongo/mongo';
async function login({email,password}){
  try {
    let db=getDB();
    let collection=db.collection('register_users');
    let result=await collection.findOne({email});
    if(!result){
      throw new Error('User not found!')
    }
    let matchPassword=await bcrypt.compare(password,result.password);
    if(!matchPassword){
      throw new Error(`Password doesn't match`)
    }
      return {status:200, message: 'Login successful', userId: user._id };
  } catch (error) {
    console.log('error occured while login user in LoginUser.js line 17')
  }
}
export default login;