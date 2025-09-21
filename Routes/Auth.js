import {login, register} from "../Controllers/AuthCn.js";
import express from 'express';


const authRouter = express.Router();

authRouter.route('/').post(login)
authRouter.route('/register').post(register)

export default authRouter;