import {catchAsync, HandleERROR} from "vanta-api";
import fs from "fs";
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


export const removeImage = catchAsync(async (req, res, next) => {
    const {imageId} = req.params;
    if (!imageId) {
        return next(new HandleERROR("Image ID is required", 400));
    }

    const image = await Image.findById(imageId);

    if (!image) {
        return next(new HandleERROR("Image not found", 400));
    }
    if (image.userId.toString() !== req.userId && req.role !== 'admin') {
        return next(new HandleERROR("You are not authorized to delete this image", 403));
    }
    fs.unlinkSync(image.path);
    await Image.findByIdAndDelete(req.params.imageId);

    res.status(200).json({
        message: "Image removed successfully",
        success: true,
    })
})