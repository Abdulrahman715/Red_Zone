const express = require('express');

const router = express.Router();

const gradesController = require('../controller/grade.controller');


router.route('/')
    .get(gradesController.getAllGrades)
    .post(gradesController.createGrade);

router.route('/getSingleGrade')
    .get(gradesController.getSingleGrade);

router.route('/updateGrade')
    .patch(gradesController.updateGrade);

router.route('/deleteGrade')
    .delete(gradesController.deleteGrade);

module.exports = router;