import express from 'express'
import { login,checkLoginForRegister } from "../controller/LoginUser";
import registerUser from '../controller/RegisterUser';

const authlogin = express.Router();

authlogin.post('/register',registerUser)

export default authlogin;
