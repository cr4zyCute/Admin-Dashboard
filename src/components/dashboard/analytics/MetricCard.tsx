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

interface MetricCardProps {
  id?: string;
  title: string;
  icon: React.ReactNode;
  iconColorClass: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  data: any[];
  chartColor: string;
  cardClass?: string;
  subText: string;
  dataKey: string;
  chartType: ChartType;
  enableCustomization?: boolean;
}

const NoData = ({ size = "normal" }: { message?: string, size?: "small" | "normal" }) => {
  if (size === "small") {
    return (
      <div className="flex items-center justify-center h-full w-full opacity-50">
         <div className="text-xs text-slate-400">No Data</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-[150px] p-4">
      <div className="text-slate-400">No Data Available</div>
    </div>
  );
};

const MetricCard: React.FC<MetricCardProps> = ({ 
  id,
  title, 
  icon, 
  iconColorClass, 
  value, 
  change, 
  trend, 
  data, 
  chartColor, 
  subText,
  dataKey,
  chartType,
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

  // Determine effective chart type: Card Config > Global Config > Prop Default
  const activeChartType = (id && cardConfigs[id]?.chartType) || globalChartType || chartType;

  // Determine effective chart color: Card Config > Global Theme > Prop Default
  const themeColors: Record<string, string> = {
    blue: '#3b82f6', green: '#10b981', purple: '#8b5cf6', 
    orange: '#f59e0b', red: '#ef4444', teal: '#14b8a6'
  };
  const activeChartColor = (id && cardConfigs[id]?.chartColor) || themeColors[colorTheme] || chartColor;
  
  const activeCardStyle = globalCardStyle; // Keeping card style global for consistency, or we can make it per-card too if requested

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
    return cn(base, styleClass, "relative group/card overflow-hidden hover:shadow-md");
  };

  return (
    <div 
      className={getLocalCardClass()}
      onMouseEnter={() => enableCustomization && setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
    >
      <div className={cn("transition-all duration-300 h-full flex flex-col", showSettings ? "blur-sm" : "")}>
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

export default MetricCard;
