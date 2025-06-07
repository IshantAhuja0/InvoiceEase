import express from 'express'
import { storeInvoice,updateInvoiceArray,getInvoiceArray } from '../controller/invoice.controller.js';
import { logoutUser } from '../controller/user.controller.js';

const authRoute = express.Router();

authRoute.post('/storeinvoice',storeInvoice)
//this accepts an id in url itself and can be accessed through req.params.id
authRoute.patch('/updateinvoicearray/:email',updateInvoiceArray)
//this return invoice array containig object id
authRoute.post('/getinvoicearray/:email',getInvoiceArray)

authRoute.post('/logout',logoutUser)

export default authRoute;