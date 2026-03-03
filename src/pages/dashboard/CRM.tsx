import React from 'react';
import { 
  Users, 
  UserPlus, 
  MessageSquare, 
  Phone, 
  Mail, 
  Star,
  MoreHorizontal,
  Search
} from 'lucide-react';
import MetricCard from '../../components/dashboard/MetricCard';
import { cn } from '../../lib/utils';

const CRM: React.FC = () => {
  const customers = [
    { id: 1, name: 'Alex Thompson', email: 'alex.t@example.com', phone: '+1 234 567 890', company: 'TechFlow', status: 'Active', value: '$12,450', avatar: 'AT' },
    { id: 2, name: 'Jessica Chen', email: 'jessica.c@example.com', phone: '+1 345 678 901', company: 'DesignLab', status: 'Lead', value: '$0', avatar: 'JC' },
    { id: 3, name: 'Marcus Wright', email: 'marcus.w@example.com', phone: '+1 456 789 012', company: 'BuildIt', status: 'Inactive', value: '$8,200', avatar: 'MW' },
    { id: 4, name: 'Elena Rodriguez', email: 'elena.r@example.com', phone: '+1 567 890 123', company: 'EcoStyle', status: 'Active', value: '$24,100', avatar: 'ER' },
    { id: 5, name: 'David Kim', email: 'david.k@example.com', phone: '+1 678 901 234', company: 'GlobalLogistics', status: 'Lead', value: '$0', avatar: 'DK' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">CRM Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage customer relationships and leads</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
            <UserPlus className="w-4 h-4" /> Add Customer
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Customers"
          value="1,240"
          icon={<Users className="w-5 h-5" />}
          bgColor="bg-blue-50 dark:bg-blue-500/10"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <MetricCard
          title="New Leads"
          value="84"
          change={{ percentage: 12.5, trend: 'up' }}
          icon={<UserPlus className="w-5 h-5" />}
          bgColor="bg-emerald-50 dark:bg-emerald-500/10"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
        <MetricCard
          title="Active Deals"
          value="36"
          icon={<Star className="w-5 h-5" />}
          bgColor="bg-amber-50 dark:bg-amber-500/10"
          iconColor="text-amber-600 dark:text-amber-400"
        />
        <MetricCard
          title="Avg. Deal Value"
          value="$4,250"
          icon={<DollarSign className="w-5 h-5" />}
          bgColor="bg-violet-50 dark:bg-violet-500/10"
          iconColor="text-violet-600 dark:text-violet-400"
        />
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="font-bold text-slate-800 dark:text-white">Customer Directory</h3>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, email or company..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Company</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Total Value</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs ring-1 ring-blue-500/20">
                        {customer.avatar}
                      </div>
                      <span className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {customer.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                        <Mail className="w-3.5 h-3.5" /> {customer.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-500">
                        <Phone className="w-3.5 h-3.5" /> {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                    {customer.company}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-bold ring-1 ring-inset",
                      customer.status === 'Active' ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400" :
                      customer.status === 'Lead' ? "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400" :
                      "bg-slate-50 text-slate-700 ring-slate-600/20 dark:bg-slate-500/10 dark:text-slate-400"
                    )}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800 dark:text-white">
                    {customer.value}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer/Pagination */}
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm text-slate-500">
          <p>Showing 1 to 5 of 1,240 customers</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRM;