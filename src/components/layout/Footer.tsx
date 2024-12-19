import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} 1Admission. All rights reserved.
        </div>
      </div>
    </footer>
  );
}