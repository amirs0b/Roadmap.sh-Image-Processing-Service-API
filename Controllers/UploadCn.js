import {catchAsync, HandleERROR} from "vanta-api";
import Image from "../Models/ImageMd.js";

export const uploadImage = catchAsync(async (req, res, next) => {
    const file = req.file;
    if (!file) {
        return next(new HandleERROR("No file uploaded", 400));
    }
    const newImage = await Image.create({
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
        userId: req.userId,
        mimeType: file.mimetype
    })

    res.status(200).json({
        message: "file uploaded successfully",
        success: true,
        data: newImage
    })
})

