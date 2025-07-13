const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const requestLogger = require('./middlewares/requestLogger');
const preferencesRoutes = require('./routes/preferencesRoutes');
const cookieParser = require('cookie-parser');
const newsRoutes = require('./routes/newsRoutes');

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the News Aggregator API');
});

app.use('/api/newsapp/auth', authRoutes);
app.use('/api/newsapp/preferences', preferencesRoutes);
app.use('/api/newsapp/news', newsRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack);
  res.status(500).json({ error: 'Something went wrong, please try again later' });
});

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

module.exports = app;
