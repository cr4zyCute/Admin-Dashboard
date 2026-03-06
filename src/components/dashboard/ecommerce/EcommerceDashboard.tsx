import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
    MoreVertical,
    ChevronRight,
    ChevronDown,
    Eye,
    Edit,
    FileText,
    Trash2
  } from 'lucide-react';
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

// New Widgets
import TotalOrdersCard from './widgets/TotalOrdersCard';
import TotalVisitorsCard from './widgets/TotalVisitorsCard';
import TotalSubscribersCard from './widgets/TotalSubscribersCard';
import UserGeographyCard from './widgets/UserGeographyCard';
import TrafficSourcesCard from './widgets/TrafficSourcesCard';

interface EcommerceDashboardProps {
  enableCustomization?: boolean;
}

const EcommerceDashboard: React.FC<EcommerceDashboardProps> = ({ enableCustomization = false }) => {
  const { 
    cardStyle,
    dataState,
    randomSeed,
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setActiveDropdown(prev => prev === id ? null : id);
  };

  const handleAction = (action: string, orderId: string) => {
    console.log(`Action ${action} triggered for order ${orderId}`);
    setActiveDropdown(null);
  };

  const [showSalesPeriodDropdown, setShowSalesPeriodDropdown] = useState(false);
  const [salesPeriod, setSalesPeriod] = useState('Last 30 Days');

  const handleSalesPeriodChange = (period: string) => {
    setSalesPeriod(period);
    setShowSalesPeriodDropdown(false);
  };

  // Click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('.relative')) {
        setActiveDropdown(null);
      }
      if (showSalesPeriodDropdown && !(event.target as Element).closest('.sales-period-dropdown')) {
        setShowSalesPeriodDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

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

  const mockSalesData = [
    { name: 'Jan', sales: 4000, revenue: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398 },
    { name: 'Mar', sales: 5000, revenue: 9800 },
    { name: 'Apr', sales: 2780, revenue: 3908 },
    { name: 'May', sales: 1890, revenue: 4800 },
    { name: 'Jun', sales: 2390, revenue: 3800 },
    { name: 'Jul', sales: 3490, revenue: 4300 },
  ];

  const mockCategoryData = [
    { name: 'Electronics', value: 400, mobile: 200, desktop: 150, app: 50, color: '#3b82f6' },
    { name: 'Fashion', value: 300, mobile: 180, desktop: 80, app: 40, color: '#10b981' },
    { name: 'Home', value: 300, mobile: 100, desktop: 150, app: 50, color: '#f59e0b' },
    { name: 'Beauty', value: 200, mobile: 120, desktop: 60, app: 20, color: '#ef4444' },
  ];

  const mockRecentOrders = [
    { id: '#ORD-7542', customer: 'Emma Watson', product: 'iPhone 15 Pro', amount: '$999.00', status: 'Delivered', date: 'Oct 24, 2023' },
    { id: '#ORD-7543', customer: 'John Doe', product: 'MacBook Air M2', amount: '$1,199.00', status: 'Processing', date: 'Oct 23, 2023' },
    { id: '#ORD-7544', customer: 'Sarah Smith', product: 'iPad Pro', amount: '$799.00', status: 'Shipped', date: 'Oct 22, 2023' },
    { id: '#ORD-7545', customer: 'Mike Johnson', product: 'Apple Watch', amount: '$399.00', status: 'Cancelled', date: 'Oct 21, 2023' },
  ];

  // Empty States
  const salesDataEmpty = mockSalesData.map(d => ({ ...d, sales: 0, revenue: 0 }));
  const categoryDataEmpty = mockCategoryData.map(d => ({ ...d, value: 0, mobile: 0, desktop: 0, app: 0 }));
  const recentOrdersEmpty: any[] = [];

  // Random Data Generation
  const randomData = useMemo(() => {
    if (dataState !== 'alternate') return null;
    
    const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const getRandomTrend = () => Math.random() > 0.5 ? 'up' : 'down';

    return {
        metrics: {
            revenue: { value: `$${getRandom(100, 200)},${getRandom(100, 999)}`, change: getRandom(1, 20), trend: getRandomTrend() },
            orders: { value: `${getRandom(1, 10)},${getRandom(100, 999)}`, change: getRandom(1, 20), trend: getRandomTrend() },
            avgOrder: { value: `$${getRandom(20, 100)}.${getRandom(10, 99)}`, change: getRandom(1, 20), trend: getRandomTrend() },
            products: { value: `${getRandom(1, 5)},${getRandom(100, 999)}`, change: getRandom(1, 20), trend: getRandomTrend() },
        },
        salesData: mockSalesData.map(d => ({ 
            ...d, 
            sales: getRandom(1000, 6000), 
            revenue: getRandom(1000, 10000) 
        })),
        categoryData: mockCategoryData.map(d => {
            const val = getRandom(100, 500);
            return { 
                ...d, 
                value: val, 
                mobile: Math.floor(val * 0.5), 
                desktop: Math.floor(val * 0.3), 
                app: Math.floor(val * 0.2) 
            };
        }),
        recentOrders: mockRecentOrders.map(d => ({
            ...d,
            amount: `$${getRandom(100, 2000)}.00`,
            status: ['Delivered', 'Processing', 'Shipped', 'Cancelled'][getRandom(0, 3)]
        }))
    };
  }, [dataState, randomSeed]);

  // Helper to select data based on state
  const selectData = <T,>(defaultData: T, randomDataVal: T | undefined, emptyData: T): T => {
    if (dataState === 'default') return defaultData;
    if (dataState === 'alternate' && randomDataVal) return randomDataVal;
    return emptyData;
  };

  // Selected Data
  // const metrics = {
  //   revenue: selectData({ value: "$128,430", change: 12.5, trend: 'up' }, randomData?.metrics.revenue as any, { value: "$0", change: 0, trend: 'up' }),
  //   orders: selectData({ value: "4,250", change: 8.2, trend: 'up' }, randomData?.metrics.orders as any, { value: "0", change: 0, trend: 'up' }),
  //   avgOrder: selectData({ value: "$30.20", change: 2.4, trend: 'down' }, randomData?.metrics.avgOrder as any, { value: "$0.00", change: 0, trend: 'down' }),
  //   products: selectData({ value: "1,240", change: 5.1, trend: 'up' }, randomData?.metrics.products as any, { value: "0", change: 0, trend: 'up' }),
  // };

  const salesData = selectData(mockSalesData, randomData?.salesData, salesDataEmpty);
  const categoryData = selectData(mockCategoryData, randomData?.categoryData, categoryDataEmpty);
  const recentOrders = selectData(mockRecentOrders, randomData?.recentOrders, recentOrdersEmpty);

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
        return cn(base, "bg-white dark:bg-slate-900 rounded-xl border-2 border-black dark:border-slate-600 overflow-hidden");
      default:
        return getCardClass("overflow-hidden !p-0");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
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
      </motion.div>

      {/* Top Widgets */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <TotalOrdersCard enableCustomization={enableCustomization} />
        <TotalVisitorsCard enableCustomization={enableCustomization} />
        <TotalSubscribersCard enableCustomization={enableCustomization} />
      </motion.div>

      {/* Middle Widgets */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 h-full">
           <UserGeographyCard enableCustomization={enableCustomization} />
        </div>
        <div className="lg:col-span-1 h-full">
           <TrafficSourcesCard enableCustomization={enableCustomization} />
        </div>
      </motion.div>

      {/* Charts Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 xl:grid-cols-3 gap-6"
      >
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
                <div className="relative sales-period-dropdown">
                  <button 
                    onClick={() => setShowSalesPeriodDropdown(!showSalesPeriodDropdown)}
                    className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors focus:ring-2 focus:ring-blue-500/20"
                  >
                    <span className="text-slate-700 dark:text-slate-300">{salesPeriod}</span>
                    <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform duration-200", showSalesPeriodDropdown && "rotate-180")} />
                  </button>
                  
                  {showSalesPeriodDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                      <div className="p-1">
                        {['Last 7 Days', 'Last 30 Days', 'Last 12 Months'].map((period) => (
                          <button
                            key={period}
                            onClick={() => handleSalesPeriodChange(period)}
                            className={cn(
                              "w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center justify-between",
                              salesPeriod === period 
                                ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" 
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200"
                            )}
                          >
                            {period}
                            {salesPeriod === period && <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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
                            isAnimationActive={true}
                            animationDuration={1500}
                            animationEasing="ease-out"
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
                {categoryData.map((item, index) => (
                <motion.div 
                    key={item.name} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                    className="flex items-center justify-between text-sm"
                >
                    <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-white">{item.value}%</span>
                </motion.div>
                ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Orders Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
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
            <div className="overflow-visible">
            <table className={cn("w-full text-left", recentOrdersStyle === 'bordered' ? "border-collapse" : "")}>
                <thead className={cn(
                    recentOrdersStyle === 'modern' ? "bg-transparent border-b-2 border-slate-100 dark:border-slate-800" :
                    recentOrdersStyle === 'compact' ? "bg-slate-50 dark:bg-slate-800/50 text-xs" :
                    recentOrdersStyle === 'bordered' ? "bg-slate-200 dark:bg-slate-800" :
                    "bg-slate-50 dark:bg-slate-800/50"
                )}>
                <tr className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                    <th className={cn("font-semibold", 
                        recentOrdersStyle === 'compact' ? "px-4 py-2" : "px-6 py-4",
                        recentOrdersStyle === 'bordered' && "border border-black dark:border-slate-600"
                    )}>Order ID</th>
                    <th className={cn("font-semibold", 
                        recentOrdersStyle === 'compact' ? "px-4 py-2" : "px-6 py-4",
                        recentOrdersStyle === 'bordered' && "border border-black dark:border-slate-600"
                    )}>Customer</th>
                    <th className={cn("font-semibold", 
                        recentOrdersStyle === 'compact' ? "px-4 py-2" : "px-6 py-4",
                        recentOrdersStyle === 'bordered' && "border border-black dark:border-slate-600"
                    )}>Product</th>
                    <th className={cn("font-semibold", 
                        recentOrdersStyle === 'compact' ? "px-2 py-2" : "px-4 py-4",
                        recentOrdersStyle === 'bordered' && "border border-black dark:border-slate-600"
                    )}>Amount</th>
                    <th className={cn("font-semibold", 
                        recentOrdersStyle === 'compact' ? "px-4 py-2" : "px-6 py-4",
                        recentOrdersStyle === 'bordered' && "border border-black dark:border-slate-600"
                    )}>Status</th>
                    <th className={cn("font-semibold text-right", 
                        recentOrdersStyle === 'compact' ? "px-4 py-2" : "px-6 py-4",
                        recentOrdersStyle === 'bordered' && "border border-black dark:border-slate-600"
                    )}>Action</th>
                </tr>
                </thead>
                <tbody className={cn(
                    recentOrdersStyle === 'modern' ? "divide-y-0" : 
                    recentOrdersStyle === 'bordered' ? "" :
                    "divide-y divide-slate-100 dark:divide-slate-800"
                )}>
                {recentOrders.map((order) => (
                    <tr key={order.id} className={cn(
                        "transition-colors",
                        recentOrdersStyle === 'modern' ? "hover:bg-slate-50 dark:hover:bg-slate-800/30 border-b border-dashed border-slate-100 dark:border-slate-800" :
                        "hover:bg-slate-50 dark:hover:bg-slate-800/30"
                    )}>
                    <td className={cn("text-sm font-bold text-blue-600 dark:text-blue-400", 
                        recentOrdersStyle === 'compact' ? "px-4 py-2" : "px-6 py-4",
                        recentOrdersStyle === 'bordered' && "border border-black dark:border-slate-600"
                    )}>{order.id}</td>
                    <td className={cn("text-sm text-slate-700 dark:text-slate-300 font-medium", 
                        recentOrdersStyle === 'compact' ? "px-4 py-2" : "px-6 py-4",
                        recentOrdersStyle === 'bordered' && "border border-black dark:border-slate-600"
                    )}>{order.customer}</td>
                    <td className={cn("text-sm text-slate-600 dark:text-slate-400", 
                        recentOrdersStyle === 'compact' ? "px-4 py-2" : "px-6 py-4",
                        recentOrdersStyle === 'bordered' && "border border-black dark:border-slate-600"
                    )}>{order.product}</td>
                    <td className={cn("text-sm font-bold text-slate-800 dark:text-white", 
                        recentOrdersStyle === 'compact' ? "px-2 py-2" : "px-4 py-4",
                        recentOrdersStyle === 'bordered' && "border border-black dark:border-slate-600"
                    )}>{order.amount}</td>
                    <td className={cn(
                        recentOrdersStyle === 'compact' ? "px-4 py-2" : "px-6 py-4",
                        recentOrdersStyle === 'bordered' && "border border-black dark:border-slate-600"
                    )}>
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
                    <td className={cn("text-right relative", 
                        recentOrdersStyle === 'compact' ? "px-4 py-2" : "px-6 py-4",
                        recentOrdersStyle === 'bordered' && "border border-black dark:border-slate-600"
                    )}>
                        <button 
                          onClick={() => toggleDropdown(order.id)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                        </button>

                        {/* Action Dropdown */}
                        {activeDropdown === order.id && (
                          <div className={cn(
                            "absolute right-0 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200",
                            // Smart positioning: if it's one of the last 2 items, show above (bottom-full), else show below (mt-2)
                            recentOrders.indexOf(order) >= recentOrders.length - 2 ? "bottom-full mb-2" : "mt-2"
                          )}>
                            <div className="p-1">
                              <button 
                                onClick={() => handleAction('view', order.id)}
                                className="w-full text-left px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg flex items-center gap-3 transition-colors group"
                              >
                                <Eye className="w-4 h-4 text-slate-400 group-hover:text-blue-500 dark:text-slate-500 dark:group-hover:text-blue-400 transition-colors" />
                                <span className="font-medium">View Details</span>
                              </button>
                              <button 
                                onClick={() => handleAction('edit', order.id)}
                                className="w-full text-left px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg flex items-center gap-3 transition-colors group"
                              >
                                <Edit className="w-4 h-4 text-slate-400 group-hover:text-blue-500 dark:text-slate-500 dark:group-hover:text-blue-400 transition-colors" />
                                <span className="font-medium">Edit Order</span>
                              </button>
                              <button 
                                onClick={() => handleAction('invoice', order.id)}
                                className="w-full text-left px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg flex items-center gap-3 transition-colors group"
                              >
                                <FileText className="w-4 h-4 text-slate-400 group-hover:text-blue-500 dark:text-slate-500 dark:group-hover:text-blue-400 transition-colors" />
                                <span className="font-medium">Download Invoice</span>
                              </button>
                              <div className="h-px bg-slate-100 dark:bg-slate-700 my-1 mx-1"></div>
                              <button 
                                onClick={() => handleAction('delete', order.id)}
                                className="w-full text-left px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg flex items-center gap-3 transition-colors group"
                              >
                                <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors" />
                                <span className="font-medium">Delete Order</span>
                              </button>
                            </div>
                          </div>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EcommerceDashboard;