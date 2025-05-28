import express from 'express'
import { login } from '../controller/LoginUser.js';
import registerUser from '../controller/RegisterUser.js';

const route = express.Router();

route.post('/login',login)
route.post('/register',registerUser)

export default route;

