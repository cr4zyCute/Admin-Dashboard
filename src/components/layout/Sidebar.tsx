import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MENU_ITEMS } from '../../data/navigation';
import Lottie from 'lottie-react';
import customizerAnimation from '../../assets/Microsoft Designer.json';

interface SidebarProps {
  isCollapsed: boolean;
  activeRoute: string;
  onToggle: () => void;
  isMobile: boolean;
  onMobileClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, activeRoute, isMobile, onMobileClose }) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['ecommerce']);

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getRoute = (route: string) => {
    if (activeRoute.startsWith('/customization')) {
      if (route.startsWith('/customization')) return route;
      return `/customization${route}`;
    }
    return route;
  };

  const isCustomizationMode = activeRoute.startsWith('/customization');

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={cn(
          "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl h-screen fixed left-0 top-0 z-50 transition-all duration-300 flex flex-col border-r border-slate-200 dark:border-slate-800",
          isMobile 
            ? (isCollapsed ? "-translate-x-full" : "w-64 translate-x-0") 
            : (isCollapsed ? "w-20" : "w-64")
        )}
      >
        {/* Brand Area */}
        <div className={cn(
          "h-16 flex items-center px-6 border-b flex-shrink-0 transition-colors duration-300",
          isCustomizationMode 
            ? "bg-primary-600 border-primary-500" 
            : "border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50"
        )}>
          <div className={cn(
            "flex items-center gap-3 font-bold text-xl w-full overflow-hidden",
            isCustomizationMode ? "text-white" : "text-slate-900 dark:text-white"
          )}>
            <div className={cn(
              "w-8 h-8 min-w-[32px] rounded-xl flex items-center justify-center shadow-lg ring-1 transition-all duration-300 overflow-hidden",
              isCustomizationMode
                ? "bg-white text-primary-600 ring-white/20 shadow-black/10 p-0"
                : "bg-gradient-to-br from-primary-600 to-primary-400 text-white shadow-primary-500/20 ring-white/10"
            )}>
              {isCustomizationMode ? (
                 <div className="w-16 h-16 flex items-center justify-center">
                   <Lottie animationData={customizerAnimation} loop={true} />
                 </div>
              ) : (
                <span className="font-bold text-lg">P</span>
              )}
            </div>
            <div className={cn(
              "transition-all duration-300 delay-100 flex flex-col",
              isCollapsed && !isMobile ? "opacity-0 w-0" : "opacity-100 w-auto"
            )}>
              <span className="font-display tracking-tight leading-none">
                {isCustomizationMode ? 'Customizer' : 'eCommerce'}
              </span>
              {isCustomizationMode && (
                <span className="text-[10px] font-medium text-primary-100 leading-none mt-1 uppercase tracking-wider">
                  Editing Mode
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-custom">
          {MENU_ITEMS.map((section, idx) => (
            <div key={idx} className="mb-6">
              {!isCollapsed && (
                <div className="px-6 mb-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  {section.category}
                </div>
              )}
              
              <div className="space-y-0.5 px-3">
                {section.items.map((item) => {
                  const isActive = activeRoute === item.route || activeRoute.startsWith(item.route + '/');
                  const hasSubItems = item.subItems && item.subItems.length > 0;
                  const isExpanded = expandedMenus.includes(item.id);
                  const Icon = item.icon;
                  
                  return (
                    <div key={item.id}>
                      {hasSubItems ? (
                        <button
                          onClick={() => !isCollapsed && toggleMenu(item.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative select-none",
                            isActive 
                              ? "bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400" 
                              : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                          )}
                        >
                          <Icon className={cn("w-5 h-5 min-w-[20px] transition-colors", isActive ? "text-primary-600 dark:text-primary-400" : "text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300")} />
                          
                          {!isCollapsed && (
                            <>
                              <div className="flex-1 flex items-center justify-between overflow-hidden">
                                <span className="truncate text-sm font-medium">{item.label}</span>
                                {item.badge && (
                                  <span className={cn(
                                    "text-[10px] font-bold px-1.5 py-0.5 rounded text-white ml-2 shadow-sm",
                                    item.badgeColor || "bg-primary-500"
                                  )}>
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <ChevronRight className={cn("w-4 h-4 transition-transform duration-200 text-slate-400 dark:text-slate-600", isExpanded ? "rotate-90" : "")} />
                            </>
                          )}
                        </button>
                      ) : (
                        <NavLink
                          to={getRoute(item.route)}
                          className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                            isActive 
                              ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md shadow-primary-500/20" 
                              : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                          )}
                        >
                          <Icon className={cn("w-5 h-5 min-w-[20px] transition-colors", isActive ? "text-white" : "text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300")} />
                          
                          {!isCollapsed && (
                            <div className="flex-1 flex items-center justify-between overflow-hidden">
                              <span className="truncate text-sm font-medium">{item.label}</span>
                              {item.badge && (
                                <span className={cn(
                                    "text-[10px] font-bold px-1.5 py-0.5 rounded text-white ml-2 shadow-sm",
                                    item.badgeColor || "bg-primary-500"
                                  )}>
                                    {item.badge}
                                  </span>
                              )}
                            </div>
                          )}

                          {/* Tooltip for collapsed state */}
                          {isCollapsed && !isMobile && (
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg border border-slate-700 font-medium">
                              {item.label}
                            </div>
                          )}
                        </NavLink>
                      )}

                      {/* Submenu Items */}
                      {!isCollapsed && hasSubItems && isExpanded && (
                        <div className="mt-2 ml-4 pl-3 border-l border-slate-200 dark:border-slate-800 space-y-1 transition-all duration-300 ease-in-out">
                          {item.subItems?.map((subItem) => {
                            const SubIcon = subItem.icon;
                            return (
                              <NavLink
                                key={subItem.id}
                                to={getRoute(subItem.route)}
                                title={subItem.label}
                                className={({ isActive }) => cn(
                                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 group/sub relative overflow-hidden",
                                  isActive 
                                    ? "text-primary-600 dark:text-primary-400 bg-primary-50/80 dark:bg-primary-500/10 font-medium shadow-sm ring-1 ring-primary-100 dark:ring-primary-900/30" 
                                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                )}
                              >
                                {/* Active Indicator Dot */}
                                {({ isActive }) => (
                                  <>
                                    {isActive && (
                                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-3/5 bg-primary-600 dark:bg-primary-400 rounded-r-full" />
                                    )}
                                    
                                    {SubIcon && (
                                      <SubIcon className={cn(
                                        "w-4 h-4 transition-colors duration-200", 
                                        isActive ? "text-primary-600 dark:text-primary-400" : "text-slate-400 group-hover/sub:text-slate-600 dark:text-slate-500 dark:group-hover/sub:text-slate-300"
                                      )} />
                                    )}
                                    
                                    <span className="truncate">{subItem.label}</span>
                                    
                                    {/* Hover Chevron */}
                                    <ChevronRight className={cn(
                                      "w-3 h-3 ml-auto opacity-0 -translate-x-2 transition-all duration-200 text-slate-400",
                                      isActive ? "opacity-100 translate-x-0" : "group-hover/sub:opacity-100 group-hover/sub:translate-x-0"
                                    )} />
                                  </>
                                )}
                              </NavLink>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Sidebar Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-slate-100/50 dark:bg-slate-800/40 rounded-xl p-3 flex items-center gap-3 border border-slate-200/50 dark:border-slate-700/50">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white text-sm font-bold shadow-sm ring-2 ring-white dark:ring-slate-800">
                D
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">David Dev</p>
                <p className="text-xs text-slate-500 truncate font-medium">Admin Head</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
