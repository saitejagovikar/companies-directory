// API Configuration
const isProduction = process.env.NODE_ENV === 'production';

// Base API URL
export const API_URL = isProduction
  ? 'https://companies-directory-39z3.onrender.com/api/companies'
  : 'http://localhost:5000/api/companies';
