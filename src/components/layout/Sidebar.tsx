import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MENU_ITEMS } from '../../data/navigation';

interface SidebarProps {
  isCollapsed: boolean;
  activeRoute: string;
  onToggle: () => void;
  isMobile: boolean;
  onMobileClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, activeRoute, onToggle, isMobile, onMobileClose }) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['ecommerce']);

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

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
          "bg-slate-900 text-slate-300 h-screen fixed left-0 top-0 z-50 transition-all duration-300 flex flex-col border-r border-slate-800 shadow-xl",
          isMobile 
            ? (isCollapsed ? "-translate-x-full" : "w-64 translate-x-0") 
            : (isCollapsed ? "w-20" : "w-64")
        )}
      >
        {/* Brand Area */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3 font-bold text-xl text-white w-full overflow-hidden">
            <div className="w-8 h-8 min-w-[32px] rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <span className="font-bold text-lg">P</span>
            </div>
            <span className={cn(
              "transition-opacity duration-300 delay-100",
              isCollapsed && !isMobile ? "opacity-0 w-0" : "opacity-100"
            )}>
              Paces
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent hover:scrollbar-thumb-slate-600">
          {MENU_ITEMS.map((section, idx) => (
            <div key={idx} className="mb-6">
              {!isCollapsed && (
                <div className="px-6 mb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {section.category}
                </div>
              )}
              
              <div className="space-y-1 px-3">
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
                              ? "bg-slate-800/50 text-white" 
                              : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                          )}
                        >
                          <Icon className={cn("w-5 h-5 min-w-[20px] transition-colors", isActive ? "text-blue-500" : "text-slate-400 group-hover:text-white")} />
                          
                          {!isCollapsed && (
                            <>
                              <div className="flex-1 flex items-center justify-between overflow-hidden">
                                <span className="truncate text-sm font-medium">{item.label}</span>
                                {item.badge && (
                                  <span className={cn(
                                    "text-[10px] font-bold px-1.5 py-0.5 rounded text-white ml-2",
                                    item.badgeColor || "bg-blue-500"
                                  )}>
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <ChevronRight className={cn("w-4 h-4 transition-transform duration-200", isExpanded ? "rotate-90" : "")} />
                            </>
                          )}
                        </button>
                      ) : (
                        <NavLink
                          to={item.route}
                          className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                            isActive 
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                              : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                          )}
                        >
                          <Icon className={cn("w-5 h-5 min-w-[20px] transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
                          
                          {!isCollapsed && (
                            <div className="flex-1 flex items-center justify-between overflow-hidden">
                              <span className="truncate text-sm font-medium">{item.label}</span>
                              {item.badge && (
                                <span className={cn(
                                  "text-[10px] font-bold px-1.5 py-0.5 rounded text-white ml-2",
                                  item.badgeColor || "bg-blue-500"
                                )}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Tooltip for collapsed state */}
                          {isCollapsed && !isMobile && (
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg border border-slate-700">
                              {item.label}
                            </div>
                          )}
                        </NavLink>
                      )}

                      {/* Submenu Items */}
                      {!isCollapsed && hasSubItems && isExpanded && (
                        <div className="mt-1 ml-4 pl-4 border-l border-slate-800 space-y-1 overflow-hidden transition-all duration-300 ease-in-out">
                          {item.subItems?.map((subItem) => (
                            <NavLink
                              key={subItem.id}
                              to={subItem.route}
                              className={({ isActive }) => cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 group/sub relative text-sm",
                                isActive 
                                  ? "text-blue-400 bg-slate-800/30 font-medium" 
                                  : "text-slate-500 hover:text-white hover:bg-slate-800/30"
                              )}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40 group-hover/sub:opacity-100 transition-opacity"></span>
                              <span className="truncate">{subItem.label}</span>
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Sidebar Footer (Optional - User Profile Summary or Settings) */}
        {!isCollapsed && (
          <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <div className="bg-slate-800/50 rounded-lg p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
                D
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">David Dev</p>
                <p className="text-xs text-slate-500 truncate">Admin Head</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
