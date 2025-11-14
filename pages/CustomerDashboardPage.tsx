
import React from 'react';
import { mockCustomerUser, mockCustomerOrders } from '../data/mockData';

const CustomerDashboardPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Welcome, {mockCustomerUser.name}!
            </h1>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Your Recent Orders</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b dark:border-slate-700">
                            <tr>
                                <th className="py-2 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Order ID</th>
                                <th className="py-2 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Date</th>
                                <th className="py-2 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
                                <th className="py-2 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Items</th>
                                <th className="py-2 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockCustomerOrders.map(order => (
                                <tr key={order.id} className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                    <td className="py-3 px-4 text-primary-DEFAULT font-medium">{order.id}</td>
                                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{order.date}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{order.items}</td>
                                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">${order.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboardPage;
