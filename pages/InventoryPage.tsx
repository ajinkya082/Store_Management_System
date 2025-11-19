import React, { useState, useEffect } from 'react';
import { Product, User } from '../types';
import { API_URL } from '../utils/api';

interface InventoryPageProps {
  user: User | null;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ user }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<'all' | 'low'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/products`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) {
      fetchProducts();
    }
  }, [user]);

  const filteredProducts = products.filter(p => {
    if (filter === 'low') {
      return p.stock <= 10;
    }
    return true;
  }).sort((a, b) => a.stock - b.stock);

  return (
    <div className="animate-fadeInUp">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Inventory Management</h1>
        <div className="bg-slate-200 dark:bg-slate-700 p-1 rounded-lg">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'all' ? 'bg-white text-primary-600 shadow-sm dark:bg-slate-800' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-600/50'}`}
          >
            All Items
          </button>
          <button
            onClick={() => setFilter('low')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'low' ? 'bg-white text-primary-600 shadow-sm dark:bg-slate-800' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-600/50'}`}
          >
            Low Stock
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50">
        <div className="overflow-x-auto">
          {loading ? <p className="text-center py-4">Loading inventory...</p> : (
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Product Name</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">SKU</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
                  <th scope="col" className="p-4 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Current Stock</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                {filteredProducts.map(product => (
                  <tr key={product._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{product.name}</td>
                    <td className="p-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{product.sku}</td>
                    <td className="p-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{product.category}</td>
                    <td className="p-4 text-center font-semibold text-lg text-slate-800 dark:text-slate-200">{product.stock}</td>
                    <td className="p-4 whitespace-nowrap text-sm">
                      {product.stock > 10 ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">In Stock</span>
                      ) : product.stock > 0 ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">Low Stock</span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">Out of Stock</span>
                      )}
                    </td>
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

export default InventoryPage;