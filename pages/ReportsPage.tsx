
import React, { useState, useEffect } from 'react';
import ChartPlaceholder from '../components/charts/ChartPlaceholder';
import Card from '../components/common/Card';
import { SalesIcon, ProductsIcon, CustomersIcon, InventoryIcon } from '../utils/icons';
import { User, Sale, Customer } from '../types';
import { API_URL } from '../utils/api';

interface ReportsPageProps {
  user: User | null;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ user }) => {
  const [revenueLast30d, setRevenueLast30d] = useState(0);
  const [newCustomersLast30d, setNewCustomersLast30d] = useState(0);

  useEffect(() => {
    const fetchReportsData = async () => {
      if (!user?.token) return;
      try {
        const headers = { Authorization: `Bearer ${user.token}` };
        const [salesRes, customersRes] = await Promise.all([
          fetch(`${API_URL}/sales`, { headers }),
          fetch(`${API_URL}/customers`, { headers }),
        ]);

        if (!salesRes.ok || !customersRes.ok) {
            throw new Error('Failed to fetch reports data');
        }

        const sales: Sale[] = await salesRes.json();
        const customers: Customer[] = await customersRes.json();
        
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const recentSales = sales.filter(s => new Date(s.date) > thirtyDaysAgo);
        const totalRevenue = recentSales.reduce((acc, sale) => acc + sale.total, 0);
        setRevenueLast30d(totalRevenue);
        
        const newCustomers = customers.filter(c => new Date(c.createdAt) > thirtyDaysAgo);
        setNewCustomersLast30d(newCustomers.length);

      } catch (error) {
        console.error("Failed to fetch reports data", error);
      }
    };
    fetchReportsData();
  }, [user]);

  return (
    <div className="animate-fadeInUp">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Reports & Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card title="Revenue (Last 30d)" value={`$${revenueLast30d.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} icon={<SalesIcon />} />
        <Card title="Avg. Order Value" value="$120.50" icon={<ProductsIcon />} />
        <Card title="New Customers (Last 30d)" value={newCustomersLast30d.toString()} icon={<CustomersIcon />} />
        <Card title="Conversion Rate" value="3.45%" icon={<InventoryIcon />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder title="Sales Performance (6 Months)" type="Line" />
        <ChartPlaceholder title="Top Products by Revenue" type="Pie" />
        <ChartPlaceholder title="Customer Acquisition Channels" type="Line" />
        <ChartPlaceholder title="Sales by Location" type="Pie" />
      </div>
      
      <div className="mt-6 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Detailed Sales Data</h3>
        <p className="text-gray-600 dark:text-gray-400">
          A detailed data table with filtering, sorting, and export options would be displayed here.
        </p>
        <div className="mt-4 p-8 bg-gray-100 dark:bg-slate-700 rounded-md text-center text-gray-500 dark:text-gray-400">
          Data Table Placeholder
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;