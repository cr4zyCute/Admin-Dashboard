import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart2, LineChart as LineChartIcon, Check } from 'lucide-react';
import { ChartType, TableStyle } from '../../../types';
import { cn } from '../../../lib/utils';

export const CustomizationOverlay: React.FC<{
  activeChartType: ChartType | null;
  activeChartColor: string | null;
  setLocalChartType: (type: ChartType) => void;
  setLocalChartColor: (color: string) => void;
}> = ({ activeChartType, activeChartColor, setLocalChartType, setLocalChartColor }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
  >
    <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md pointer-events-auto">
      <div className="flex flex-col gap-3">
        {/* Chart Type Selection */}
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          {['area', 'bar', 'line', 'composed'].map((type) => (
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
      </div>
    </div>
  </motion.div>
);

export const TableSettingsOverlay: React.FC<{
  itemsPerPage: number;
  setItemsPerPage: (val: number) => void;
  tableStyle: TableStyle;
  setTableStyle: (val: TableStyle) => void;
  onClose: () => void;
}> = ({ itemsPerPage, setItemsPerPage, tableStyle, setTableStyle, onClose }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95, y: -10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: -10 }}
    className="absolute right-0 top-12 z-20 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-4"
  >
    <div className="flex justify-between items-center mb-3">
      <h4 className="text-xs font-bold text-slate-500 uppercase">Table Settings</h4>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xs">Close</button>
    </div>
    
    <div className="space-y-4">
      {/* Items Per Page */}
      <div>
        <label className="text-xs text-slate-400 mb-1.5 block">Rows per page</label>
        <div className="flex gap-2">
          {[5, 10, 20].map((num) => (
            <button
              key={num}
              onClick={() => setItemsPerPage(num)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-lg border transition-colors",
                itemsPerPage === num
                  ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
                  : "text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
              )}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Table Style */}
      <div>
        <label className="text-xs text-slate-400 mb-1.5 block">Visual Style</label>
        <div className="grid grid-cols-2 gap-2">
          {['default', 'striped', 'compact', 'bordered'].map((style) => (
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
    </div>
  </motion.div>
);
