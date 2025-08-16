import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api', // Dynamically set base URL
});

// Request interceptor to add Authorization header
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;  // Add Bearer token to headers
    console.log("Authorization Header:", config.headers.Authorization);  // Log for debugging
  }
  return config;
}, error => {
  return Promise.reject(error);  // Handle request errors
});

export default api;
