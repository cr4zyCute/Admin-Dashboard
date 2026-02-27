import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    percentage: number;
    trend: 'up' | 'down';
  };
  icon?: React.ReactNode;
  iconColor?: string; // e.g., 'text-blue-500', 'text-green-500'
  bgColor?: string; // e.g., 'bg-blue-50'
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  iconColor = 'text-blue-500',
  bgColor = 'bg-blue-50'
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between h-full transition-transform hover:-translate-y-1 duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</h3>
          <div className="text-2xl font-bold text-slate-800">{value}</div>
        </div>
        {icon && (
          <div className={cn("p-2 rounded-lg", bgColor)}>
            <div className={cn("w-5 h-5", iconColor)}>{icon}</div>
          </div>
        )}
      </div>
      
      {change && (
        <div className="flex items-center text-xs font-medium">
          <span className={cn(
            "flex items-center gap-1 mr-2",
            change.trend === 'up' ? "text-green-500" : "text-red-500"
          )}>
            {change.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {change.percentage}%
          </span>
          <span className="text-slate-400">Since last month</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
