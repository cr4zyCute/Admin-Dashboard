import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Users,
  MousePointer2,
  Eye,
  ArrowUpRight,
  Mic,
  Send
} from 'lucide-react';
import { useAppContext } from '../../../context/AppContext';
import { cn } from '../../../lib/utils';

import MetricCard from './MetricCard'; 
  import { 
    pageViews as mockPageViews, 
    visitors as mockVisitors, 
    clicks as mockClicks, 
    orders as mockOrders, 
  totalProfit as mockTotalProfit, 
  totalProfitChange as mockTotalProfitChange, 
  weeklyData as mockWeeklyData, 
  profitData as mockProfitData, 
  repeatCustomerRate as mockRepeatCustomerRate, 
  products as mockProducts, 
  sparklineData as mockSparklineData, 
  sparklineData2 as mockSparklineData2, 
  sparklineData3 as mockSparklineData3, 
  sparklineData4 as mockSparklineData4,
  recentOrders as mockRecentOrders,
  locations as mockLocations,
  customerBreakdown as mockCustomerBreakdown,
  revenueLocationCard as mockRevenueLocationCard,
  profitLegend as mockProfitLegend,
  
  // Empty Data
  profitDataEmpty,
  customerBreakdownEmpty,
  weeklyDataEmpty,
  locationsEmpty
} from '../../../data/mockData';

// Shared Components
import { 
  CustomizationOverlay,
  RepeatCustomerSettingsOverlay 
} from './Overlays';
import { useState } from 'react';
import TotalProfitCard from './TotalProfitCard';
import MostActiveCard from './MostActiveCard';
import ProductsTable from './ProductsTable';
import OrdersTable from './OrdersTable';
import RevenueLocationCard from './RevenueLocationCard';
import { RadialBarChart, RadialBar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// NoData Component
const NoData = ({ message }: { message?: string }) => (
  <div className="flex items-center justify-center h-full w-full opacity-50">
     <div className="text-xs text-slate-400">{message || "No Data"}</div>
  </div>
);

interface AnalyticsDashboardProps {
  enableCustomization?: boolean;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ enableCustomization = false }) => {
  const { 
    dataState, 
    cardStyle, 
    chartType, 
    randomSeed,
    productTableStyle
  } = useAppContext();
  
  // Random Data Generation
  const randomData = useMemo(() => {
    if (dataState !== 'alternate') return null;

    const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const getRandomTrend = () => Math.random() > 0.5 ? 'up' : 'down';
    
    return {
      pageViews: { value: getRandom(10000, 30000).toLocaleString(), change: getRandom(1, 20), trend: getRandomTrend() },
      visitors: { value: getRandom(5000, 15000).toLocaleString(), change: getRandom(1, 20), trend: getRandomTrend() },
      clicks: { value: getRandom(2000, 8000).toLocaleString(), change: getRandom(1, 20), trend: getRandomTrend() },
      orders: { value: getRandom(500, 2000).toLocaleString(), change: getRandom(1, 20), trend: getRandomTrend() },
      
      sparkline1: mockSparklineData.map(d => ({ ...d, value: getRandom(10, 100) })),
      sparkline2: mockSparklineData2.map(d => ({ ...d, value: getRandom(10, 100) })),
      sparkline3: mockSparklineData3.map(d => ({ ...d, value: getRandom(10, 100) })),
      sparkline4: mockSparklineData4.map(d => ({ ...d, value: getRandom(10, 100) })),
      
      totalProfit: `$${getRandom(20, 100)}k`,
      totalProfitChange: getRandom(1, 15),
      profitData: mockProfitData.map(d => ({ ...d, sales: getRandom(500, 2000), stock: getRandom(20, 90) })),
      
      weeklyData: mockWeeklyData.map(d => ({ ...d, active: getRandom(1000, 8000) })),
      
      customerBreakdown: mockCustomerBreakdown.map(d => ({ ...d, value: getRandom(100, 1000).toString(), percentage: getRandom(10, 100) })),
      
      products: mockProducts.map(d => ({ ...d, sold: getRandom(100, 1000).toString(), revenue: `$${getRandom(1000, 5000)}` })),
      
      repeatCustomerRate: mockRepeatCustomerRate.map(d => ({ ...d, value: getRandom(50, 90) })),
      
      recentOrders: mockRecentOrders.map(d => ({ ...d, amount: `$${getRandom(50, 500)}` })),
      
      locations: mockLocations.map(d => ({ ...d, revenue: `$${getRandom(10, 50)}k` })),
      revenueLocationCard: { ...mockRevenueLocationCard, value: `$${getRandom(100, 500)}k` }
    };
  }, [dataState, randomSeed]);

  const [repeatCustomerChart, setRepeatCustomerChart] = useState<'radial' | 'pie' | 'gauge'>('radial');
  const [repeatCustomerColor, setRepeatCustomerColor] = useState('#10b981'); // Default Emerald
  const [showRepeatSettings, setShowRepeatSettings] = useState(false);

  // Card Style Helper
  const getCardClass = (additionalClasses = "", style = cardStyle) => {
    const base = "p-6 transition-all duration-300";
    let styleClass = "";
    
    // Use custom style if provided, otherwise default to global cardStyle
    const currentStyle = style === 'default' && cardStyle !== 'default' ? cardStyle : style;
    
    switch (currentStyle) {
      case 'flat':
        styleClass = "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700";
        break;
      case 'bordered':
        styleClass = "bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700";
        break;
      case 'glass':
        styleClass = "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg";
        break;
      case 'neo':
        styleClass = "bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0f172a,-8px_-8px_16px_#1e293b] border-none";
        break;
      default:
        styleClass = "bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700";
    }

    return cn(base, styleClass, additionalClasses);
  };

  // Helper to select data based on state
  const selectData = <T,>(defaultData: T, randomDataVal: T | undefined, emptyData: T): T => {
    if (dataState === 'default') return defaultData;
    if (dataState === 'alternate' && randomDataVal) return randomDataVal;
    return emptyData;
  };

  // Conditional Data
  const pageViews = selectData(mockPageViews, randomData?.pageViews as any, { value: "0", change: 0, trend: 'up' });
  const visitors = selectData(mockVisitors, randomData?.visitors as any, { value: "0", change: 0, trend: 'up' });
  const clicks = selectData(mockClicks, randomData?.clicks as any, { value: "0", change: 0, trend: 'down' });
  const orders = selectData(mockOrders, randomData?.orders as any, { value: "0", change: 0, trend: 'up' });
  
  const totalProfit = selectData(mockTotalProfit, randomData?.totalProfit, "$0");
  const totalProfitChange = selectData(mockTotalProfitChange, randomData?.totalProfitChange, 0);
  
  const weeklyData = selectData(mockWeeklyData, randomData?.weeklyData, weeklyDataEmpty);
  const profitData = selectData(mockProfitData, randomData?.profitData, profitDataEmpty);
  const repeatCustomerRate = selectData(mockRepeatCustomerRate, randomData?.repeatCustomerRate, []);
  const products = selectData(mockProducts, randomData?.products, []);
  
  const sparklineData = selectData(mockSparklineData, randomData?.sparkline1, []);
  const sparklineData2 = selectData(mockSparklineData2, randomData?.sparkline2, []);
  const sparklineData3 = selectData(mockSparklineData3, randomData?.sparkline3, []);
  const sparklineData4 = selectData(mockSparklineData4, randomData?.sparkline4, []);
  
  const recentOrders = selectData(mockRecentOrders, randomData?.recentOrders, []);
  const locations = selectData(mockLocations, randomData?.locations, locationsEmpty);
  
  const customerBreakdown = selectData(mockCustomerBreakdown, randomData?.customerBreakdown, customerBreakdownEmpty);
  const revenueLocationCardData = selectData(mockRevenueLocationCard, randomData?.revenueLocationCard, { title: 'No Data', subtitle: 'No records found', value: '0', label: 'ORDER' });
  const profitLegend = selectData(mockProfitLegend, undefined, null); // Keep legend static

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Top Metrics Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Card 1: Page Views */}
        <MetricCard 
          id="analytics-pageviews"
          title="Page Views"
          icon={<Eye className="w-5 h-5" />}
          iconColorClass="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
          value={pageViews.value}
          change={pageViews.change}
          trend={pageViews.trend as 'up' | 'down'}
          data={sparklineData}
          chartColor="#10b981"
          subText="vs. 14,653 last period"
          dataKey="value"
          chartType={chartType}
          enableCustomization={enableCustomization}
        />

        {/* Card 2: Visitors */}
        <MetricCard 
          id="analytics-visitors"
          title="Visitors"
          icon={<Users className="w-5 h-5" />}
          iconColorClass="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
          value={visitors.value}
          change={visitors.change}
          trend={visitors.trend as 'up' | 'down'}
          data={sparklineData2}
          chartColor="#6366f1"
          subText="vs. 5,732 last period"
          dataKey="value"
          chartType={chartType}
          enableCustomization={enableCustomization}
        />

        {/* Card 3: Click */}
        <MetricCard 
          id="analytics-clicks"
          title="Click"
          icon={<MousePointer2 className="w-5 h-5" />}
          iconColorClass="bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400"
          value={clicks.value}
          change={clicks.change}
          trend={clicks.trend as 'up' | 'down'}
          data={sparklineData3}
          chartColor="#f97316"
          subText="vs. 3,294 last period"
          dataKey="value"
          chartType={chartType}
          enableCustomization={enableCustomization}
        />

        {/* Card 4: Orders */}
        <MetricCard 
          id="analytics-orders"
          title="Orders"
          icon={<ShoppingCart className="w-5 h-5" />}
          iconColorClass="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
          value={orders.value}
          change={orders.change}
          trend={orders.trend as 'up' | 'down'}
          data={sparklineData4}
          chartColor="#3b82f6"
          subText="vs. 1,186 last period"
          dataKey="value"
          chartType={chartType}
          enableCustomization={enableCustomization}
        />
      </motion.div>

      {/* 2. Middle Section Grid (Charts) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        
        {/* Total Profit Chart (2/3 width) */}
        <TotalProfitCard 
          id="analytics-total-profit"
          totalProfit={totalProfit}
          totalProfitChange={totalProfitChange}
          profitLegend={profitLegend}
          profitData={profitData}
          dataState={dataState}
          customerBreakdown={customerBreakdown}
          enableCustomization={enableCustomization}
        />

        {/* Most Day Active (1/3 width) */}
        <MostActiveCard 
          id="analytics-most-active"
          weeklyData={weeklyData}
          dataState={dataState}
          enableCustomization={enableCustomization}
        />
      </motion.div>

      {/* 3. Bottom Section Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
      >
        
        {/* Left Column Stack (2/3 width) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Best Selling Products Table */}
          <ProductsTable products={products} enableCustomization={enableCustomization} />

          {/* Recent Orders Table (Only if Compact) */}
          {productTableStyle === 'compact' && (
            <OrdersTable orders={recentOrders} enableCustomization={enableCustomization} />
          )}
        </div>

        {/* Right Column Stack (1/3 width) */}
        <div className="lg:col-span-1 flex flex-col gap-6 h-fit">
          
          {/* Repeat Customer Rate */}
          <div 
            className={getCardClass("relative group")}
            onMouseEnter={() => enableCustomization && setShowRepeatSettings(true)}
            onMouseLeave={() => setShowRepeatSettings(false)}
          >
            {showRepeatSettings && enableCustomization && (
              <RepeatCustomerSettingsOverlay 
                chartType={repeatCustomerChart}
                setChartType={setRepeatCustomerChart}
                graphColor={repeatCustomerColor}
                setGraphColor={setRepeatCustomerColor}
                onClose={() => setShowRepeatSettings(false)}
              />
            )}
            <div className={cn("transition-all duration-300", showRepeatSettings ? "blur-sm" : "")}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 dark:text-white">Repeat Customer Rate</h3>
              </div>
              
              <div className="flex flex-col items-center justify-center relative">
                 {repeatCustomerRate && repeatCustomerRate.length > 0 ? (
                   <>
                     <div className="w-[200px] h-[160px] relative flex justify-center">
                       <ResponsiveContainer width="100%" height="100%">
                        {repeatCustomerChart === 'radial' ? (
                         <RadialBarChart 
                            innerRadius="80%" 
                            outerRadius="100%" 
                            data={repeatCustomerRate} 
                            startAngle={180} 
                            endAngle={0}
                         >
                           <RadialBar
                             background
                             dataKey="value"
                             cornerRadius={30}
                             fill={repeatCustomerColor}
                           />
                         </RadialBarChart>
                        ) : repeatCustomerChart === 'pie' ? (
                          <PieChart>
                            <Pie
                              data={[
                                { value: repeatCustomerRate[0]?.value || 0 },
                                { value: 100 - (repeatCustomerRate[0]?.value || 0) }
                              ]}
                              cx="50%"
                              cy="70%"
                              startAngle={180}
                              endAngle={0}
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              <Cell fill={repeatCustomerColor} />
                              <Cell fill="#e2e8f0" />
                            </Pie>
                          </PieChart>
                        ) : (
                          // Gauge Style (Simple Pie variant)
                          <PieChart>
                            <Pie
                              data={[
                                { value: repeatCustomerRate[0]?.value || 0 },
                                { value: 100 - (repeatCustomerRate[0]?.value || 0) }
                              ]}
                              cx="50%"
                              cy="70%"
                              startAngle={180}
                              endAngle={0}
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={0}
                              dataKey="value"
                              stroke="none"
                            >
                              <Cell fill={repeatCustomerColor} />
                              <Cell fill="#e2e8f0" />
                            </Pie>
                          </PieChart>
                        )}
                       </ResponsiveContainer>
                       {/* Center Text */}
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2 text-center">
                         <div className="text-3xl font-bold text-slate-800 dark:text-white" style={{ color: repeatCustomerColor }}>68%</div>
                         <div className="text-xs text-slate-400 mt-1">On track for 80% target</div>
                       </div>
                     </div>
                     <button className="mt-2 px-4 py-2 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors">
                       Show details
                     </button>
                   </>
                 ) : (
                   <NoData message="No customer data" />
                 )}
              </div>
            </div>
          </div>

          {/* AI Assistant */}
          <div className={getCardClass("flex-1 flex flex-col relative overflow-hidden")}>
             <div className="flex justify-between items-start mb-6 relative z-10">
               <h3 className="font-bold text-slate-800 dark:text-white">AI Assistant</h3>
               <button className="text-slate-400 hover:text-slate-600"><ArrowUpRight className="w-4 h-4" /></button>
             </div>

             <div className="flex-1 flex items-center justify-center relative z-10">
                {/* Glowing Orb Effect */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-blue-500 blur-xl opacity-40 animate-pulse"></div>
                  <div className="w-full h-full rounded-full bg-gradient-to-t from-blue-600 to-blue-400 opacity-90"></div>
                </div>
                
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <div className="grid grid-cols-6 gap-2">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="w-1 h-1 rounded-full bg-slate-500"></div>
                    ))}
                  </div>
                </div>
             </div>

             <div className="mt-6 relative z-10">
               <div className="bg-slate-50 dark:bg-slate-900 rounded-full p-1.5 flex items-center pl-4 pr-1.5 border border-slate-100 dark:border-slate-700">
                 <input 
                   type="text" 
                   placeholder="Ask me anything..." 
                   className="flex-1 bg-transparent border-none text-sm outline-none text-slate-600 dark:text-slate-300 placeholder:text-slate-400"
                 />
                 <div className="flex gap-1">
                    <button className="p-2 text-slate-400 hover:text-slate-600"><Mic className="w-4 h-4" /></button>
                    <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-sm"><Send className="w-3.5 h-3.5" /></button>
                 </div>
               </div>
             </div>
          </div>

          {/* Revenue By Locations */}
          <RevenueLocationCard 
            dataState={dataState} 
            revenueLocationCard={revenueLocationCardData} 
            locations={locations} 
            enableCustomization={enableCustomization}
          />

        </div>
      </motion.div>

      {/* 4. Full Width Recent Orders (Only if NOT Compact) */}
      {productTableStyle !== 'compact' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 gap-6"
        >
          <OrdersTable orders={recentOrders} enableCustomization={enableCustomization} />
        </motion.div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
