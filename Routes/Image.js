import express from 'express';
import { getMyImages, getImageById, transformImage } from '../Controllers/ImageCn.js';
import { uploadImage, removeImage } from '../Controllers/UploadCn.js';
import isLogin from '../Middlewares/IsLogin.js';
import upload from '../Utils/Upload.js';

const imageRouter = express.Router();


imageRouter.route('/').get(isLogin, getMyImages);





imageRouter.route('/:imageId').get(isLogin, getImageById).delete(isLogin, removeImage);

imageRouter.route('/:imageId/transform').post(isLogin, transformImage);

export default imageRouter;