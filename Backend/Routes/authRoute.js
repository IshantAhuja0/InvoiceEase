import express from 'express'
import storeInvoice from '../controller/StoreInvoice.js';

const authRoute = express.Router();

authRoute.post('/storeinvoice',storeInvoice)

export default authRoute;