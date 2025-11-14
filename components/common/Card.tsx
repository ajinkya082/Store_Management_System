import React from 'react';

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

const Card: React.FC<CardProps> = ({ title, value, icon, change, changeType }) => {
  const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';
  const changeIcon = changeType === 'increase' ? '↑' : '↓';

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md transition-transform hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{value}</p>
        </div>
        <div className="text-primary-DEFAULT">{icon}</div>
      </div>
      {change && (
        <p className={`text-xs mt-2 ${changeColor}`}>
          {changeIcon} {change} vs last month
        </p>
      )}
    </div>
  );
};

export default Card;
