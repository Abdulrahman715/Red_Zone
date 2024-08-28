const asyncwrapper = require('../middleware/asyncwrapper');
const Grade = require('../models/grades.model');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');


const getAllGrades = asyncwrapper(async (req, res, next) => {
    const grades = await Grade.find({}, { "__v": false });

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            grades
        }
    })
});

const getSingleGrade = asyncwrapper(async (req, res, next) => {
    const grade = await Grade.findById(req.query.id);

    if (!grade) {
        const error = new appError.create("this grade not found", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            grade
        }
    })
});

const createGrade = asyncwrapper(async (req, res, next) => {
    const newGrade = await Grade.create(req.body);

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: {
            newGrade
        }
    })
});

const updateGrade = asyncwrapper(async (req, res, next) => {
    const updatedGrade = await Grade.findByIdAndUpdate(req.query.id, { $set: { ...req.body } });

    if (!updatedGrade) {
        const error = new appError.create("this grade not found to update", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            updatedGrade
        }
    })
});

const deleteGrade = asyncwrapper(async (req, res, next) => {
    await Grade.deleteOne({ _id: req.query.id });

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: null,
        message:"this grade is deleted successfully"
    })
});



module.exports = {
    getAllGrades,
    getSingleGrade,
    createGrade,
    updateGrade,
    deleteGrade
}

