const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//? 1. Middleware
// Middleware: can modify the incoming request data
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); // adds the request body to request object, would be undefined otherwise
app.use(express.static(`${__dirname}/public`)); // if no route is specified sets argument to root folder
// specify route and router in middleware.
// Mounting the router, mounting a router on a route

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

// by specifying 4 arguments Express knows this is an error handling middleware
// ERROR HANDLING
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// ? 4. Start Server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`App running on port ${port}!`);
// });

module.exports = app;
