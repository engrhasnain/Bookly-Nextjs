'use client';

import { useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import { useBooks } from './hooks/useBooks';

export default function BooksPage() {
  // ✅ ONE hook instance
  const booksState = useBooks();
  
  // ✅ Manage editing state
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📚 Bookly Library
          </h1>
          <p className="text-gray-600">
            Manage your book collection
          </p>
        </div>

        {/* ✅ Pass state DOWN */}
        <BookForm 
          addBook={booksState.addBook}
          updateBook={booksState.updateBook}
          editingBook={editingBook}
          cancelEdit={handleCancelEdit}
        />

        <div className="border-t border-gray-300 my-8"></div>

        <BookList
          books={booksState.books}
          loading={booksState.loading}
          error={booksState.error}
          onEdit={handleEdit}
        />

      </div>
    </div>
  );
}
