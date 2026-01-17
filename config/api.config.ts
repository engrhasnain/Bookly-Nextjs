// This object holds all API configuration
// Using 'as const' makes it read-only for type safety
export const API_CONFIG = {
  // Base URL comes from environment variable with fallback
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  
  // All API endpoints in one place
  ENDPOINTS: {
    BOOKS: '/api/books', // Matches your FastAPI prefix
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
} as const;