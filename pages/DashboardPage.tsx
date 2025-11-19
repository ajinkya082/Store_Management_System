import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import ChartPlaceholder from '../components/charts/ChartPlaceholder';
import { SalesIcon, ProductsIcon, CustomersIcon, InventoryIcon } from '../utils/icons';
import { Product, Customer, Sale, User } from '../types';
import { API_URL } from '../utils/api';

interface DashboardPageProps {
  user: User | null;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [totalSales, setTotalSales] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [recentSales, setRecentSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token) return;
      try {
        setLoading(true);
        const headers = { Authorization: `Bearer ${user.token}` };
        
        const [productsRes, customersRes, salesRes] = await Promise.all([
          fetch(`${API_URL}/products`, { headers }),
          fetch(`${API_URL}/customers`, { headers }),
          fetch(`${API_URL}/sales`, { headers }),
        ]);

        const products: Product[] = await productsRes.json();
        const customers: Customer[] = await customersRes.json();
        const sales: Sale[] = await salesRes.json();
        
        const totalSaleValue = sales.reduce((acc, sale) => acc + sale.total, 0);
        setTotalSales(totalSaleValue);
        
        setProductCount(products.length);
        setCustomerCount(customers.length);
        setLowStockCount(products.filter(p => p.stock < 10).length);
        setRecentSales(sales.slice(0, 5));

      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="animate-fadeInUp">
      <div 
        className="relative p-8 rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-primary-600 to-primary-800"
      >
        <div className="relative">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name.split(' ')[0]}!</h1>
          <p className="text-primary-200">Here's a snapshot of your store's performance.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Sales" value={`$${totalSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} icon={<SalesIcon />} animationDelay="100ms" />
        <Card title="Total Products" value={productCount.toString()} icon={<ProductsIcon />} animationDelay="200ms" />
        <Card title="Total Customers" value={customerCount.toString()} icon={<CustomersIcon />} animationDelay="300ms" />
        <Card title="Low Stock Items" value={lowStockCount.toString()} icon={<InventoryIcon />} animationDelay="400ms" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <ChartPlaceholder title="Monthly Sales Trend" type="Line" />
        </div>
        <div className="lg:col-span-2">
          <ChartPlaceholder title="Category Breakdown" type="Pie" />
        </div>
      </div>
      
      <div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Recent Sales</h3>
        <div className="overflow-x-auto">
          {loading ? <p className="text-center py-4">Loading...</p> : (
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                <thead className="bg-slate-50 dark:bg-slate-700/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Order ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Customer</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                  {recentSales.map(sale => (
                    <tr key={sale._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{sale.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{sale.customerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">${sale.total.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{new Date(sale.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;