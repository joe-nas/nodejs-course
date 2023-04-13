/**
 *
 * @param {object} err - Instance of  Error
 * @param {object} res - Instance of  Response
 */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

/**
 *
 * @param {object} err - Instance of  Error
 * @param {object} res - Instance of  Response
 */
const sendErrorProd = (err, res) => {
  // Operational, trusted error, send message to client.
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.log('ERROR 💥💥💥', err);
    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

/**
 *
 * @param {object} err - Instance of  Error
 * @param {object} req - Instance of Request
 * @param {object} res - Instance of  Response
 * @param {function} next - next() function
 */
// by specifying 4 arguments Express knows this is an error handling middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};
