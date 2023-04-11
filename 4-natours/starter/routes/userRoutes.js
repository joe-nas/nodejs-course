const express = require('express');
const userController = require('./../controllers/userController');

//? 3. Routes
// this router is in fact a middle-ware
const router = express.Router();

// specify route and router in middleware.
// Mounting the router, mounting a router on a route
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
