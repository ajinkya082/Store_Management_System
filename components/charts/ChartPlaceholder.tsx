import React from 'react';

interface ChartPlaceholderProps {
  title: string;
  type: 'Line' | 'Pie';
}

const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({ title, type }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md h-full">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">{title}</h3>
      <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-slate-700 rounded-md">
        <p className="text-gray-500 dark:text-gray-400">{type} Chart Placeholder</p>
      </div>
    </div>
  );
};

export default ChartPlaceholder;
