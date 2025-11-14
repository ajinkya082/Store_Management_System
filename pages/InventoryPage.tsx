import React, { useState } from 'react';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';

const InventoryPage: React.FC = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [filter, setFilter] = useState<'all' | 'low'>('all');

  const filteredProducts = products.filter(p => {
    if (filter === 'low') {
      return p.stock <= 10;
    }
    return true;
  }).sort((a, b) => a.stock - b.stock);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Inventory Management</h1>
        <div>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-l-lg transition-colors ${filter === 'all' ? 'bg-primary-DEFAULT text-white' : 'bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600'}`}
          >
            All Items
          </button>
          <button
            onClick={() => setFilter('low')}
            className={`px-4 py-2 rounded-r-lg transition-colors ${filter === 'low' ? 'bg-primary-DEFAULT text-white' : 'bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600'}`}
          >
            Low Stock
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b dark:border-slate-700">
                <th className="p-4">Product Name</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-center">Current Stock</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <td className="p-4 font-medium dark:text-gray-200">{product.name}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{product.sku}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{product.category}</td>
                  <td className="p-4 text-center font-semibold text-lg dark:text-gray-200">{product.stock}</td>
                  <td className="p-4">
                    {product.stock > 10 ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">In Stock</span>
                    ) : product.stock > 0 ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">Low Stock</span>
                    ) : (
                       <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">Out of Stock</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
