import React, { useState } from 'react';
import { ShoppingBag, ChevronDown, MoreVertical } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { useAppContext } from '../../../../context/AppContext';
import { cn } from '../../../../lib/utils';
import { CustomizationOverlay } from '../../analytics/Overlays';
import { ChartType } from '../../../../types';

interface TotalOrdersCardProps {
  enableCustomization?: boolean;
}

const TotalOrdersCard: React.FC<TotalOrdersCardProps> = ({ enableCustomization = false }) => {
  const { cardStyle, cardConfigs, updateCardConfig } = useAppContext();
  const cardId = 'totalOrdersCard';
  
  const chartType = cardConfigs[cardId]?.chartType || 'bar';
  const chartColor = cardConfigs[cardId]?.chartColor || '#3b82f6';
  
  const setChartType = (type: ChartType) => updateCardConfig(cardId, { chartType: type });
  const setChartColor = (color: string) => updateCardConfig(cardId, { chartColor: color });
  
  const [showSettings, setShowSettings] = useState(false);
  
  // Mock Data
  const data = [
    { name: '1D', orders: 110, refunds: 0 },
    { name: '2D', orders: 115, refunds: 0 },
    { name: '3D', orders: 90, refunds: 5 },
    { name: '4D', orders: 70, refunds: 8 },
    { name: '5D', orders: 40, refunds: 6 },
    { name: '6D', orders: 50, refunds: 6 },
    { name: '7D', orders: 100, refunds: 5 },
    { name: '8D', orders: 60, refunds: 0 },
    { name: '9D', orders: 50, refunds: 3 },
    { name: '10D', orders: 115, refunds: 0 },
    { name: '11D', orders: 50, refunds: 0 },
    { name: '12D', orders: 50, refunds: 2 },
    { name: '13D', orders: 60, refunds: 5 },
    { name: '14D', orders: 110, refunds: 5 },
  ];

  const getCardClass = () => {
    const base = "p-6 transition-all duration-300 relative group h-full flex flex-col";
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
    return cn(base, styleClass);
  };

  return (
    <div 
      className={getCardClass()}
      onMouseEnter={() => enableCustomization && setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
    >
      {showSettings && enableCustomization && (
        <CustomizationOverlay 
          activeChartType={chartType} 
          activeChartColor={chartColor} 
          setLocalChartType={setChartType} 
          setLocalChartColor={setChartColor}
          allowedChartTypes={['bar', 'line', 'area']} 
        />
      )}
      
      <div className={cn("flex flex-col h-full transition-all duration-300", showSettings ? "blur-sm" : "")}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-slate-500 text-sm uppercase tracking-wider">TOTAL ORDERS</h3>
          <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-800 dark:text-white">$659.80k</span>
              <span className="text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-500/10 px-1.5 py-0.5 rounded">↓ 3.21%</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
           <button className="flex items-center gap-2 text-xs font-medium text-slate-500 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
             <span className="w-4 h-4 flex items-center justify-center">📅</span>
             Last 90 Days
             <ChevronDown className="w-3 h-3" />
           </button>
        </div>

        <div className="flex-1 min-h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={6}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} dy={10} />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Bar dataKey="orders" name="Orders" fill={chartColor} radius={[2, 2, 0, 0]} />
              <Bar dataKey="refunds" name="Refunds" fill="#10b981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-blue-500" style={{ backgroundColor: chartColor }}></div>
            Orders
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-emerald-500"></div>
            Refunds
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalOrdersCard;
