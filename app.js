const express = require('express');
const connectDB = require('./config/dbConnection.js');
const authRoutes = require('./src/routes/authRoutes.js');
const requestLogger = require('./src/middlewares/requestLogger.js');
const preferencesRoutes = require('./src/routes/preferencesRoutes.js');
const cookieParser = require('cookie-parser');
const newsRoutes = require('./src/routes/newsRoutes.js');
const config = require('./config/config');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the News Aggregator API');
});

app.use('/users', authRoutes);
app.use('/users/preferences', preferencesRoutes);
app.use('/news', newsRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack);
  res.status(500).json({ error: 'Something went wrong, please try again later' });
});

const PORT = config.PORT;

// Start server only after DB connects
const startServer = async () => {
  try {
    if (config.useMongoDB) {
      console.log('Using MongoDB for data storage');
      await connectDB();
    } else {
      console.log('Using in-memory database for data storage');
    }
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1);
  }
};

// Start the application
startServer();

module.exports = app;
