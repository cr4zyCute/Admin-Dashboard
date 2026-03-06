import React, { useState } from 'react';
import { MoreVertical, Plus, Minus, Info } from 'lucide-react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import { useAppContext } from '../../../../context/AppContext';
import { cn } from '../../../../lib/utils';

interface UserGeographyCardProps {
  enableCustomization?: boolean;
}

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const UserGeographyCard: React.FC<UserGeographyCardProps> = ({ enableCustomization = false }) => {
  const { cardStyle } = useAppContext();
  const [showSettings, setShowSettings] = useState(false);
  const [position, setPosition] = useState({ coordinates: [0, 20] as [number, number], zoom: 1 });

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.2 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.2 }));
  };

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  };
  
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

  const countries = [
    { name: 'United States', flag: '🇺🇸', value: '67.5k', percent: 72.15, color: '#6366f1' },
    { name: 'India', flag: '🇮🇳', value: '7.92k', percent: 28.65, color: '#3b82f6' },
    { name: 'Brazil', flag: '🇧🇷', value: '89.05k', percent: 62.5, color: '#f59e0b' },
    { name: 'Canada', flag: '🇨🇦', value: '5.3k', percent: 42.2, color: '#10b981' },
  ];

  // Countries to highlight (names must match topojson properties)
  const highlightedCountries = ["United States of America", "India", "Brazil", "Canada", "Russian Federation"];

  return (
    <div 
      className={getCardClass()}
      onMouseEnter={() => enableCustomization && setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
    >
      <div className={cn("flex flex-col h-full transition-all duration-300", showSettings ? "blur-sm" : "")}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 dark:text-white">User Geography Intelligence</h3>
            <Info className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 flex-1 items-center h-[340px] overflow-hidden">
           {/* Map Area */}
           <div className="flex-1 relative w-full h-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center p-1">
             {/* Map Content Wrapper */}
             <div className="relative w-full h-full flex items-center justify-center" data-tooltip-id="geo-tooltip">
                <ComposableMap 
                  projection="geoMercator" 
                  projectionConfig={{ scale: 140, center: [0, 20] }} // Reduced scale to ensure fit
                  style={{ width: "100%", height: "100%" }} // Force full size fit
                >
                  <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={handleMoveEnd} maxZoom={4}>
                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies
                          .filter(geo => geo.properties.name !== "Antarctica")
                          .map((geo) => {
                          const isHighlighted = highlightedCountries.includes(geo.properties.name);
                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill={isHighlighted ? "#2563EB" : "#F1F5F9"} // Blue for highlighted, Light Gray for others
                              stroke="#FFFFFF"
                              strokeWidth={0.5}
                              data-tooltip-content={geo.properties.name}
                              style={{
                                default: { outline: "none" },
                                hover: { fill: isHighlighted ? "#1D4ED8" : "#E2E8F0", outline: "none" },
                                pressed: { outline: "none" },
                              }}
                            />
                          );
                        })
                      }
                    </Geographies>
                  </ZoomableGroup>
                </ComposableMap>
                <Tooltip id="geo-tooltip" style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: '#1e293b' }} />
             </div>
             
             {/* Map Controls */}
             <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
               <button onClick={handleZoomIn} className="w-5 h-5 bg-slate-800 text-white rounded flex items-center justify-center hover:bg-slate-700 shadow-md transition-colors text-[10px]">
                 <Plus className="w-2.5 h-2.5" />
               </button>
               <button onClick={handleZoomOut} className="w-5 h-5 bg-slate-800 text-white rounded flex items-center justify-center hover:bg-slate-700 shadow-md transition-colors text-[10px]">
                 <Minus className="w-2.5 h-2.5" />
               </button>
             </div>
           </div>

           {/* Country List - Add scroll if needed */}
           <div className="w-full lg:w-[180px] h-full overflow-y-auto space-y-3 flex flex-col justify-center pr-1 custom-scrollbar">
             {countries.map((country) => (
               <div key={country.name} className="flex-shrink-0">
                 <div className="flex justify-between items-center mb-0.5">
                   <div className="flex items-center gap-2">
                     <span className="text-base w-5 flex justify-center">{country.flag}</span>
                     <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate max-w-[80px]">{country.name}</span>
                   </div>
                   <span className="font-bold text-slate-800 dark:text-white text-xs">{country.value}</span>
                 </div>
                 <div className="relative pt-0.5">
                   <div className="overflow-hidden h-1 mb-0.5 text-xs flex rounded-full bg-slate-100 dark:bg-slate-700">
                     <div style={{ width: `${country.percent}%`, backgroundColor: country.color }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"></div>
                   </div>
                   <div className="text-right leading-none">
                       <span className="text-[9px] font-medium text-slate-400">
                         {country.percent}%
                       </span>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserGeographyCard;
