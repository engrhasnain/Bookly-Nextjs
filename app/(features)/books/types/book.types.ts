// Main Book interface - matches your BookResponse from FastAPI
// This describes what a book object looks like
export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  pages: number;
  published_year: number;
  in_stock: boolean;
}

// For creating new books - matches your BookCreated from FastAPI
// We include 'id' because your backend expects it
export interface BookCreate {
  id: number;        // Your backend needs this
  title: string;
  author: string;
  price: number;
  pages: number;
  published_year: number;
  in_stock: boolean;
}

// Response when fetching multiple books
// Array of Book objects
export type BooksListResponse = Book[];

export type BookUpdate = {
  title: string;
  author: string;
  price: number;
  pages: number;
  in_stock: boolean;
};
