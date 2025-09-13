import logger from '#src/config/logger.js';

export const errorMiddleware = (err, req, res, next) => {
  logger.error('Global error handler:', err);

  const statusCode = err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    error: 'Internal Server Error',
    message: message,
  });
};
