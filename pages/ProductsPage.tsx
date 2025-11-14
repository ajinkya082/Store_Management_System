import React, { useState } from 'react';
import { Product } from '../types';
import { mockProducts } from '../data/mockData';
import Modal from '../components/common/Modal';
import { PlusCircleIcon, SearchIcon } from '../utils/icons';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
        id: products.length + 1,
        ...product,
    };
    setProducts([...products, newProduct]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Products</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-primary-DEFAULT text-white px-4 py-2 rounded-lg shadow hover:bg-primary-hover transition"
        >
          <PlusCircleIcon />
          <span className="ml-2">Add Product</span>
        </button>
      </div>
      
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 rounded-lg border dark:border-slate-600 bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b dark:border-slate-700">
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <td className="p-4 font-medium dark:text-gray-200">{product.name}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{product.category}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">${product.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{product.sku}</td>
                  <td className="p-4">
                    <button className="text-primary-DEFAULT hover:underline mr-4">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddProduct}
      />
    </div>
  );
};

// Form inside a modal for adding/editing products
const ProductFormModal: React.FC<{isOpen: boolean, onClose: () => void, onSave: (product: Omit<Product, 'id'>) => void}> = ({isOpen, onClose, onSave}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const price = parseFloat(formData.get('price') as string);
        const stock = parseInt(formData.get('stock') as string, 10);

        const newProduct = {
            name: formData.get('name') as string,
            category: formData.get('category') as string,
            price: isNaN(price) ? 0 : price,
            stock: isNaN(stock) ? 0 : stock,
            sku: formData.get('sku') as string,
        };
        onSave(newProduct);
        onClose();
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Product">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Name</label>
                    <input type="text" name="name" id="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-DEFAULT focus:ring-primary-DEFAULT" />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                    <input type="text" name="category" id="category" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-DEFAULT focus:ring-primary-DEFAULT" />
                </div>
                 <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                    <input type="number" name="price" id="price" step="0.01" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-DEFAULT focus:ring-primary-DEFAULT" />
                </div>
                <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
                    <input type="number" name="stock" id="stock" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-DEFAULT focus:ring-primary-DEFAULT" />
                </div>
                <div>
                    <label htmlFor="sku" className="block text-sm font-medium text-gray-700 dark:text-gray-300">SKU</label>
                    <input type="text" name="sku" id="sku" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-DEFAULT focus:ring-primary-DEFAULT" />
                </div>
                <div className="flex justify-end pt-4 space-x-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-slate-600 rounded-md hover:bg-gray-300 dark:hover:bg-slate-500">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary-DEFAULT text-white rounded-md hover:bg-primary-hover">Save Product</button>
                </div>
            </form>
        </Modal>
    );
};

export default ProductsPage;