import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sun, 
  Moon, 
  Monitor, 
  Check, 
  Palette, 
  LayoutDashboard,
  RefreshCw,
  ExternalLink,
  Box
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { ColorTheme, LayoutTheme, CardStyle } from '../../types';

const ThemeSettingsDrawer: React.FC = () => {
  const { 
    isThemeSettingsOpen, 
    toggleThemeSettings, 
    themeMode, 
    setThemeMode, 
    colorTheme, 
    setColorTheme,
    layoutTheme,
    setLayoutTheme,
    cardStyle,
    setCardStyle
  } = useAppContext();
  
  const navigate = useNavigate();

  const themes: { id: ColorTheme; name: string; color: string }[] = [
    { id: 'blue', name: 'Blue', color: 'bg-blue-500' },
    { id: 'green', name: 'Green', color: 'bg-green-500' },
    { id: 'purple', name: 'Purple', color: 'bg-purple-500' },
    { id: 'orange', name: 'Orange', color: 'bg-orange-500' },
    { id: 'red', name: 'Red', color: 'bg-red-500' },
    { id: 'teal', name: 'Teal', color: 'bg-teal-500' },
  ];

  const resetSettings = () => {
    setThemeMode('system');
    setColorTheme('blue');
    setLayoutTheme('Default');
    setCardStyle('default');
  };

  const featuredLayouts: LayoutTheme[] = ['Default', 'Minimal', 'Modern', 'Material', 'SaaS', 'Flat'];
  const cardStyles: { id: CardStyle; name: string }[] = [
    { id: 'default', name: 'Default' },
    { id: 'flat', name: 'Flat' },
    { id: 'bordered', name: 'Bordered' },
    { id: 'glass', name: 'Glass' },
    { id: 'neo', name: 'Neo' }
  ];

  return (
    <AnimatePresence>
      {isThemeSettingsOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleThemeSettings}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Theme Settings</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Customize your view</p>
              </div>
              <button 
                onClick={toggleThemeSettings}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Layout Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" /> Layout
                  </h3>
                  <button 
                    onClick={() => {
                      toggleThemeSettings();
                      navigate('/settings/theme');
                    }}
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                  >
                    View All <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {featuredLayouts.map((theme) => (
                    <button
                      key={theme}
                      onClick={() => setLayoutTheme(theme)}
                      className={`relative flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all ${
                        layoutTheme === theme
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      {/* Mini Layout Preview */}
                      <div className="w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden relative border border-slate-200 dark:border-slate-700">
                        <div className="absolute top-0 w-full h-1.5 bg-slate-300 dark:bg-slate-600"></div>
                        <div className="absolute left-0 top-1.5 bottom-0 w-3 bg-slate-200 dark:bg-slate-700"></div>
                      </div>
                      
                      <span className={`text-xs font-medium ${layoutTheme === theme ? 'text-primary-600' : 'text-slate-500'}`}>
                        {theme}
                      </span>
                      {layoutTheme === theme && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Style Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Box className="w-4 h-4" /> Card Style
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {cardStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setCardStyle(style.id)}
                      className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        cardStyle === style.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 text-primary-600' 
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500'
                      }`}
                    >
                      <span className="text-xs font-medium">{style.name}</span>
                      {cardStyle === style.id && (
                        <div className="absolute top-1 right-1 w-3 h-3 bg-primary-500 rounded-full flex items-center justify-center">
                          <Check className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Mode</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setThemeMode('light')}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                      themeMode === 'light' 
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 text-primary-600' 
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <Sun className="w-6 h-6" />
                    <span className="text-xs font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => setThemeMode('dark')}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                      themeMode === 'dark' 
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 text-primary-600' 
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <Moon className="w-6 h-6" />
                    <span className="text-xs font-medium">Dark</span>
                  </button>
                  <button
                    onClick={() => setThemeMode('system')}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                      themeMode === 'system' 
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 text-primary-600' 
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <Monitor className="w-6 h-6" />
                    <span className="text-xs font-medium">System</span>
                  </button>
                </div>
              </div>

              {/* Color Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Palette className="w-4 h-4" /> Color Theme
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setColorTheme(theme.id)}
                      className={`group relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        colorTheme === theme.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full ${theme.color} shadow-sm ring-2 ring-white dark:ring-slate-800`}></div>
                      <span className={`text-xs font-medium ${colorTheme === theme.id ? 'text-primary-600' : 'text-slate-500'}`}>
                        {theme.name}
                      </span>
                      {colorTheme === theme.id && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview Section */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Live Preview</h4>
                <div className="space-y-3">
                  <button className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-primary-500/20">
                    Primary Button
                  </button>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly className="accent-primary-600 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">Checkbox Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-4 bg-primary-600 rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-300">Toggle Active</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <button 
                onClick={resetSettings}
                className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all font-medium text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Reset to Default
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ThemeSettingsDrawer;