const asyncwrapper = require('../middleware/asyncwrapper');
const CourseContain = require('../models/coursesContain.model');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');


const getSingleCourseContain = asyncwrapper(async (req, res, next) => {
    const courseContain = await CourseContain.findById(req.query.id);

    if (!courseContain) {
        const error = new appError.create("this CourseContain not found", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            courseContain
        }
    })
});

const createCourseContain = asyncwrapper(async (req, res, next) => {
    const newCourseContain = await CourseContain.create(req.body);

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: {
            newCourseContain
        }
    })
});

const updateCourseContain = asyncwrapper(async (req, res, next) => {
    const updatedCourseContain = await CourseContain.findByIdAndUpdate(req.query.id, { $set: { ...req.body } });

    if (!updatedCourseContain) {
        const error = new appError.create("this CourseContain not found to update", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            updatedCourseContain
        }
    })
});

const deleteCourseContain = asyncwrapper(async (req, res, next) => {
    await CourseContain.deleteOne({ _id: req.query.id });

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: null,
        message:"this CourseContain is deleted successfully"
    })
});



module.exports = {
    getSingleCourseContain,
    createCourseContain,
    updateCourseContain,
    deleteCourseContain
}

