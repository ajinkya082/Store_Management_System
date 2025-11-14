import React from 'react';
import Card from '../components/common/Card';
import ChartPlaceholder from '../components/charts/ChartPlaceholder';
import { SalesIcon, ProductsIcon, CustomersIcon, InventoryIcon } from '../utils/icons';
import { mockProducts, mockCustomers, monthlySalesData, mockSales } from '../data/mockData';

const DashboardPage: React.FC = () => {
  const totalSales = monthlySalesData.reduce((acc, month) => acc + month.sales, 0);
  const lowStockItems = mockProducts.filter(p => p.stock < 10).length;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card title="Total Sales" value={`$${totalSales.toLocaleString()}`} icon={<SalesIcon />} change="12.5%" changeType="increase" />
        <Card title="Total Products" value={mockProducts.length.toString()} icon={<ProductsIcon />} />
        <Card title="Total Customers" value={mockCustomers.length.toString()} icon={<CustomersIcon />} change="5.2%" changeType="increase" />
        <Card title="Low Stock Items" value={lowStockItems.toString()} icon={<InventoryIcon />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <ChartPlaceholder title="Monthly Sales Trend" type="Line" />
        </div>
        <div className="lg:col-span-2">
          <ChartPlaceholder title="Category Breakdown" type="Pie" />
        </div>
      </div>
      
      <div className="mt-6 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Recent Sales</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b dark:border-slate-700">
              <tr>
                <th className="py-2 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Order ID</th>
                <th className="py-2 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Customer</th>
                <th className="py-2 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Total</th>
                <th className="py-2 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockSales.map(sale => (
                <tr key={sale.id} className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{sale.id}</td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{sale.customerName}</td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">${sale.total.toFixed(2)}</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{sale.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
