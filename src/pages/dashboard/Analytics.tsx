import React from 'react';
import { 
  ShoppingCart, 
  TrendingUp, 
  MoreHorizontal, 
  ArrowUpRight,
  Users,
  MousePointer2,
  Eye,
  MoreVertical,
  Mic,
  Send
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { 
  ComposedChart,
  Line,
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart, 
  Bar, 
  Cell,
  RadialBarChart, 
  RadialBar, 
  PolarAngleAxis 
} from 'recharts';
import { cn } from '../../lib/utils';

const Analytics: React.FC = () => {
  const { user } = useAppContext();

  // --- Data Mapping ---
  // Using existing data to map to new design slots
  const pageViews = { value: "16,431", change: 15.5, trend: 'up' as const }; // Mapped from Growth/Revenue
  const visitors = { value: "9,754", change: 8.4, trend: 'up' as const }; // Mapped from Orders
  const clicks = { value: "2,832", change: 10.5, trend: 'down' as const }; // New/Mock
  const orders = { value: "1,224", change: 4.4, trend: 'up' as const }; // New/Mock

  const totalProfit = "$446.7K"; // Main large metric
  const totalProfitChange = 24.4;

  const weeklyData = [
    { name: 'Sun', value: 4000, active: 2400 },
    { name: 'Mon', value: 3000, active: 1398 },
    { name: 'Tue', value: 2000, active: 8162 }, // Highlighted in design
    { name: 'Wed', value: 2780, active: 3908 },
    { name: 'Thu', value: 1890, active: 4800 },
    { name: 'Fri', value: 2390, active: 3800 },
    { name: 'Sat', value: 3490, active: 4300 },
  ];

  // Data for the main Chart (Inventory vs Sales)
  const profitData = [
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

  const repeatCustomerRate = [
    { name: 'Rate', value: 68, fill: '#10b981' }
  ];

  const products = [
    { id: '#83009', name: 'Hybrid Active Noise Cancell...', sold: '2,310', revenue: '$124,839', rating: 5.0, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
    { id: '#83001', name: 'Casio G-Shock Shock Resi...', sold: '1,230', revenue: '$92,662', rating: 4.8, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=100&h=100&fit=crop' },
    { id: '#83004', name: 'SAMSUNG Galaxy S25 Ultra...', sold: '812', revenue: '$74,048', rating: 4.7, image: 'https://images.unsplash.com/photo-1610945265078-386f3b58d86f?w=100&h=100&fit=crop' },
    { id: '#83002', name: 'Xbox Wireless Gaming Co...', sold: '645', revenue: '$62,820', rating: 4.5, image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=100&h=100&fit=crop' },
    { id: '#83002', name: 'Timex Men\'s Easy Reader...', sold: '572', revenue: '$48,724', rating: 4.5, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
  ];

  // Small Sparkline Data
  const sparklineData = [
    { value: 10 }, { value: 15 }, { value: 12 }, { value: 20 }, { value: 18 }, { value: 25 }, { value: 22 }
  ];
  const sparklineData2 = [
    { value: 20 }, { value: 10 }, { value: 15 }, { value: 10 }, { value: 25 }, { value: 15 }, { value: 20 }
  ];
  const sparklineData3 = [
    { value: 10 }, { value: 25 }, { value: 15 }, { value: 30 }, { value: 12 }, { value: 15 }, { value: 20 }
  ];
  const sparklineData4 = [
    { value: 15 }, { value: 10 }, { value: 20 }, { value: 15 }, { value: 25 }, { value: 20 }, { value: 30 }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Page Views */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-slate-700 dark:text-slate-200">Page Views</h3>
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-slate-800 dark:text-white">{pageViews.value}</span>
            <span className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">
              <TrendingUp className="w-3 h-3 mr-1" /> {pageViews.change}%
            </span>
          </div>
          <div className="h-10 w-full mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id="colorSpark1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSpark1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400">vs. 14,653 last period</p>
        </div>

        {/* Card 2: Visitors */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-slate-700 dark:text-slate-200">Visitors</h3>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-slate-800 dark:text-white">{visitors.value}</span>
            <span className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">
              <TrendingUp className="w-3 h-3 mr-1" /> {visitors.change}%
            </span>
          </div>
          <p className="text-xs text-slate-400">vs. 5,732 last period</p>
        </div>

        {/* Card 3: Click */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-slate-700 dark:text-slate-200">Click</h3>
            <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-orange-600 dark:text-orange-400">
              <MousePointer2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-slate-800 dark:text-white">{clicks.value}</span>
            <span className="flex items-center text-xs font-bold text-red-500 bg-red-50 dark:bg-red-500/10 px-1.5 py-0.5 rounded">
              <TrendingUp className="w-3 h-3 mr-1 rotate-180" /> {clicks.change}%
            </span>
          </div>
          <p className="text-xs text-slate-400">vs. 3,294 last period</p>
        </div>

        {/* Card 4: Orders */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-slate-700 dark:text-slate-200">Orders</h3>
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-slate-800 dark:text-white">{orders.value}</span>
            <span className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">
              <TrendingUp className="w-3 h-3 mr-1" /> {orders.change}%
            </span>
          </div>
          <p className="text-xs text-slate-400">vs. 1,186 last period</p>
        </div>
      </div>

      {/* 2. Middle Section Grid (Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Total Profit Chart (2/3 width) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-4">Total Profit</h3>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">{totalProfit}</span>
                <span className="flex items-center text-sm font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3 mr-1" /> {totalProfitChange}%
                </span>
                <span className="text-sm text-slate-400">vs. last period</span>
              </div>
            </div>
            
            {/* Custom Legend/Tooltip Style Placeholder */}
            <div className="hidden sm:block bg-white dark:bg-slate-700 shadow-lg rounded-xl p-3 border border-slate-100 dark:border-slate-600">
              <div className="text-xs text-slate-400 mb-1">Jan 18, 2025</div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-white">
                <div className="w-2 h-2 rounded-full bg-blue-600"></div> $12,324 <span className="text-xs font-normal text-slate-400">this month</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-white">
                <div className="w-2 h-2 rounded-full bg-slate-300"></div> $5,563 <span className="text-xs font-normal text-slate-400">last month</span>
              </div>
            </div>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={profitData}>
                <defs>
                  <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} minTickGap={30} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#ef4444', fontSize: 12 }} domain={[0, 100]} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 2500]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area yAxisId="left" type="monotone" dataKey="stock" name="Stock Level (%)" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorStock)" />
                <Line yAxisId="right" type="monotone" dataKey="sales" name="Total Sales ($)" stroke="#94a3b8" strokeWidth={3} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
             <div className="flex justify-between items-center mb-4">
               <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Customers</h4>
               <MoreHorizontal className="w-4 h-4 text-slate-400" />
             </div>
             <div className="flex gap-4">
               {/* Progress Bars Breakdown */}
               <div className="flex-1">
                 <div className="flex justify-between text-xs mb-1">
                   <span className="font-bold text-slate-700 dark:text-white flex items-center gap-1"><span className="w-2 h-2 bg-blue-600 rounded-full"></span> 2,884</span>
                   <span className="text-slate-400">Retailers</span>
                 </div>
                 <div className="h-1.5 w-full bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-600 w-[70%] rounded-full"></div>
                 </div>
               </div>
               <div className="flex-1">
                 <div className="flex justify-between text-xs mb-1">
                   <span className="font-bold text-slate-700 dark:text-white flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> 1,432</span>
                   <span className="text-slate-400">Distributors</span>
                 </div>
                 <div className="h-1.5 w-full bg-emerald-100 dark:bg-emerald-900/30 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-[45%] rounded-full"></div>
                 </div>
               </div>
               <div className="flex-1">
                 <div className="flex justify-between text-xs mb-1">
                   <span className="font-bold text-slate-700 dark:text-white flex items-center gap-1"><span className="w-2 h-2 bg-orange-500 rounded-full"></span> 562</span>
                   <span className="text-slate-400">Wholesalers</span>
                 </div>
                 <div className="h-1.5 w-full bg-orange-100 dark:bg-orange-900/30 rounded-full overflow-hidden">
                   <div className="h-full bg-orange-500 w-[30%] rounded-full"></div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Most Day Active (1/3 width) */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 dark:text-white">Most Day Active</h3>
            <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <Bar dataKey="active" radius={[4, 4, 4, 4]}>
                    {weeklyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === 'Tue' ? '#3b82f6' : '#e2e8f0'} />
                    ))}
                  </Bar>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} dy={10} interval={0} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
               <h4 className="text-2xl font-bold text-slate-800 dark:text-white">8,162</h4>
               <p className="text-xs text-slate-400">Total active users on Tuesday</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Best Selling Products Table (2/3 width) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 dark:text-white">Best Selling Products</h3>
            <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4" /></button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                  <th className="py-3 pr-4">ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4 text-right">Sold</th>
                  <th className="py-3 px-4 text-right">Revenue</th>
                  <th className="py-3 pl-4 text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {products.map((product) => (
                  <tr key={product.id} className="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="py-4 pr-4 font-medium text-slate-400">{product.id}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                          <img src={product.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-slate-700 dark:text-slate-200">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right text-slate-500 dark:text-slate-400">{product.sold} sold</td>
                    <td className="py-4 px-4 text-right font-medium text-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10 rounded-lg">{product.revenue}</td>
                    <td className="py-4 pl-4 text-right">
                      <span className="inline-flex items-center gap-1 font-bold text-slate-700 dark:text-slate-200">
                        <span className="text-amber-400">★</span> ({product.rating})
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column Stack (1/3 width) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Repeat Customer Rate */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 dark:text-white">Repeat Customer Rate</h3>
              <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4" /></button>
            </div>
            
            <div className="flex flex-col items-center justify-center relative">
               <div className="w-[200px] h-[160px] relative flex justify-center">
                 <ResponsiveContainer width="100%" height="100%">
                   <RadialBarChart 
                      innerRadius="80%" 
                      outerRadius="100%" 
                      data={repeatCustomerRate} 
                      startAngle={180} 
                      endAngle={0}
                   >
                     <RadialBar
                       background
                       dataKey="value"
                       cornerRadius={30}
                       fill="#10b981"
                     />
                   </RadialBarChart>
                 </ResponsiveContainer>
                 {/* Center Text */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2 text-center">
                   <div className="text-3xl font-bold text-slate-800 dark:text-white">68%</div>
                   <div className="text-xs text-slate-400 mt-1">On track for 80% target</div>
                 </div>
               </div>
               <button className="mt-2 px-4 py-2 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors">
                 Show details
               </button>
            </div>
          </div>

          {/* AI Assistant */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex-1 flex flex-col relative overflow-hidden">
             <div className="flex justify-between items-start mb-6 relative z-10">
               <h3 className="font-bold text-slate-800 dark:text-white">AI Assistant</h3>
               <button className="text-slate-400 hover:text-slate-600"><ArrowUpRight className="w-4 h-4" /></button>
             </div>

             <div className="flex-1 flex items-center justify-center relative z-10">
                {/* Glowing Orb Effect */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-blue-500 blur-xl opacity-40 animate-pulse"></div>
                  <div className="w-full h-full rounded-full bg-gradient-to-t from-blue-600 to-blue-400 opacity-90"></div>
                </div>
                
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <div className="grid grid-cols-6 gap-2">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="w-1 h-1 rounded-full bg-slate-500"></div>
                    ))}
                  </div>
                </div>
             </div>

             <div className="mt-6 relative z-10">
               <div className="bg-slate-50 dark:bg-slate-900 rounded-full p-1.5 flex items-center pl-4 pr-1.5 border border-slate-100 dark:border-slate-700">
                 <input 
                   type="text" 
                   placeholder="Ask me anything..." 
                   className="flex-1 bg-transparent border-none text-sm outline-none text-slate-600 dark:text-slate-300 placeholder:text-slate-400"
                 />
                 <div className="flex gap-1">
                    <button className="p-2 text-slate-400 hover:text-slate-600"><Mic className="w-4 h-4" /></button>
                    <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-sm"><Send className="w-3.5 h-3.5" /></button>
                 </div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Analytics;
