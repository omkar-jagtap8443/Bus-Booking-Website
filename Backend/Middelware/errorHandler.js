export const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode >= 400 ? res.statusCode : 500;
  res.status(statusCode);

  res.json({
    message: err.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};
