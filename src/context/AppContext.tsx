import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContextType, Notification, User, ThemeMode, ColorTheme, LayoutTheme, CardStyle, ChartType, TableStyle, LocationViewMode } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeRoute, setActiveRoute] = useState('/dashboard');
  const [dataState, setDataState] = useState<'default' | 'alternate' | 'empty'>('default');
  const [randomSeed, setRandomSeed] = useState(0);
  const [isThemeSettingsOpen, setIsThemeSettingsOpen] = useState(false);
  
  // Theme State
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('themeMode');
    return (saved as ThemeMode) || 'system';
  });
  
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    const saved = localStorage.getItem('colorTheme');
    return (saved as ColorTheme) || 'blue';
  });

  const [layoutTheme, setLayoutTheme] = useState<LayoutTheme>(() => {
    const saved = localStorage.getItem('layoutTheme');
    return (saved as LayoutTheme) || 'Default';
  });

  const [cardStyle, setCardStyle] = useState<CardStyle>(() => {
    const saved = localStorage.getItem('cardStyle');
    return (saved as CardStyle) || 'default';
  });

  const [chartType, setChartType] = useState<ChartType>(() => {
    const saved = localStorage.getItem('chartType');
    return (saved as ChartType) || 'area';
  });

  const [productTableStyle, setProductTableStyle] = useState<TableStyle>(() => {
    const saved = localStorage.getItem('productTableStyle');
    return (saved as TableStyle) || 'default';
  });

  const [orderTableStyle, setOrderTableStyle] = useState<TableStyle>(() => {
    const saved = localStorage.getItem('orderTableStyle');
    return (saved as TableStyle) || 'default';
  });

  const [productsPerPage, setProductsPerPage] = useState(() => {
    const saved = localStorage.getItem('productsPerPage');
    return saved ? parseInt(saved, 10) : 10;
  });

  const [ordersPerPage, setOrdersPerPage] = useState(() => {
    const saved = localStorage.getItem('ordersPerPage');
    return saved ? parseInt(saved, 10) : 10;
  });

  const [locationViewMode, setLocationViewMode] = useState<LocationViewMode>(() => {
    const saved = localStorage.getItem('locationViewMode');
    return (saved as LocationViewMode) || 'split';
  });

  const [locationVisual, setLocationVisual] = useState<CardStyle>(() => {
    const saved = localStorage.getItem('locationVisual');
    return (saved as CardStyle) || 'default';
  });

  // Card Configs
  const [cardConfigs, setCardConfigs] = useState<Record<string, { chartType?: ChartType; chartColor?: string }>>(() => {
    const saved = localStorage.getItem('cardConfigs');
    return saved ? JSON.parse(saved) : {};
  });

  const updateCardConfig = (id: string, config: Partial<{ chartType?: ChartType; chartColor?: string }>) => {
    setCardConfigs(prev => {
      const updated = { ...prev, [id]: { ...prev[id], ...config } };
      localStorage.setItem('cardConfigs', JSON.stringify(updated));
      return updated;
    });
  };

  // Apply Theme Mode
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (themeMode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(themeMode);
    }
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // Apply Color Theme
  useEffect(() => {
    const root = window.document.documentElement;
    // Remove all theme classes
    const themes: ColorTheme[] = ['blue', 'green', 'purple', 'orange', 'red', 'teal'];
    themes.forEach(t => root.classList.remove(`theme-${t}`));
    
    // Add current theme class (unless it's blue/default)
    if (colorTheme !== 'blue') {
      root.classList.add(`theme-${colorTheme}`);
    }
    localStorage.setItem('colorTheme', colorTheme);
  }, [colorTheme]);

  // Persist Layout Theme
  useEffect(() => {
    localStorage.setItem('layoutTheme', layoutTheme);
  }, [layoutTheme]);

  // Persist Card Style
  useEffect(() => {
    localStorage.setItem('cardStyle', cardStyle);
  }, [cardStyle]);

  // Persist Chart Type
  useEffect(() => {
    localStorage.setItem('chartType', chartType);
  }, [chartType]);

  // Persist Product Table Settings
  useEffect(() => {
    localStorage.setItem('productTableStyle', productTableStyle);
  }, [productTableStyle]);

  useEffect(() => {
    localStorage.setItem('productsPerPage', productsPerPage.toString());
  }, [productsPerPage]);

  // Persist Order Table Settings
  useEffect(() => {
    localStorage.setItem('orderTableStyle', orderTableStyle);
  }, [orderTableStyle]);

  useEffect(() => {
    localStorage.setItem('ordersPerPage', ordersPerPage.toString());
  }, [ordersPerPage]);

  useEffect(() => {
    localStorage.setItem('locationViewMode', locationViewMode);
  }, [locationViewMode]);

  useEffect(() => {
    localStorage.setItem('locationVisual', locationVisual);
  }, [locationVisual]);

  // Cross-Tab Synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'themeMode' && e.newValue) setThemeMode(e.newValue as ThemeMode);
      if (e.key === 'colorTheme' && e.newValue) setColorTheme(e.newValue as ColorTheme);
      if (e.key === 'layoutTheme' && e.newValue) setLayoutTheme(e.newValue as LayoutTheme);
      if (e.key === 'cardStyle' && e.newValue) setCardStyle(e.newValue as CardStyle);
      if (e.key === 'chartType' && e.newValue) setChartType(e.newValue as ChartType);
      
      if (e.key === 'productTableStyle' && e.newValue) setProductTableStyle(e.newValue as TableStyle);
      if (e.key === 'orderTableStyle' && e.newValue) setOrderTableStyle(e.newValue as TableStyle);
      if (e.key === 'productsPerPage' && e.newValue) setProductsPerPage(parseInt(e.newValue, 10));
      if (e.key === 'ordersPerPage' && e.newValue) setOrdersPerPage(parseInt(e.newValue, 10));
      if (e.key === 'locationViewMode' && e.newValue) setLocationViewMode(e.newValue as LocationViewMode);
      if (e.key === 'locationVisual' && e.newValue) setLocationVisual(e.newValue as CardStyle);
      if (e.key === 'cardConfigs' && e.newValue) setCardConfigs(JSON.parse(e.newValue));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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

  const toggleData = () => {
    setDataState(prev => {
      if (prev === 'default') return 'empty';
      if (prev === 'empty') {
        setRandomSeed(s => s + 1);
        return 'alternate';
      }
      return 'default';
    });
  };

  const toggleThemeSettings = () => {
    setIsThemeSettingsOpen(prev => !prev);
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
        dataState,
        randomSeed,
        toggleData,
        themeMode,
        setThemeMode,
        colorTheme,
        setColorTheme,
        layoutTheme,
        setLayoutTheme,
        cardStyle,
        setCardStyle,
        chartType,
        setChartType,
        isThemeSettingsOpen,
        toggleThemeSettings,
        productTableStyle,
        setProductTableStyle,
        orderTableStyle,
        setOrderTableStyle,
        productsPerPage,
        setProductsPerPage,
        ordersPerPage,
        setOrdersPerPage,
        cardConfigs,
        updateCardConfig,
        locationViewMode,
        setLocationViewMode,
        locationVisual,
        setLocationVisual,
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