const User = require('../models/user.model');
const asyncwrapper = require('../middleware/asyncwrapper');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');

const getAllUsers = asyncwrapper(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        result: users.length,
        data: {
            users
        }
    });
});

const getSingleUser = asyncwrapper(async (req, res, next) => {
    
    const user = await User.findById(req.query.id);

    if (!user) {
        const error = new appError.create('this user not found', 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            user
        }
    });
});

const updateUser = asyncwrapper(async (req, res, next) => {
    
    const updatedUser = await User.findByIdAndUpdate(req.query.id, { $set: { ...req.body } });

    if (!updatedUser) {
        const error = new appError.create('this user not found to update', 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            updatedUser
        }
    });
});

const deleteUser = asyncwrapper(async (req, res, next) => {
    
    await User.deleteOne({ _id: req.query.id });

    res.status(204).json({
        status: httpStatusText.SUCCESS,
        data: null
    });
});

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
};