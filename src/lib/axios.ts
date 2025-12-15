import axios from 'axios';
import { API_CONFIG } from '@/config/api.config';

const axiosClient = axios.create({
  baseURL: `${API_CONFIG.BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    console.log('[Axios Request]', config.method?.toUpperCase(), config.url);
    console.log('[Axios Request] Has token:', token ? 'YES' : 'NO');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('[Axios Request] Token added to headers');
    } else {
      console.log('[Axios Request] No token available');
    }
    return config;
  },
  (error) => {
    console.error('[Axios Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[Axios Error]', error);
    console.error('[Axios Error] URL:', error.config?.url);
    console.error('[Axios Error] Status:', error.response?.status);
    console.error('[Axios Error] Response:', error.response?.data);
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.error('[Axios] 401 Unauthorized - clearing auth and redirecting to login');
      
      // Don't redirect if already on login page or if this is the login request
      const isLoginRequest = error.config?.url?.includes('/login');
      const currentPath = window.location.pathname;
      
      if (!isLoginRequest && currentPath !== '/login') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export { axiosClient };

export const setClientToken = (token: string | null) => {
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('auth_token', token);
  } else {
    delete axiosClient.defaults.headers.common['Authorization'];
    localStorage.removeItem('auth_token');
  }
};
