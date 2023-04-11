const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

//? Constants etc
const db = `${__dirname}/dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(db));

//? 1. Middlewares
// Middleware: can modify the incoming request data
app.use(morgan('dev'));
app.use(express.json()); // adds the request body to request object, would be undefined otherwise

// own middleware: needs to positioned before route handler in order to being used
app.use((req, res, next) => {
  console.log('Hello this is our own middleware 🐶🐶');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//? 2. Route handlers

const getAllTours = (req, res) => {
  // using our own middleware
  console.log(req.requestTime);

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

const getTour = (req, res) => {
  // getting the req params from URL assigned to a variable
  // console.log(req.params);
  const id = req.params.id * 1; // convert string to number
  const tour = tours.find((el) => el.id === id);

  //   if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 400,
      message: 'Invalid message Id',
    });
  }

  // formatting using JSend spec
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(db, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 400,
      message: 'Invalid tour Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 400,
      message: 'Invalid tour Id',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

//? 3. Roures

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//? 4. Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}!`);
});
