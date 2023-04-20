const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

// this router is in fact a middle-ware
const router = express.Router();
// param middleware runs only on a particular parameter - here id
// router.param('id', tourController.checkID);

// specify route and router in middleware.
// Mounting the router, mounting a router on a route
router
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
