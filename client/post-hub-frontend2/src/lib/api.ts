import axios from 'axios';

const api = axios.create({
  baseURL: 'https://post-hub-js99.onrender.com/api',
  withCredentials: true,
});

// Add interceptor for Authorization header
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;