import express from 'express'
import { login,checkLoginForRegister } from "../controller/LoginUser";
import registerUser from '../controller/RegisterUser';

const route = express.Router();

route.post('/register',registerUser)

export default route;
