import React, { useState } from 'react';
import { Eye, ChevronDown, Smartphone, Monitor } from 'lucide-react';
import { useAppContext } from '../../../../context/AppContext';
import { cn } from '../../../../lib/utils';
import { CustomizationOverlay } from '../../analytics/Overlays';

interface TotalVisitorsCardProps {
  enableCustomization?: boolean;
}

const TotalVisitorsCard: React.FC<TotalVisitorsCardProps> = ({ enableCustomization = false }) => {
  const { cardStyle, cardConfigs, updateCardConfig } = useAppContext();
  const cardId = 'totalVisitorsCard';
  
  // Customization state from context
  const showMetrics = cardConfigs[cardId]?.showMetrics !== false; // Default true
  const chartColor = cardConfigs[cardId]?.chartColor || '#6366f1'; // Default indigo
  
  const toggleMetrics = () => updateCardConfig(cardId, { showMetrics: !showMetrics });
  const setChartColor = (color: string) => updateCardConfig(cardId, { chartColor: color });
  
  const [showSettings, setShowSettings] = useState(false);
  
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
      <div className={cn("flex flex-col h-full transition-all duration-300", showSettings ? "blur-sm" : "")}>
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-bold text-slate-500 text-sm uppercase tracking-wider">TOTAL VISITORS</h3>
          <button className="flex items-center gap-2 text-xs font-medium text-slate-500 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Last 90 Days
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${chartColor}20` }}>
            <Eye className="w-5 h-5" style={{ color: chartColor }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-800 dark:text-white">82.30M</span>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">↑ 6.84%</span>
            </div>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="flex justify-between items-center mb-2">
           <div className="flex items-center gap-2 text-sm text-slate-500">
             <Smartphone className="w-4 h-4" />
             MOBILE PHONE
           </div>
           <div className="flex items-center gap-2 text-sm text-slate-500">
             DESKTOP
             <Monitor className="w-4 h-4" />
           </div>
        </div>
        
        <div className="flex justify-between items-center mb-2 font-bold text-lg text-slate-800 dark:text-white">
           <span>69.40%</span>
           <span>30.60%</span>
        </div>

        <div className="flex h-2.5 w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700 mb-2">
           <div className="h-full" style={{ width: '69.4%', backgroundColor: chartColor }}></div>
           <div className="h-full bg-cyan-400" style={{ width: '30.6%' }}></div>
        </div>
        
        <div className="flex justify-between text-xs text-slate-400 mb-8">
           <span>41,927 Sessions</span>
           <span>18,476 Sessions</span>
        </div>

        {/* Stats Table */}
        {showMetrics && (
        <div className="w-full">
           <div className="grid grid-cols-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
             <div className="col-span-1">GOAL</div>
             <div className="col-span-1 text-center">COMPLETED</div>
             <div className="col-span-1 text-center">TARGET</div>
             <div className="col-span-1 text-right">PROGRESS</div>
           </div>
           
           <div className="space-y-4">
             <div className="grid grid-cols-4 text-sm items-center">
               <div className="col-span-1 text-slate-600 dark:text-slate-300 font-medium">Total Visitors</div>
               <div className="col-span-1 text-center text-slate-800 dark:text-white font-bold">824,300</div>
               <div className="col-span-1 text-center text-slate-500">1,000,000</div>
               <div className="col-span-1 text-right text-emerald-500 font-bold">82%</div>
             </div>
             
             <div className="grid grid-cols-4 text-sm items-center">
               <div className="col-span-1 text-slate-600 dark:text-slate-300 font-medium">Mobile Traffic</div>
               <div className="col-span-1 text-center text-slate-800 dark:text-white font-bold">41,927</div>
               <div className="col-span-1 text-center text-slate-500">60,000</div>
               <div className="col-span-1 text-right text-emerald-500 font-bold">69%</div>
             </div>
             
             <div className="grid grid-cols-4 text-sm items-center">
               <div className="col-span-1 text-slate-600 dark:text-slate-300 font-medium">Desktop Traffic</div>
               <div className="col-span-1 text-center text-slate-800 dark:text-white font-bold">18,476</div>
               <div className="col-span-1 text-center text-slate-500">30,000</div>
               <div className="col-span-1 text-right text-emerald-500 font-bold">61%</div>
             </div>
           </div>
        </div>
        )}

      </div>
      
      {/* Customization Overlay */}
      {showSettings && (
        <CustomizationOverlay 
          activeChartColor={chartColor}
          setLocalChartColor={setChartColor}
          onToggleMetrics={toggleMetrics}
          showMetrics={showMetrics}
        />
      )}
    </div>
  );
};

export default TotalVisitorsCard;
