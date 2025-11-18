// API Configuration
const isProduction = process.env.NODE_ENV === 'production';

export const API_URL = isProduction
  ? process.env.REACT_APP_API_URL_PRODUCTION
  : process.env.REACT_APP_API_URL_DEVELOPMENT;

export default { API_URL };
