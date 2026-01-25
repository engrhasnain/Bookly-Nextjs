import { Book } from '../types/book.types';

// Props interface: defines what data this component receives
interface BookCardProps {
  book: Book; // Single book object
  onEdit: (book: Book) => void;
}

// Functional component: a function that returns JSX (HTML-like syntax)
export default function BookCard({ book, onEdit }: BookCardProps) {
  return (
    // Tailwind classes for styling
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200">
      <button
  onClick={() => onEdit(book)}
  className="text-blue-600 hover:text-blue-800"
>
  ✏️
</button>

      {/* Book Title */}
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        {book.title}
      </h3>
      
      {/* Author */}
      <p className="text-gray-600 mb-4">
        by <span className="font-semibold">{book.author}</span>
      </p>
      
      {/* Book Details Grid */}
      <div className="space-y-2 mb-4">
        
        {/* Price */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Price:</span>
          <span className="text-xl font-bold text-green-600">
            ${book.price}
          </span>
        </div>
        
        {/* Pages */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Pages:</span>
          <span className="font-semibold text-black">{book.pages}</span>
        </div>
        
        {/* Published Year */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Published:</span>
          <span className="font-semibold text-black">{book.published_year}</span>
        </div>
        
      </div>
      
      {/* Stock Status Badge */}
      <div className="mt-4">
        {book.in_stock ? (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
            ✓ In Stock
          </span>
        ) : (
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
            ✗ Out of Stock
          </span>
        )}
      </div>
      
    </div>
  );
}