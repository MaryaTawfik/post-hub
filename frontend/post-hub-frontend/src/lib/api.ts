import axios from 'axios';

const api = axios.create({
  baseURL: 'https://post-hub-js99.onrender.com/api',
  withCredentials: true, // Crucial for sending/receiving cookies
});

// Add interceptors to handle 403 (Blocked) errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 && error.response?.data?.message?.includes('blocked')) {
      alert("Account Blocked: Please contact support.");
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;