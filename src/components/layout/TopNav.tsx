import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  Maximize, 
  Settings, 
  Menu, 
  ChevronDown,
  Minimize,
  Grid,
  Check,
  User,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppContext } from '../../context/AppContext';
import NotificationDropdown from './NotificationDropdown';

interface TopNavProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

const TopNav: React.FC<TopNavProps> = ({ 
  onToggleSidebar,
  isSidebarCollapsed 
}) => {
  const { user, notifications } = useAppContext();
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
      "h-16 bg-white border-b border-slate-200 fixed top-0 right-0 z-40 transition-all duration-300 flex items-center justify-between px-4 lg:px-8",
      isSidebarCollapsed ? "left-0 lg:left-20" : "left-0 lg:left-64"
    )} ref={dropdownRef}>
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Desktop Menu Toggles */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <button 
              onClick={() => toggleDropdown('mega')}
              className={cn(
                "text-sm font-medium flex items-center gap-1 hover:text-slate-900 transition-colors",
                activeDropdown === 'mega' ? "text-slate-900" : "text-slate-600"
              )}
            >
              Mega Menu <ChevronDown className={cn("w-4 h-4 transition-transform", activeDropdown === 'mega' ? "rotate-180" : "")} />
            </button>
            
            {/* Mega Menu Dropdown */}
            {activeDropdown === 'mega' && (
              <div className="absolute top-full left-0 mt-4 w-[600px] bg-white rounded-xl shadow-lg border border-slate-100 p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 z-50">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider">UI Components</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 block">Buttons</a></li>
                    <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 block">Cards</a></li>
                    <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 block">Dropdowns</a></li>
                    <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 block">Modals</a></li>
                    <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 block">Tabs</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider">Applications</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 block">Ecommerce</a></li>
                    <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 block">Chat</a></li>
                    <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 block">Email</a></li>
                    <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 block">Invoices</a></li>
                    <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 block">Projects</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider">Extra Pages</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 block">Authentication</a></li>
                    <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 block">Pricing</a></li>
                    <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 block">Maintenance</a></li>
                    <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 block">Coming Soon</a></li>
                    <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 block">Error Pages</a></li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="relative group">
            <button 
              onClick={() => toggleDropdown('apps')}
              className={cn(
                "text-sm font-medium flex items-center gap-1 hover:text-slate-900 transition-colors",
                activeDropdown === 'apps' ? "text-slate-900" : "text-slate-600"
              )}
            >
              Apps <ChevronDown className={cn("w-4 h-4 transition-transform", activeDropdown === 'apps' ? "rotate-180" : "")} />
            </button>
            
            {/* Apps Dropdown */}
            {activeDropdown === 'apps' && (
              <div className="absolute top-full left-0 mt-4 w-80 bg-white rounded-xl shadow-lg border border-slate-100 p-4 grid grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 z-50">
                {['Slack', 'Jira', 'Dropbox', 'Github', 'Bitbucket', 'Dribbble'].map((app) => (
                  <a key={app} href="#" className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-slate-50 transition-colors group/item">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-2 group-hover/item:bg-white group-hover/item:shadow-sm transition-all text-slate-600">
                      <Grid className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-slate-600 group-hover/item:text-slate-900">{app}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('notifications')}
            className={cn(
              "relative p-2 rounded-full transition-colors",
              activeDropdown === 'notifications' ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-100"
            )}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {activeDropdown === 'notifications' && <NotificationDropdown />}
        </div>

        {/* Fullscreen */}
        <button 
          onClick={toggleFullscreen}
          className="hidden md:flex p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
        </button>

        {/* Settings */}
        <button className="hidden md:flex p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        {/* Language */}
        <div className="relative hidden md:block">
          <div 
            onClick={() => toggleDropdown('language')}
            className="flex items-center gap-2 px-2 py-1 hover:bg-slate-50 rounded cursor-pointer"
          >
            <img 
              src="https://flagcdn.com/w20/us.png" 
              alt="US Flag" 
              className="w-5 h-5 rounded-full object-cover shadow-sm"
            />
            <span className="text-sm font-medium text-slate-600">EN</span>
          </div>
          
          {/* Language Dropdown */}
          {activeDropdown === 'language' && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 z-50">
              {[
                { code: 'US', name: 'English', flag: 'us' },
                { code: 'DE', name: 'German', flag: 'de' },
                { code: 'IT', name: 'Italian', flag: 'it' },
                { code: 'ES', name: 'Spanish', flag: 'es' },
                { code: 'RU', name: 'Russian', flag: 'ru' }
              ].map((lang) => (
                <button 
                  key={lang.code}
                  className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-3"
                >
                  <img 
                    src={`https://flagcdn.com/w20/${lang.flag}.png`} 
                    alt={lang.name} 
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>{lang.name}</span>
                  {lang.code === 'US' && <Check className="w-3 h-3 text-blue-600 ml-auto" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block"></div>

        {/* User Profile */}
        <div className="relative">
          <div 
            onClick={() => toggleDropdown('profile')}
            className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-slate-50 rounded-lg p-1 transition-colors"
          >
            <img 
              src={user?.avatar || "https://ui-avatars.com/api/?name=User"} 
              alt={user?.name} 
              className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-slate-800 leading-none">{user?.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{user?.role}</p>
            </div>
            <ChevronDown className={cn("w-4 h-4 text-slate-400 hidden md:block transition-transform", activeDropdown === 'profile' ? "rotate-180" : "")} />
          </div>

          {/* Profile Dropdown */}
          {activeDropdown === 'profile' && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 z-50">
              <div className="px-4 py-3 border-b border-slate-100 mb-2">
                <p className="text-sm font-semibold text-slate-900">Signed in as</p>
                <p className="text-xs text-slate-500 truncate">{user?.name?.toLowerCase().replace(' ', '.')}@paces.com</p>
              </div>
              
              <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>Account Settings</span>
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span>Support</span>
              </button>
              
              <div className="border-t border-slate-100 my-2 pt-2">
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
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
