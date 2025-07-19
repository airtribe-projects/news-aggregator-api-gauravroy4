const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const requestLogger = require('./middlewares/requestLogger');
const authRoutes = require('./routes/authRoutes');
const preferencesRoutes = require('./routes/preferencesRoutes');
const newsRoutes = require('./routes/newsRoutes');

dotenv.config();

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the News Aggregator API');
});

app.use('/users', authRoutes);
app.use('/users/preferences', preferencesRoutes);
app.use('/news', newsRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack);
  res.status(500).json({ error: 'Something went wrong, please try again later' });
});

// Start Server (No DB needed)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
