import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  Bell, 
  Maximize, 
  Settings, 
  Menu, 
  ChevronDown,
  Minimize,
  User,
  HelpCircle,
  LogOut,
  MessageSquare,
  Search,
  Sun,
  Moon,
  ShoppingBag,
  ListTodo,
  Mail,
  Building,
  Users,
  Calendar,
  LifeBuoy,
  RefreshCcw,
  Trash2,
  Database,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppContext } from '../../context/AppContext';
import { useTheme } from '../../hooks/useTheme';
import NotificationDropdown from './NotificationDropdown';

interface TopNavProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

const TopNav: React.FC<TopNavProps> = ({ 
  onToggleSidebar,
  isSidebarCollapsed 
}) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { 
    user,  
    notifications, 
    dataState, 
    toggleData,
    toggleThemeSettings 
  } = useAppContext();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <header className={cn(
      "h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 fixed top-0 right-0 z-40 transition-all duration-300 flex items-center justify-between px-4 lg:px-8 shadow-sm",
      isSidebarCollapsed ? "left-0 lg:left-20" : "left-0 lg:left-64"
    )} ref={dropdownRef}>
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="p-2 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-xl text-slate-600 dark:text-slate-400 transition-all active:scale-95"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Desktop Menu Toggles */}
        <div className="hidden md:flex items-center gap-1">
          <div className="relative group">
            <button 
              onClick={() => toggleDropdown('mega')}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-200",
                activeDropdown === 'mega' 
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
              )}
            >
              Mega Menu <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeDropdown === 'mega' ? "rotate-180" : "")} />
            </button>
            
            {/* Mega Menu Dropdown */}
            {activeDropdown === 'mega' && (
              <div className="absolute top-full left-0 mt-2 w-[600px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 z-50 ring-1 ring-slate-900/5 dark:ring-white/5">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-xs uppercase tracking-widest">UI Components</h3>
                  <ul className="space-y-1">
                    <li><a href="#" className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 rounded-lg block transition-colors">Buttons</a></li>
                    <li><a href="#" className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 rounded-lg block transition-colors">Cards</a></li>
                    <li><a href="#" className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 rounded-lg block transition-colors">Dropdowns</a></li>
                    <li><a href="#" className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 rounded-lg block transition-colors">Modals</a></li>
                    <li><a href="#" className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 rounded-lg block transition-colors">Tabs</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-xs uppercase tracking-widest">Applications</h3>
                  <ul className="space-y-1">
                    <li><a href="#" className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 rounded-lg block transition-colors">Ecommerce</a></li>
                    <li><a href="#" className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 rounded-lg block transition-colors">Chat</a></li>
                    <li><a href="#" className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 rounded-lg block transition-colors">Email</a></li>
                    <li><a href="#" className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 rounded-lg block transition-colors">Invoices</a></li>
                    <li><a href="#" className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 rounded-lg block transition-colors">Projects</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-xs uppercase tracking-widest">Extra Pages</h3>
                  <ul className="space-y-1">
                    <li><a href="#" className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 rounded-lg block transition-colors">Authentication</a></li>
                    <li><a href="#" className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 rounded-lg block transition-colors">Pricing</a></li>
                    <li><a href="#" className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 rounded-lg block transition-colors">Maintenance</a></li>
                    <li><a href="#" className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 rounded-lg block transition-colors">Coming Soon</a></li>
                    <li><a href="#" className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 rounded-lg block transition-colors">Error Pages</a></li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="relative group">
            <button 
              onClick={() => toggleDropdown('apps')}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-200",
                activeDropdown === 'apps' 
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
              )}
            >
              Apps <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeDropdown === 'apps' ? "rotate-180" : "")} />
            </button>
            
            {/* Apps Dropdown */}
            {activeDropdown === 'apps' && (
              <div className="absolute top-full left-0 mt-2 w-[800px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden flex animate-in fade-in slide-in-from-top-2 z-50 ring-1 ring-slate-900/5 dark:ring-white/5">
                {/* Left Side: Apps Grid */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'eCommerce', desc: 'Products, orders & etc.', icon: ShoppingBag, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10' },
                      { name: 'Chat', desc: 'Team conversations', icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-500/10' },
                      { name: 'Task', desc: 'Plan and track work', icon: ListTodo, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-500/10' },
                      { name: 'Email', desc: 'Messages and inbox', icon: Mail, color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-500/10' },
                      { name: 'Companies', desc: 'Business profiles', icon: Building, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-500/10' },
                      { name: 'Contacts Diary', desc: 'People and connections', icon: Users, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-slate-800' },
                      { name: 'Calendar', desc: 'Events and reminders', icon: Calendar, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-500/10' },
                      { name: 'Support', desc: 'Help and assistance', icon: LifeBuoy, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-500/10' },
                    ].map((app) => (
                      <a key={app.name} href="#" className="flex items-start gap-3 group p-3 rounded-xl hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-all hover:scale-[1.02]">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform shadow-sm", app.bg, app.color.replace('blue', 'primary'))}>
                          <app.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{app.name}</h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{app.desc}</p>
                        </div>
                      </a>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-2">
                      <span>Support</span>
                      <a href="mailto:help@mydomain.com" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 normal-case font-medium transition-colors">help@mydomain.com</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Help</span>
                      <a href="tel:+1234567890" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 normal-case font-medium transition-colors">+(12) 3456 7890</a>
                    </div>
                  </div>
                </div>

                {/* Right Side: Promo Banner */}
                <div className="w-72 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                  {/* Background Pattern Effect */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 ring-1 ring-white/20 shadow-xl shadow-black/20 group-hover:scale-110 transition-transform duration-500">
                       <ShoppingBag className="w-6 h-6 text-white" />
                    </div>

                    <p className="text-primary-400 text-[10px] font-bold tracking-[0.25em] uppercase mb-3">Limited Offer</p>
                    <h3 className="text-2xl font-bold mb-4 leading-tight">Unlock Pro Features</h3>
                    
                    <div className="mb-8 flex items-baseline gap-2 justify-center">
                      <span className="text-slate-400 line-through text-sm">$49</span>
                      <span className="text-white text-3xl font-bold">$25</span>
                    </div>

                    <button className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg shadow-primary-600/25 flex items-center gap-2 hover:translate-y-[-2px]">
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar - Centered */}
      <div className="hidden md:flex items-center relative flex-1 max-w-xl mx-8">
        <Search className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />
        <input 
          type="text" 
          placeholder="Search for anything..." 
          className="w-full pl-11 pr-4 py-2.5 bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 border border-transparent focus:border-primary-500/30 dark:focus:border-primary-500/30 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all shadow-sm"
        />
        <div className="absolute right-3 flex items-center gap-1.5">
           <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">⌘ K</span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-1.5 md:gap-3">
        {/* Test Data Toggle */}
        <button 
          onClick={toggleData}
          className={cn(
            "p-2.5 rounded-xl transition-all active:scale-95",
            dataState === 'default' 
              ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
              : dataState === 'alternate'
                ? "bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
          )}
          title={`Data Mode: ${dataState.charAt(0).toUpperCase() + dataState.slice(1)}`}
        >
          {dataState === 'default' && <Database className="w-5 h-5" />}
          {dataState === 'alternate' && <RefreshCcw className="w-5 h-5" />}
          {dataState === 'empty' && <Trash2 className="w-5 h-5" />}
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all hover:text-slate-900 dark:hover:text-white active:scale-95"
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Theme Settings Button */}
        <button
          onClick={toggleThemeSettings}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors relative"
        >
          <Settings className="w-5 h-5 animate-spin-slow hover:text-primary-600 dark:hover:text-primary-400" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('notifications')}
            className={cn(
              "relative p-2.5 rounded-xl transition-all active:scale-95",
              activeDropdown === 'notifications' 
                ? "bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400" 
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {activeDropdown === 'notifications' && <NotificationDropdown />}
        </div>

        {/* Fullscreen */}
        <button 
          onClick={toggleFullscreen}
          className="hidden md:flex p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all hover:text-slate-900 dark:hover:text-white active:scale-95"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden md:block"></div>

        {/* User Profile */}
        <div className="relative">
          <div 
            onClick={() => toggleDropdown('profile')}
            className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl p-1.5 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <div className="relative">
              <img 
                src={user?.avatar || "https://ui-avatars.com/api/?name=User"} 
                alt={user?.name} 
                className="w-9 h-9 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm"
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
            </div>
            <div className="hidden md:block text-left mr-1">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-none mb-1">{user?.name}</p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-none">Administrator</p>
            </div>
            <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 dark:text-slate-500 hidden md:block transition-transform duration-200", activeDropdown === 'profile' ? "rotate-180" : "")} />
          </div>

          {/* Profile Dropdown */}
          {activeDropdown === 'profile' && (
            <div className="absolute top-full right-0 mt-3 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50 ring-1 ring-slate-900/5 dark:ring-white/5">
              {/* Header with User Info */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
                <div className="flex items-center gap-4">
                  <img 
                    src={user?.avatar || "https://ui-avatars.com/api/?name=User"} 
                    alt={user?.name} 
                    className="w-12 h-12 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-slate-900 dark:text-white truncate">{user?.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      Online Status
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="p-2">
                <div className="space-y-0.5">
                  <button className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl flex items-center gap-3 transition-all group">
                    <User className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl flex items-center gap-3 transition-all group">
                    <MessageSquare className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                    <span>Inbox</span>
                    <span className="ml-auto bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 py-0.5 px-2 rounded-lg text-[10px] font-bold shadow-sm">3</span>
                  </button>
                  <button 
                    onClick={() => {
                      window.open('/customization', '_blank');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl flex items-center gap-3 transition-all group"
                  >
                    <Settings className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                    <span>Customize Theme</span>
                  </button>
                  <button className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl flex items-center gap-3 transition-all group">
                    <HelpCircle className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                    <span>Support</span>
                  </button>
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <button className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 rounded-xl flex items-center gap-3 transition-all group">
                  <LogOut className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNav;
