import sharp from 'sharp';
import { HandleERROR } from 'vanta-api';

export const applyTransformations = async (imagePath, transformations) => {
    try {
        let image = sharp(imagePath);

        if (transformations.resize) {
            image.resize(transformations.resize.width, transformations.resize.height);
        }
        if (transformations.crop) {
            image.extract({
                left: transformations.crop.x,
                top: transformations.crop.y,
                width: transformations.crop.width,
                height: transformations.crop.height,
            });
        }
        if (transformations.rotate) {
            image.rotate(transformations.rotate);
        }
        if (transformations.filters?.grayscale) {
            image.grayscale();
        }
        if (transformations.format) {
            image.toFormat(transformations.format);
        }

        return image.toBuffer();

    } catch (error) {
        throw new HandleERROR("Error processing the image.", 500);
    }
};