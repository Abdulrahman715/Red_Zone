const asyncwrapper = require('../middleware/asyncwrapper');
const Course = require('../models/courses.model');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');


const getAllCourses = asyncwrapper(async (req, res, next) => {

    const query = req.query;

    const limit = query.limit || 100;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const Courses = await Course.find({}, { "__v": false }).limit(limit).skip(skip);

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        result: Courses.length,
        data: {
            Courses
        }
    })
});

const getSingleCourse = asyncwrapper(async (req, res, next) => {
    const course = await Course.findById(req.query.id);

    if (!course) {
        const error = new appError.create("this course not found", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            course
        }
    })
});

const createCourse = asyncwrapper(async (req, res, next) => {
    const newCourse = await Course.create(req.body);

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: {
            newCourse
        }
    })
});

const updateCourse = asyncwrapper(async (req, res, next) => {
    const updatedCourse = await Course.findByIdAndUpdate(req.query.id, { $set: { ...req.body } });

    if (!updatedCourse) {
        const error = new appError.create("this Course not found to update", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            updatedCourse
        }
    })
});

const deleteCourse = asyncwrapper(async (req, res, next) => {
    await Course.deleteOne({ _id: req.query.id });

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: null,
        message:"this Course is deleted successfully"
    })
});



module.exports = {
    getAllCourses,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse
}

