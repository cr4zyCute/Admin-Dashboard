import React from 'react';

const Error500: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">500 - Internal Server Error</h1>
      <p className="text-gray-600">Something went wrong on our end.</p>
    </div>
  );
};

export default Error500;
