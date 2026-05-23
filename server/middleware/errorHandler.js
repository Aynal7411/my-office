const mongoose = require('mongoose');

const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || (error instanceof mongoose.Error.ValidationError ? 400 : 500);
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message: statusCode >= 500 && isProduction ? 'Internal server error' : error.message,
    ...(error.details ? { details: error.details } : {}),
  });
};

module.exports = { notFound, errorHandler };
