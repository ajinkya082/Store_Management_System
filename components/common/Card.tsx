import React from 'react';

interface CardProps {
  title: string;
  value: string;
  // FIX: Changed icon type to be more specific (`React.ReactElement<{ className?: string }>`) to fix a typing error with React.cloneElement.
  icon: React.ReactElement<{ className?: string }>;
  change?: string;
  changeType?: 'increase' | 'decrease';
  animationDelay?: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, change, changeType, animationDelay }) => {
  const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';
  const changeIcon = changeType === 'increase' ? '↑' : '↓';

  return (
    <div 
      className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50 transition-all hover:shadow-lg hover:-translate-y-1 animate-fadeInUp"
      style={{ animationDelay: animationDelay || '0ms' }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase">{title}</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-1">{value}</p>
        </div>
        <div className="bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-primary-400 p-3 rounded-lg">
          {/* FIX: Removed unnecessary cast and fixed the cloneElement usage by correcting the icon prop type. */}
          {React.cloneElement(icon, { className: 'h-6 w-6' })}
        </div>
      </div>
      {change && (
        <p className={`text-xs mt-4 flex items-center ${changeColor}`}>
          <span className="font-bold">{changeIcon} {change}</span>
          <span className="ml-1 text-gray-500 dark:text-gray-400">vs last month</span>
        </p>
      )}
    </div>
  );
};

export default Card;