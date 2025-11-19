require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const companiesRouter = require('./routes/companies');

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed frontend domains
const allowedOrigins = [
  'http://localhost:3000',
  'https://companies-directory-ochre.vercel.app',
];

// CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('CORS not allowed'), false);
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/companies', companiesRouter);

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
