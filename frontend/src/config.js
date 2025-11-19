// API Configuration
const isProduction = process.env.NODE_ENV === 'production';

export const API_URL = isProduction
  ? 'https://companies-directory-39z3.onrender.com'
  : 'http://localhost:5003';

export default { API_URL };
