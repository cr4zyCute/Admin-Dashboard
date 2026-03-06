import React from 'react';
import OrdersTable from '../../../components/dashboard/analytics/OrdersTable';
import { recentOrders as mockOrders } from '../../../data/mockData';

const Orders: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Orders</h1>
        <p className="text-sm sm:text-base text-slate-500">Customize table style and rows per page.</p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <OrdersTable orders={mockOrders} enableCustomization={true} />
      </div>
    </div>
  );
};

export default Orders;
