import express from 'express'
import { storeInvoice,getInvoiceArray, getInvoice, deleteInvoice } from '../controller/invoice.controller.js';
import { logoutUser } from '../controller/user.controller.js';

const authRoute = express.Router();

authRoute.post('/storeinvoice',storeInvoice)
//this return invoice array containig object id
authRoute.post('/getinvoicearray',getInvoiceArray)

authRoute.get('/getinvoice/:id',getInvoice)
authRoute.delete('/deleteinvoice/:id',deleteInvoice)
authRoute.post('/logout',logoutUser)

export default authRoute;