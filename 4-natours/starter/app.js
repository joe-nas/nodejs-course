const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const express = require('express');
const morgan = require('morgan');

const app = express();

//? 1. Middlewares
// Middleware: can modify the incoming request data
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); // adds the request body to request object, would be undefined otherwise
app.use(express.static(`${__dirname}/public`)); // if no route is specified sets argument to root folder
// specify route and router in middleware.
// Mounting the router, mounting a router on a route

// own middleware: needs to positioned before route handler in order to being used
app.use((req, res, next) => {
  console.log('Hello this is our own middleware 🐶🐶');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// ? 4. Start Server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`App running on port ${port}!`);
// });

module.exports = app;
