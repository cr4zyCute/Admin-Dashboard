import { 
  LayoutDashboard, 
  ShoppingCart, 
  MessageSquare, 
  Briefcase, 
  CheckSquare, 
  FileText, 
  Users, 
  DollarSign, 
  PieChart, 
  Mail, 
  HelpCircle, 
  Tag, 
  Grid, 
  File, 
  Plug,
  Box,
  List,
  UserPlus
} from 'lucide-react';
import { MenuSection } from '../types';

export const MENU_ITEMS: MenuSection[] = [
  {
    category: 'MAIN',
    items: [
      { id: 'dashboard', label: 'Dashboards', icon: LayoutDashboard, route: '/dashboard' },
    ],
  },
  {
    category: 'APPS',
    items: [
      { 
        id: 'ecommerce', 
        label: 'Ecommerce', 
        icon: ShoppingCart, 
        route: '/ecommerce',
        subItems: [
          { id: 'products', label: 'Products', icon: Box, route: '/ecommerce/products' },
          { id: 'orders', label: 'Orders', icon: List, route: '/ecommerce/orders' },
          { id: 'customers', label: 'Customers', icon: Users, route: '/ecommerce/customers' },
        ]
      },
      { id: 'chat', label: 'Chat', icon: MessageSquare, route: '/chat' },
      { id: 'projects', label: 'Projects', icon: Briefcase, route: '/projects' },
      { id: 'tasks', label: 'Tasks', icon: CheckSquare, route: '/tasks' },
      { id: 'invoice', label: 'Invoice', icon: FileText, route: '/invoice' },
      { id: 'crm', label: 'CRM', icon: Users, route: '/crm' },
      { id: 'users', label: 'Users', icon: UserPlus, route: '/users' },
      { id: 'finance', label: 'Finance', icon: DollarSign, route: '/finance' },
      { id: 'hrm', label: 'HRM', icon: PieChart, route: '/hrm' },
      { id: 'email', label: 'Email', icon: Mail, route: '/email', badge: 'New', badgeColor: 'bg-pink-500' },
      { id: 'support', label: 'Support Center', icon: HelpCircle, route: '/support' },
      { id: 'promo', label: 'Promo', icon: Tag, route: '/promo' },
      { id: 'more', label: 'More Apps', icon: Grid, route: '/more-apps' },
    ],
  },
  {
    category: 'CUSTOM PAGES',
    items: [
      { id: 'pages', label: 'Pages', icon: File, route: '/pages' },
      { id: 'plugins', label: 'Plugins', icon: Plug, route: '/plugins' },
    ],
  },
];
