import express from 'express'
import { login } from '../controller/LoginUser.js';
import registerUser from '../controller/RegisterUser.js';
import storeInvoice from '../controller/StoreInvoice.js';

const route = express.Router();

route.post('/login',login)
route.post('/register',registerUser)
route.post('/storeinvoice',storeInvoice)

export default route;

