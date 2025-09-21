import User from "../Models/UserMd.js";
import ApiFeatures, {catchAsync, HandleERROR} from "vanta-api";
import bcryptjs from "bcryptjs";

export const getAllUsers = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(User, req?.query, req?.role)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .populate()
    const result = await features.execute();
    res.status(200).json(result);
})

export const getUserById = catchAsync(async (req, res, next) => {
    const feature = new ApiFeatures(User, req?.query, req?.role)
        .addManualFilters(req.role === 'admin' ? {} : {_id: req.userId})
        .populate()
        .sort()
        .paginate()
        .filter()
        .limitFields()
    const result = await feature.execute()
    res.status(200).json(result);

})


export const updateUserById = catchAsync(async (req, res, next) => {
    if (req.role === 'admin' && req.userId !== req.params.id) {
        return next(new HandleERROR("Admins can only update their own profile", 403));
    }

    const user = await User.findById(req.params.id)
    user.username = req?.body?.username || user.username;
    user.password = req?.body?.password ? bcryptjs.hashSync(req.body.password, 10) : user.password;
    user.role = req?.body?.role && req.role === "admin" ? req.body.role : user.role;
    const newUser = await user.save();
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: newUser
    });
})