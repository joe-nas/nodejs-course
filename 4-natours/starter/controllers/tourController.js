const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
  // using our own middleware
  // console.log(req.requestTime);

  // formatting using JSend spec
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  // getting the req params from URL assigned to a variable
  // console.log(req.params);
  const id = req.params.id * 1; // convert string to number
  // const tour = tours.find((el) => el.id === id);

  // // formatting using JSend spec
  // res.status(200).json({
  //   status: 'success',
  //   // results: tours.length,
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = async (req, res) => {
  try {
    // req.body is the data that comes with the post request
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
