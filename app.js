const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const preferencesRoutes = require('./routes/preferencesRoutes');
const newsRoutes = require('./routes/newsRoutes');
const config = require('./config/config');
const PORT = config.port;

dotenv.config();

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

//const requestLogger = require('./middlewares/requestLogger');

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

app.listen(PORT, (err) => {
      if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${PORT}`);
});

module.exports = app;
