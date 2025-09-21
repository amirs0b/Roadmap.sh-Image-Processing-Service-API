import express from "express";
import {getAllUsers, getUserById, updateUserById} from "../Controllers/UserCn.js";
import isAdmin from "../Middlewares/IsAdmin.js";
import isLogin from "../Middlewares/IsLogin.js";

const userRouter = express.Router();

userRouter.route('/').get(isAdmin, getAllUsers)

userRouter.route('/:id').get(isLogin, getUserById).patch(isLogin, updateUserById)


export default userRouter;
