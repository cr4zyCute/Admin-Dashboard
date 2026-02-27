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
  LogOut,
  Lock,
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
  LifeBuoy
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
              <div className="absolute top-full left-0 mt-4 w-[800px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex animate-in fade-in slide-in-from-top-2 z-50">
                {/* Left Side: Apps Grid */}
                <div className="flex-1 p-6 flex flex-col justify-between bg-white">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    {[
                      { name: 'eCommerce', desc: 'Products, orders & etc.', icon: ShoppingBag, color: 'text-orange-500', bg: 'bg-orange-50' },
                      { name: 'Chat', desc: 'Team conversations', icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-50' },
                      { name: 'Task', desc: 'Plan and track work', icon: ListTodo, color: 'text-red-500', bg: 'bg-red-50' },
                      { name: 'Email', desc: 'Messages and inbox', icon: Mail, color: 'text-teal-500', bg: 'bg-teal-50' },
                      { name: 'Companies', desc: 'Business profiles', icon: Building, color: 'text-amber-600', bg: 'bg-amber-50' },
                      { name: 'Contacts Diary', desc: 'People and connections', icon: Users, color: 'text-slate-600', bg: 'bg-slate-100' },
                      { name: 'Calendar', desc: 'Events and reminders', icon: Calendar, color: 'text-yellow-500', bg: 'bg-yellow-50' },
                      { name: 'Support', desc: 'Help and assistance', icon: LifeBuoy, color: 'text-green-600', bg: 'bg-green-50' },
                    ].map((app) => (
                      <a key={app.name} href="#" className="flex items-start gap-3 group p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105", app.bg, app.color)}>
                          <app.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{app.name}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">{app.desc}</p>
                        </div>
                      </a>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 uppercase tracking-wider font-medium">
                    <div className="flex items-center gap-2">
                      <span>-: SUPPORT :-</span>
                      <a href="mailto:help@mydomain.com" className="text-slate-700 hover:text-blue-600 normal-case">help@mydomain.com</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>-: HELP :-</span>
                      <a href="tel:+1234567890" className="text-slate-700 hover:text-blue-600 normal-case">+(12) 3456 7890</a>
                    </div>
                  </div>
                </div>

                {/* Right Side: Promo Banner */}
                <div className="w-72 bg-gradient-to-br from-amber-700/90 to-amber-900/90 text-white p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                  {/* Background Pattern Effect */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 border-2 border-white/30 rounded-lg flex items-center justify-center mb-6 rotate-45 group-hover:rotate-90 transition-transform duration-500">
                      <div className="w-8 h-8 border border-white/50 rounded flex items-center justify-center -rotate-45 group-hover:-rotate-90 transition-transform duration-500">
                         <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    </div>

                    <p className="text-amber-200 text-xs font-bold tracking-[0.2em] uppercase mb-2">LIMITED OFFER</p>
                    <h3 className="text-2xl font-bold mb-6 leading-tight">Unlock Exclusive Savings</h3>
                    
                    <div className="mb-8">
                      <span className="text-amber-200/60 line-through text-lg mr-3">$49.00</span>
                      <span className="text-white text-2xl font-bold">$25 USD</span>
                    </div>

                    <button className="bg-white/20 hover:bg-white text-white hover:text-amber-900 border border-white/50 hover:border-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar - Centered */}
      <div className="hidden md:flex items-center relative flex-1 max-w-xl mx-4">
        <Search className="absolute left-3 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

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
            <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50 ring-1 ring-slate-900/5">
              {/* Header with User Info */}
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <img 
                    src={user?.avatar || "https://ui-avatars.com/api/?name=User"} 
                    alt={user?.name} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                    <p className="text-xs text-slate-500 truncate font-medium">{user?.role || 'Administrator'}</p>
                  </div>
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="p-2">
                <div className="space-y-0.5">
                  <button className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg flex items-center gap-3 transition-all group">
                    <User className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg flex items-center gap-3 transition-all group">
                    <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    <span>Inbox</span>
                    <span className="ml-auto bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full text-[10px] font-bold">3</span>
                  </button>
                  <button className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg flex items-center gap-3 transition-all group">
                    <Settings className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg flex items-center gap-3 transition-all group">
                    <HelpCircle className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    <span>Support</span>
                  </button>
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-2 border-t border-slate-100 bg-slate-50/30">
                <button className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg flex items-center gap-3 transition-all group">
                  <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" />
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
