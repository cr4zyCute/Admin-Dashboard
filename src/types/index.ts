import { ElementType } from 'react';

// User Interface
export interface User {
  name: string;
  role: string;
  avatar: string;
}

// Notification Interface
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  read: boolean;
  avatar?: string;
}

// Menu Interface
export interface MenuItem {
  id: string;
  label: string;
  icon: ElementType;
  route: string;
  badge?: string;
  badgeColor?: string;
  subItems?: MenuItem[];
}

export interface MenuSection {
  category: string;
  items: MenuItem[];
}

// Context Interface
export interface AppContextType {
  sidebarCollapsed: boolean;
  activeRoute: string;
  user: User | null;
  notifications: Notification[];
  toggleSidebar: () => void;
  setActiveRoute: (route: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}
