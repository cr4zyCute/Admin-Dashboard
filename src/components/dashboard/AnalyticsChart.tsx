import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { RefreshCw, MoreHorizontal } from 'lucide-react';

interface AnalyticsChartProps {
  title: string;
  type: 'area' | 'bar';
  data: any[];
  dataKey: string;
  color?: string;
  height?: number;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ 
  title, 
  type, 
  data, 
  dataKey, 
  color = '#3b82f6',
  height = 300 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        <div className="flex gap-2">
          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.1}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ stroke: '#e2e8f0' }}
              />
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                fillOpacity={1} 
                fill={`url(#color${dataKey})`} 
                strokeWidth={2}
              />
            </AreaChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar 
                dataKey={dataKey} 
                fill={color} 
                radius={[4, 4, 0, 0]} 
                barSize={30}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
