import Link from 'next/link';
import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <header className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
        <nav className="container mx-auto flex justify-between items-center p-4">
          <div className="space-x-4">
          </div>
        </nav>
      </header>
      <main className="container mx-auto pt-20 px-4 text-center">
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden max-w-xl mx-auto mb-8">
          <img
            src="https://i.pinimg.com/736x/b8/66/3a/b8663a0be6cacefdfd6d62a9c445035d.jpg"
            alt="Main"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto mt-8">
        
          <Link href="/products/create-product" passHref className="block bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md p-6 text-center transition transform hover:scale-105 link-reset">
              <h3 className="text-lg font-bold text-gray-800">Add Product</h3>
              <p className="text-sm text-gray-600">Creat your product.</p>
          </Link>
          <Link href="/products" passHref className="block bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md p-6 text-center transition transform hover:scale-105 pointer-events-auto link-reset">
              <h3 className="text-lg font-bold text-gray-800">Products</h3>
              <p className="text-sm text-gray-600">Browse our product catalog.</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
