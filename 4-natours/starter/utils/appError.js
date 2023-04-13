/**
 * AppError extends Error and handles operational errors.
 * @class
 * @classdesc AppError extends Error and handles operational errors.
 */

class AppError extends Error {
  /**
   * Error handler for operational errors.
   * @param {string} message - The error message
   * @param {number} statuscode - The statuscode
   */
  constructor(message, statuscode) {
    // calls parent constructor
    super(message); // message is the only parameter the error accepts

    this.statuscode = statuscode;
    this.status = `${statuscode}`.startsWith(4) ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
