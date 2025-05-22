import express from 'express'
import registerUser from '../../Backend/controller/RegisterUser.js';

const route = express.Router();

// route.post('/login',login)
route.post('/register',registerUser)

export default route;

