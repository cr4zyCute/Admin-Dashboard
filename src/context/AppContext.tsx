import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppContextType, Notification, User } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeRoute, setActiveRoute] = useState('/dashboard');
  const [user] = useState<User | null>({
    name: 'David Dev',
    role: 'Admin Head',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  });
  
  const [notifications, setNotifications] = useState<Notification[]>([
    { 
      id: '1', 
      message: 'Emily Johnson commented on a task in Design Sprint', 
      type: 'success', 
      timestamp: '12 minutes ago',
      read: false,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    { 
      id: '2', 
      message: 'Michael Lee uploaded files to Marketing Assets', 
      type: 'info', 
      timestamp: '25 minutes ago',
      read: false,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    { 
      id: '3', 
      message: 'Server #3 CPU usage exceeded 90%', 
      type: 'error', 
      timestamp: 'Just now',
      read: false,
    },
    { 
      id: '4', 
      message: 'Sophia Ray flagged an issue in Bug Tracker', 
      type: 'warning', 
      timestamp: '40 minutes ago',
      read: false,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    { 
      id: '5', 
      message: 'System backup completed successfully', 
      type: 'success', 
      timestamp: '1 hour ago',
      read: true,
    },
  ]);

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        sidebarCollapsed,
        activeRoute,
        user,
        notifications,
        toggleSidebar,
        setActiveRoute,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
