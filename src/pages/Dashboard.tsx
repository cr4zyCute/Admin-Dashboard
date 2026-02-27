import React from 'react';
import { ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import MetricCard from '../components/dashboard/MetricCard';
import AnalyticsChart from '../components/dashboard/AnalyticsChart';
import SalesReport from '../components/dashboard/SalesReport';
import { useAppContext } from '../context/AppContext';

const Dashboard: React.FC = () => {
  const { user } = useAppContext();

  const storePerformanceData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];

  const weeklyInsightsData = [
    { name: 'Mon', value: 2400 },
    { name: 'Tue', value: 1398 },
    { name: 'Wed', value: 9800 },
    { name: 'Thu', value: 3908 },
    { name: 'Fri', value: 4800 },
    { name: 'Sat', value: 3800 },
    { name: 'Sun', value: 4300 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800">eCommerce</h1>
        <div className="flex items-center text-sm text-slate-500">
          <span>Paces</span>
          <span className="mx-2">&gt;</span>
          <span>Dashboard</span>
          <span className="mx-2">&gt;</span>
          <span className="text-slate-800 font-medium">eCommerce</span>
        </div>
      </div>

      {/* Top Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Greeting Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg flex flex-col justify-between relative overflow-hidden h-full min-h-[160px]">
          <div className="relative z-10">
            <p className="text-blue-100 text-sm font-medium mb-1">GOOD DAY,</p>
            <h2 className="text-2xl font-bold">{user?.name || 'David Dev'}!</h2>
            <p className="text-blue-100 text-sm mt-4">Here's what's happening with your store today.</p>
          </div>
          <div className="relative z-10 mt-6 flex justify-between items-center text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <span className="bg-white/20 p-1.5 rounded">📅</span>
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 p-1.5 rounded">⏰</span>
              {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </div>
          </div>
          
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <div className="absolute bottom-0 right-10 w-24 h-24 bg-blue-500/30 rounded-full blur-xl"></div>
        </div>

        {/* Metric Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricCard
            title="ORDERS"
            value="9,754"
            change={{ percentage: 1.89, trend: 'down' }}
            icon={<ShoppingCart className="w-5 h-5" />}
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          <MetricCard
            title="REVENUE"
            value="$75.21k"
            change={{ percentage: 5.23, trend: 'down' }}
            icon={<DollarSign className="w-5 h-5" />}
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          <MetricCard
            title="GROWTH"
            value="+ 25.08%"
            change={{ percentage: 4.87, trend: 'up' }}
            icon={<TrendingUp className="w-5 h-5" />}
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
           <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-center items-center text-center">
             <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
               <DollarSign className="w-6 h-6 text-green-600" />
             </div>
             <p className="text-sm text-slate-500 mb-1">Total Profit</p>
             <p className="text-xl font-bold text-slate-800">$12,450</p>
           </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Store Performance Analytics"
          type="area"
          data={storePerformanceData}
          dataKey="value"
          color="#ef4444" // Red for poor sales as per design or maybe blue/green? Design showed "POOR SALES" badge. I'll use red/pink tone or standard blue. Let's use blue for chart but red badge is separate.
        />
        <AnalyticsChart
          title="Weekly Performance Insights"
          type="bar"
          data={weeklyInsightsData}
          dataKey="value"
          color="#3b82f6"
        />
      </div>

      {/* Sales Report */}
      <SalesReport />
    </div>
  );
};

export default Dashboard;
