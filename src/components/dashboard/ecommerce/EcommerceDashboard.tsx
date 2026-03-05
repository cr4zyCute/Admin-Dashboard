import React, { useState } from 'react';
import { 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Package, 
  MoreHorizontal,
  ChevronRight
} from 'lucide-react';
import MetricCard from '../MetricCard';
import { cn } from '../../../lib/utils';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    LineChart,
    Line,
    ComposedChart,
    PieChart,
    Pie,
    Legend
  } from 'recharts';
import { useAppContext } from '../../../context/AppContext';
import { CustomizationOverlay, TableSettingsOverlay } from '../analytics/Overlays';
import { ChartType, TableStyle } from '../../../types';

interface EcommerceDashboardProps {
  enableCustomization?: boolean;
}

const EcommerceDashboard: React.FC<EcommerceDashboardProps> = ({ enableCustomization = false }) => {
  const { 
    cardStyle,
    ecommerceSalesChartType: globalSalesType,
    setEcommerceSalesChartType: setGlobalSalesType,
    ecommerceSalesChartColor: globalSalesColor,
    setEcommerceSalesChartColor: setGlobalSalesColor,
    ecommerceCategoryChartType: globalCategoryType,
    setEcommerceCategoryChartType: setGlobalCategoryType,
    ecommerceCategoryChartColor: globalCategoryColor,
    setEcommerceCategoryChartColor: setGlobalCategoryColor,
    ecommerceStackedColors: globalStackedColors,
    setEcommerceStackedColors: setGlobalStackedColors,
    ecommerceRecentOrdersStyle: globalOrdersStyle,
    setEcommerceRecentOrdersStyle: setGlobalOrdersStyle
  } = useAppContext();

  // Customization State (synced with global)
  // We use global state directly to ensure real-time updates
  const salesChartType = globalSalesType;
  const salesChartColor = globalSalesColor;
  const [showSalesSettings, setShowSalesSettings] = useState(false);

  const ecommerceCategoryChartType = globalCategoryType;
  const categoryChartColor = globalCategoryColor;
  const stackedColors = globalStackedColors;
  const [showCategorySettings, setShowCategorySettings] = useState(false);

  const recentOrdersStyle = globalOrdersStyle;
  const [showOrdersSettings, setShowOrdersSettings] = useState(false);

  // Update handlers
  const handleSalesTypeChange = (type: ChartType) => {
    setGlobalSalesType(type);
  };

  const handleSalesColorChange = (color: string) => {
    setGlobalSalesColor(color);
  };

  const handleCategoryTypeChange = (type: ChartType) => {
    setGlobalCategoryType(type);
  };

  const handleCategoryColorChange = (color: string) => {
    setGlobalCategoryColor(color);
  };

  const handleStackedColorsChange = (colors: { mobile: string; desktop: string; app: string }) => {
    setGlobalStackedColors(colors);
  };

  const handleOrdersStyleChange = (style: TableStyle) => {
    setGlobalOrdersStyle(style);
  };

  const salesData = [
    { name: 'Jan', sales: 4000, revenue: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398 },
    { name: 'Mar', sales: 5000, revenue: 9800 },
    { name: 'Apr', sales: 2780, revenue: 3908 },
    { name: 'May', sales: 1890, revenue: 4800 },
    { name: 'Jun', sales: 2390, revenue: 3800 },
    { name: 'Jul', sales: 3490, revenue: 4300 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 400, mobile: 200, desktop: 150, app: 50, color: '#3b82f6' },
    { name: 'Fashion', value: 300, mobile: 180, desktop: 80, app: 40, color: '#10b981' },
    { name: 'Home', value: 300, mobile: 100, desktop: 150, app: 50, color: '#f59e0b' },
    { name: 'Beauty', value: 200, mobile: 120, desktop: 60, app: 20, color: '#ef4444' },
  ];

  const recentOrders = [
    { id: '#ORD-7542', customer: 'Emma Watson', product: 'iPhone 15 Pro', amount: '$999.00', status: 'Delivered', date: 'Oct 24, 2023' },
    { id: '#ORD-7543', customer: 'John Doe', product: 'MacBook Air M2', amount: '$1,199.00', status: 'Processing', date: 'Oct 23, 2023' },
    { id: '#ORD-7544', customer: 'Sarah Smith', product: 'iPad Pro', amount: '$799.00', status: 'Shipped', date: 'Oct 22, 2023' },
    { id: '#ORD-7545', customer: 'Mike Johnson', product: 'Apple Watch', amount: '$399.00', status: 'Cancelled', date: 'Oct 21, 2023' },
  ];

  // Helper for card styles (similar to AnalyticsDashboard)
  const getCardClass = (additionalClasses = "") => {
    const base = "p-6 transition-all duration-300 relative group";
    let styleClass = "";
    
    switch (cardStyle) {
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

  const getTableClass = () => {
    const base = "relative group transition-all duration-300";
    switch (recentOrdersStyle) {
      case 'modern':
        return cn(base, "bg-white dark:bg-slate-900 rounded-3xl shadow-lg border-none");
      case 'compact':
        return cn(base, "bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-none");
      case 'bordered':
        return cn(base, "bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-700");
      default:
        return getCardClass("overflow-hidden !p-0");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Ecommerce Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
            Download Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
            Create Order
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$128,430"
          change={{ percentage: 12.5, trend: 'up' }}
          icon={<DollarSign className="w-5 h-5" />}
          bgColor="bg-emerald-50 dark:bg-emerald-500/10"
          iconColor="text-emerald-600 dark:text-emerald-400"
          className={getCardClass()}
        />
        <MetricCard
          title="Total Orders"
          value="4,250"
          change={{ percentage: 8.2, trend: 'up' }}
          icon={<ShoppingCart className="w-5 h-5" />}
          bgColor="bg-blue-50 dark:bg-blue-500/10"
          iconColor="text-blue-600 dark:text-blue-400"
          className={getCardClass()}
        />
        <MetricCard
          title="Average Order"
          value="$30.20"
          change={{ percentage: 2.4, trend: 'down' }}
          icon={<TrendingUp className="w-5 h-5" />}
          bgColor="bg-violet-50 dark:bg-violet-500/10"
          iconColor="text-violet-600 dark:text-violet-400"
          className={getCardClass()}
        />
        <MetricCard
          title="Total Products"
          value="1,240"
          change={{ percentage: 5.1, trend: 'up' }}
          icon={<Package className="w-5 h-5" />}
          bgColor="bg-amber-50 dark:bg-amber-500/10"
          iconColor="text-amber-600 dark:text-amber-400"
          className={getCardClass()}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Sales Overview Area Chart */}
        <div 
            className={getCardClass("xl:col-span-2")}
            onMouseEnter={() => enableCustomization && setShowSalesSettings(true)}
            onMouseLeave={() => setShowSalesSettings(false)}
        >
          {showSalesSettings && enableCustomization && (
            <CustomizationOverlay 
              activeChartType={salesChartType} 
              activeChartColor={salesChartColor} 
              setLocalChartType={handleSalesTypeChange} 
              setLocalChartColor={handleSalesColorChange} 
            />
          )}
          <div className={cn("transition-all duration-300", showSalesSettings ? "blur-sm" : "")}>
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 dark:text-white">Sales Overview</h3>
                <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-xs font-semibold px-3 py-1.5 focus:ring-2 focus:ring-blue-500 cursor-pointer">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 12 Months</option>
                </select>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                {salesChartType === 'bar' ? (
                    <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                            labelStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="sales" fill={salesChartColor} radius={[4, 4, 0, 0]} />
                    </BarChart>
                ) : salesChartType === 'line' ? (
                    <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                            labelStyle={{ color: '#fff' }}
                        />
                        <Line type="monotone" dataKey="sales" stroke={salesChartColor} strokeWidth={3} dot={{ r: 4, fill: salesChartColor }} />
                    </LineChart>
                ) : salesChartType === 'composed' ? (
                     <ComposedChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="revenue" fill={salesChartColor} opacity={0.3} radius={[4, 4, 0, 0]} />
                        <Line type="monotone" dataKey="sales" stroke={salesChartColor} strokeWidth={3} />
                     </ComposedChart>
                ) : (
                    <AreaChart data={salesData}>
                        <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={salesChartColor} stopOpacity={0.1}/>
                            <stop offset="95%" stopColor={salesChartColor} stopOpacity={0}/>
                        </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                        <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="sales" stroke={salesChartColor} strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                )}
                </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category Distribution Bar Chart */}
        <div 
            className={getCardClass()}
            onMouseEnter={() => enableCustomization && setShowCategorySettings(true)}
            onMouseLeave={() => setShowCategorySettings(false)}
        >
          {showCategorySettings && enableCustomization && (
            <CustomizationOverlay 
              activeChartType={ecommerceCategoryChartType} 
              activeChartColor={categoryChartColor} 
              setLocalChartType={handleCategoryTypeChange} 
              setLocalChartColor={handleCategoryColorChange}
              stackedColors={stackedColors}
              setStackedColors={handleStackedColorsChange}
              allowedChartTypes={['bar', 'pie', 'stacked']} 
            />
          )}
          <div className={cn("transition-all duration-300", showCategorySettings ? "blur-sm" : "")}>
            <h3 className="font-bold text-slate-800 dark:text-white mb-6">Sales by Category</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                {ecommerceCategoryChartType === 'pie' ? (
                    <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                        <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={35}
                            outerRadius={55}
                            paddingAngle={5}
                            dataKey="value"
                            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                            labelStyle={{ color: '#fff' }}
                        />
                    </PieChart>
                ) : ecommerceCategoryChartType === 'stacked' ? (
                     <BarChart data={categoryData} layout="vertical" margin={{ left: -20, right: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} width={70} />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                        <Legend iconType="circle" />
                        <Bar dataKey="mobile" stackId="a" fill={stackedColors.mobile} radius={[4, 0, 0, 4]} />
                        <Bar dataKey="desktop" stackId="a" fill={stackedColors.desktop} radius={[0, 0, 0, 0]} />
                        <Bar dataKey="app" stackId="a" fill={stackedColors.app} radius={[0, 4, 4, 0]} />
                    </BarChart>
                ) : (
                    <BarChart data={categoryData} layout="vertical" margin={{ left: -20 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                        {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        </Bar>
                    </BarChart>
                )}
                </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-3">
                {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-white">{item.value}%</span>
                </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div 
        className={recentOrdersStyle === 'default' ? getCardClass("overflow-hidden !p-0") : getTableClass()}
        onMouseEnter={() => enableCustomization && setShowOrdersSettings(true)}
        onMouseLeave={() => setShowOrdersSettings(false)}
      >
        {showOrdersSettings && enableCustomization && (
            <TableSettingsOverlay 
              tableStyle={recentOrdersStyle}
              setTableStyle={handleOrdersStyleChange}
              onClose={() => setShowOrdersSettings(false)}
            />
        )}
        <div className={cn("transition-all duration-300", showOrdersSettings ? "blur-sm" : "")}>
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 dark:text-white">Recent Orders</h3>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
            </button>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Order ID</th>
                    <th className="px-6 py-4 font-semibold">Customer</th>
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-4 py-4 font-semibold">Amount</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-blue-600 dark:text-blue-400">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 font-medium">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{order.product}</td>
                    <td className="px-4 py-4 text-sm font-bold text-slate-800 dark:text-white">{order.amount}</td>
                    <td className="px-6 py-4">
                        <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-bold ring-1 ring-inset",
                        order.status === 'Delivered' ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400" :
                        order.status === 'Processing' ? "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400" :
                        order.status === 'Shipped' ? "bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-500/10 dark:text-violet-400" :
                        "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400"
                        )}>
                        {order.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceDashboard;