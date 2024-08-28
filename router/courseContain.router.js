const express = require('express');

const router = express.Router();

const coursesContainController = require('../controller/coursesContain.controller');

router.route('/')
    .post(coursesContainController.createCourseContain);

router.route('/getCourseContain')
    .get(coursesContainController.getSingleCourseContain);

router.route('/updateCourseContain')
    .patch(coursesContainController.updateCourseContain);

router.route('/deleteCourseContain')
    .delete(coursesContainController.deleteCourseContain);

module.exports = router;