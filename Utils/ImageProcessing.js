import sharp from 'sharp';
import { HandleERROR } from 'vanta-api';
import fs from 'fs';

export const applyTransformations = async (imagePath, transformations, outputPath) => {
    try {
        let image = sharp(imagePath);

        if (transformations.resize) {
            image = image.resize(transformations.resize.width, transformations.resize.height);
        }
        if (transformations.crop) {
            image = image.extract({
                left: transformations.crop.x,
                top: transformations.crop.y,
                width: transformations.crop.width,
                height: transformations.crop.height,
            });
        }
        if (transformations.rotate) {
            image = image.rotate(transformations.rotate);
        }
        if (transformations.filters?.grayscale) {
            image = image.grayscale();
        }
        if (transformations.format) {
            image = image.toFormat(transformations.format);
        }

        await image.toFile(outputPath);
        const stats = fs.statSync(outputPath);
        return {
            path: outputPath,
            size: stats.size,
        };

    } catch (error) {
        console.error(error);
        throw new HandleERROR("Error processing the image.", 500);
    }
};