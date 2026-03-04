import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, ComposedChart, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import CountUp from '../../common/CountUp';
import { useAppContext } from '../../../context/AppContext';
import { CustomizationOverlay } from './Overlays';
import { ChartType, ColorTheme } from '../../../types';
import { cn } from '../../../lib/utils';
import noDataAnimation from '../../../assets/NoData.json';
import Lottie from 'lottie-react';

interface TotalProfitCardProps {
  id?: string;
  totalProfit: string;
  totalProfitChange: number;
  profitLegend: any;
  profitData: any[];
  dataState: string;
  customerBreakdown: any[];
  enableCustomization?: boolean;
}

const NoData = ({ message }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center h-full w-full min-h-[150px] p-4">
    <div className="w-24 h-24 opacity-80">
      <Lottie animationData={noDataAnimation} loop={true} />
    </div>
    {message && <p className="text-slate-400 mt-2">{message}</p>}
  </div>
);

const TotalProfitCard: React.FC<TotalProfitCardProps> = ({
  id,
  totalProfit,
  totalProfitChange,
  profitLegend,
  profitData,
  dataState,
  customerBreakdown,
  enableCustomization = false
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const { 
    cardStyle: globalCardStyle, 
    chartType: globalChartType,
    colorTheme,
    cardConfigs,
    updateCardConfig
  } = useAppContext();

  const activeCardStyle = globalCardStyle;
  
  // Determine effective chart type: Card Config > Global Config > Default
  const activeChartType = (id && cardConfigs[id]?.chartType) || globalChartType || 'composed';
  
  const themeColors: Record<string, string> = {
    blue: '#3b82f6', green: '#10b981', purple: '#8b5cf6', 
    orange: '#f59e0b', red: '#ef4444', teal: '#14b8a6'
  };
  // Determine effective chart color: Card Config > Global Theme > Default
  const activeChartColor = (id && cardConfigs[id]?.chartColor) || themeColors[colorTheme] || '#ef4444';

  const handleSetChartType = (type: ChartType) => {
    if (id && enableCustomization) {
      updateCardConfig(id, { chartType: type });
    }
  };

  const handleSetChartColor = (color: string) => {
    if (id && enableCustomization) {
      updateCardConfig(id, { chartColor: color });
    }
  };

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
    <div 
      className={getLocalCardClass()}
      onMouseEnter={() => enableCustomization && setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
    >
      <div className={cn("transition-all duration-300 h-full flex flex-col", showSettings ? "blur-sm" : "")}>
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
                  <div 
                    className={`h-full ${item.color} rounded-full transition-all duration-1000`} 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
               </div>
             ))}
           </div>
        </div>
      </div>

      {showSettings && enableCustomization && (
        <CustomizationOverlay 
          activeChartType={activeChartType} 
          activeChartColor={activeChartColor} 
          setLocalChartType={handleSetChartType} 
          setLocalChartColor={handleSetChartColor} 
        />
      )}
    </div>
  );
};

export default TotalProfitCard;
