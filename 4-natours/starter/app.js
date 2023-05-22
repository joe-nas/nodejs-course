const express = require('express');
const morgan = require('morgan');
// const chalk = require('chalk');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
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
app.all('*', (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
);

// ERROR HANDLING
app.use(globalErrorHandler);

module.exports = app;
