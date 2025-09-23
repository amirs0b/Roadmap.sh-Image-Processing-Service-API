import ApiFeatures, {catchAsync, HandleERROR} from 'vanta-api';
import Image from '../Models/ImageMd.js';
import {applyTransformations} from "../Utils/ImageProcessing.js";
import fs from "fs";


export const getAllImages = catchAsync(async (req, res, next) => {
    const feature = new ApiFeatures(Image, req?.query, req?.role)
        .filter()
        .sort()
        .paginate()
        .populate()
        .limitFields()
    const results = await feature.execute()
    res.status(200).json(results)
})

export const getOneImageByUserId = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Image, req?.query, req?.role)
        .addManualFilters(req.role === 'admin' ? {} : {_id: req.userId})
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .populate()
    const result = await features.execute()
    return res.status(200).json(result)
})

export const getOneImageById = catchAsync(async (req, res, next) => {
    const {imageId} = req.params;
    if (!imageId) {
        return next(new HandleERROR("Image ID is required", 400));
    }

    const image = await Image.findById(imageId);
    if (!image) {
        return next(new HandleERROR("Image not found", 404));
    }
    if (image.userId.toString() !== req.userId && req.role !== 'admin') {
        return next(new HandleERROR("You are not authorized to view this image", 403));
    }

    res.status(200).json({
        success: true,
        data: image
    })
})

export const getTransformedImage = catchAsync(async (req, res, next) => {
    const { imageId } = req.params;
    if (!imageId) {
        return next(new HandleERROR("Image ID is required", 400));
    }

    const image = await Image.findById(imageId);
    if (!image) {
        return next(new HandleERROR("Image not found", 404));
    }
    if (image.userId.toString() !== req.userId && req.role !== 'admin') {
        return next(new HandleERROR("You are not authorized to transform this image", 403));
    }

    const transformations = req.body;
    if (Object.keys(transformations).length === 0) {
        return next(new HandleERROR("No transformations provided", 400));
    }

    const originalPathInfo = path.parse(image.path);
    const newFilename = `${originalPathInfo.name}-${Date.now()}${transformations.format ? '.' + transformations.format : originalPathInfo.ext}`;
    const outputPath = path.join(path.dirname(image.path), newFilename);

    const transformedImageInfo = await applyTransformations(image.path, transformations, outputPath);

    const newImage = await Image.create({
        filename: newFilename,
        originalName: image.originalName,
        path: outputPath,
        size: transformedImageInfo.size,
        userId: req.userId,
        mimeType: transformations.format ? `image/${transformations.format}` : image.mimeType,
        originalImageId: imageId
    });

    res.status(201).json({
        message: "Image transformed and saved successfully",
        success: true,
        data: newImage
    });
});

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





