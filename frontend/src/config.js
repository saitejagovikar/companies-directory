// API Configuration
const isProduction = process.env.NODE_ENV === 'production';

export const API_URL = isProduction 
  ? 'https://companies-directory-39z3.onrender.com' // Render backend URL
  : 'http://localhost:5003'; // Local development server

export default {
  API_URL,
};
