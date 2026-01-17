'use client'; // Next.js directive: this code runs in browser

import { useState, useEffect } from 'react';
import { bookApi } from '../api/bookApi';
import { Book, BookCreate } from '../types/book.types';

// Custom hook for managing books data and operations
// Hooks are functions that let you "hook into" React features
export const useBooks = () => {
  
  // STATE: Data that can change over time
  // useState returns [currentValue, functionToUpdateValue]
  const [books, setBooks] = useState<Book[]>([]);           // Array of books
  const [loading, setLoading] = useState(true);             // Is data loading?
  const [error, setError] = useState<string | null>(null);  // Any errors?

  // Function to fetch books from API
  const fetchBooks = async () => {
    try {
      setLoading(true);              // Show loading state
      const data = await bookApi.getAll(); // Fetch from API
      setBooks(data);                // Update state with data
      setError(null);                // Clear any previous errors
    } catch (err) {
      // If something goes wrong
      setError('Failed to fetch books');
      console.error('Error fetching books:', err);
    } finally {
      // Always runs, whether success or error
      setLoading(false);             // Hide loading state
    }
  };

  // EFFECT: Run side effects (like data fetching)
  // useEffect runs after component renders
  useEffect(() => {
    fetchBooks(); // Fetch books when component mounts
    
    // Empty dependency array [] means "run once on mount"
  }, []);

  // Function to add a new book
  const addBook = async (bookData: BookCreate) => {
    try {
      const newBook = await bookApi.create(bookData); // Create via API
      
      // Update local state immediately (optimistic update)
      setBooks((prevBooks) => [...prevBooks, newBook]);
      
      return newBook; // Return for component to use
    } catch (err) {
      setError('Failed to create book');
      throw err; // Re-throw so component can handle
    }
  };

  // Return everything the component needs
  // Components using this hook get access to all these values/functions
  return {
    books,      // Current list of books
    loading,    // Is loading?
    error,      // Any error message?
    refetch: fetchBooks, // Function to refresh data
    addBook,    // Function to add new book
  };
};