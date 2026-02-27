import React from 'react';
import { Calendar, CreditCard, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SalesData {
  revenue: string;
  orders: number;
  growth: string;
}

const SalesReport: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('Monthly');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h3 className="text-lg font-semibold text-slate-800">
          Sales Report <span className="text-slate-400 font-normal text-sm ml-2">(25822 Orders)</span>
        </h3>
        
        <div className="flex bg-slate-50 p-1 rounded-lg">
          {['Today', 'Monthly', 'Annual'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                activeTab === tab 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
        <div className="flex items-center gap-4 px-4 py-4 md:py-0">
          <div className="p-3 bg-green-50 rounded-lg text-green-600">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Revenue</p>
            <p className="text-xl font-bold text-slate-800">$78,224.68</p>
          </div>
        </div>

        <div className="flex items-center gap-4 px-4 py-4 md:py-0">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Orders</p>
            <p className="text-xl font-bold text-slate-800">8,541</p>
          </div>
        </div>

        <div className="flex items-center gap-4 px-4 py-4 md:py-0">
          <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Growth Rate</p>
            <p className="text-xl font-bold text-slate-800 flex items-center gap-2">
              25.30%
              <span className="text-green-500 text-sm bg-green-50 px-1.5 py-0.5 rounded">↑ 4.2%</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center text-sm text-slate-500">
        <p>Today's Earning: <span className="font-semibold text-slate-700">$8,975.30</span></p>
        <p>Property PS007 is not receiving hits. Either your site is not receiving any sessions.</p>
      </div>
    </div>
  );
};

export default SalesReport;
