import React, { useState, useEffect } from 'react';
import { User, Sale } from '../types';
import { API_URL } from '../utils/api';

interface CustomerDashboardPageProps {
    user: User | null;
}

const CustomerDashboardPage: React.FC<CustomerDashboardPageProps> = ({ user }) => {
    const [orders, setOrders] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.token) return;
            try {
                setLoading(true);
                const res = await fetch(`${API_URL}/sales/myorders`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                if (!res.ok) throw new Error("Failed to fetch orders");
                const data = await res.json();
                setOrders(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (!user) {
        return <p>Loading...</p>
    }

    return (
        <div className="animate-fadeInUp">
            <div
                className="relative p-8 rounded-xl overflow-hidden mb-6 bg-gradient-to-r from-primary-600 to-primary-800"
            >
                <div className="relative">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}!</h1>
                    <p className="text-primary-200">View your recent orders and manage your account.</p>
                </div>
            </div>
            
            <div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Your Order History</h3>
                <div className="overflow-x-auto">
                    {loading ? <p className="text-center py-4">Loading your orders...</p> : orders.length > 0 ? (
                        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                            <thead className="bg-slate-50 dark:bg-slate-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Order ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Items</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                                {orders.map(order => (
                                    <tr key={order._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{order.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{new Date(order.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">${order.total.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{order.products.reduce((acc, p) => acc + p.quantity, 0)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center py-8 text-gray-500 dark:text-gray-400">You have no orders yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboardPage;