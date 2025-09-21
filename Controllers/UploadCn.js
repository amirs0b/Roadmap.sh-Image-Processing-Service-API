import {catchAsync, HandleERROR} from "vanta-api";
import fs from "fs";

export const uploadImage = catchAsync(async (req, res, next) => {
    const file = req.file;
    if (!file) {
        return next(new HandleERROR("No file uploaded", 400));
    }

    res.status(200).json({
        message: "file uploaded successfully",
        success: true,
        data: file
    })
})


export const removeImage = catchAsync(async (req, res, next) => {
    const {filename = null} = req.params;
    if (!filename) {
        return next(new HandleERROR("Filename is required", 400));
    }
    const normalizedFilename = filename.split("/").at[-1];
    if (!normalizedFilename) {
        return next(new HandleERROR("Invalid filename", 400));
    }
    const filePath = `${__dirname}/Public/Uploads/${normalizedFilename}`;
    fs.unlinkSync(filePath);
    res.status(200).json({
        message: "file removed successfully",
        success: true,
    })
})