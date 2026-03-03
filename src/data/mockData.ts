import { User, Notification } from '../types';

export const INITIAL_USER: User = {
  name: 'David Dev',
  role: 'Admin Head',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export const INITIAL_NOTIFICATIONS: Notification[] = [
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
    read: false
  },
  { 
    id: '4', 
    message: 'Sophia Ray flagged an issue in Bug Tracker', 
    type: 'warning', 
    timestamp: '40 minutes ago',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
];

// Mock Data for Analytics Dashboard

export const pageViews = { value: "16,431", change: 15.5, trend: 'up' as const };
export const visitors = { value: "9,754", change: 8.4, trend: 'up' as const };
export const clicks = { value: "2,832", change: 10.5, trend: 'down' as const };
export const orders = { value: "1,224", change: 4.4, trend: 'up' as const };

export const totalProfit = "$446.7K";
export const totalProfitChange = 24.4;

export const weeklyData = [
  { name: 'Sun', value: 4000, active: 2400 },
  { name: 'Mon', value: 3000, active: 1398 },
  { name: 'Tue', value: 2000, active: 8162 }, // Highlighted in design
  { name: 'Wed', value: 2780, active: 3908 },
  { name: 'Thu', value: 1890, active: 4800 },
  { name: 'Fri', value: 2390, active: 3800 },
  { name: 'Sat', value: 3490, active: 4300 },
];

// Data for the main Chart (Inventory vs Sales)
export const profitData = [
  { name: 'Jan 1', stock: 100, sales: 200 },
  { name: 'Jan 5', stock: 90, sales: 400 },
  { name: 'Jan 10', stock: 85, sales: 800 },
  { name: 'Jan 15', stock: 60, sales: 1100 },
  { name: 'Jan 20', stock: 80, sales: 900 },
  { name: 'Jan 25', stock: 75, sales: 1200 },
  { name: 'Jan 30', stock: 90, sales: 1100 },
  { name: 'Feb 5', stock: 65, sales: 1300 },
  { name: 'Feb 10', stock: 70, sales: 1500 },
  { name: 'Feb 15', stock: 50, sales: 1700 },
  { name: 'Feb 20', stock: 45, sales: 1800 },
  { name: 'Feb 25', stock: 35, sales: 1750 },
  { name: 'Mar 1', stock: 50, sales: 1900 },
  { name: 'Mar 5', stock: 45, sales: 1850 },
  { name: 'Mar 10', stock: 60, sales: 1950 },
  { name: 'Mar 15', stock: 35, sales: 2000 },
  { name: 'Mar 20', stock: 25, sales: 1800 },
  { name: 'Mar 25', stock: 15, sales: 1900 },
  { name: 'Mar 30', stock: 5, sales: 2100 },
];

export const repeatCustomerRate = [
  { name: 'Rate', value: 68, fill: '#10b981' }
];

export const products = [
  { id: '#83009', name: 'Hybrid Active Noise Cancell...', sold: '2,310', revenue: '$124,839', rating: 5.0, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
  { id: '#83001', name: 'Casio G-Shock Shock Resi...', sold: '1,230', revenue: '$92,662', rating: 4.8, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=100&h=100&fit=crop' },
  { id: '#83004', name: 'SAMSUNG Galaxy S25 Ultra...', sold: '812', revenue: '$74,048', rating: 4.7, image: 'https://images.unsplash.com/photo-1610945265078-386f3b58d86f?w=100&h=100&fit=crop' },
  { id: '#83002', name: 'Xbox Wireless Gaming Co...', sold: '645', revenue: '$62,820', rating: 4.5, image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=100&h=100&fit=crop' },
  { id: '#83003', name: 'Timex Men\'s Easy Reader...', sold: '572', revenue: '$48,724', rating: 4.5, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
  { id: '#83005', name: 'Nike Air Force 1 \'07...', sold: '450', revenue: '$42,500', rating: 4.6, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
  { id: '#83006', name: 'Sony PlayStation 5...', sold: '390', revenue: '$194,500', rating: 4.9, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=100&h=100&fit=crop' },
  { id: '#83007', name: 'Instant Pot Duo 7-in-1...', sold: '320', revenue: '$28,800', rating: 4.7, image: 'https://images.unsplash.com/photo-1588645404987-2798e27339d1?w=100&h=100&fit=crop' },
  { id: '#83008', name: 'Bose QuietComfort 45...', sold: '280', revenue: '$92,120', rating: 4.8, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&h=100&fit=crop' },
  { id: '#83010', name: 'Fitbit Charge 6...', sold: '210', revenue: '$31,290', rating: 4.4, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100&h=100&fit=crop' },
  { id: '#83011', name: 'Canon EOS R6 Mark II...', sold: '150', revenue: '$374,850', rating: 4.9, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop' },
  { id: '#83012', name: 'Dyson V15 Detect...', sold: '120', revenue: '$89,880', rating: 4.8, image: 'https://images.unsplash.com/photo-1558317374-a3594743e427?w=100&h=100&fit=crop' }
];

// Small Sparkline Data
export const sparklineData = [
  { value: 10 }, { value: 15 }, { value: 12 }, { value: 20 }, { value: 18 }, { value: 25 }, { value: 22 }
];
export const sparklineData2 = [
  { value: 20 }, { value: 10 }, { value: 15 }, { value: 10 }, { value: 25 }, { value: 15 }, { value: 20 }
];
export const sparklineData3 = [
  { value: 10 }, { value: 25 }, { value: 15 }, { value: 30 }, { value: 12 }, { value: 15 }, { value: 20 }
];
export const sparklineData4 = [
  { value: 15 }, { value: 10 }, { value: 20 }, { value: 15 }, { value: 25 }, { value: 20 }, { value: 30 }
];

// New Data for Bottom Section
export const recentOrders = [
  { id: '#ORD-1023', customer: 'John Carter', email: 'john@example.com', date: '12 Nov 2025', amount: '$249.00', payment: 'Credit', status: 'Pending' },
  { id: '#ORD-1022', customer: 'Emma Wilson', email: 'emma@example.com', date: '12 Nov 2025', amount: '$179.00', payment: 'UPI', status: 'Success' },
  { id: '#ORD-1021', customer: 'Michael Harris', email: 'michael@example.com', date: '11 Nov 2025', amount: '$329.00', payment: 'PayPal', status: 'Failed' },
  { id: '#ORD-1020', customer: 'Sophia Turner', email: 'sophia@example.com', date: '11 Nov 2025', amount: '$125.00', payment: 'Debit', status: 'Success' },
  { id: '#ORD-1019', customer: 'Chris Evans', email: 'chris@example.com', date: '10 Nov 2025', amount: '$560.00', payment: 'Credit', status: 'Pending' },
  { id: '#ORD-1018', customer: 'Olivia Brown', email: 'olivia@example.com', date: '10 Nov 2025', amount: '$89.00', payment: 'Credit', status: 'Success' },
  { id: '#ORD-1017', customer: 'James Miller', email: 'james@example.com', date: '09 Nov 2025', amount: '$450.00', payment: 'PayPal', status: 'Success' },
  { id: '#ORD-1016', customer: 'Isabella Davis', email: 'isabella@example.com', date: '09 Nov 2025', amount: '$120.00', payment: 'UPI', status: 'Failed' },
  { id: '#ORD-1015', customer: 'William Garcia', email: 'william@example.com', date: '08 Nov 2025', amount: '$299.00', payment: 'Debit', status: 'Success' },
  { id: '#ORD-1014', customer: 'Mia Rodriguez', email: 'mia@example.com', date: '08 Nov 2025', amount: '$75.00', payment: 'Credit', status: 'Pending' },
  { id: '#ORD-1013', customer: 'Benjamin Martinez', email: 'benjamin@example.com', date: '07 Nov 2025', amount: '$150.00', payment: 'PayPal', status: 'Success' },
  { id: '#ORD-1012', customer: 'Charlotte Hernandez', email: 'charlotte@example.com', date: '07 Nov 2025', amount: '$500.00', payment: 'UPI', status: 'Failed' },
];

export const locations = [
  { name: 'United States', revenue: '$48.6k', percentage: 45, color: '#3b82f6' },
  { name: 'United Kingdom', revenue: '$26.4k', percentage: 30, color: '#8b5cf6' },
  { name: 'Australia', revenue: '$18.9k', percentage: 25, color: '#10b981' },
];

export const recentActivities = [
  { 
    title: 'New Orders Synced from Storefront', 
    desc: '1,250 new customer orders were successfully imported from the online store.', 
    time: 'By Olivia Green', 
    icon: 'ShoppingCart', 
    color: 'bg-blue-100 text-blue-600' 
  },
  { 
    title: 'Payment Gateway Integration Updated', 
    desc: 'Stripe API upgraded to support faster settlements and improved security tokens.', 
    time: 'By James Parker', 
    icon: 'CreditCard', 
    color: 'bg-emerald-100 text-emerald-600' 
  },
  { 
    title: 'Inventory Levels Auto-Synced', 
    desc: 'All product quantities were updated based on the latest warehouse data.', 
    time: 'By Sophia Lee', 
    icon: 'Package', 
    color: 'bg-amber-100 text-amber-600' 
  },
];

export const customerBreakdown = [
  { label: 'Retailers', value: '2,884', color: 'bg-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30', percentage: 70 },
  { label: 'Distributors', value: '1,432', color: 'bg-emerald-500', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30', percentage: 45 },
  { label: 'Wholesalers', value: '562', color: 'bg-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/30', percentage: 30 },
];

export const recentOrdersHeader = {
  totalTransactions: '186.25k',
};

export const revenueLocationCard = {
  title: 'Congratulations !...',
  subtitle: "You've just hit a new record..",
  value: '25.9k',
  label: 'ORDER'
};

export const profitLegend = {
  date: "Jan 18, 2025",
  thisMonth: "$12,324",
  lastMonth: "$5,563"
};

// --- Alternate Data for Testing ---

export const pageViewsAlt = { value: "8,245", change: -5.2, trend: 'down' as const };
export const visitorsAlt = { value: "4,120", change: 2.1, trend: 'up' as const };
export const clicksAlt = { value: "5,670", change: 12.8, trend: 'up' as const };
export const ordersAlt = { value: "890", change: -1.5, trend: 'down' as const };

export const totalProfitAlt = "$215.4K";
export const totalProfitChangeAlt = 12.5;

export const weeklyDataAlt = [
  { name: 'Sun', value: 2000, active: 1500 },
  { name: 'Mon', value: 4500, active: 3200 },
  { name: 'Tue', value: 3800, active: 2900 },
  { name: 'Wed', value: 5200, active: 4100 },
  { name: 'Thu', value: 2900, active: 1800 },
  { name: 'Fri', value: 4100, active: 3600 },
  { name: 'Sat', value: 5800, active: 4900 },
];

export const profitDataAlt = [
  { name: 'Jan 1', stock: 40, sales: 1200 },
  { name: 'Jan 5', stock: 55, sales: 900 },
  { name: 'Jan 10', stock: 35, sales: 1500 },
  { name: 'Jan 15', stock: 70, sales: 800 },
  { name: 'Jan 20', stock: 45, sales: 1100 },
  { name: 'Jan 25', stock: 60, sales: 1300 },
  { name: 'Jan 30', stock: 50, sales: 1600 },
  { name: 'Feb 5', stock: 80, sales: 1400 },
  { name: 'Feb 10', stock: 65, sales: 1900 },
  { name: 'Feb 15', stock: 40, sales: 2100 },
  { name: 'Feb 20', stock: 30, sales: 1700 },
  { name: 'Feb 25', stock: 55, sales: 1500 },
  { name: 'Mar 1', stock: 75, sales: 1800 },
  { name: 'Mar 5', stock: 60, sales: 2200 },
  { name: 'Mar 10', stock: 45, sales: 2000 },
  { name: 'Mar 15', stock: 30, sales: 2400 },
  { name: 'Mar 20', stock: 50, sales: 2100 },
  { name: 'Mar 25', stock: 65, sales: 2300 },
  { name: 'Mar 30', stock: 80, sales: 2500 },
];

export const repeatCustomerRateAlt = [
  { name: 'Rate', value: 42, fill: '#f59e0b' }
];

export const productsAlt = [
  { id: '#92001', name: 'Sony WH-1000XM5...', sold: '1,540', revenue: '$85,200', rating: 4.9, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&h=100&fit=crop' },
  { id: '#92002', name: 'Apple Watch Series 9...', sold: '980', revenue: '$68,400', rating: 4.8, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=100&fit=crop' },
  { id: '#92003', name: 'Kindle Paperwhite...', sold: '850', revenue: '$42,100', rating: 4.7, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&h=100&fit=crop' },
  { id: '#92004', name: 'Logitech MX Master 3S...', sold: '720', revenue: '$35,500', rating: 4.8, image: 'https://images.unsplash.com/photo-1631281928516-77263c762566?w=100&h=100&fit=crop' },
  { id: '#92005', name: 'GoPro HERO12 Black...', sold: '610', revenue: '$28,900', rating: 4.6, image: 'https://images.unsplash.com/photo-1564466136-20a4ab8fa7d4?w=100&h=100&fit=crop' },
  { id: '#92006', name: 'DJI Mini 4 Pro...', sold: '550', revenue: '$102,850', rating: 4.9, image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=100&h=100&fit=crop' },
  { id: '#92007', name: 'Sonos Roam SL...', sold: '480', revenue: '$76,320', rating: 4.7, image: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?w=100&h=100&fit=crop' },
  { id: '#92008', name: 'Nespresso Vertuo...', sold: '420', revenue: '$67,200', rating: 4.8, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=100&h=100&fit=crop' },
  { id: '#92009', name: 'Razer DeathAdder V3...', sold: '380', revenue: '$26,600', rating: 4.6, image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=100&h=100&fit=crop' },
  { id: '#92010', name: 'Samsung T7 Shield...', sold: '310', revenue: '$46,500', rating: 4.8, image: 'https://images.unsplash.com/photo-1628557044797-f21a17b96c89?w=100&h=100&fit=crop' }
];

export const sparklineDataAlt = [
  { value: 22 }, { value: 15 }, { value: 25 }, { value: 18 }, { value: 20 }, { value: 12 }, { value: 10 }
];
export const sparklineData2Alt = [
  { value: 15 }, { value: 20 }, { value: 10 }, { value: 25 }, { value: 15 }, { value: 10 }, { value: 20 }
];
export const sparklineData3Alt = [
  { value: 20 }, { value: 15 }, { value: 12 }, { value: 30 }, { value: 15 }, { value: 25 }, { value: 10 }
];
export const sparklineData4Alt = [
  { value: 30 }, { value: 20 }, { value: 25 }, { value: 15 }, { value: 20 }, { value: 10 }, { value: 15 }
];

export const recentOrdersAlt = [
  { id: '#ORD-2055', customer: 'Alice Smith', email: 'alice@example.com', date: '13 Nov 2025', amount: '$420.00', payment: 'PayPal', status: 'Success' },
  { id: '#ORD-2054', customer: 'Bob Johnson', email: 'bob@example.com', date: '13 Nov 2025', amount: '$150.00', payment: 'Credit', status: 'Processing' },
  { id: '#ORD-2053', customer: 'Charlie Brown', email: 'charlie@example.com', date: '12 Nov 2025', amount: '$890.00', payment: 'Debit', status: 'Success' },
  { id: '#ORD-2052', customer: 'Diana Prince', email: 'diana@example.com', date: '12 Nov 2025', amount: '$210.00', payment: 'UPI', status: 'Failed' },
  { id: '#ORD-2051', customer: 'Evan Wright', email: 'evan@example.com', date: '11 Nov 2025', amount: '$340.00', payment: 'Credit', status: 'Success' },
  { id: '#ORD-2050', customer: 'Fiona Clark', email: 'fiona@example.com', date: '10 Nov 2025', amount: '$120.00', payment: 'PayPal', status: 'Success' },
  { id: '#ORD-2049', customer: 'George Hall', email: 'george@example.com', date: '10 Nov 2025', amount: '$560.00', payment: 'Credit', status: 'Pending' },
  { id: '#ORD-2048', customer: 'Hannah Lewis', email: 'hannah@example.com', date: '09 Nov 2025', amount: '$89.00', payment: 'Credit', status: 'Success' },
  { id: '#ORD-2047', customer: 'Ian Young', email: 'ian@example.com', date: '09 Nov 2025', amount: '$450.00', payment: 'PayPal', status: 'Success' },
  { id: '#ORD-2046', customer: 'Julia Walker', email: 'julia@example.com', date: '08 Nov 2025', amount: '$120.00', payment: 'UPI', status: 'Failed' },
];

export const locationsAlt = [
  { name: 'Canada', revenue: '$32.5k', percentage: 35, color: '#ef4444' },
  { name: 'Germany', revenue: '$28.1k', percentage: 30, color: '#f59e0b' },
  { name: 'Japan', revenue: '$15.4k', percentage: 20, color: '#3b82f6' },
];

export const customerBreakdownAlt = [
  { label: 'Retailers', value: '1,540', color: 'bg-indigo-600', bgColor: 'bg-indigo-100 dark:bg-indigo-900/30', percentage: 55 },
  { label: 'Distributors', value: '980', color: 'bg-pink-500', bgColor: 'bg-pink-100 dark:bg-pink-900/30', percentage: 35 },
  { label: 'Wholesalers', value: '420', color: 'bg-cyan-500', bgColor: 'bg-cyan-100 dark:bg-cyan-900/30', percentage: 25 },
];

export const recentOrdersHeaderAlt = {
  totalTransactions: '92.45k',
};

export const revenueLocationCardAlt = {
  title: 'Target Reached!',
  subtitle: "Quarterly goal achieved.",
  value: '18.2k',
  label: 'SALES'
};

export const profitLegendAlt = {
  date: "Feb 15, 2025",
  thisMonth: "$18,450",
  lastMonth: "$6,210"
};

// --- Empty Data for Testing ---

export const profitDataEmpty = profitData.map(item => ({ name: item.name, stock: 0, sales: 0 }));

export const customerBreakdownEmpty = [
  { label: 'Retailers', value: '0', color: 'bg-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30', percentage: 0 },
  { label: 'Distributors', value: '0', color: 'bg-emerald-500', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30', percentage: 0 },
  { label: 'Wholesalers', value: '0', color: 'bg-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/30', percentage: 0 },
];

export const weeklyDataEmpty = weeklyData.map(item => ({ name: item.name, value: 0, active: 0 }));

export const locationsEmpty = [
  { name: 'United States', revenue: '$0', percentage: 0, color: '#3b82f6' },
  { name: 'United Kingdom', revenue: '$0', percentage: 0, color: '#8b5cf6' },
  { name: 'Australia', revenue: '$0', percentage: 0, color: '#10b981' },
];
