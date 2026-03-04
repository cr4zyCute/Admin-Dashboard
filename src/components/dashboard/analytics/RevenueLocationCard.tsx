import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import CountUp from '../../common/CountUp';
import { cn } from '../../../lib/utils';
import { useAppContext } from '../../../context/AppContext';
import { LocationSettingsOverlay } from './Overlays';

interface RevenueLocationCardProps {
  dataState: string;
  revenueLocationCard: {
    title: string;
    subtitle: string;
    value: string;
    label: string;
  };
  locations: any[];
  enableCustomization?: boolean;
}

const RevenueLocationCard: React.FC<RevenueLocationCardProps> = ({ 
  dataState, 
  revenueLocationCard, 
  locations,
  enableCustomization = false
}) => {
  const { locationViewMode, setLocationViewMode, locationVisual, setLocationVisual } = useAppContext();
  const [showSettings, setShowSettings] = useState(false);

  const getCardClass = (additionalClasses = "") => {
    const base = "p-6 transition-all duration-300 relative group";
    let styleClass = "";
    
    // Use locationVisual for style
    switch (locationVisual) {
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

  return (
    <div 
      className={getCardClass("lg:col-span-1 flex flex-col h-fit")}
      onMouseEnter={() => enableCustomization && setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
    >
      {showSettings && enableCustomization && (
        <LocationSettingsOverlay 
          viewMode={locationViewMode}
          setViewMode={setLocationViewMode}
          visualStyle={locationVisual}
          setVisualStyle={setLocationVisual}
          onClose={() => setShowSettings(false)}
        />
      )}

      <div className={cn("transition-all duration-300", showSettings ? "blur-sm" : "")}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-800 dark:text-white">Revenue By Locations</h3>
          <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
        </div>
      
        <div className="flex-1 flex flex-col">
          {/* Map Placeholder - Show in Split or Map mode */}
          {(locationViewMode === 'split' || locationViewMode === 'map') && (
            <div className={cn(
              "bg-slate-50 dark:bg-slate-900 rounded-xl relative overflow-hidden mb-6 group transition-all duration-300",
              locationViewMode === 'map' ? "min-h-[300px]" : "min-h-[180px] flex-1"
            )}>
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
          )}

          {/* Stats Card - Always Visible */}
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

          {/* Location List - Show in Split or List mode */}
          {(locationViewMode === 'split' || locationViewMode === 'list') && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default RevenueLocationCard;
