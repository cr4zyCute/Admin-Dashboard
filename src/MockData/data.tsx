
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
  { id: '#83002', name: 'Timex Men\'s Easy Reader...', sold: '572', revenue: '$48,724', rating: 4.5, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
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
