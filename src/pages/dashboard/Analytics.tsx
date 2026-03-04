import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  TrendingUp, 
  MoreHorizontal, 
  ArrowUpRight,
  Users,
  MousePointer2,
  Eye,
  MoreVertical,
  Mic,
  Send,
  Download,
  Upload,
  Settings,
  Activity,
  BarChart2,
  LineChart as LineChartIcon,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import Lottie from 'lottie-react';
import noDataAnimation from '../../assets/NoData.json';
import CountUp from '../../components/common/CountUp';
import Pagination from '../../components/common/Pagination';
import { useAppContext } from '../../context/AppContext';
import { ChartType } from '../../types';
import { 
  ComposedChart,
  Line,
  Area, 
  AreaChart,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart, 
  Bar, 
  Cell,
  RadialBarChart, 
  RadialBar,
  LineChart
} from 'recharts';
import { cn } from '../../lib/utils';

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
  recentOrdersHeader as mockRecentOrdersHeader,
  revenueLocationCard as mockRevenueLocationCard,
  profitLegend as mockProfitLegend,
  
  // Empty Data
  profitDataEmpty,
  customerBreakdownEmpty,
  weeklyDataEmpty,
  locationsEmpty
} from '../../data/mockData';

type SortConfig = { key: string; direction: 'asc' | 'desc' } | null;

const NoData = ({ size = "normal" }: { message?: string, size?: "small" | "normal" }) => {
  if (size === "small") {
    return (
      <div className="flex items-center justify-center h-full w-full opacity-50">
         <div className="w-8 h-8">
           <Lottie animationData={noDataAnimation} loop={true} />
         </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-[150px] p-4 animate-in fade-in zoom-in duration-500">
      <motion.div className="w-24 h-24 md:w-32 md:h-32 opacity-80">
        <Lottie animationData={noDataAnimation} loop={true} />
      </motion.div>
    </div>
  );
};

// Reusable Metric Card Component with Chart Customization

interface MetricCardProps {
  title: string;
  icon: React.ReactNode;
  iconColorClass: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  data: any[];
  chartColor: string;
  cardClass: string;
  subText: string;
  dataKey: string;
  chartType: ChartType;
}



interface TotalProfitCardProps {
  totalProfit: string;
  totalProfitChange: number;
  profitLegend: any;
  profitData: any[];
  dataState: string;
  customerBreakdown: any[];
}

const TotalProfitCard: React.FC<TotalProfitCardProps> = ({
  totalProfit,
  totalProfitChange,
  profitLegend,
  profitData,
  dataState,
  customerBreakdown
}) => {
  const { cardStyle: globalCardStyle, chartType: globalChartType, colorTheme } = useAppContext();

  const activeCardStyle = globalCardStyle;
  const activeChartType = globalChartType || 'composed';
  
  const themeColors: Record<string, string> = {
    blue: '#3b82f6', green: '#10b981', purple: '#8b5cf6', 
    orange: '#f59e0b', red: '#ef4444', teal: '#14b8a6'
  };
  const activeChartColor = themeColors[colorTheme] || '#ef4444'; // Default red for this card

  const getLocalCardClass = () => {
    const base = "p-6 transition-all duration-300";
    let styleClass = "";
    
    switch (activeCardStyle) {
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
    return cn(base, styleClass, "lg:col-span-2 flex flex-col justify-between relative group/card overflow-hidden");
  };

  return (
    <div className={getLocalCardClass()}>
      <div className="transition-all duration-300 h-full flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">Total Profit</h3>
            <div className="flex items-baseline gap-3">
              <CountUp 
                end={totalProfit} 
                prefix={totalProfit.includes('$') ? '$' : ''} 
                suffix={totalProfit.includes('K') ? 'K' : ''} 
                className="text-4xl font-bold text-slate-900 dark:text-white" 
              />
              <span className="flex items-center text-sm font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3 mr-1" /> {totalProfitChange}%
              </span>
              <span className="text-sm text-slate-400">vs. last period</span>
            </div>
          </div>
          
          {profitLegend && (
            <div className="hidden sm:block bg-white dark:bg-slate-700 shadow-lg rounded-xl p-3 border border-slate-100 dark:border-slate-600">
              <div className="text-xs text-slate-400 mb-1">{profitLegend.date}</div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-white">
                <div className="w-2 h-2 rounded-full bg-blue-600"></div> {profitLegend.thisMonth} <span className="text-xs font-normal text-slate-400">this month</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-white">
                <div className="w-2 h-2 rounded-full bg-slate-300"></div> {profitLegend.lastMonth} <span className="text-xs font-normal text-slate-400">last month</span>
              </div>
            </div>
          )}
        </div>

        <div className="h-[250px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            {activeChartType === 'bar' ? (
               <BarChart data={profitData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} minTickGap={30} />
                 <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: activeChartColor, fontSize: 12 }} domain={[0, 100]} />
                 <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 2500]} />
                 <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} cursor={{ fill: 'transparent' }} />
                 <Bar yAxisId="left" dataKey="stock" name="Stock Level (%)" fill={activeChartColor} radius={[4, 4, 0, 0]} />
                 <Bar yAxisId="right" dataKey="sales" name="Total Sales ($)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
               </BarChart>
            ) : activeChartType === 'line' ? (
              <LineChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} minTickGap={30} />
                 <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: activeChartColor, fontSize: 12 }} domain={[0, 100]} />
                 <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 2500]} />
                 <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }} />
                 <Line yAxisId="left" type="monotone" dataKey="stock" name="Stock Level (%)" stroke={activeChartColor} strokeWidth={3} dot={false} />
                 <Line yAxisId="right" type="monotone" dataKey="sales" name="Total Sales ($)" stroke="#94a3b8" strokeWidth={3} dot={false} />
              </LineChart>
            ) : activeChartType === 'area' ? (
              <AreaChart data={profitData}>
                 <defs>
                  <linearGradient id={`gradient-${activeChartColor?.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={activeChartColor} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={activeChartColor} stopOpacity={0}/>
                  </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} minTickGap={30} />
                 <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: activeChartColor, fontSize: 12 }} domain={[0, 100]} />
                 <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 2500]} />
                 <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }} />
                 <Area yAxisId="left" type="monotone" dataKey="stock" name="Stock Level (%)" stroke={activeChartColor} strokeWidth={3} fillOpacity={1} fill={`url(#gradient-${activeChartColor?.replace('#', '')})`} />
                 <Area yAxisId="right" type="monotone" dataKey="sales" name="Total Sales ($)" stroke="#94a3b8" strokeWidth={3} fillOpacity={0.1} fill="#94a3b8" />
              </AreaChart>
            ) : (
              // Default Composed
              <ComposedChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} minTickGap={30} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: activeChartColor, fontSize: 12 }} domain={[0, 100]} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 2500]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Bar yAxisId="left" dataKey="stock" name="Stock Level (%)" fill={activeChartColor} radius={[4, 4, 0, 0]} barSize={20} fillOpacity={0.8} />
                <Line yAxisId="right" type="monotone" dataKey="sales" name="Total Sales ($)" stroke="#94a3b8" strokeWidth={3} dot={false} />
              </ComposedChart>
            )}
          </ResponsiveContainer>
          
          {dataState === 'empty' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl">
                 <NoData message="No profit data available" />
               </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
           <div className="flex justify-between items-center mb-4">
             <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Customers</h4>
             <MoreHorizontal className="w-4 h-4 text-slate-400" />
           </div>
           <div className="flex gap-4">
             {/* Progress Bars Breakdown */}
             {customerBreakdown.map((item, index) => (
               <div key={index} className="flex-1">
                 <div className="flex justify-between text-xs mb-1">
                   <span className="font-bold text-slate-700 dark:text-white flex items-center gap-1">
                     <span className={`w-2 h-2 ${item.color.replace('bg-', 'bg-')} rounded-full`}></span> {item.value}
                   </span>
                   <span className="text-slate-400">{item.label}</span>
                 </div>
                 <div className={`h-1.5 w-full ${item.bgColor} rounded-full overflow-hidden`}>
                  <motion.div 
                    className={`h-full ${item.color} rounded-full`} 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 + (index * 0.1) }}
                  />
                </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

interface MostActiveCardProps {
  weeklyData: any[];
  dataState: string;
}

const MostActiveCard: React.FC<MostActiveCardProps> = ({ weeklyData, dataState }) => {
  const { cardStyle: globalCardStyle, chartType: globalChartType, colorTheme } = useAppContext();

  const activeCardStyle = globalCardStyle;
  const activeChartType = globalChartType || 'bar';
  
  const themeColors: Record<string, string> = {
    blue: '#3b82f6', green: '#10b981', purple: '#8b5cf6', 
    orange: '#f59e0b', red: '#ef4444', teal: '#14b8a6'
  };
  const activeChartColor = themeColors[colorTheme] || '#3b82f6';

  const getLocalCardClass = () => {
    const base = "p-6 transition-all duration-300";
    let styleClass = "";
    
    switch (activeCardStyle) {
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
    return cn(base, styleClass, "lg:col-span-1 flex flex-col relative group/card overflow-hidden");
  };

  return (
    <div className={getLocalCardClass()}>
      <div className="transition-all duration-300 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-800 dark:text-white">Most Day Active</h3>
          <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="w-full h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              {activeChartType === 'bar' ? (
                <BarChart data={weeklyData}>
                  <Bar dataKey="active" radius={[4, 4, 4, 4]}>
                    {weeklyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === 'Tue' && dataState !== 'empty' ? activeChartColor : '#e2e8f0'} />
                    ))}
                  </Bar>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} dy={10} interval={0} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </BarChart>
              ) : activeChartType === 'line' ? (
                <LineChart data={weeklyData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} dy={10} interval={0} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="active" stroke={activeChartColor} strokeWidth={3} dot={{ r: 4, fill: activeChartColor }} />
                </LineChart>
              ) : activeChartType === 'area' ? (
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id={`gradient-active-${activeChartColor?.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={activeChartColor} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={activeChartColor} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} dy={10} interval={0} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="active" stroke={activeChartColor} strokeWidth={3} fill={`url(#gradient-active-${activeChartColor?.replace('#', '')})`} />
                </AreaChart>
              ) : (
                <ComposedChart data={weeklyData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} dy={10} interval={0} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="active" fill={activeChartColor} radius={[4, 4, 4, 4]} opacity={0.4} />
                  <Line type="monotone" dataKey="active" stroke={activeChartColor} strokeWidth={3} dot={{ r: 4, fill: activeChartColor }} />
                </ComposedChart>
              )}
            </ResponsiveContainer>
            
            {dataState === 'empty' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl">
                   <NoData message="No activity data" />
                 </div>
              </div>
            )}
          </div>
          <div className="mt-4 text-center">
             <h4 className="text-2xl font-bold text-slate-800 dark:text-white">
               <CountUp end={dataState === 'empty' ? 0 : 8162} />
             </h4>
             <p className="text-xs text-slate-400">Total active users on Tuesday</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  icon, 
  iconColorClass, 
  value, 
  change, 
  trend, 
  data, 
  chartColor, 
  cardClass,
  subText,
  dataKey,
  chartType
}) => {
  const { cardStyle: globalCardStyle, colorTheme } = useAppContext();

  // Use global state
  const activeCardStyle = globalCardStyle;
  const activeChartType = chartType;
  
  const themeColors: Record<string, string> = {
    blue: '#3b82f6', green: '#10b981', purple: '#8b5cf6', 
    orange: '#f59e0b', red: '#ef4444', teal: '#14b8a6'
  };
  const activeChartColor = themeColors[colorTheme] || chartColor;

  // We need to re-derive card class based on local style if present
  const getLocalCardClass = () => {
    const base = "p-6 transition-all duration-300";
    let styleClass = "";
    
    switch (activeCardStyle) {
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
    return cn(base, styleClass, "relative group/card overflow-hidden");
  };

  return (
    <div className={getLocalCardClass()}>
      {/* Content Wrapper */}
      <div className="transition-all duration-300 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-slate-700 dark:text-slate-200">{title}</h3>
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${iconColorClass}`}>
              {icon}
            </div>
          </div>
        </div>
        
        <div className="flex items-baseline gap-2 mb-2">
          <CountUp end={value} className="text-3xl font-bold text-slate-800 dark:text-white" />
          <span className={`flex items-center text-xs font-bold px-1.5 py-0.5 rounded ${trend === 'up' ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'text-red-500 bg-red-50 dark:bg-red-500/10'}`}>
            <TrendingUp className={`w-3 h-3 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} /> {change}%
          </span>
        </div>
        
        <div className="h-10 w-full mb-2 flex-1 min-h-[40px]">
          {data && data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              {activeChartType === 'bar' ? (
                <BarChart data={data}>
                  <Bar dataKey={dataKey} fill={activeChartColor} radius={[2, 2, 2, 2]} />
                </BarChart>
              ) : activeChartType === 'line' ? (
                <LineChart data={data}>
                  <Line type="linear" dataKey={dataKey} stroke={activeChartColor} strokeWidth={2} dot={false} />
                </LineChart>
              ) : activeChartType === 'composed' ? (
                <ComposedChart data={data}>
                  <Bar dataKey={dataKey} fill={activeChartColor} radius={[2, 2, 2, 2]} opacity={0.4} barSize={8} />
                  <Line type="linear" dataKey={dataKey} stroke={activeChartColor} strokeWidth={2} dot={false} />
                </ComposedChart>
              ) : (
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id={`gradient-${title.replace(/\s+/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={activeChartColor} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={activeChartColor} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey={dataKey} stroke={activeChartColor} strokeWidth={2} fillOpacity={1} fill={`url(#gradient-${title.replace(/\s+/g, '-')})`} />
                </AreaChart>
              )}
            </ResponsiveContainer>
          ) : (
            <NoData size="small" />
          )}
        </div>
        <p className="text-xs text-slate-400 mt-auto">{subText}</p>
      </div>
    </div>
  );
};

const Analytics: React.FC = () => {
  const { 
    dataState, 
    cardStyle, 
    chartType, 
    randomSeed,
    productTableStyle,
    orderTableStyle,
    productsPerPage,
    ordersPerPage
  } = useAppContext();
  
  const [productsPage, setProductsPage] = useState(1);
  const [ordersPage, setOrdersPage] = useState(1);
  
  const [productSort, setProductSort] = useState<SortConfig>(null);
  const [orderSort, setOrderSort] = useState<SortConfig>(null);
  
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Helper to process data
  const processData = <T extends Record<string, any>>(
    data: T[], 
    searchQuery: string, 
    sortConfig: SortConfig, 
    page: number, 
    perPage: number,
    searchKeys: (keyof T)[]
  ) => {
    let processed = [...data];

    // Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      processed = processed.filter(item => 
        searchKeys.some(key => String(item[key]).toLowerCase().includes(query))
      );
    }

    // Sort
    if (sortConfig) {
      processed.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        // Handle numeric values (strip currency symbols if needed)
        const aNum = parseFloat(String(aValue).replace(/[^0-9.-]+/g, ""));
        const bNum = parseFloat(String(bValue).replace(/[^0-9.-]+/g, ""));
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Pagination
    const totalPages = Math.ceil(processed.length / perPage);
    const paginated = processed.slice((page - 1) * perPage, page * perPage);

    return { data: paginated, totalPages, totalItems: processed.length };
  };

  // Handle sort click
  const handleSort = (key: string, currentSort: SortConfig, setSort: (c: SortConfig) => void) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (currentSort && currentSort.key === key && currentSort.direction === 'asc') {
      direction = 'desc';
    }
    setSort({ key, direction });
  };

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

  // Card Style Helper
  const getCardClass = (additionalClasses = "") => {
    const base = "p-6 transition-all duration-300";
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
  const recentOrdersHeader = selectData(mockRecentOrdersHeader, undefined, { totalTransactions: '0' }); // Keep header static or random if needed
  const revenueLocationCard = selectData(mockRevenueLocationCard, randomData?.revenueLocationCard, { title: 'No Data', subtitle: 'No records found', value: '0', label: 'ORDER' });
  const profitLegend = selectData(mockProfitLegend, undefined, null); // Keep legend static

  // Reset pagination when data source changes
  React.useEffect(() => {
    setProductsPage(1);
    setOrdersPage(1);
  }, [dataState, productsPerPage, ordersPerPage, productSearch, orderSearch]);

  // Processed Data
  const { data: currentProducts, totalPages: totalProductPages, totalItems: totalFilteredProducts } = useMemo(() => 
    processData(products, productSearch, productSort, productsPage, productsPerPage, ['name', 'id']),
    [products, productSearch, productSort, productsPage, productsPerPage]
  );

  const { data: currentOrders, totalPages: totalOrderPages, totalItems: totalFilteredOrders } = useMemo(() => 
    processData(recentOrders, orderSearch, orderSort, ordersPage, ordersPerPage, ['customer', 'email', 'id', 'amount']),
    [recentOrders, orderSearch, orderSort, ordersPage, ordersPerPage]
  );

  const handleProductPageChange = (page: number) => {
    if (page >= 1 && page <= totalProductPages) {
      setProductsPage(page);
    }
  };

  const handleOrderPageChange = (page: number) => {
    if (page >= 1 && page <= totalOrderPages) {
      setOrdersPage(page);
    }
  };

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
          title="Page Views"
          icon={<Eye className="w-5 h-5" />}
          iconColorClass="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
          value={pageViews.value}
          change={pageViews.change}
          trend={pageViews.trend as 'up' | 'down'}
          data={sparklineData}
          chartColor="#10b981"
          cardClass={getCardClass("relative overflow-visible group hover:shadow-md")}
          subText="vs. 14,653 last period"
          dataKey="value"
          chartType={chartType}
        />

        {/* Card 2: Visitors */}
        <MetricCard 
          title="Visitors"
          icon={<Users className="w-5 h-5" />}
          iconColorClass="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
          value={visitors.value}
          change={visitors.change}
          trend={visitors.trend as 'up' | 'down'}
          data={sparklineData2}
          chartColor="#6366f1"
          cardClass={getCardClass("relative overflow-visible group hover:shadow-md")}
          subText="vs. 5,732 last period"
          dataKey="value"
          chartType={chartType}
        />

        {/* Card 3: Click */}
        <MetricCard 
          title="Click"
          icon={<MousePointer2 className="w-5 h-5" />}
          iconColorClass="bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400"
          value={clicks.value}
          change={clicks.change}
          trend={clicks.trend as 'up' | 'down'}
          data={sparklineData3}
          chartColor="#f97316"
          cardClass={getCardClass("relative overflow-visible group hover:shadow-md")}
          subText="vs. 3,294 last period"
          dataKey="value"
          chartType={chartType}
        />

        {/* Card 4: Orders */}
        <MetricCard 
          title="Orders"
          icon={<ShoppingCart className="w-5 h-5" />}
          iconColorClass="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
          value={orders.value}
          change={orders.change}
          trend={orders.trend as 'up' | 'down'}
          data={sparklineData4}
          chartColor="#3b82f6"
          cardClass={getCardClass("relative overflow-visible group hover:shadow-md")}
          subText="vs. 1,186 last period"
          dataKey="value"
          chartType={chartType}
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
          totalProfit={totalProfit}
          totalProfitChange={totalProfitChange}
          profitLegend={profitLegend}
          profitData={profitData}
          dataState={dataState}
          customerBreakdown={customerBreakdown}
        />

        {/* Most Day Active (1/3 width) */}
        <MostActiveCard 
          weeklyData={weeklyData}
          dataState={dataState}
        />
      </motion.div>

      {/* 3. Bottom Section Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        
        {/* Best Selling Products Table (2/3 width) */}
        <div className={getCardClass("lg:col-span-2 flex flex-col")}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">Best Selling Products</h3>
              <p className="text-xs text-slate-400 mt-1">Top performance by revenue</p>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search products..." 
                   value={productSearch}
                   onChange={(e) => setProductSearch(e.target.value)}
                   className="w-full sm:w-48 pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
                 />
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-x-auto">
            {currentProducts && currentProducts.length > 0 ? (
              <table className={cn(
                "w-full text-left border-collapse",
                productTableStyle === 'bordered' ? "border border-slate-200 dark:border-slate-700" : ""
              )}>
                <thead>
                  <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                    {[
                      { key: 'name', label: 'Product', align: 'left' },
                      { key: 'id', label: 'ID', align: 'right' },
                      { key: 'sold', label: 'Sold', align: 'right' },
                      { key: 'revenue', label: 'Revenue', align: 'right' },
                      { key: 'rating', label: 'Rating', align: 'right' }
                    ].map((col) => (
                      <th 
                        key={col.key}
                        className={cn(
                          "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors select-none group",
                          productTableStyle === 'compact' ? "py-2 px-2" : "py-4 px-4",
                          col.align === 'right' ? "text-right" : "text-left",
                          col.key === 'product' ? "pl-2" : "",
                          productTableStyle === 'bordered' ? "border-x border-slate-100 dark:border-slate-700 first:border-l-0 last:border-r-0" : ""
                        )}
                        onClick={() => handleSort(col.key, productSort, setProductSort)}
                      >
                        <div className={cn("flex items-center gap-1", col.align === 'right' ? "justify-end" : "justify-start")}>
                          {col.label}
                          <div className="flex flex-col ml-1">
                            {productSort?.key === col.key ? (
                              productSort.direction === 'asc' ? <ArrowUp className="w-3 h-3 text-blue-500" /> : <ArrowDown className="w-3 h-3 text-blue-500" />
                            ) : (
                              <ArrowUpDown className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-50 transition-opacity" />
                            )}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {currentProducts.map((product) => (
                    <tr 
                      key={product.id} 
                      className={cn(
                        "group transition-colors border-b border-slate-50 dark:border-slate-800/50 last:border-0",
                        productTableStyle === 'striped' ? "even:bg-slate-50 dark:even:bg-slate-800/30 hover:bg-blue-50/30 dark:hover:bg-blue-900/10" : "hover:bg-slate-50 dark:hover:bg-slate-700/50",
                        productTableStyle === 'compact' ? "py-2" : "py-4"
                      )}
                    >
                      <td className={cn(
                        "pr-4 pl-2", 
                        productTableStyle === 'compact' ? "py-2" : "py-4",
                        productTableStyle === 'bordered' ? "border-r border-slate-50 dark:border-slate-800" : ""
                      )}>
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "rounded-xl bg-slate-100 dark:bg-slate-700 overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-600 shadow-sm",
                            productTableStyle === 'compact' ? "w-8 h-8 rounded-lg" : "w-12 h-12"
                          )}>
                            <img src={product.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{product.name}</p>
                            <p className="text-xs text-slate-400 mt-0.5">Electronics</p>
                          </div>
                        </div>
                      </td>
                      <td className={cn(
                        "px-4 text-right font-mono text-xs text-slate-400",
                        productTableStyle === 'compact' ? "py-2" : "py-4",
                        productTableStyle === 'bordered' ? "border-x border-slate-50 dark:border-slate-800" : ""
                      )}>{product.id}</td>
                      <td className={cn(
                        "px-4 text-right",
                        productTableStyle === 'compact' ? "py-2" : "py-4",
                        productTableStyle === 'bordered' ? "border-x border-slate-50 dark:border-slate-800" : ""
                      )}>
                         <span className="font-bold text-slate-700 dark:text-slate-200">{product.sold}</span>
                         <span className="text-xs text-slate-400 ml-1">pcs</span>
                      </td>
                      <td className={cn(
                        "px-4 text-right font-bold text-emerald-600 dark:text-emerald-400",
                        productTableStyle === 'compact' ? "py-2" : "py-4",
                        productTableStyle === 'bordered' ? "border-x border-slate-50 dark:border-slate-800" : ""
                      )}>{product.revenue}</td>
                      <td className={cn(
                        "pl-4 pr-2 text-right",
                        productTableStyle === 'compact' ? "py-2" : "py-4",
                        productTableStyle === 'bordered' ? "border-l border-slate-50 dark:border-slate-800" : ""
                      )}>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20">
                          <span className="text-amber-500 text-xs fill-amber-500">★</span> 
                          <span className="font-bold text-amber-700 dark:text-amber-400 text-xs">{product.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <NoData message="No products found" />
            )}
          </div>

          <div className="flex justify-between items-center mt-6 pt-2 border-t border-slate-100 dark:border-slate-700">
            <span className="text-xs text-slate-400">
              Showing {currentProducts.length > 0 ? (productsPage - 1) * productsPerPage + 1 : 0} to {Math.min(productsPage * productsPerPage, totalFilteredProducts)} of {totalFilteredProducts} products
            </span>
            <Pagination 
              currentPage={productsPage}
              totalPages={totalProductPages}
              onPageChange={handleProductPageChange}
            />
          </div>
        </div>

        {/* Right Column Stack (1/3 width) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Repeat Customer Rate */}
          <div className={getCardClass()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 dark:text-white">Repeat Customer Rate</h3>
              <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4" /></button>
            </div>
            
            <div className="flex flex-col items-center justify-center relative">
               {repeatCustomerRate && repeatCustomerRate.length > 0 ? (
                 <>
                   <div className="w-[200px] h-[160px] relative flex justify-center">
                     <ResponsiveContainer width="100%" height="100%">
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
                           fill="#10b981"
                         />
                       </RadialBarChart>
                     </ResponsiveContainer>
                     {/* Center Text */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2 text-center">
                       <div className="text-3xl font-bold text-slate-800 dark:text-white">68%</div>
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

        </div>
      </motion.div>
      {/* 4. New Bottom Section Grid (Orders, Location) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        
        {/* Recent Orders Table (2 cols) */}
        <div className={getCardClass("lg:col-span-2 flex flex-col")}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">Recent Orders</h3>
              <p className="text-xs text-slate-400 mt-1">({totalFilteredOrders} Transactions)</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
               <div className="relative flex-1 sm:flex-none">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search orders..." 
                   value={orderSearch}
                   onChange={(e) => setOrderSearch(e.target.value)}
                   className="w-full sm:w-48 pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
                 />
              </div>

              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors bg-white dark:bg-slate-800">
                  <Upload className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
             {currentOrders && currentOrders.length > 0 ? (
               <table className={cn(
                 "w-full text-left border-collapse min-w-[500px]",
                 orderTableStyle === 'bordered' ? "border border-slate-200 dark:border-slate-700" : ""
               )}>
                 <thead>
                   <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                     {[
                       { key: 'id', label: '#ID', align: 'left' },
                       { key: 'customer', label: 'Customer', align: 'left' },
                       { key: 'date', label: 'Date', align: 'left' },
                       { key: 'amount', label: 'Amount', align: 'left' },
                       { key: 'payment', label: 'Payment', align: 'left' },
                       { key: 'status', label: 'Status', align: 'right' }
                     ].map((col) => (
                       <th 
                         key={col.key}
                         className={cn(
                           "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors select-none group",
                           orderTableStyle === 'compact' ? "py-2 px-2" : "py-3 px-2",
                           col.align === 'right' ? "text-right" : "text-left",
                           col.key === 'id' ? "pr-2" : "",
                           col.key === 'status' ? "pl-2" : "",
                           orderTableStyle === 'bordered' ? "border-x border-slate-100 dark:border-slate-700 first:border-l-0 last:border-r-0" : ""
                         )}
                         onClick={() => handleSort(col.key, orderSort, setSort => setOrderSort(setSort))}
                       >
                         <div className={cn("flex items-center gap-1", col.align === 'right' ? "justify-end" : "justify-start")}>
                           {col.label}
                           <div className="flex flex-col ml-1">
                             {orderSort?.key === col.key ? (
                               orderSort.direction === 'asc' ? <ArrowUp className="w-3 h-3 text-blue-500" /> : <ArrowDown className="w-3 h-3 text-blue-500" />
                             ) : (
                               <ArrowUpDown className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-50 transition-opacity" />
                             )}
                           </div>
                         </div>
                       </th>
                     ))}
                   </tr>
                 </thead>
                 <tbody className="text-sm">
                   {currentOrders.map((order) => (
                     <tr 
                       key={order.id} 
                       className={cn(
                         "group transition-colors border-b border-slate-50 dark:border-slate-800/50 last:border-0",
                         orderTableStyle === 'striped' ? "even:bg-slate-50 dark:even:bg-slate-800/30 hover:bg-blue-50/30 dark:hover:bg-blue-900/10" : "hover:bg-slate-50 dark:hover:bg-slate-700/50",
                         orderTableStyle === 'compact' ? "py-2" : "py-3"
                       )}
                     >
                       <td className={cn(
                         "pr-2 font-medium text-slate-500",
                         orderTableStyle === 'compact' ? "py-2" : "py-3",
                         orderTableStyle === 'bordered' ? "border-r border-slate-50 dark:border-slate-800" : ""
                       )}>{order.id}</td>
                       <td className={cn(
                         "px-2",
                         orderTableStyle === 'compact' ? "py-2" : "py-3",
                         orderTableStyle === 'bordered' ? "border-x border-slate-50 dark:border-slate-800" : ""
                       )}>
                         <div>
                           <p className="font-bold text-slate-700 dark:text-slate-200">{order.customer}</p>
                           <p className="text-xs text-slate-400">{order.email}</p>
                         </div>
                       </td>
                       <td className={cn(
                         "px-2 text-slate-500",
                         orderTableStyle === 'compact' ? "py-2" : "py-3",
                         orderTableStyle === 'bordered' ? "border-x border-slate-50 dark:border-slate-800" : ""
                       )}>{order.date}</td>
                       <td className={cn(
                         "px-2 font-medium text-slate-700 dark:text-slate-200",
                         orderTableStyle === 'compact' ? "py-2" : "py-3",
                         orderTableStyle === 'bordered' ? "border-x border-slate-50 dark:border-slate-800" : ""
                       )}>{order.amount}</td>
                       <td className={cn(
                         "px-2 text-slate-500",
                         orderTableStyle === 'compact' ? "py-2" : "py-3",
                         orderTableStyle === 'bordered' ? "border-x border-slate-50 dark:border-slate-800" : ""
                       )}>{order.payment}</td>
                       <td className={cn(
                         "pl-2 text-right",
                         orderTableStyle === 'compact' ? "py-2" : "py-3",
                         orderTableStyle === 'bordered' ? "border-l border-slate-50 dark:border-slate-800" : ""
                       )}>
                         <span className={cn(
                           "px-2 py-0.5 rounded text-xs font-medium",
                           order.status === 'Success' ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" :
                           order.status === 'Pending' ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" :
                           "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                         )}>
                           {order.status}
                         </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             ) : (
               <NoData message="No recent orders" />
             )}
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-2 border-t border-slate-100 dark:border-slate-700">
            <span className="text-xs text-slate-400">
              Showing {currentOrders.length > 0 ? (ordersPage - 1) * ordersPerPage + 1 : 0} to {Math.min(ordersPage * ordersPerPage, totalFilteredOrders)} of {totalFilteredOrders} orders
            </span>
            <Pagination 
              currentPage={ordersPage}
              totalPages={totalOrderPages}
              onPageChange={handleOrderPageChange}
            />
          </div>
        </div>

        {/* Column 2: Revenue By Locations */}
        <div className={getCardClass("lg:col-span-1 flex flex-col")}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 dark:text-white">Revenue By Locations</h3>
            <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
          </div>
          
          <div className="flex-1 flex flex-col">
            {/* Map Placeholder */}
            <div className="flex-1 min-h-[180px] bg-slate-50 dark:bg-slate-900 rounded-xl relative overflow-hidden mb-6 group">
              <div className="absolute inset-0 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center grayscale contrast-50"></div>
              {/* Animated Dots - Hide when empty */}
              {dataState !== 'empty' && (
                <>
                  <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                  <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                  
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-indigo-500 rounded-full animate-ping delay-300"></div>
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white"></div>
                  
                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-emerald-500 rounded-full animate-ping delay-700"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                  
                  {/* Connecting Lines (SVG overlay) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <path d="M100,60 Q180,100 250,140" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-slate-700" />
                  </svg>
                </>
              )}
            </div>

            {/* Stats Card */}
            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-4 shadow-sm mb-6 flex items-center gap-4 relative overflow-hidden">
               <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 text-lg">🏆</div>
               <div>
                 <p className="font-bold text-slate-800 dark:text-white text-sm">{revenueLocationCard.title}</p>
                 <p className="text-xs text-slate-400">{revenueLocationCard.subtitle}</p>
               </div>
               <div className="ml-auto text-right">
                 <div className="font-bold text-slate-800 dark:text-white">
                    <CountUp 
                      end={revenueLocationCard.value} 
                      suffix={revenueLocationCard.value.toLowerCase().includes('k') ? 'k' : ''}
                      prefix={revenueLocationCard.value.includes('$') ? '$' : ''}
                    />
                 </div>
                 <p className="text-[10px] text-slate-400 uppercase">{revenueLocationCard.label}</p>
               </div>
               {/* Decorative bg shape */}
               <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-amber-500/5 rounded-full blur-2xl"></div>
            </div>

            {/* Location List */}
            <div className="space-y-4">
              {locations.map((loc, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ring-2 ring-white dark:ring-slate-800`} style={{ backgroundColor: loc.color }}></div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{loc.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-700 dark:text-white">{loc.revenue}</span>
                    <span className="text-xs text-slate-400">Revenue</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Analytics;