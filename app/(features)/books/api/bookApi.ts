import { apiClient } from '@/lib/api-client';
import { API_CONFIG } from '@/config/api.config';
import { Book, BookCreate, BooksListResponse } from '../types/book.types';

// This object contains all book-related API functions
// Think of it as a "toolbox" for book operations
export const bookApi = {
  
  // GET all books from /api/books/get
  getAll: async (): Promise<BooksListResponse> => {
    // Why async/await? API calls take time, we wait for response
    const response = await apiClient.get<BooksListResponse>(
      `${API_CONFIG.ENDPOINTS.BOOKS}/get`
    );
    
    // axios wraps data in response.data
    return response.data;
  },

  // POST create new book to /api/books/create
  create: async (bookData: BookCreate): Promise<Book> => {
    // Send book data in request body
    const response = await apiClient.post<Book>(
      `${API_CONFIG.ENDPOINTS.BOOKS}/create`,
      bookData // This becomes the JSON body
    );
    
    return response.data;
  },
  
  // You can add more methods here as your backend grows
  // getById: async (id: number) => { ... }
  // update: async (id: number, data: Partial<Book>) => { ... }
  // delete: async (id: number) => { ... }
};