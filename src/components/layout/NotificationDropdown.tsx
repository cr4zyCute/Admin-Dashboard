import React from 'react';
import { 
  Check, 
  Upload, 
  Database, 
  AlertTriangle,
  Bell
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppContext } from '../../context/AppContext';
import { NotificationType } from '../../types';

const NotificationDropdown: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppContext();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const getStatusIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <Check className="w-3 h-3 text-white" />;
      case 'info':
        return <Upload className="w-3 h-3 text-white" />;
      case 'error':
        return <span className="w-1.5 h-1.5 bg-white rounded-full">!</span>; // Custom exclamation for error
      case 'warning':
        return <AlertTriangle className="w-3 h-3 text-white" />;
      default:
        return <Bell className="w-3 h-3 text-white" />;
    }
  };

  const getStatusColor = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500'; // Green
      case 'info':
        return 'bg-cyan-500'; // Cyan/Blue
      case 'error':
        return 'bg-pink-500'; // Pink/Magenta
      case 'warning':
        return 'bg-amber-500'; // Orange
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="absolute top-full right-0 mt-4 w-80 sm:w-96 bg-slate-900 rounded-xl shadow-2xl border border-slate-800 animate-in fade-in slide-in-from-top-2 z-50 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <h3 className="font-bold text-white text-base">Notifications</h3>
        <span className="text-[10px] font-bold bg-teal-500/20 text-teal-400 px-2 py-1 rounded-full uppercase tracking-wider border border-teal-500/30">
          {unreadCount.toString().padStart(2, '0')} Notification
        </span>
      </div>

      {/* Notification List */}
      <div className="max-h-[400px] overflow-y-auto scrollbar-dark pr-1">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No new notifications
          </div>
        ) : (
          <div className="divide-y divide-slate-800/50">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                onClick={() => markNotificationRead(notification.id)}
                className={cn(
                  "p-4 hover:bg-slate-800/50 transition-colors cursor-pointer flex gap-4 group relative",
                  !notification.read ? "bg-slate-800/20" : ""
                )}
              >
                {/* Avatar/Icon Area */}
                <div className="relative flex-shrink-0">
                  {notification.avatar ? (
                    <img 
                      src={notification.avatar} 
                      alt="User" 
                      className="w-10 h-10 rounded-full object-cover border-2 border-slate-800"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border-2 border-slate-700">
                      <Database className="w-5 h-5 text-slate-400" />
                    </div>
                  )}
                  
                  {/* Status Glyph */}
                  <div className={cn(
                    "absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-sm",
                    getStatusColor(notification.type)
                  )}>
                    {getStatusIcon(notification.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 leading-snug mb-1.5">
                    {/* Render message with bold parts if string contains formatting hints, otherwise plain */}
                    {/* For simplicity in this mock data version, we rely on the fact that we moved complex ReactNode to plain strings in mockData. 
                        To restore the bold formatting, we can parse the string or just use the plain string for now as requested by "clean code" refactor.
                        If we want bold text back, we should structure the Notification type to have `subject`, `action`, `target` fields instead of a single message string.
                        For now, let's keep it simple as string. */}
                    {notification.message}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    {notification.timestamp}
                  </p>
                </div>

                {/* Unread Indicator Dot */}
                {!notification.read && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 text-center">
        <button 
          onClick={markAllNotificationsRead}
          className="text-xs font-bold text-slate-300 hover:text-white underline decoration-slate-600 hover:decoration-white underline-offset-4 transition-all"
        >
          Read All Messages
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
