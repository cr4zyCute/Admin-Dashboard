import React, { useState } from 'react';
import { Mail, ChevronDown, Award } from 'lucide-react';
import { useAppContext } from '../../../../context/AppContext';
import { cn } from '../../../../lib/utils';
import { CustomizationOverlay } from '../../analytics/Overlays';

interface TotalSubscribersCardProps {
  enableCustomization?: boolean;
}

const TotalSubscribersCard: React.FC<TotalSubscribersCardProps> = ({ enableCustomization = false }) => {
  const { cardStyle, cardConfigs, updateCardConfig } = useAppContext();
  const cardId = 'totalSubscribersCard';
  
  // Customization state from context
  const showMilestone = cardConfigs[cardId]?.showMilestone !== false; // Default true
  const chartColor = cardConfigs[cardId]?.chartColor || '#06b6d4'; // Default cyan
  
  const toggleMilestone = () => updateCardConfig(cardId, { showMilestone: !showMilestone });
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
          <h3 className="font-bold text-slate-500 text-sm uppercase tracking-wider">TOTAL SUBSCRIBERS</h3>
          <button className="flex items-center gap-2 text-xs font-medium text-slate-500 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Last 90 Days
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${chartColor}20` }}>
            <Mail className="w-5 h-5" style={{ color: chartColor }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-800 dark:text-white">55.60k</span>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">↑ 4.87%</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          {/* Email Marketing */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Marketing</span>
              <div className="flex gap-4 text-xs">
                <span className="text-slate-500">+ 34,920</span>
                <span className="text-slate-400">27.41%</span>
              </div>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
              <div className="h-1.5 rounded-full" style={{ width: '27.41%', backgroundColor: chartColor }}></div>
            </div>
          </div>

          {/* Social Marketing */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Social Marketing</span>
              <div className="flex gap-4 text-xs">
                <span className="text-slate-500">+ 58,775</span>
                <span className="text-slate-400">46.13%</span>
              </div>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
              <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: '46.13%' }}></div>
            </div>
          </div>

          {/* Direct */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Direct</span>
              <div className="flex gap-4 text-xs">
                <span className="text-slate-500">+ 33,645</span>
                <span className="text-slate-400">26.46%</span>
              </div>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '26.46%' }}></div>
            </div>
          </div>
        </div>

        {/* Milestone Card */}
        {showMilestone && (
        <div className="mt-auto bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-xl p-4 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center flex-shrink-0">
             <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
           </div>
           <div>
             <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-0.5">Congratulations !...</h4>
             <p className="text-xs text-slate-500 dark:text-slate-400">You've reached a new subscriber milestone.</p>
           </div>
           <div className="ml-auto text-right">
             <div className="font-bold text-slate-800 dark:text-white text-lg">29.4k</div>
             <div className="text-[10px] text-slate-400 uppercase">SUBSCRIBERS</div>
           </div>
        </div>
        )}

      </div>
      
      {/* Customization Overlay */}
      {showSettings && (
        <CustomizationOverlay 
          activeChartColor={chartColor}
          setLocalChartColor={setChartColor}
          onToggleMetrics={toggleMilestone}
          showMetrics={showMilestone}
          metricLabel="Show Milestone"
        />
      )}
    </div>
  );
};

export default TotalSubscribersCard;
