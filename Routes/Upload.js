import express from "express";
import upload from "../Utils/Upload.js";
import { uploadImage} from "../Controllers/UploadCn.js";



const uploadRouter = express.Router();
uploadRouter.route('/').post(upload.single("image"), uploadImage)


export default uploadRouter;