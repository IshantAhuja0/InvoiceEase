import express from 'express'
import storeInvoice from '../controller/StoreInvoice.js';
import updateInvoiceArray from '../controller/UpdateInvoiceArray.js';

const authRoute = express.Router();

authRoute.post('/storeinvoice',storeInvoice)
//this accepts an id in url itself and can be accessed through req.params.id
authRoute.patch('/updateinvoicearray/:email',updateInvoiceArray)

export default authRoute;