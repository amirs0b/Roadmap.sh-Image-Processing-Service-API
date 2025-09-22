import express from 'express';
import {
    getOneImageById,
    getTransformedImage, getOneImageByUserId, getAllImages, removeImage
} from '../Controllers/ImageCn.js';
import isLogin from '../Middlewares/IsLogin.js';
import isAdmin from "../Middlewares/IsAdmin.js";

const imageRouter = express.Router();


imageRouter.route('/').get(isLogin, getOneImageByUserId)

imageRouter.route('/all').get(isAdmin, getAllImages);

imageRouter.route('/:imageId').get(isLogin, getOneImageById).delete(isLogin, removeImage);

imageRouter.route('/:imageId/transform').post(isLogin, getTransformedImage);

export default imageRouter;