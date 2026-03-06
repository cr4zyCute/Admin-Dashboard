import React from 'react';
import ProductsTable from '../../../components/dashboard/analytics/ProductsTable';
import { products as mockProducts } from '../../../data/mockData';

const Products: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Products</h1>
        <p className="text-sm sm:text-base text-slate-500">Customize table style and rows per page.</p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <ProductsTable products={mockProducts} enableCustomization={true} />
      </div>
    </div>
  );
};

export default Products;
