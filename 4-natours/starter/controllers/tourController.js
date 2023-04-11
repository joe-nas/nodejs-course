const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  // console.log(`Tour id is ${val}`);
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 400,
      message: 'Invalid tour Id',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 400,
      message: 'Missing name or price!',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  // using our own middleware
  // console.log(req.requestTime);

  // formatting using JSend spec
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  // getting the req params from URL assigned to a variable
  // console.log(req.params);
  const id = req.params.id * 1; // convert string to number
  const tour = tours.find((el) => el.id === id);

  // formatting using JSend spec
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  // eslint-disable-next-line prefer-object-spread
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    // eslint-disable-next-line no-unused-vars
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
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
