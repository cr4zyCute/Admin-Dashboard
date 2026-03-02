import React from 'react';

const Invoice: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">Invoice</h1>
      <p className="text-sm sm:text-base text-gray-600">Invoice content goes here.</p>
    </div>
  );
};

export default Invoice;
