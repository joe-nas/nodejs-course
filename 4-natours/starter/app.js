const fs = require('fs');
const express = require('express');

const app = express();

// Middleware: can modify the incoming request data
app.use(express.json()); // adds the request body to request object, would be undefined otherwise

const port = 3000;
const db = `${__dirname}/dev-data/data/tours-simple.json`;

//server
app.listen(port, () => {
  console.log(`App running on port ${port}!`);
});

// routing in express
const tours = JSON.parse(fs.readFileSync(db));

//* getting all tours
//callback is called the route handler in express
app.get('/api/v1/tours', (req, res) => {
  // formatting using JSend spec
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

//* getting a particular tour
// app.get('/api/v1/tours/:id?', (req, res) => {  // :id? optional parameter

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

app.delete('/api/v1/tours/:id', (req, res) => {
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
});

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });
