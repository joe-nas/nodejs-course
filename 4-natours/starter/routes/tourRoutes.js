const express = require('express');
const tourController = require('../controllers/tourController');
// this router is in fact a middle-ware
const router = express.Router();
// param middleware runs only on a particular parameter - here id
// router.param('id', tourController.checkID);

// specify route and router in middleware.
// Mounting the router, mounting a router on a route
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
