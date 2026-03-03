import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Monitor, 
  Check, 
  Palette, 
  LayoutDashboard,
  Type,
  MoreHorizontal,
  Activity,
  BarChart2,
  LineChart
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { ThemeMode, ColorTheme, LayoutTheme, ChartType } from '../../types';

const ThemeCustomizer: React.FC = () => {
  const { 
    themeMode, setThemeMode, 
    colorTheme, setColorTheme,
    layoutTheme, setLayoutTheme,
    chartType, setChartType
  } = useAppContext();

  const themes: { id: ColorTheme; name: string; color: string }[] = [
    { id: 'blue', name: 'Blue', color: 'bg-blue-500' },
    { id: 'green', name: 'Green', color: 'bg-green-500' },
    { id: 'purple', name: 'Purple', color: 'bg-purple-500' },
    { id: 'orange', name: 'Orange', color: 'bg-orange-500' },
    { id: 'red', name: 'Red', color: 'bg-red-500' },
    { id: 'teal', name: 'Teal', color: 'bg-teal-500' },
  ];

  const layoutThemes: LayoutTheme[] = [
    'Default', 'Minimal', 'Modern', 'Material', 'SaaS', 
    'Flat', 'Galaxy', 'Luxe', 'Retro', 'Neon', 
    'Pixel', 'Soft', 'Mono', 'Prism', 'Nova', 
    'Zen', 'Elegant', 'Vivid', 'Aurora', 'Crystal', 
    'Matrix', 'Orbit', 'Neo', 'Silver', 'Xenon'
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* 1. Layout Theme Selection */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
            <LayoutDashboard className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Select Theme</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Choose a preset layout style</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {layoutThemes.map((theme) => (
            <button
              key={theme}
              onClick={() => setLayoutTheme(theme)}
              className={`group relative flex flex-col gap-3 p-3 rounded-xl border-2 transition-all hover:scale-[1.02] ${
                layoutTheme === theme
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                  : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-800/50'
              }`}
            >
              <div className="w-full aspect-[4/3] bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden relative shadow-sm group-hover:shadow-md transition-shadow">
                {/* Placeholder UI Representation */}
                <div className="absolute inset-0 flex flex-col">
                  {/* Fake Topbar */}
                  <div className="h-4 bg-white dark:bg-slate-600 border-b border-slate-200 dark:border-slate-500 w-full flex items-center px-2 gap-1">
                    <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-400"></div>
                    <div className="ml-auto w-4 h-1 rounded-full bg-slate-300 dark:bg-slate-400"></div>
                  </div>
                  <div className="flex-1 flex">
                     {/* Fake Sidebar */}
                     <div className="w-8 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-600 flex flex-col items-center py-2 gap-1">
                        <div className="w-4 h-4 rounded-md bg-slate-200 dark:bg-slate-500 mb-1"></div>
                        <div className="w-3 h-0.5 rounded-full bg-slate-200 dark:bg-slate-500"></div>
                        <div className="w-3 h-0.5 rounded-full bg-slate-200 dark:bg-slate-500"></div>
                     </div>
                     {/* Fake Content */}
                     <div className="flex-1 p-2 space-y-2">
                        <div className="flex gap-2">
                           <div className="flex-1 h-8 rounded bg-white dark:bg-slate-600 shadow-sm"></div>
                           <div className="flex-1 h-8 rounded bg-white dark:bg-slate-600 shadow-sm"></div>
                        </div>
                        <div className="h-12 rounded bg-white dark:bg-slate-600 shadow-sm w-full"></div>
                     </div>
                  </div>
                </div>
                
                {/* Overlay for active state */}
                {layoutTheme === theme && (
                  <div className="absolute inset-0 bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center">
                    <div className="bg-primary-500 text-white p-1.5 rounded-full shadow-lg">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between w-full px-1">
                <span className={`font-semibold text-sm ${layoutTheme === theme ? 'text-primary-700 dark:text-primary-300' : 'text-slate-700 dark:text-slate-300'}`}>
                  {theme}
                </span>
                {layoutTheme === theme && (
                   <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 bg-primary-100 dark:bg-primary-900/30 px-2 py-0.5 rounded-full">Active</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* 2. Appearance (Dark Mode) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
            <Sun className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Appearance</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Select your preferred theme mode</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => setThemeMode('light')}
            className={`group relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              themeMode === 'light' 
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'
            }`}
          >
            <div className="w-full aspect-video bg-slate-100 rounded-lg border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1/4 h-full bg-white border-r border-slate-200"></div>
              <div className="absolute top-2 right-2 w-8 h-2 bg-slate-200 rounded-full"></div>
            </div>
            <span className={`font-medium ${themeMode === 'light' ? 'text-primary-600' : 'text-slate-600 dark:text-slate-400'}`}>Light</span>
            {themeMode === 'light' && (
              <div className="absolute top-3 right-3 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>

          <button
            onClick={() => setThemeMode('dark')}
            className={`group relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              themeMode === 'dark' 
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'
            }`}
          >
            <div className="w-full aspect-video bg-slate-900 rounded-lg border border-slate-700 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1/4 h-full bg-slate-800 border-r border-slate-700"></div>
              <div className="absolute top-2 right-2 w-8 h-2 bg-slate-700 rounded-full"></div>
            </div>
            <span className={`font-medium ${themeMode === 'dark' ? 'text-primary-600' : 'text-slate-600 dark:text-slate-400'}`}>Dark</span>
            {themeMode === 'dark' && (
              <div className="absolute top-3 right-3 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>

          <button
            onClick={() => setThemeMode('system')}
            className={`group relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              themeMode === 'system' 
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'
            }`}
          >
            <div className="w-full aspect-video bg-gradient-to-br from-slate-100 to-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden flex items-center justify-center">
               <Monitor className="w-8 h-8 text-slate-400 mix-blend-difference" />
            </div>
            <span className={`font-medium ${themeMode === 'system' ? 'text-primary-600' : 'text-slate-600 dark:text-slate-400'}`}>System</span>
            {themeMode === 'system' && (
              <div className="absolute top-3 right-3 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        </div>
      </motion.div>

      {/* 3. Color Theme */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
            <Palette className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Color Theme</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Choose your primary brand color</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setColorTheme(theme.id)}
              className={`group relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                colorTheme === theme.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                  : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'
              }`}
            >
              <div className={`w-10 h-10 rounded-full ${theme.color} shadow-sm ring-4 ring-white dark:ring-slate-800 group-hover:scale-110 transition-transform`}></div>
              <span className={`text-sm font-medium ${colorTheme === theme.id ? 'text-primary-600' : 'text-slate-600 dark:text-slate-400'}`}>
                {theme.name}
              </span>
              {colorTheme === theme.id && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
        
        {/* Preview Box */}
        <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700">
           <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Live Preview</h3>
           <div className="flex flex-wrap gap-4">
             <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors shadow-sm shadow-primary-500/20">
               Primary Button
             </button>
             <button className="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg font-medium transition-colors border border-primary-100 dark:border-primary-800">
               Secondary Button
             </button>
             <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
                <div className="w-3 h-3 rounded-full bg-primary-500 animate-pulse"></div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Status Indicator</span>
             </div>
           </div>
        </div>
      </motion.div>

      {/* 4. Chart Style */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
            <Activity className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Chart Style</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Select how data visualizations appear</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => setChartType('area')}
            className={`group relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              chartType === 'area' 
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'
            }`}
          >
            <div className="w-full aspect-video bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-center">
               <Activity className="w-8 h-8 text-primary-500" />
            </div>
            <span className={`font-medium ${chartType === 'area' ? 'text-primary-600' : 'text-slate-600 dark:text-slate-400'}`}>Area Chart</span>
            {chartType === 'area' && (
              <div className="absolute top-3 right-3 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>

          <button
            onClick={() => setChartType('bar')}
            className={`group relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              chartType === 'bar' 
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'
            }`}
          >
            <div className="w-full aspect-video bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-center">
               <BarChart2 className="w-8 h-8 text-primary-500" />
            </div>
            <span className={`font-medium ${chartType === 'bar' ? 'text-primary-600' : 'text-slate-600 dark:text-slate-400'}`}>Bar Chart</span>
            {chartType === 'bar' && (
              <div className="absolute top-3 right-3 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>

          <button
            onClick={() => setChartType('line')}
            className={`group relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              chartType === 'line' 
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'
            }`}
          >
            <div className="w-full aspect-video bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-center">
               <LineChart className="w-8 h-8 text-primary-500" />
            </div>
            <span className={`font-medium ${chartType === 'line' ? 'text-primary-600' : 'text-slate-600 dark:text-slate-400'}`}>Line Chart</span>
            {chartType === 'line' && (
              <div className="absolute top-3 right-3 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        </div>
      </motion.div>

    </div>
  );
};

export default ThemeCustomizer;