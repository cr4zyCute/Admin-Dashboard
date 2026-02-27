import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { useAppContext } from '../../context/AppContext';
import { cn } from '../../lib/utils';

const MainLayout: React.FC = () => {
  const { 
    sidebarCollapsed, 
    toggleSidebar, 
    user, 
    notifications, 
    setActiveRoute 
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
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
    </div>
  );
};

export default MainLayout;
