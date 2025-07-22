const requestLogger = (req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(`[${currentTime}] ${req.method} request made to: ${req.originalUrl}`);
  console.log('Request Body:', req.body);
  next(); // Proceed to the next middleware/route handler
};

module.exports = requestLogger;