const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

//? 3. Routes
// this router is in fact a middle-ware
const router = express.Router();

// specify route and router in middleware.
// Mounting the router, mounting a router on a route
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
// router.post('/resetPassword', authController.resetPassword);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
