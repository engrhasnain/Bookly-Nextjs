'use client';

import { useBooks } from '../hooks/useBooks';
import BookCard from './BookCard';
import { Book } from '../types/book.types';

type Props = {
  books: Book[];
  loading: boolean;
  error: string | null;
};

// This component fetches and displays all books
export default function BookList({ books, loading, error }: Props) {
  
  // Use our custom hook to get books data
  // Destructure the values we need
  // const { books, loading, error } = useBooks();

  // LOADING STATE
  // Show while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-100px">
        <div className="text-center">
          {/* Loading spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading books...</p>
        </div>
      </div>
    );
  }

  // ERROR STATE
  // Show if something went wrong
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-100px">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-600 text-center">❌ {error}</p>
        </div>
      </div>
    );
  }

  // EMPTY STATE
  // Show if no books exist
  if (books.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-100px">
        <div className="text-center">
          <p className="text-gray-500 text-xl">📚 No books available yet</p>
          <p className="text-gray-400 mt-2">Add your first book to get started!</p>
        </div>
      </div>
    );
  }

  // SUCCESS STATE
  // Show grid of books
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Map over books array and render BookCard for each */}
      {books.map((book) => (
        // key prop helps React identify which items changed
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}