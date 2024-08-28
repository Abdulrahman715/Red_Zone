const asyncwrapper = require('../middleware/asyncwrapper');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');

const generateJWT = id => {
    
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const signUp = asyncwrapper(async (req, res, next) => {
    
    const newUser = await User.create(req.body);

    const token = generateJWT(newUser._id);

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        token,
        data: {
            newUser,
        }
    })
});

const login = asyncwrapper(async (req, res, next) => {
    
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new appError.create('please insert your email and password', 400, httpStatusText.FAIL);
        return next(error);
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        const error = appError.create('email or password may be wrong', 401, httpStatusText.FAIL);
        return next(error);
    }

    const token = generateJWT(user._id);

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            token
        }
    });

});

const updatePassword = asyncwrapper(async (req, res, next) => {
    
    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
        const error = appError.create('your current password is wrong', 401, httpStatusText.FAIL);
        return next(error);
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    await user.save();

    const token = generateJWT(user._id);

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            token
        },
        message: "password is changed successfully"
    });
});

const signOut = asyncwrapper(async (req, res, next) => {
    
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: httpStatusText.SUCCESS,
        data: null
    });
});

module.exports = {
    signUp,
    login,
    updatePassword,
    signOut
}