import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username must be unique"]
    },
    password: {
        type: String,
        required: [true, "PassWord is required"]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

}, {timestamps: true})

const User = mongoose.model('User', userSchema);
export default User;

