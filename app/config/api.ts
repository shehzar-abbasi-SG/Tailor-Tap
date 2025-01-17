import axios from 'axios';
import { getAuthData,clearAuthData } from '@/app/utils/auth';
import EventEmitter from 'events';

export const eventEmitter = new EventEmitter();

//http://172.20.1.33:8000/
//https://tailortap-server.onrender.com/
// Create an Axios instance
export const api = axios.create({
  baseURL: 'http://172.20.1.33:8000/',
  timeout: 5000,
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    const authData = await getAuthData();
    if (authData) {
      config.headers.Authorization = `Bearer ${authData.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const statusCode = error.response?.status;
    if (statusCode === 500) {
      return Promise.reject(new Error('Internal server error. Please try again later.'));
    }
    // token expiration or unauthorized access
    if (statusCode === 401) {
      console.warn('Unauthorized: Token expired or invalid. Logging out...');
      await clearAuthData();
      eventEmitter.emit('tokenExpire');
      return Promise.reject(new Error('Session expired. Please log in again.'));
    }
    return Promise.reject(error);
  }
);

