import React, { useState } from 'react';
import { MoreVertical, Info } from 'lucide-react';
import { useAppContext } from '../../../../context/AppContext';
import { cn } from '../../../../lib/utils';

interface TrafficSourcesCardProps {
  enableCustomization?: boolean;
}

const TrafficSourcesCard: React.FC<TrafficSourcesCardProps> = ({ enableCustomization = false }) => {
  const { cardStyle } = useAppContext();
  const [showSettings, setShowSettings] = useState(false);
  
  const getCardClass = () => {
    const base = "p-5 transition-all duration-300 relative group h-full flex flex-col";
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

  const sources = [
    { name: 'Google', value: '87.8k', color: 'bg-[#FEF6E6]', logo: 'https://cdn.simpleicons.org/google/F59E0B' },
    { name: 'Meta', value: '77.7k', color: 'bg-[#EBF2FF]', logo: 'https://cdn.simpleicons.org/meta/3B82F6' },
    { name: 'Instagram', value: '42.9k', color: 'bg-[#FFF0F3]', logo: 'https://cdn.simpleicons.org/instagram/F43F5E' },
    { name: 'Telegram', value: '31.5k', color: 'bg-[#E6FFFA]', logo: 'https://cdn.simpleicons.org/telegram/0D9488' },
    { name: 'LinkedIn', value: '58.5k', color: 'bg-[#EBF8FF]', logo: 'https://cdn.simpleicons.org/linkedin/0EA5E9' },
    { name: 'Twitter X', value: '22.6k', color: 'bg-[#F8FAFC]', logo: 'https://cdn.simpleicons.org/x/000000' },
    { name: 'Dribbble', value: '2.85k', color: 'bg-[#FFF5F7]', logo: 'https://cdn.simpleicons.org/dribbble/D53F8C' },
    { name: 'WhatsApp', value: '3.1k', color: 'bg-[#F0FFF4]', logo: 'https://cdn.simpleicons.org/whatsapp/22C55E' },
    { name: 'Messenger', value: '9.08k', color: 'bg-[#EEF2FF]', logo: 'https://cdn.simpleicons.org/messenger/6366F1' },
    { name: 'Snapchat', value: '5.8k', color: 'bg-[#FFFFF0]', logo: 'https://cdn.simpleicons.org/snapchat/EAB308' },
  ];

  return (
    <div 
      className={getCardClass()}
      onMouseEnter={() => enableCustomization && setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
    >
      <div className={cn("flex flex-col h-full transition-all duration-300 relative", showSettings ? "blur-sm" : "")}>
        {/* Header - Compact */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 dark:text-white text-sm">Top Traffic Sources</h3>
            <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
          </div>
          <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <MoreVertical className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Content Grid - Expanded width items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 px-1">
          {sources.map((source) => (
            <div key={source.name} className={cn("flex items-center justify-between p-3.5 rounded-lg transition-colors w-full", source.color)}>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <img src={source.logo} alt={source.name} className="w-full h-full object-contain" onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${source.name}&background=random`;
                  }} />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-800 text-sm truncate">{source.name}</span>
              </div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-600 whitespace-nowrap">{source.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrafficSourcesCard;
