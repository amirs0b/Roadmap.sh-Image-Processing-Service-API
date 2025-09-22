import mongoose from "mongoose";

const ImageMdSchema = new mongoose.Schema({
    filename: {type: String, required: true},
    originalName: {type: String, required: true},
    path: {type: String, required: true},
    size: {type: Number, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    mimeType: {type: String, required: true},

},{
    timestamps: true
});

const Image = mongoose.model('Image', ImageMdSchema);

export default Image;