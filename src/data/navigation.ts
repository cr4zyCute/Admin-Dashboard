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
  UserPlus,
  Calendar,
  Folder,
  ClipboardList,
  Shield,
  Layers,
  Table,
  BarChart,
  Map,
  Settings,
  CreditCard,
  Lock,
  AlertTriangle,
  Server,
  Clock,
  LifeBuoy,
  Key
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
      { id: 'calendar', label: 'Calendar', icon: Calendar, route: '/apps/calendar' },
      { id: 'chat', label: 'Chat', icon: MessageSquare, route: '/apps/chat' },
      { 
        id: 'email', 
        label: 'Email', 
        icon: Mail, 
        route: '/apps/email',
        badge: 'New', 
        badgeColor: 'bg-pink-500',
        subItems: [
          { id: 'inbox', label: 'Inbox', icon: List, route: '/apps/email/inbox' },
          { id: 'read', label: 'Read Email', icon: FileText, route: '/apps/email/read' },
        ]
      },
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
      { id: 'file-manager', label: 'File Manager', icon: Folder, route: '/apps/file-manager' },
      { id: 'invoice', label: 'Invoices', icon: FileText, route: '/apps/invoice' },
    ],
  },
  {
    category: 'CUSTOM PAGES',
    items: [
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
        id: 'pages', 
        label: 'Extra Pages', 
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
          { id: '404', label: 'Error 404', icon: AlertTriangle, route: '/pages/404' },
          { id: '500', label: 'Error 500', icon: AlertTriangle, route: '/pages/500' },
        ]
      },
    ],
  },
  {
    category: 'COMPONENTS',
    items: [
      { 
        id: 'ui', 
        label: 'UI Elements', 
        icon: Layers, 
        route: '/ui',
        subItems: [
          { id: 'alerts', label: 'Alerts', icon: AlertTriangle, route: '/ui/alerts' },
          { id: 'buttons', label: 'Buttons', icon: Box, route: '/ui/buttons' },
          { id: 'cards', label: 'Cards', icon: Box, route: '/ui/cards' },
          { id: 'modals', label: 'Modals', icon: Box, route: '/ui/modals' },
          { id: 'tabs', label: 'Tabs & Accordions', icon: Box, route: '/ui/tabs' },
          { id: 'typography', label: 'Typography', icon: FileText, route: '/ui/typography' },
        ]
      },
      { 
        id: 'extended', 
        label: 'Extended UI', 
        icon: Layers, 
        route: '/extended',
        subItems: [
          { id: 'dragula', label: 'Dragula', icon: Box, route: '/extended/dragula' },
          { id: 'sweet-alert', label: 'Sweet Alert', icon: AlertTriangle, route: '/extended/sweet-alert' },
          { id: 'ratings', label: 'Ratings', icon: Box, route: '/extended/ratings' },
        ]
      },
      { id: 'widgets', label: 'Widgets', icon: Grid, route: '/widgets' },
      { id: 'forms', label: 'Forms', icon: CheckSquare, route: '/forms' },
      { id: 'tables', label: 'Tables', icon: Table, route: '/tables' },
      { id: 'charts', label: 'Charts', icon: BarChart, route: '/charts' },
      { id: 'icons', label: 'Icons', icon: Box, route: '/icons' },
      { id: 'maps', label: 'Maps', icon: Map, route: '/maps' },
    ],
  },
];
