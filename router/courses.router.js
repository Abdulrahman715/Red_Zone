const express = require('express');

const router = express.Router();

const coursesController = require('../controller/courses.controller');

const verifyToken = require('../middleware/verifyToken');
const allowedTo = require('../middleware/allowedTo');
const userRoles = require('../utils/userRoles');


router.route('/')
    .get(coursesController.getAllCourses)
    .post(verifyToken,allowedTo(userRoles.doctor),coursesController.createCourse);

router.route('/getSingleCourse')
    .get(coursesController.getSingleCourse);

router.route('/updateCourse')
    .patch(coursesController.updateCourse);

router.route('/deleteCourse')
    .delete(coursesController.deleteCourse);

module.exports = router;