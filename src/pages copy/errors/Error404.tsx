import React from 'react';

const Error404: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-sm sm:text-base text-gray-600">The page you are looking for does not exist.</p>
    </div>
  );
};

export default Error404;
