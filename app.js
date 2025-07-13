const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const requestLogger = require('./middlewares/requestLogger');

dotenv.config();

const app = express();

app.use(express.json());
app.use(requestLogger);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the News Aggregator API');
});

app.use('/api/newsapp/auth', authRoutes);

// Global error handler
// app.use((err, req, res, next) => {
//   console.error('Global Error Handler:', err.stack);
//   res.status(500).json({ error: 'Something went wrong, please try again later' });
// });

const PORT = process.env.PORT || 3000;

// Start server only after DB connects
const startServer = async () => {
  try {
    await connectDB();
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

// Global exception handlers
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

module.exports = app;
