import express from 'express'
import { authCookie, login,registerUser, resetPassword } from '../controller/user.controller.js';
import aiResponseController from '../controller/aiResponse.controller.js';
import { forgetPassword } from '../controller/forgetPassword.controller.js';

const route = express.Router();

route.post('/login',login)
route.post('/register',registerUser)
route.post('/send-otp',forgetPassword)
route.post('/reset-password',resetPassword)
route.post('/doc-content',aiResponseController)
// GET /auth/me
route.get('/auth/me',authCookie);

export default route;

