import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('./images/home/original-a795304730af4bde8ec53c6c2304dd91.webp')"
      }}
    >
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg text-center max-w-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Not Found</h1>
        <p className="text-gray-700 mb-6">The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
