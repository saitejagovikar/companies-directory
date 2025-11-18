// API Configuration
const isProduction = process.env.NODE_ENV === 'production';

export const API_URL = isProduction 
  ? 'https://your-render-backend.onrender.com' // Replace with your Render backend URL
  : ''; // Empty string uses the proxy in development (see package.json)

export default {
  API_URL,
};
