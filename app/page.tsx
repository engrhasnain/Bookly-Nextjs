import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen `bg-gradient-to-br` from-blue-50 to-indigo-100 flex items-center justify-center">
      
      <div className="text-center">
        
        {/* Logo/Icon */}
        <div className="text-8xl mb-6">📚</div>
        
        {/* Title */}
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          Bookly
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-8">
          Your Personal Book Management System
        </p>
        
        {/* Call to Action Button */}
        <Link 
          href="/books"
          className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          Browse Books →
        </Link>
        
      </div>
    </div>
  );
}