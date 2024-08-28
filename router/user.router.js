const express = require('express');

const router = express.Router();

const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');
const verifyToken = require('../middleware/verifyToken');

router.route('/signUp')
    .post(authController.signUp); 

router.route('/login')
    .post(authController.login);

router.route('/changeMyPassword/:id')
    .patch(verifyToken, authController.updatePassword);
    
router.route('/signOut/:id')
    .delete(verifyToken,authController.signOut);

router.route('/')
    .get(userController.getAllUsers)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/getSingleUser').get(userController.getSingleUser);

module.exports = router;