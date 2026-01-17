import axios from 'axios';
import { API_CONFIG } from '@/config/api.config';

// Create an axios instance with default configuration
// This is like creating a "template" for all our API requests
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL, // All requests will start with this URL
  timeout: API_CONFIG.TIMEOUT,   // Requests will fail if they take longer than 10s
  headers: {
    'Content-Type': 'application/json', // Tell server we're sending JSON
  },
});

// REQUEST INTERCEPTOR
// This runs BEFORE every request is sent
// Think of it as a "gatekeeper" that can modify requests
apiClient.interceptors.request.use(
  (config) => {
    // You can add things here like authentication tokens
    // Example: config.headers.Authorization = `Bearer ${token}`;
    console.log('📤 Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    // Handle request errors (rare, usually network issues)
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
// This runs AFTER every response is received
// Think of it as a "quality checker" for responses
apiClient.interceptors.response.use(
  (response) => {
    // Success! Just return the response
    console.log('✅ Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    // Handle errors (404, 500, network failures, etc.)
    console.error('❌ API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);