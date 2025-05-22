import express from 'express'
import registerUser from '../controller/RegisterUser';

const route = express.Router();

// route.post('/login',login)
route.post('/register',registerUser)

export default route;

