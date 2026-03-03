import { 
  LayoutDashboard, 
  ShoppingCart, 
  MessageSquare, 
  Briefcase, 
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
  UserPlus,
  ClipboardList,
  Shield,
  Layers,
  Table,
  BarChart,
  Map,
  CreditCard,
  Lock,
  AlertTriangle,
  Server,
  Clock,
  Key,
  Layout,
  PanelLeft,
  PanelTop,
  Ban,
  Star,
  Share2,
  PenTool,
  FileInput,
  Settings as SettingsIcon
} from 'lucide-react';
import { MenuSection } from '../types';

export const MENU_ITEMS: MenuSection[] = [
  {
    category: 'MAIN',
    items: [
      { 
        id: 'dashboard', 
        label: 'Dashboards', 
        icon: LayoutDashboard, 
        route: '/dashboard',
        subItems: [
          { id: 'analytics', label: 'Analytics', icon: PieChart, route: '/dashboard/analytics' },
          { id: 'ecommerce-dash', label: 'Ecommerce', icon: ShoppingCart, route: '/dashboard/ecommerce' },
          { id: 'project-dash', label: 'Project', icon: Briefcase, route: '/dashboard/project' },
          { id: 'crm-dash', label: 'CRM', icon: Users, route: '/dashboard/crm' },
        ]
      },
    ],
  },
  {
    category: 'APPS',
    items: [
      { 
        id: 'ecommerce', 
        label: 'Ecommerce', 
        icon: ShoppingCart, 
        route: '/apps/ecommerce',
        subItems: [
          { id: 'products', label: 'Products', icon: Box, route: '/apps/ecommerce/products' },
          { id: 'product-details', label: 'Product Details', icon: FileText, route: '/apps/ecommerce/product-details' },
          { id: 'orders', label: 'Orders', icon: List, route: '/apps/ecommerce/orders' },
          { id: 'order-details', label: 'Order Details', icon: FileText, route: '/apps/ecommerce/order-details' },
          { id: 'customers', label: 'Customers', icon: Users, route: '/apps/ecommerce/customers' },
          { id: 'cart', label: 'Shopping Cart', icon: ShoppingCart, route: '/apps/ecommerce/cart' },
          { id: 'checkout', label: 'Checkout', icon: CreditCard, route: '/apps/ecommerce/checkout' },
          { id: 'sellers', label: 'Sellers', icon: Users, route: '/apps/ecommerce/sellers' },
        ]
      },
      { id: 'chat', label: 'Chat', icon: MessageSquare, route: '/apps/chat' },
      { 
        id: 'projects', 
        label: 'Projects', 
        icon: Briefcase, 
        route: '/apps/projects',
        subItems: [
          { id: 'project-list', label: 'List', icon: List, route: '/apps/projects/list' },
          { id: 'project-detail', label: 'Details', icon: FileText, route: '/apps/projects/detail' },
          { id: 'create-project', label: 'Create Project', icon: FileText, route: '/apps/projects/create' },
        ]
      },
      { 
        id: 'tasks', 
        label: 'Tasks', 
        icon: ClipboardList, 
        route: '/apps/tasks',
        subItems: [
          { id: 'task-list', label: 'List', icon: List, route: '/apps/tasks/list' },
          { id: 'kanban', label: 'Kanban Board', icon: Grid, route: '/apps/tasks/kanban' },
        ]
      },
      { id: 'invoice', label: 'Invoice', icon: FileText, route: '/apps/invoice' },
      { id: 'crm', label: 'CRM', icon: Shield, route: '/apps/crm' },
      { id: 'users', label: 'Users', icon: Users, route: '/apps/users' },
      { id: 'finance', label: 'Finance', icon: FileText, route: '/apps/finance' },
      { id: 'hrm', label: 'HRM', icon: Users, route: '/apps/hrm' },
      { 
        id: 'email', 
        label: 'Email', 
        icon: Mail, 
        route: '/apps/email',
        badge: 'New', 
        badgeColor: 'bg-orange-400',
        subItems: [
          { id: 'inbox', label: 'Inbox', icon: List, route: '/apps/email/inbox' },
          { id: 'read', label: 'Read Email', icon: FileText, route: '/apps/email/read' },
        ]
      },
      { id: 'support-center', label: 'Support Center', icon: HelpCircle, route: '/apps/support-center' },
      { id: 'promo', label: 'Promo', icon: Tag, route: '/apps/promo' },
      { id: 'more-apps', label: 'More Apps', icon: Grid, route: '/apps/more-apps' },
    ],
  },
  {
    category: 'CUSTOM PAGES',
    items: [
      { 
        id: 'pages', 
        label: 'Pages', 
        icon: File, 
        route: '/pages',
        subItems: [
          { id: 'starter', label: 'Starter Page', icon: File, route: '/pages/starter' },
          { id: 'timeline', label: 'Timeline', icon: Clock, route: '/pages/timeline' },
          { id: 'invoice-page', label: 'Invoice', icon: FileText, route: '/pages/invoice' },
          { id: 'faqs', label: 'FAQs', icon: HelpCircle, route: '/pages/faqs' },
          { id: 'pricing', label: 'Pricing', icon: DollarSign, route: '/pages/pricing' },
          { id: 'maintenance', label: 'Maintenance', icon: Server, route: '/pages/maintenance' },
          { id: 'coming-soon', label: 'Coming Soon', icon: Clock, route: '/pages/coming-soon' },
        ]
      },
      { id: 'plugins', label: 'Plugins', icon: Plug, route: '/plugins' },
      { 
        id: 'auth', 
        label: 'Authentication', 
        icon: Shield, 
        route: '/auth',
        subItems: [
          { id: 'login', label: 'Login', icon: Lock, route: '/auth/login' },
          { id: 'register', label: 'Register', icon: UserPlus, route: '/auth/register' },
          { id: 'recover', label: 'Recover Password', icon: Key, route: '/auth/recover-pw' },
          { id: 'lock-screen', label: 'Lock Screen', icon: Lock, route: '/auth/lock-screen' },
        ]
      },
      { 
        id: 'error-pages', 
        label: 'Error Pages', 
        icon: AlertTriangle, 
        route: '/error-pages',
        subItems: [
          { id: '404', label: 'Error 404', icon: AlertTriangle, route: '/error-pages/404' },
          { id: '500', label: 'Error 500', icon: AlertTriangle, route: '/error-pages/500' },
        ]
      },
    ],
  },
  {
    category: 'SETTINGS',
    items: [
      { id: 'theme-settings', label: 'Theme Settings', icon: SettingsIcon, route: '/settings/theme' },
    ]
  },
  {
    category: 'LAYOUTS',
    items: [
      { id: 'layout-options', label: 'Layout Options', icon: Layout, route: '/layouts/options' },
      { id: 'sidebars', label: 'Sidebars', icon: PanelLeft, route: '/layouts/sidebars' },
      { id: 'topbar', label: 'Topbar', icon: PanelTop, route: '/layouts/topbar' },
    ]
  },
  {
    category: 'COMPONENTS',
    items: [
      { 
        id: 'base-ui', 
        label: 'Base UI', 
        icon: Layers, 
        route: '/ui/base',
        subItems: [
          { id: 'alerts', label: 'Alerts', icon: AlertTriangle, route: '/ui/base/alerts' },
          { id: 'buttons', label: 'Buttons', icon: Box, route: '/ui/base/buttons' },
          { id: 'cards', label: 'Cards', icon: Box, route: '/ui/base/cards' },
          { id: 'modals', label: 'Modals', icon: Box, route: '/ui/base/modals' },
          { id: 'tabs', label: 'Tabs & Accordions', icon: Box, route: '/ui/base/tabs' },
          { id: 'typography', label: 'Typography', icon: FileText, route: '/ui/base/typography' },
        ]
      },
      { id: 'widgets', label: 'Widgets', icon: Grid, route: '/widgets' },
      { id: 'charts', label: 'Charts', icon: BarChart, route: '/charts' },
      { id: 'forms', label: 'Forms', icon: FileInput, route: '/forms' },
      { id: 'tables', label: 'Tables', icon: Table, route: '/tables' },
      { id: 'icons', label: 'Icons', icon: PenTool, route: '/icons' },
      { id: 'maps', label: 'Maps', icon: Map, route: '/maps' },
    ],
  },
  {
    category: 'MENU ITEMS',
    items: [
      { id: 'menu-levels', label: 'Menu Levels', icon: Share2, route: '/menu-levels' },
      { id: 'disabled-menu', label: 'Disabled Menu', icon: Ban, route: '/disabled-menu' },
      { id: 'special-menu', label: 'Special Menu', icon: Star, route: '/special-menu', badge: 'Hot', badgeColor: 'bg-yellow-400' },
    ]
  }
];
