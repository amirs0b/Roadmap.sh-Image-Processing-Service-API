import {catchAsync, HandleERROR} from "vanta-api";
import User from "../Models/UserMd.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = catchAsync(async (req, res, next) => {
    const {username = null, password = null} = req.body;
    if (!username || !password) {
        return next(new HandleERROR("Username and Password are required", 400));
    }
    const user = await User.findOne({username});
    if (!user) {
        return next(new HandleERROR("User not find", 400));
    }
    const confirmPassword = bcryptjs.compareSync(password, user.password);
    if (!confirmPassword) {
        return next(new HandleERROR("Password is incorrect", 400));
    }
    const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET);
    return res.status(200).json({
        status: "success",
        success: true
        , data: {
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        }
    });
})

export const register = catchAsync(async (req, res, next) => {
    const {username = null, password = null} = req.body;
    if (!username || !password) {
        return next(new HandleERROR("Username and Password are required", 400));
    }
    const user = await User.findOne({username});
    if (user) {
        return next(new HandleERROR("Username is already taken", 400));
    }
    const passReg = new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
    );
    if (!passReg.test(password)) {
        return next(
            new HandleERROR(
                "Password must contain at least 8 characters long, one uppercase letter, one lowercase letter, one number",
                400
            )
        );
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    await User.create({
        username,
        password: hashedPassword
    });
    return res.status(201).json({
        message: "User registered successfully",
        success: true
    });
})


