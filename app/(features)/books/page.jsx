import BookForm from './components/BookForm';
import BookList from './components/BookList';

// This is the main page component
// In Next.js App Router, page.tsx automatically becomes a route
export default function BooksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Container with max width and centered */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📚 Bookly Library
          </h1>
          <p className="text-gray-600">
            Manage your book collection
          </p>
        </div>

        {/* Book Form - Add new books */}
        <BookForm />

        {/* Divider */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            All Books
          </h2>
        </div>

        {/* Book List - Display all books */}
        <BookList />
        
      </div>
    </div>
  );
}