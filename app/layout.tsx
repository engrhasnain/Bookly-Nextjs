import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bookly - Book Management",
  description: "Manage your book collection with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {/* Navigation Header */}
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              
              {/* Logo */}
              <Link href="/" className="text-2xl font-bold text-blue-600">
                📚 Bookly
              </Link>
              
              {/* Navigation Links */}
              <div className="space-x-4">
                <Link 
                  href="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
                <Link 
                  href="/books"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Books
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main>{children}</main>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="container mx-auto text-center">
            <p>© 2026 Bookly. Built with Next.js & FastAPI</p>
          </div>
        </footer>
        
      </body>
    </html>
  );
}