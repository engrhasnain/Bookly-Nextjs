'use client';

import { useState, useEffect } from 'react';
import { BookCreate, Book, BookUpdate } from '../types/book.types';

type Props = {
  addBook: (data: BookCreate) => Promise<void>;
  updateBook: ({ id, data }: { id: number; data: BookUpdate }) => Promise<void>;
  editingBook: Book | null;
  cancelEdit: () => void;
};


export default function BookForm({addBook, updateBook, editingBook, cancelEdit}: Props) {
  
  // State for form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // FORM STATE
  // Each input field has its own state
  const [formData, setFormData] = useState<BookCreate>({
    id: 0, // Will be set by backend
    title: '',
    author: '',
    price: 0,
    pages: 0,
    published_year: new Date().getFullYear(),
    in_stock: true,
  });

  // When editing a book, populate the form
  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook);
    }
  }, [editingBook]);

  // Handle input changes
  // This function updates state when user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    // Update the specific field that changed
    setFormData((prev) => ({
      ...prev, // Keep all other fields the same
      [name]: type === 'checkbox' 
        ? checked                    // For checkboxes, use checked
        : type === 'number' 
          ? Number(value)             // Convert string to number
          : value,                    // Keep as string
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    
    try {
      setIsSubmitting(true);
      
      // Check if we're editing or adding
      if (editingBook) {
        console.log('Updating book with ID:', editingBook.id);
        console.log('Editing book object:', editingBook);
        console.log('Form data:', formData);
        
        if (!editingBook.id) {
          alert('Error: Book ID is missing. Cannot update.');
          setIsSubmitting(false);
          return;
        }
        
        // Update existing book
        await updateBook({ id: editingBook.id, data: formData as BookUpdate });
        setSuccessMessage('✅ Book updated successfully!');
        cancelEdit();
      } else {
        // Create new book
        await addBook(formData);
        setSuccessMessage('✅ Book added successfully!');
        
        // Reset form
        setFormData({
          id: 0,
          title: '',
          author: '',
          price: 0,
          pages: 0,
          published_year: new Date().getFullYear(),
          in_stock: true,
        });
      }
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
      
    } catch (error) {
      console.error('Failed to save book:', error);
      alert('Failed to save book. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {editingBook ? 'Edit Book' : 'Add New Book'}
        </h2>
        {editingBook && (
          <button
            onClick={cancelEdit}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        )}
      </div>
      
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-green-700">{successMessage}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title Input */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter book title"
          />
        </div>

        {/* Author Input */}
        <div>
          <label className="block text-gray-600  font-semibold mb-2">
            Author *
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border text-black border-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter author name"
          />
        </div>

        {/* Price and Pages Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 border text-black border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>

          {/* Pages */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Pages *
            </label>
            <input
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        {/* Published Year */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Published Year *
          </label>
          <input
            type="number"
            name="published_year"
            value={formData.published_year}
            onChange={handleChange}
            required
            min="1000"
            max={new Date().getFullYear()}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* In Stock Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="in_stock"
            checked={formData.in_stock}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label className="ml-2 text-black font-semibold">
            In Stock
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (editingBook ? 'Updating...' : 'Adding...') : (editingBook ? 'Update Book' : 'Add Book')}
          </button>
          {editingBook && (
            <button
              type="button"
              onClick={cancelEdit}
              className="flex-1 bg-gray-400 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
        
      </form>
    </div>
  );
}