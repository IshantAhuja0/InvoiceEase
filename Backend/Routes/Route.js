import express from 'express'
import { login,registerUser } from '../controller/user.controller.js';

const route = express.Router();

route.post('/login',login)
route.post('/register',registerUser)

export default route;

