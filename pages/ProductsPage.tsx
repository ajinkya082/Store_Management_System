import React, { useState, useEffect } from 'react';
import { Product, User } from '../types';
import Modal from '../components/common/Modal';
import { PlusCircleIcon, SearchIcon } from '../utils/icons';
import { API_URL } from '../utils/api';

interface ProductsPageProps {
  user: User | null;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ user }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    if (!user?.token) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/products`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch products');
      }
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [user]);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`${API_URL}/products/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to delete product');
        }
        await fetchProducts(); // Refresh list
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  };

  const handleSaveProduct = async (productData: Omit<Product, '_id'>) => {
    const isEditing = !!editingProduct;
    const url = isEditing ? `${API_URL}/products/${editingProduct._id}` : `${API_URL}/products`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save product');
      }

      setIsModalOpen(false);
      setEditingProduct(null);
      await fetchProducts(); // Refresh list
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <div className="animate-fadeInUp">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Products</h1>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700 transition"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <span className="ml-2 text-sm font-medium">Add Product</span>
        </button>
      </div>
      
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search by name, SKU, category..."
              className="pl-10 pr-4 py-2 rounded-lg border dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full md:w-80"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? <p className="text-center py-4">Loading products...</p> : (
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Price</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Stock</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">SKU</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                {filteredProducts.map(product => (
                  <tr key={product._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{product.name}</td>
                    <td className="p-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{product.category}</td>
                    <td className="p-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">${product.price.toFixed(2)}</td>
                    <td className="p-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.stock > 10 ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{product.sku}</td>
                    <td className="p-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleOpenEditModal(product)} className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 mr-4">Edit</button>
                      <button onClick={() => handleDeleteProduct(product._id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ProductFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
};

const ProductFormModal: React.FC<{isOpen: boolean, onClose: () => void, onSave: (product: Omit<Product, '_id'>) => void, product: Product | null}> = ({isOpen, onClose, onSave, product}) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [sku, setSku] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.name);
            setCategory(product.category);
            setPrice(String(product.price));
            setStock(String(product.stock));
            setSku(product.sku);
        } else {
            setName('');
            setCategory('');
            setPrice('');
            setStock('');
            setSku('');
        }
    }, [product, isOpen]);
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const productData = {
            name,
            category,
            price: parseFloat(price) || 0,
            stock: parseInt(stock, 10) || 0,
            sku,
        };
        onSave(productData);
    }
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={product ? "Edit Product" : "Add New Product"}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Name</label>
                    <input type="text" name="name" id="name" required value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500" />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                    <input type="text" name="category" id="category" required value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500" />
                </div>
                 <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                    <input type="number" name="price" id="price" step="0.01" required value={price} onChange={e => setPrice(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500" />
                </div>
                <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
                    <input type="number" name="stock" id="stock" required value={stock} onChange={e => setStock(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500" />
                </div>
                <div>
                    <label htmlFor="sku" className="block text-sm font-medium text-gray-700 dark:text-gray-300">SKU</label>
                    <input type="text" name="sku" id="sku" required value={sku} onChange={e => setSku(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500" />
                </div>
                <div className="flex justify-end pt-4 space-x-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Save Product</button>
                </div>
            </form>
        </Modal>
    );
};

export default ProductsPage;