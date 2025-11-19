import React, { useState, useMemo, useEffect } from 'react';
import { Sale, Product, Customer, User } from '../types';
import { API_URL } from '../utils/api';

interface CartItem extends Product {
  quantity: number;
}

interface SalesPageProps {
  user: User | null;
}

const SalesPage: React.FC<SalesPageProps> = ({ user }) => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const fetchSalesData = async () => {
    if (!user?.token) return;
    const headers = { Authorization: `Bearer ${user.token}` };
    try {
      const [salesRes, customersRes, productsRes] = await Promise.all([
        fetch(`${API_URL}/sales`, { headers }),
        fetch(`${API_URL}/customers`, { headers }),
        fetch(`${API_URL}/products`, { headers }),
      ]);
      setSales(await salesRes.json());
      setCustomers(await customersRes.json());
      setProducts(await productsRes.json());
    } catch (error) {
      console.error("Failed to fetch sales data", error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [user]);

  const handleAddProduct = () => {
    if (!selectedProduct) return;
    const product = products.find(p => p._id === selectedProduct);
    if (product) {
      const existingItem = cart.find(item => item._id === product._id);
      if (existingItem) {
        setCart(cart.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    }
    setSelectedProduct('');
  };
  
  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const handleCreateSale = async () => {
    if (!selectedCustomer || cart.length === 0) {
        alert("Please select a customer and add products to the cart.");
        return;
    }
    const customer = customers.find(c => c._id === selectedCustomer);
    const newSaleData = {
        customerName: customer?.name || 'Unknown',
        customerId: customer?._id,
        products: cart.map(item => ({ productId: item._id, productName: item.name, quantity: item.quantity, price: item.price })),
        total: total,
    };

    try {
      const res = await fetch(`${API_URL}/sales`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(newSaleData),
      });

      if (!res.ok) {
        throw new Error('Failed to create sale');
      }

      setCart([]);
      setSelectedCustomer('');
      await fetchSalesData(); // Refresh sales list
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <div className="animate-fadeInUp">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Sales & Billing</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 border-b dark:border-slate-700 pb-2">Create New Invoice</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="customer" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer</label>
              <select
                id="customer"
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"
              >
                <option value="" disabled>Select a customer</option>
                {customers.map((customer: Customer) => (
                    <option key={customer._id} value={customer._id}>{customer.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <div className="flex-grow">
                <label htmlFor="product" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product</label>
                <select
                  id="product"
                  value={selectedProduct}
                  onChange={e => setSelectedProduct(e.target.value)}
                  className="w-full p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"
                >
                  <option value="" disabled>Select a product</option>
                  {products.map((product: Product) => (
                      <option key={product._id} value={product._id}>{product.name} - ${product.price.toFixed(2)}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleAddProduct} className="ml-2 px-4 py-2 bg-primary-DEFAULT text-white rounded-md hover:bg-primary-hover self-end h-[42px]">Add</button>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Cart</h4>
            <div className="overflow-auto max-h-60 border dark:border-slate-700 rounded-md">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-slate-700">
                  <tr>
                    <th className="p-2 text-left">Product</th>
                    <th className="p-2 text-center">Qty</th>
                    <th className="p-2 text-right">Price</th>
                    <th className="p-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.length === 0 && (
                    <tr><td colSpan={4} className="p-4 text-center text-gray-500 dark:text-gray-400">Cart is empty</td></tr>
                  )}
                  {cart.map(item => (
                    <tr key={item._id} className="border-b dark:border-slate-600">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2 text-center">{item.quantity}</td>
                      <td className="p-2 text-right">${item.price.toFixed(2)}</td>
                      <td className="p-2 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {cart.length > 0 && (
            <div className="mt-4 flex justify-between items-center">
              <div className="text-xl font-bold">
                Total: <span className="text-primary-DEFAULT">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCreateSale}
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition"
              >
                Create Sale
              </button>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Sales</h3>
          <div className="overflow-auto max-h-[500px]">
            <ul>
              {sales.map(sale => (
                <li key={sale._id} className="border-b dark:border-slate-700 py-3">
                  <div className="flex justify-between font-semibold">
                    <span>{sale.id}</span>
                    <span className="text-green-500">${sale.total.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span>{sale.customerName}</span> - <span>{new Date(sale.date).toLocaleDateString()}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;