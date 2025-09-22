import express from 'express';
import {
    getOneImageById,
    getTransformedImage, getOneImageByUserId, getAllImages
} from '../Controllers/ImageCn.js';
import isLogin from '../Middlewares/IsLogin.js';
import isAdmin from "../Middlewares/IsAdmin.js";

const imageRouter = express.Router();


imageRouter.route('/').get(isLogin, getOneImageByUserId).get(isAdmin, getAllImages);

imageRouter.route('/:imageId').get(isLogin, getOneImageById)

imageRouter.route('/:imageId/transform').post(isLogin, getTransformedImage);

export default imageRouter;