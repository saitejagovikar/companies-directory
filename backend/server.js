require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const companiesRouter = require('./routes/companies');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://companies-directory-ochre.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Origin:', origin);
    console.log('Allowed origins:', allowedOrigins);
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('No origin, allowing request');
      return callback(null, true);
    }
    if (allowedOrigins.some(allowedOrigin => origin.startsWith(allowedOrigin))) {
      console.log('Origin allowed:', origin);
      return callback(null, true);
    }
    console.log('Origin not allowed:', origin);
    const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
    return callback(new Error(msg), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight for all routes
app.use(express.json());
app.use(morgan('dev'));

// Favicon route
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  const frontendBuildPath = path.join(__dirname, '../frontend/build');
  
  // Only serve static files if the build directory exists
  try {
    if (require('fs').existsSync(frontendBuildPath)) {
      app.use(express.static(frontendBuildPath));
      
      // Handle React routing, return all requests to React app
      app.get('*', (req, res) => {
        res.sendFile(path.join(frontendBuildPath, 'index.html'));
      });
      console.log('Serving static files from frontend build');
    } else {
      console.log('Frontend build not found. Running in API-only mode.');
    }
  } catch (err) {
    console.error('Error serving static files:', err);
  }
} else {
  // In development, serve static files from the backend's public directory
  app.use(express.static('public'));
  console.log('Running in development mode, serving static files from /public');
}

// Routes
app.use('/api/companies', companiesRouter);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Companies Directory API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
