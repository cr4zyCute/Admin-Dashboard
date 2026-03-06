import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart2, LineChart as LineChartIcon, Check, PieChart as PieChartIcon, StretchHorizontal } from 'lucide-react';
import { ChartType, TableStyle, LocationViewMode, CardStyle } from '../../../types';
import { cn } from '../../../lib/utils';

interface TableSettingsProps {
  tableStyle: TableStyle;
  setTableStyle: (style: TableStyle) => void;
  onClose: () => void;
  perPage?: number;
  setPerPage?: (num: number) => void;
}

export const CustomizationOverlay: React.FC<{
  activeChartType: ChartType | null;
  activeChartColor: string | null;
  setLocalChartType: (type: ChartType) => void;
  setLocalChartColor: (color: string) => void;
  allowedChartTypes?: ChartType[];
  stackedColors?: { mobile: string; desktop: string; app: string };
  setStackedColors?: (colors: { mobile: string; desktop: string; app: string }) => void;
}> = ({ activeChartType, activeChartColor, setLocalChartType, setLocalChartColor, allowedChartTypes, stackedColors, setStackedColors }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
  >
    <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md pointer-events-auto">
      <div className="flex flex-col gap-3">
        {/* Chart Type Selection */}
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          {(allowedChartTypes || ['area', 'bar', 'line', 'composed']).map((type) => (
            <button 
              key={type}
              onClick={() => setLocalChartType(type as ChartType)}
              className={cn(
                "p-1.5 rounded-md transition-all",
                activeChartType === type 
                  ? "bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400" 
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              )}
              title={`${type.charAt(0).toUpperCase() + type.slice(1)} Chart`}
            >
              {type === 'area' && <Activity className="w-4 h-4" />}
              {type === 'bar' && <BarChart2 className="w-4 h-4" />}
              {type === 'line' && <LineChartIcon className="w-4 h-4" />}
              {type === 'pie' && <PieChartIcon className="w-4 h-4" />}
              {type === 'stacked' && <StretchHorizontal className="w-4 h-4" />}
              {type === 'composed' && (
                 <div className="flex items-end gap-0.5">
                   <div className="w-1 h-2 bg-current rounded-sm"></div>
                   <div className="w-1 h-3 bg-current rounded-sm"></div>
                 </div>
              )}
            </button>
          ))}
        </div>

        {/* Chart Color Selection */}
        {activeChartType === 'stacked' && stackedColors && setStackedColors ? (
          <div className="flex flex-col gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg min-w-[120px]">
            {(['mobile', 'desktop', 'app'] as const).map((key) => (
              <div key={key} className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase font-bold text-slate-500">{key}</span>
                <div className="flex gap-1">
                  {[
                    '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => setStackedColors({ ...stackedColors, [key]: color })}
                      className={cn(
                        "w-3 h-3 rounded-full transition-all",
                        stackedColors[key] === color ? "ring-1 ring-offset-1 ring-slate-400 scale-110" : "hover:scale-110"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-1.5 justify-center bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg">
            {[
              { color: '#3b82f6', label: 'Blue' },   // Blue
              { color: '#10b981', label: 'Emerald' }, // Emerald
              { color: '#8b5cf6', label: 'Violet' },  // Violet
              { color: '#f59e0b', label: 'Amber' },   // Amber
              { color: '#ef4444', label: 'Rose' },    // Rose
            ].map((item) => (
              <button
                key={item.color}
                onClick={() => setLocalChartColor(item.color)}
                className={cn(
                  "w-5 h-5 rounded-full transition-all",
                  activeChartColor === item.color ? "ring-2 ring-offset-1 ring-slate-400 scale-110" : "hover:scale-110"
                )}
                style={{ backgroundColor: item.color }}
                title={item.label}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

export const TableSettingsOverlay: React.FC<TableSettingsProps> = ({ 
  tableStyle, 
  setTableStyle, 
  onClose,
  perPage,
  setPerPage 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm pointer-events-none"
    >
      <div className="w-64 p-4 bg-white/90 dark:bg-slate-800/90 rounded-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md pointer-events-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Table Settings</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <span className="text-xs">Close</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Table Style */}
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Visual Style</label>
            <div className="grid grid-cols-2 gap-2">
              {['default', 'modern', 'compact', 'bordered'].map((style) => (
                <button
                  key={style}
                  onClick={() => setTableStyle(style as TableStyle)}
                  className={cn(
                    "px-2 py-1.5 text-xs text-left font-medium rounded-lg border transition-colors capitalize flex items-center justify-between",
                    tableStyle === style
                      ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
                      : "text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                  )}
                >
                  {style}
                  {tableStyle === style && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>
          
          {setPerPage && typeof perPage === 'number' && (
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Rows per page</label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 20, 50].map((num) => (
                  <button
                    key={num}
                    onClick={() => setPerPage(num)}
                    className={cn(
                      "px-2 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center justify-between",
                      perPage === num
                        ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
                        : "text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                    )}
                  >
                    {num}
                    {perPage === num && <Check className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface LocationSettingsProps {
  viewMode: LocationViewMode;
  setViewMode: (mode: LocationViewMode) => void;
  visualStyle: CardStyle;
  setVisualStyle: (style: CardStyle) => void;
  onClose: () => void;
}

export const LocationSettingsOverlay: React.FC<LocationSettingsProps> = ({ 
  viewMode, 
  setViewMode, 
  visualStyle,
  setVisualStyle,
  onClose 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm pointer-events-none"
    >
      <div className="w-64 p-4 bg-white/90 dark:bg-slate-800/90 rounded-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md pointer-events-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Location Settings</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <span className="text-xs">Close</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* View Mode */}
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Layout</label>
            <div className="flex gap-2">
              {['split', 'map', 'list'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as LocationViewMode)}
                  className={cn(
                    "flex-1 px-2 py-1.5 text-xs font-medium rounded-lg border transition-colors capitalize flex items-center justify-center",
                    viewMode === mode
                      ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
                      : "text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Style */}
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Card Style</label>
            <div className="grid grid-cols-2 gap-2">
              {['default', 'flat', 'bordered', 'glass', 'neo'].map((style) => (
                <button
                  key={style}
                  onClick={() => setVisualStyle(style as CardStyle)}
                  className={cn(
                    "px-2 py-1.5 text-xs text-left font-medium rounded-lg border transition-colors capitalize flex items-center justify-between",
                    visualStyle === style
                      ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
                      : "text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                  )}
                >
                  {style}
                  {visualStyle === style && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface RepeatCustomerSettingsProps {
  chartType: 'radial' | 'pie' | 'gauge';
  setChartType: (type: 'radial' | 'pie' | 'gauge') => void;
  graphColor: string;
  setGraphColor: (color: string) => void;
  onClose: () => void;
}

export const RepeatCustomerSettingsOverlay: React.FC<RepeatCustomerSettingsProps> = ({ 
  chartType,
  setChartType,
  graphColor,
  setGraphColor,
  onClose 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm pointer-events-none"
    >
      <div className="w-64 p-4 bg-white/90 dark:bg-slate-800/90 rounded-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md pointer-events-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Card Settings</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <span className="text-xs">Close</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Chart Type */}
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Chart Type</label>
            <div className="flex gap-2">
              {['radial', 'pie', 'gauge'].map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type as any)}
                  className={cn(
                    "flex-1 px-2 py-1.5 text-xs font-medium rounded-lg border transition-colors capitalize flex items-center justify-center",
                    chartType === type
                      ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
                      : "text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Color */}
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Graph Color</label>
            <div className="flex gap-1.5">
              {[
                { color: '#10b981', label: 'Emerald' }, // Default
                { color: '#3b82f6', label: 'Blue' },
                { color: '#8b5cf6', label: 'Violet' },
                { color: '#f59e0b', label: 'Amber' },
                { color: '#ef4444', label: 'Rose' },
              ].map((item) => (
                <button
                  key={item.color}
                  onClick={() => setGraphColor(item.color)}
                  className={cn(
                    "w-6 h-6 rounded-full transition-all border-2",
                    graphColor === item.color 
                      ? "border-slate-400 scale-110" 
                      : "border-transparent hover:scale-110"
                  )}
                  style={{ backgroundColor: item.color }}
                  title={item.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
