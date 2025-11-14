import React from 'react';
import ChartPlaceholder from '../components/charts/ChartPlaceholder';
import Card from '../components/common/Card';
import { SalesIcon, ProductsIcon, CustomersIcon, InventoryIcon } from '../utils/icons';

const ReportsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Reports & Analytics</h1>
      
      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card title="Revenue (Last 30d)" value="$25,430" icon={<SalesIcon />} change="+8.2%" changeType="increase" />
        <Card title="Avg. Order Value" value="$120.50" icon={<ProductsIcon />} />
        <Card title="New Customers" value="82" icon={<CustomersIcon />} change="-1.5%" changeType="decrease" />
        <Card title="Conversion Rate" value="3.45%" icon={<InventoryIcon />} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder title="Sales Performance (6 Months)" type="Line" />
        <ChartPlaceholder title="Top Products by Revenue" type="Pie" />
        <ChartPlaceholder title="Customer Acquisition Channels" type="Line" />
        <ChartPlaceholder title="Sales by Location" type="Pie" />
      </div>
      
      {/* Data Table */}
      <div className="mt-6 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Detailed Sales Data</h3>
        <p className="text-gray-600 dark:text-gray-400">
          A detailed data table with filtering, sorting, and export options would be displayed here.
        </p>
        {/* Placeholder for a complex data table component */}
        <div className="mt-4 p-8 bg-gray-100 dark:bg-slate-700 rounded-md text-center text-gray-500 dark:text-gray-400">
          Data Table Placeholder
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;