import React from 'react';
import { 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Activity, 
  Clock,
  Calendar,
  MoreVertical,
  RefreshCw,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import MetricCard from '../../components/dashboard/MetricCard';
import AnalyticsChart from '../../components/dashboard/AnalyticsChart';
import SalesReport from '../../components/dashboard/SalesReport';
import { useAppContext } from '../../context/AppContext';
import { cn } from '../../lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const Analytics: React.FC = () => {
  const { user } = useAppContext();

  // Reference data matching the screenshot
  const ordersData = { value: "9,754", change: 1.89, trend: 'down' as const };
  const revenueData = { value: "$75.21k", change: 5.23, trend: 'down' as const };
  const growthData = { value: "+ 25.08%", change: 4.87, trend: 'up' as const };

  const storePerformanceData = [
    { name: 'Completed', value: 76, color: '#3b82f6' }, // Blue
    { name: 'Pending', value: 24, color: '#fbbf24' },   // Yellow/Amber
  ];
  const totalPerformance = 140;

  const weeklyData = [
    { name: 'Mon', start: 28, end: 45 },
    { name: 'Tue', start: 32, end: 42 },
    { name: 'Wed', start: 29, end: 78 },
    { name: 'Thu', start: 30, end: 46 },
    { name: 'Fri', start: 35, end: 41 },
    { name: 'Sat', start: 45, end: 65 },
    { name: 'Sun', start: 41, end: 56 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-lg font-bold text-slate-700 dark:text-slate-200">eCommerce</h1>
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
          <span className="hover:text-blue-600 cursor-pointer">Paces</span>
          <span className="mx-2 text-slate-300 dark:text-slate-600">&gt;</span>
          <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
          <span className="mx-2 text-slate-300 dark:text-slate-600">&gt;</span>
          <span className="text-slate-700 dark:text-slate-300 font-medium">eCommerce</span>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:h-[420px]">
        
        {/* Left Column: Welcome + Revenue (1 col) */}
        <div className="lg:col-span-1 flex flex-col gap-6 h-full">
          {/* Welcome Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex-[1.2] flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">GOOD DAY,</p>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
                {user?.name?.split(' ')[0] || 'David'}
              </h2>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                {user?.name?.split(' ')[1] || 'Dev!'}
              </h2>
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mt-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })}</span>
              </div>
            </div>

            {/* Illustration Placeholder - Simplified to match style */}
            <div className="absolute right-2 top-8 w-24 h-24 opacity-90">
               {/* This would be the SVG illustration from the reference */}
               <div className="w-full h-full bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                 <span className="text-2xl">👋</span>
               </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="flex-1">
            <MetricCard
              title="REVENUE"
              value={revenueData.value}
              change={{ percentage: revenueData.change, trend: revenueData.trend }}
              icon={<Activity className="w-5 h-5" />}
              bgColor="bg-blue-50 dark:bg-blue-500/10"
              iconColor="text-blue-600 dark:text-blue-400"
            />
          </div>
        </div>

        {/* Middle Column: Orders + Growth (1 col) */}
        <div className="lg:col-span-1 flex flex-col gap-6 h-full">
          {/* Orders Card */}
          <div className="flex-[1.2]">
            <MetricCard
              title="ORDERS"
              value={ordersData.value}
              change={{ percentage: ordersData.change, trend: ordersData.trend }}
              icon={<ShoppingCart className="w-5 h-5" />}
              bgColor="bg-blue-50 dark:bg-blue-500/10"
              iconColor="text-blue-600 dark:text-blue-400"
            />
          </div>

          {/* Growth Card */}
          <div className="flex-1">
            <MetricCard
              title="GROWTH"
              value={growthData.value}
              change={{ percentage: growthData.change, trend: growthData.trend }}
              icon={<TrendingUp className="w-5 h-5" />}
              bgColor="bg-blue-50 dark:bg-blue-500/10"
              iconColor="text-blue-600 dark:text-blue-400"
            />
          </div>
        </div>

        {/* Right Column: Store Performance + Weekly Insights (2 cols) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          
          {/* Store Performance Analytics (Donut Chart) */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col h-full">
            <div className="mb-2">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Store Performance Analytics</h3>
              <button className="mt-4 flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <RefreshCw className="w-3 h-3" />
                Refresh
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px]">
              <div className="w-[180px] h-[180px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={storePerformanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={0}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                    >
                      {storePerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-slate-400 text-xs font-medium">Total</span>
                  <span className="text-2xl font-bold text-slate-800 dark:text-white">{totalPerformance}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 text-xs font-bold border border-red-100 dark:border-red-500/20">
                  <span className="w-3 h-3 flex items-center justify-center">★</span>
                  POOR SALES
                </span>
              </div>
            </div>
          </div>

          {/* Weekly Performance Insights (Custom Range/Dot Chart) */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Weekly Performance Insights</h3>
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 relative flex flex-col justify-between">
              {/* Background Grid */}
              <div className="absolute inset-0 flex justify-between pl-12 pointer-events-none">
                {[20, 30, 40, 50, 60, 70, 80].map((tick, i) => (
                  <div key={tick} className="h-full border-l border-dashed border-slate-100 dark:border-slate-700 w-0" style={{ left: `${i * (100/6)}%` }}></div>
                ))}
              </div>

              <div className="flex-1 flex flex-col justify-between pr-2 relative z-10">
                {weeklyData.map((day) => {
                  // Map range 20-80 to 0-100%
                  const getPos = (val: number) => ((val - 20) / 60) * 100;
                  const startPos = getPos(day.start);
                  const endPos = getPos(day.end);
                  
                  return (
                    <div key={day.name} className="flex items-center gap-4 text-xs group">
                      <span className="w-8 text-slate-400 font-medium">{day.name}</span>
                      <div className="flex-1 relative h-8 flex items-center">
                        {/* Horizontal Grid Line */}
                        <div className="absolute inset-x-0 h-[1px] border-t border-dashed border-slate-100 dark:border-slate-700 top-1/2 -translate-y-1/2"></div>
                        
                        {/* Connecting Line */}
                        <div 
                          className="absolute h-[2px] bg-blue-600 dark:bg-blue-500 top-1/2 -translate-y-1/2"
                          style={{ 
                            left: `${startPos}%`, 
                            width: `${endPos - startPos}%` 
                          }}
                        ></div>

                        {/* Start Dot */}
                        <div 
                          className="absolute w-3.5 h-3.5 bg-blue-600 dark:bg-blue-500 rounded-full border-2 border-white dark:border-slate-800 top-1/2 -translate-y-1/2 shadow-sm transition-transform group-hover:scale-110"
                          style={{ left: `${startPos}%`, transform: 'translate(-50%, -50%)' }}
                        ></div>

                        {/* End Dot */}
                        <div 
                          className="absolute w-3.5 h-3.5 bg-blue-600 dark:bg-blue-500 rounded-full border-2 border-white dark:border-slate-800 top-1/2 -translate-y-1/2 shadow-sm transition-transform group-hover:scale-110"
                          style={{ left: `${endPos}%`, transform: 'translate(-50%, -50%)' }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* X-Axis Labels */}
              <div className="flex justify-between pl-12 text-xs text-slate-400 mt-2 pt-2">
                {[20, 30, 40, 50, 60, 70, 80].map((tick) => (
                  <span key={tick} className="w-0 flex justify-center">{tick}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section: Sales Report */}
      <SalesReport />
      
      {/* Top Selling Products - New Section matching reference */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Top Selling Products</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5">
              <ArrowUpRight className="w-3 h-3" />
              Export
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5">
              <ArrowDownRight className="w-3 h-3" />
              Import
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3 font-medium">Product Name</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Quantity</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-700 flex-shrink-0 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop" alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-800 dark:text-white">Modern Fabric Sofa Set</div>
                      <div className="text-xs text-slate-500">By: Homeluxe</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">$499.00</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">34</td>
                <td className="px-4 py-3 font-medium text-slate-800 dark:text-white">$16,966.00</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20">
                    Low Stock
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-700 flex-shrink-0 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=100&h=100&fit=crop" alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-800 dark:text-white">Minimalist Desk Lamp</div>
                      <div className="text-xs text-slate-500">By: Lumin</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">$89.00</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">120</td>
                <td className="px-4 py-3 font-medium text-slate-800 dark:text-white">$10,680.00</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400 border border-green-100 dark:border-green-500/20">
                    In Stock
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-700 flex-shrink-0 overflow-hidden">
                       <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop" alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-800 dark:text-white">Wireless Headphones</div>
                      <div className="text-xs text-slate-500">By: SoundMax</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">$129.00</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">85</td>
                <td className="px-4 py-3 font-medium text-slate-800 dark:text-white">$10,965.00</td>
                <td className="px-4 py-3">
                   <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400 border border-green-100 dark:border-green-500/20">
                    In Stock
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;