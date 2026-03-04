import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, ComposedChart, 
  XAxis, Cell, Tooltip, ResponsiveContainer 
} from 'recharts';
import CountUp from '../../common/CountUp';
import { useAppContext } from '../../../context/AppContext';
import { CustomizationOverlay } from './Overlays';
import { ColorTheme, ChartType } from '../../../types';
import { cn } from '../../../lib/utils';
import noDataAnimation from '../../../assets/NoData.json';
import Lottie from 'lottie-react';

interface MostActiveCardProps {
  id?: string;
  weeklyData: any[];
  dataState: string;
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

const MostActiveCard: React.FC<MostActiveCardProps> = ({ id, weeklyData, dataState, enableCustomization = false }) => {
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
  const activeChartType = (id && cardConfigs[id]?.chartType) || globalChartType || 'bar';
  
  const themeColors: Record<string, string> = {
    blue: '#3b82f6', green: '#10b981', purple: '#8b5cf6', 
    orange: '#f59e0b', red: '#ef4444', teal: '#14b8a6'
  };
  // Determine effective chart color: Card Config > Global Theme > Default
  const activeChartColor = (id && cardConfigs[id]?.chartColor) || themeColors[colorTheme] || '#3b82f6';

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
    return cn(base, styleClass, "lg:col-span-1 flex flex-col relative group/card overflow-hidden");
  };

  return (
    <div 
      className={getLocalCardClass()}
      onMouseEnter={() => enableCustomization && setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
    >
      <div className={cn("transition-all duration-300 h-full flex flex-col", showSettings ? "blur-sm" : "")}>
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

export default MostActiveCard;
