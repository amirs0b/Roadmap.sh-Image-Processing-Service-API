import express from "express";
import upload from "../Utils/Upload.js";
import {removeImage, uploadImage} from "../Controllers/UploadCn.js";
import isAdmin from "../Middlewares/IsAdmin.js";
import isLogin from "../Middlewares/IsLogin.js";


const uploadRouter = express.Router();
uploadRouter.route('/').post(upload.single("image"), isLogin, uploadImage).delete(isAdmin, removeImage);


export default uploadRouter;