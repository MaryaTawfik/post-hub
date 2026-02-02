import axios from 'axios';

const api = axios.create({
  baseURL: 'https://post-hub-js99.onrender.com/api',
  withCredentials: true, // Crucial for cookies
});

export default api;