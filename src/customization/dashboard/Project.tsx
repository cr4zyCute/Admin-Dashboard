import React from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Users, 
  Plus, 
  Search,
  MoreVertical,
  Calendar,
  Filter
} from 'lucide-react';
import MetricCard from '../../components/dashboard/MetricCard';
import { cn } from '../../lib/utils';

const Project: React.FC = () => {
  const projects = [
    { id: 1, name: 'Brand Identity Redesign', client: 'SpaceX', status: 'In Progress', progress: 65, team: 4, deadline: 'Oct 30, 2023' },
    { id: 2, name: 'Mobile App Development', client: 'Tesla', status: 'Completed', progress: 100, team: 6, deadline: 'Oct 15, 2023' },
    { id: 3, name: 'SEO Optimization', client: 'Amazon', status: 'On Hold', progress: 30, team: 2, deadline: 'Nov 12, 2023' },
    { id: 4, name: 'Social Media Strategy', client: 'Google', status: 'In Progress', progress: 45, team: 3, deadline: 'Oct 28, 2023' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Project Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage your projects and team performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Projects"
          value="24"
          icon={<Briefcase className="w-5 h-5" />}
          bgColor="bg-blue-50 dark:bg-blue-500/10"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <MetricCard
          title="Completed"
          value="18"
          icon={<CheckCircle2 className="w-5 h-5" />}
          bgColor="bg-emerald-50 dark:bg-emerald-500/10"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
        <MetricCard
          title="In Progress"
          value="6"
          icon={<Clock className="w-5 h-5" />}
          bgColor="bg-amber-50 dark:bg-amber-500/10"
          iconColor="text-amber-600 dark:text-amber-400"
        />
        <MetricCard
          title="Team Members"
          value="12"
          icon={<Users className="w-5 h-5" />}
          bgColor="bg-violet-50 dark:bg-violet-500/10"
          iconColor="text-violet-600 dark:text-violet-400"
        />
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-white"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <Calendar className="w-4 h-4" /> Last 30 Days
          </button>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Client: <span className="font-semibold text-slate-700 dark:text-slate-200">{project.client}</span></p>
              </div>
              <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-bold ring-1 ring-inset",
                  project.status === 'Completed' ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400" :
                  project.status === 'In Progress' ? "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400" :
                  "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400"
                )}>
                  {project.status}
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-medium">Deadline: {project.deadline}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500">Progress</span>
                  <span className="text-slate-800 dark:text-white">{project.progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-1000",
                      project.progress === 100 ? "bg-emerald-500" : "bg-blue-500"
                    )}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-400 ring-1 ring-slate-100 dark:ring-slate-800">
                      U{i}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500">+ {project.team - 3}</div>
                </div>
                <button className="text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  Manage Team
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;