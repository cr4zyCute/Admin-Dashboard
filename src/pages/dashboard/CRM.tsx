import React from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  MoreHorizontal, 
  Calendar,
  Search,
  MoreVertical,
  User,
  TrendingDown,
  Briefcase,
  AlertCircle,
  Upload,
  Download,
  MapPin
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar,
  LineChart,
  Line,
  ComposedChart
} from 'recharts';
import { cn } from '../../lib/utils';

const CRM: React.FC = () => {
  // --- Mock Data ---

  // 1. Metric Cards Data
  const leadsGeneratedData = [
    { value: 20 }, { value: 40 }, { value: 35 }, { value: 50 }, { value: 45 }, { value: 60 }, { value: 55 }
  ];
  const dealsClosedData = [
    { value: 10 }, { value: 25 }, { value: 20 }, { value: 35 }, { value: 30 }, { value: 45 }, { value: 40 }
  ];
  const revenueGeneratedData = [
    { value: 30 }, { value: 50 }, { value: 40 }, { value: 60 }, { value: 50 }, { value: 70 }, { value: 60 }, { value: 80 }
  ];
  const qualifiedLeadsData = [
    { name: 'Qualified', value: 75, color: '#3b82f6' },
    { name: 'Pending', value: 25, color: '#e2e8f0' },
  ];

  // 2. Overview Chart Data
  const overviewData = [
    { name: 'Jan', revenue: 40, orders: 20 },
    { name: 'Feb', revenue: 30, orders: 25 },
    { name: 'Mar', revenue: 50, orders: 30 },
    { name: 'Apr', revenue: 45, orders: 28 },
    { name: 'May', revenue: 60, orders: 40 },
    { name: 'Jun', revenue: 55, orders: 35 },
    { name: 'Jul', revenue: 65, orders: 45 },
    { name: 'Aug', revenue: 60, orders: 42 },
    { name: 'Sep', revenue: 70, orders: 50 },
    { name: 'Oct', revenue: 75, orders: 55 },
    { name: 'Nov', revenue: 70, orders: 52 },
    { name: 'Dec', revenue: 80, orders: 60 },
  ];

  // 3. Lead Source Data
  const leadSourceData = [
    { name: 'Social Media', value: 250, color: '#3b82f6' }, // Blue
    { name: 'Direct', value: 150, color: '#10b981' },      // Green
    { name: 'Referral', value: 100, color: '#8b5cf6' },    // Purple
    { name: 'Others', value: 78, color: '#06b6d4' },       // Cyan
  ];

  // 4. Deal Status Data
  const deals = [
    { 
      id: '#DH874', 
      name: 'AdamM09', 
      company: 'Rex Audio', 
      pipeline: [true, true, true, false, false], 
      closingDate: '20 Apr, 2024', 
      user: { name: 'Alexa Newsome', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' }, 
      value: 'USD $100.1K', 
      status: 'Paused',
      statusColor: 'bg-blue-50 text-blue-600'
    },
    { 
      id: '#DH809', 
      name: 'Sensor Lecto', 
      company: 'Morville', 
      pipeline: [true, true, false, false, false], 
      closingDate: '31 Dec, 2024', 
      user: { name: 'David Lee', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' }, 
      value: 'CAD $95K', 
      status: 'New',
      statusColor: 'bg-slate-100 text-slate-600'
    },
    { 
      id: '#DH807', 
      name: 'Dhvanil', 
      company: 'Olson\'s Market', 
      pipeline: [true, true, true, true, false], 
      closingDate: '05 Jun, 2024', 
      user: { name: 'Peter Hein', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' }, 
      value: 'AUD $65.95K', 
      status: 'Cold Lead',
      statusColor: 'bg-amber-50 text-amber-600'
    },
    { 
      id: '#DH805', 
      name: 'KHCoal', 
      company: 'Erlebacher\'s', 
      pipeline: [true, false, false, false, false], 
      closingDate: '25 Aug, 2024', 
      user: { name: 'Gladys Rivas', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' }, 
      value: 'IN ₹296.1K', 
      status: 'Canceled',
      statusColor: 'bg-red-50 text-red-600'
    },
    { 
      id: '#DH800', 
      name: 'Haniyo', 
      company: 'Colonial Stores', 
      pipeline: [true, true, true, true, true], 
      closingDate: '30 Sep, 2024', 
      user: { name: 'Joan Wisdom', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop' }, 
      value: 'USD $25.9K', 
      status: 'Deal Won',
      statusColor: 'bg-emerald-50 text-emerald-600'
    },
  ];

  // 5. Top Performing Data
  const topPerforming = [
    { name: 'Jeremy Young', leads: 187, deals: 154, tasks: 49, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { name: 'Leo Gill', leads: 365, deals: 248, tasks: 94, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
    { name: 'Elaine Rose', leads: 245, deals: 194, tasks: 58, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
    { name: 'Tanya Hill', leads: 284, deals: 147, tasks: 62, avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?w=100&h=100&fit=crop' },
  ];

  // 6. Recent Activity Data
  const recentActivity = [
    { title: '15 New Leads Added', desc: 'Fresh inbound leads were captured from the website and campaigns.', time: 'Just Now', icon: User, color: 'bg-blue-100 text-blue-600' },
    { title: 'Email Campaign Sent', desc: 'Weekly newsletter sent to 1,200 subscribers.', time: '2 hrs ago', icon: Calendar, color: 'bg-purple-100 text-purple-600' },
    { title: 'Meeting with Client', desc: 'Project review with TechFlow team.', time: '4 hrs ago', icon: Briefcase, color: 'bg-amber-100 text-amber-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">CRM</h1>
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
          <span className="hover:text-blue-600 cursor-pointer">Paces</span>
          <span className="mx-2 text-slate-300 dark:text-slate-600">&gt;</span>
          <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
          <span className="mx-2 text-slate-300 dark:text-slate-600">&gt;</span>
          <span className="text-slate-700 dark:text-slate-300 font-medium">CRM</span>
        </div>
      </div>

      {/* 1. Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Card 1: Leads Generated */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">LEADS GENERATED</p>
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-slate-400" />
                <span className="text-2xl font-bold text-slate-800 dark:text-white">48.20k</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-500 font-medium flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" /> 5.12%
                </span>
                <span className="text-slate-400">2.3k Up</span>
              </div>
            </div>
            <div className="w-24 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={leadsGeneratedData}>
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Card 2: Qualified Leads */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">QUALIFIED LEADS</p>
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <User className="w-5 h-5 text-slate-400" />
                <span className="text-2xl font-bold text-slate-800 dark:text-white">12.80k</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-red-500 font-medium flex items-center">
                  <TrendingDown className="w-3 h-3 mr-1" /> 3.45%
                </span>
                <span className="text-slate-400">0.4k Down</span>
              </div>
            </div>
            <div className="w-16 h-16 relative">
               <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={qualifiedLeadsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={28}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    {qualifiedLeadsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Card 3: Deals Closed */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">DEALS CLOSED</p>
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="w-5 h-5 text-slate-400" />
                <span className="text-2xl font-bold text-slate-800 dark:text-white">9.75k</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-500 font-medium flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" /> 2.94%
                </span>
                <span className="text-slate-400">1.1k Up</span>
              </div>
            </div>
            <div className="w-24 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dealsClosedData}>
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Card 4: Revenue Generated */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">REVENUE GENERATED</p>
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-5 h-5 text-slate-400" />
                <span className="text-2xl font-bold text-slate-800 dark:text-white">$5.63M</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-500 font-medium flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" /> 4.21%
                </span>
                <span className="text-slate-400">$32.4k Up</span>
              </div>
            </div>
            <div className="w-24 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueGeneratedData}>
                  <Bar dataKey="value" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Overview & Lead Source Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Overview Chart Section */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-base font-semibold text-slate-800 dark:text-white">
              Overview <span className="text-slate-400 font-normal ml-1">(Current Year)</span>
            </h3>
            <div className="flex gap-1 bg-slate-50 dark:bg-slate-700 p-1 rounded-lg">
              {['All', '1M', '6M', '1Y'].map(range => (
                <button key={range} className="px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-600 rounded-md shadow-sm transition-all">
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Metrics */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-lg p-4">
                <div className="flex gap-3">
                   <div className="mt-0.5">
                     <AlertCircle className="w-5 h-5 text-amber-500" />
                   </div>
                   <div>
                     <p className="text-xs text-amber-600 dark:text-amber-400 mb-2">We regret to inform you that our server is down.</p>
                     <button className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline">Refresh</button>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Revenue</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white mb-1">$56.63k</p>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400 border border-red-100 dark:border-red-500/20">
                    <TrendingDown className="w-3 h-3 mr-0.5" /> 3.91%
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Orders</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white mb-1">9,842</p>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> 8.72%
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">New Users</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white">95.30k</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">New Contract</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white">851</p>
                </div>
              </div>
            </div>

            {/* Main Chart */}
            <div className="lg:col-span-3 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={overviewData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="revenue" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={12} fillOpacity={0.8} />
                  <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={3} dot={false} strokeDasharray="5 5" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Lead Source */}
        <div className="xl:col-span-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-semibold text-slate-800 dark:text-white">Lead Source</h3>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Upload className="w-3 h-3" /> Export
              </button>
              <button className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Download className="w-3 h-3" /> Import
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center relative min-h-[250px]">
            <div className="w-[220px] h-[220px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadSourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={0}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    {leadSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-slate-400 text-sm font-medium">Total</span>
                <span className="text-3xl font-bold text-slate-800 dark:text-white">578</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Deal Status Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h3 className="text-base font-semibold text-slate-800 dark:text-white">Deal Status</h3>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
             <div className="flex items-center gap-2">
               <span className="text-sm text-slate-500">Filter By:</span>
               <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-600 dark:text-slate-300">
                 <Briefcase className="w-4 h-4" /> Deal Status <MoreVertical className="w-3 h-3 ml-1" />
               </button>
             </div>
             <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search deals..." 
                  className="w-full pl-9 pr-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
             </div>
             <button className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1">
               5 <MoreVertical className="w-3 h-3" />
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 pr-4">Deal ID</th>
                <th className="py-3 px-4">Deal Name</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4 w-48">Pipeline</th>
                <th className="py-3 px-4">Closing Date</th>
                <th className="py-3 px-4">User Responsible</th>
                <th className="py-3 px-4">Deal Value</th>
                <th className="py-3 px-4">Deal Status</th>
                <th className="py-3 pl-4 text-right">...</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {deals.map((deal) => (
                <tr key={deal.id} className="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="py-4 pr-4 font-medium text-slate-600 dark:text-slate-400">{deal.id}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                        {deal.name.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-800 dark:text-white">{deal.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-400">{deal.company}</td>
                  <td className="py-4 px-4">
                    <div className="flex gap-1">
                      {deal.pipeline.map((active, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "h-2 flex-1 rounded-full",
                            active ? "bg-emerald-500" : "bg-slate-100 dark:bg-slate-700",
                            // Specific colors for canceled/won if needed, but sticking to design
                            i === 0 && deal.status === 'Canceled' && active ? "bg-red-500" : ""
                          )}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-400">{deal.closingDate}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <img src={deal.user.avatar} alt={deal.user.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-slate-700 dark:text-slate-300">{deal.user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-800 dark:text-white">{deal.value}</td>
                  <td className="py-4 px-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium border",
                      deal.statusColor.replace('bg-', 'border-transparent bg-').replace('text-', 'text-')
                    )}>
                      {deal.status}
                    </span>
                  </td>
                  <td className="py-4 pl-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                       <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500">
           <span>Showing 1 to 5 of 12 deals</span>
           <div className="flex gap-1">
             <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">{'<'}</button>
             <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white hover:bg-blue-700">1</button>
             <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">2</button>
             <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">3</button>
             <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">{'>'}</button>
           </div>
        </div>
      </div>

      {/* 4. Bottom Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Performing */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
           <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-semibold text-slate-800 dark:text-white">Top Performing</h3>
            <div className="relative w-32">
               <input 
                 type="text" 
                 placeholder="Search..." 
                 className="w-full pl-8 pr-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
               />
               <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
            </div>
          </div>
          
          <div className="space-y-4">
             <div className="flex text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-700">
               <span className="flex-1">USER</span>
               <span className="w-12 text-center">LEADS</span>
               <span className="w-12 text-center">DEALS</span>
               <span className="w-12 text-center">TASKS</span>
             </div>
             {topPerforming.map((user, i) => (
               <div key={i} className="flex items-center py-2">
                 <div className="flex-1 flex items-center gap-3">
                   <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                   <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{user.name}</span>
                 </div>
                 <span className="w-12 text-center text-sm text-slate-600 dark:text-slate-400">{user.leads}</span>
                 <span className="w-12 text-center text-sm text-slate-600 dark:text-slate-400">{user.deals}</span>
                 <span className="w-12 text-center text-sm text-slate-600 dark:text-slate-400">{user.tasks}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Location By Session (Map Placeholder) */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-semibold text-slate-800 dark:text-white">Location By Session</h3>
            <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
          </div>
          
          <div className="flex-1 bg-slate-50 dark:bg-slate-900 rounded-lg relative overflow-hidden flex items-center justify-center group">
             {/* Abstract Map Pattern/Image Placeholder */}
             <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center grayscale"></div>
             
             <div className="relative z-10 flex flex-col items-center gap-2">
               <div className="flex gap-2">
                 <button className="w-8 h-8 bg-white dark:bg-slate-800 rounded shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50">+</button>
               </div>
               <div className="flex gap-2">
                 <button className="w-8 h-8 bg-white dark:bg-slate-800 rounded shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50">-</button>
               </div>
             </div>

             {/* Map Pins */}
             <MapPin className="absolute top-1/3 left-1/4 w-6 h-6 text-blue-500 drop-shadow-md animate-bounce" />
             <MapPin className="absolute top-1/2 left-1/2 w-6 h-6 text-red-500 drop-shadow-md animate-bounce delay-100" />
             <MapPin className="absolute bottom-1/3 right-1/3 w-6 h-6 text-green-500 drop-shadow-md animate-bounce delay-200" />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-semibold text-slate-800 dark:text-white">Recent Activity</h3>
            <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
          </div>
          
          <div className="space-y-6">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex gap-4 relative">
                {/* Timeline line */}
                {i !== recentActivity.length - 1 && (
                  <div className="absolute left-[19px] top-10 bottom-[-24px] w-0.5 bg-slate-100 dark:bg-slate-700"></div>
                )}
                
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10", item.color)}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                  <span className="text-[10px] font-medium text-slate-400 mt-2 block">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CRM;
