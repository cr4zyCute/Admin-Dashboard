import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import ThemeSettingsDrawer from '../settings/ThemeSettingsDrawer';
import { useAppContext } from '../../context/AppContext';
import { cn } from '../../lib/utils';

const MainLayout: React.FC = () => {
  const { 
    sidebarCollapsed, 
    toggleSidebar, 
    setActiveRoute,
    toggleThemeSettings
  } = useAppContext();
  
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // Update active route in context when location changes
  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location, setActiveRoute]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        activeRoute={location.pathname} 
        onToggle={toggleSidebar}
        isMobile={isMobile}
        onMobileClose={toggleSidebar}
      />
      
      <TopNav 
        onToggleSidebar={toggleSidebar}
        isSidebarCollapsed={sidebarCollapsed}
      />

      <main 
        className={cn(
          "transition-all duration-300 min-h-screen pt-20 pb-8 px-4 lg:px-8",
          isMobile 
            ? "ml-0" 
            : (sidebarCollapsed ? "ml-20" : "ml-64")
        )}
      >
        <Outlet />
      </main>

      {/* Floating Theme Customizer Button */}
      <button
        onClick={toggleThemeSettings}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-l-xl shadow-lg transition-all duration-300 group"
        title="Customize Theme"
      >
        <Settings className="w-6 h-6 animate-spin-slow group-hover:animate-spin" />
        <span className="sr-only">Customize Theme</span>
      </button>

      <ThemeSettingsDrawer />
    </div>
  );
};

export default MainLayout;
