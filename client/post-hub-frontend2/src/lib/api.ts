import axios from 'axios';

const api = axios.create({
  baseURL: 'https://post-hub-js99.onrender.com/api',
  withCredentials: true,
});

// Add interceptor for Authorization header
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    // ensure headers object exists
    config.headers = config.headers ?? {};
    if (token) {
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    // debug: log token presence (remove in production)
    // eslint-disable-next-line no-console
    console.debug('API request', config.method, config.url, 'hasToken?', !!token);
  }
  return config;
});

export default api;