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
  Send,
  Download,
  Upload,
  CreditCard,
  Package
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { 
  ComposedChart,
  Line,
  Area, 
  AreaChart,
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

import { 
  pageViews, 
  visitors, 
  clicks, 
  orders, 
  totalProfit, 
  totalProfitChange, 
  weeklyData, 
  profitData, 
  repeatCustomerRate, 
  products, 
  sparklineData, 
  sparklineData2, 
  sparklineData3, 
  sparklineData4,
  recentOrders,
  locations,
  recentActivities
} from '../../MockData/data';

const Analytics: React.FC = () => {
  const { user } = useAppContext();

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
          <div className="h-10 w-full mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData2}>
                <defs>
                  <linearGradient id="colorSpark2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorSpark2)" />
              </AreaChart>
            </ResponsiveContainer>
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
          <div className="h-10 w-full mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData3}>
                <defs>
                  <linearGradient id="colorSpark3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorSpark3)" />
              </AreaChart>
            </ResponsiveContainer>
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
          <div className="h-10 w-full mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData4}>
                <defs>
                  <linearGradient id="colorSpark4" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSpark4)" />
              </AreaChart>
            </ResponsiveContainer>
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
      {/* 4. New Bottom Section Grid (Orders, Location, Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Orders Table (1 col - but wider in design, let's span 1.5 or adjust grid) */}
        {/* Actually the image shows 3 columns: Orders (Wide), Location (Narrow), Activity (Narrow) */}
        {/* Let's make it a 3-column grid where Orders takes 1.2, others take rest. Or just simple 3 cols for now as per "in the bottom" request */}
        
        {/* Column 1: Recent Orders */}
        <div className="lg:col-span-1 xl:col-span-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">Recent Orders</h3>
              <p className="text-xs text-slate-400 mt-1">(186.25k Transactions)</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Upload className="w-3 h-3" /> Export
              </button>
              <button className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Download className="w-3 h-3" /> Import
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-[500px]">
               <thead>
                 <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                   <th className="py-3 pr-2">#ID</th>
                   <th className="py-3 px-2">Customer</th>
                   <th className="py-3 px-2">Date</th>
                   <th className="py-3 px-2">Amount</th>
                   <th className="py-3 px-2">Payment</th>
                   <th className="py-3 pl-2 text-right">Status</th>
                 </tr>
               </thead>
               <tbody className="text-sm">
                 {recentOrders.map((order) => (
                   <tr key={order.id} className="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-50 dark:border-slate-800/50 last:border-0">
                     <td className="py-3 pr-2 font-medium text-slate-500">{order.id}</td>
                     <td className="py-3 px-2">
                       <div>
                         <p className="font-bold text-slate-700 dark:text-slate-200">{order.customer}</p>
                         <p className="text-xs text-slate-400">{order.email}</p>
                       </div>
                     </td>
                     <td className="py-3 px-2 text-slate-500">{order.date}</td>
                     <td className="py-3 px-2 font-medium text-slate-700 dark:text-slate-200">{order.amount}</td>
                     <td className="py-3 px-2 text-slate-500">{order.payment}</td>
                     <td className="py-3 pl-2 text-right">
                       <span className={cn(
                         "px-2 py-0.5 rounded text-xs font-medium",
                         order.status === 'Success' ? "bg-emerald-50 text-emerald-600" :
                         order.status === 'Pending' ? "bg-amber-50 text-amber-600" :
                         "bg-red-50 text-red-600"
                       )}>
                         {order.status}
                       </span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-2">
            <span className="text-xs text-slate-400">Showing 1 to 5 of 10 orders</span>
            <div className="flex gap-1">
              <button className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-xs">{'<'}</button>
              <button className="w-6 h-6 flex items-center justify-center rounded bg-blue-600 text-white text-xs">1</button>
              <button className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-xs">2</button>
              <button className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-xs">{'>'}</button>
            </div>
          </div>
        </div>

        {/* Column 2: Revenue By Locations */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 dark:text-white">Revenue By Locations</h3>
            <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
          </div>
          
          <div className="flex-1 flex flex-col">
            {/* Map Placeholder */}
            <div className="flex-1 min-h-[180px] bg-slate-50 dark:bg-slate-900 rounded-xl relative overflow-hidden mb-6 group">
              <div className="absolute inset-0 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center grayscale contrast-50"></div>
              {/* Animated Dots */}
              <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
              <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
              
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-indigo-500 rounded-full animate-ping delay-300"></div>
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white"></div>
              
              <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-emerald-500 rounded-full animate-ping delay-700"></div>
              <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
              
              {/* Connecting Lines (SVG overlay) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path d="M100,60 Q180,100 250,140" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-slate-700" />
              </svg>
            </div>

            {/* Stats Card */}
            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-4 shadow-sm mb-6 flex items-center gap-4 relative overflow-hidden">
               <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 text-lg">🏆</div>
               <div>
                 <p className="font-bold text-slate-800 dark:text-white text-sm">Congratulations !...</p>
                 <p className="text-xs text-slate-400">You've just hit a new record..</p>
               </div>
               <div className="ml-auto text-right">
                 <p className="font-bold text-slate-800 dark:text-white">25.9k</p>
                 <p className="text-[10px] text-slate-400 uppercase">ORDER</p>
               </div>
               {/* Decorative bg shape */}
               <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-amber-500/5 rounded-full blur-2xl"></div>
            </div>

            {/* Location List */}
            <div className="space-y-4">
              {locations.map((loc, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ring-2 ring-white dark:ring-slate-800`} style={{ backgroundColor: loc.color }}></div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{loc.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-700 dark:text-white">{loc.revenue}</span>
                    <span className="text-xs text-slate-400">Revenue</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Recent Activity */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 dark:text-white">Recent Activity</h3>
            <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
          </div>
          
          <div className="space-y-8 relative">
            {/* Vertical Line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-700 border-l border-dashed border-slate-300 dark:border-slate-600"></div>

            {recentActivities.map((item, i) => {
              // Dynamic Icon Component
              const Icon = item.icon === 'ShoppingCart' ? ShoppingCart : item.icon === 'CreditCard' ? CreditCard : Package;
              
              return (
                <div key={i} className="flex gap-4 relative">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ring-4 ring-white dark:ring-slate-800", item.color)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white">{item.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                    <div className="mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                      {item.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
