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

// Theme Types
export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorTheme = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal';

export type LayoutTheme = 
  | 'Default' | 'Minimal' | 'Modern' | 'Material' | 'SaaS' 
  | 'Flat' | 'Galaxy' | 'Luxe' | 'Retro' | 'Neon' 
  | 'Pixel' | 'Soft' | 'Mono' | 'Prism' | 'Nova' 
  | 'Zen' | 'Elegant' | 'Vivid' | 'Aurora' | 'Crystal' 
  | 'Matrix' | 'Orbit' | 'Neo' | 'Silver' | 'Xenon';

export type CardStyle = 'default' | 'flat' | 'bordered' | 'glass' | 'neo';

export type TableStyle = 'default' | 'modern' | 'compact' | 'bordered';

export type LocationViewMode = 'split' | 'map' | 'list';

export type ChartType = 'area' | 'bar' | 'line' | 'composed' | 'pie' | 'stacked';

export interface CardConfig {
  chartType?: ChartType;
  chartColor?: string;
  showMetrics?: boolean;
  showMilestone?: boolean;
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
  dataState: 'default' | 'alternate' | 'empty';
  randomSeed: number;
  toggleData: () => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  layoutTheme: LayoutTheme;
  setLayoutTheme: (theme: LayoutTheme) => void;
  cardStyle: CardStyle;
  setCardStyle: (style: CardStyle) => void;
  chartType: ChartType;
  setChartType: (type: ChartType) => void;
  isThemeSettingsOpen: boolean;
  toggleThemeSettings: () => void;
  productTableStyle: TableStyle;
  setProductTableStyle: (style: TableStyle) => void;
  orderTableStyle: TableStyle;
  setOrderTableStyle: (style: TableStyle) => void;
  productsPerPage: number;
  setProductsPerPage: (num: number) => void;
  ordersPerPage: number;
  setOrdersPerPage: (num: number) => void;
  cardConfigs: Record<string, CardConfig>;
  updateCardConfig: (id: string, config: Partial<CardConfig>) => void;
  locationViewMode: LocationViewMode;
  setLocationViewMode: (mode: LocationViewMode) => void;
  locationVisual: CardStyle;
  setLocationVisual: (style: CardStyle) => void;
  repeatCustomerChart: 'radial' | 'pie' | 'gauge';
  setRepeatCustomerChart: (type: 'radial' | 'pie' | 'gauge') => void;
  repeatCustomerColor: string;
  setRepeatCustomerColor: (color: string) => void;
  ecommerceSalesChartType: ChartType;
  setEcommerceSalesChartType: (type: ChartType) => void;
  ecommerceSalesChartColor: string;
  setEcommerceSalesChartColor: (color: string) => void;
  ecommerceCategoryChartType: ChartType;
  setEcommerceCategoryChartType: (type: ChartType) => void;
  ecommerceCategoryChartColor: string;
  setEcommerceCategoryChartColor: (color: string) => void;
  ecommerceStackedColors: { mobile: string; desktop: string; app: string };
  setEcommerceStackedColors: (colors: { mobile: string; desktop: string; app: string }) => void;
  ecommerceRecentOrdersStyle: TableStyle;
  setEcommerceRecentOrdersStyle: (style: TableStyle) => void;
}
