import React, { useState, useEffect } from 'react';
import { Customer, User } from '../types';
import { PlusCircleIcon, SearchIcon } from '../utils/icons';
import Modal from '../components/common/Modal';
import { API_URL } from '../utils/api';

interface CustomersPageProps {
  user: User | null;
}

const CustomersPage: React.FC<CustomersPageProps> = ({ user }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/customers`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      const data = await res.json();
      setCustomers(data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchCustomers();
    }
  }, [user]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };
  
  const handleOpenEditModal = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleSaveCustomer = async (customerData: Omit<Customer, '_id' | 'totalPurchases' | 'lastPurchaseDate' | 'createdAt'>) => {
    const isEditing = !!editingCustomer;
    const url = isEditing ? `${API_URL}/customers/${editingCustomer._id}` : `${API_URL}/customers`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(customerData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save customer');
      }

      setIsModalOpen(false);
      setEditingCustomer(null);
      await fetchCustomers();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    if (window.confirm('Are you sure? This will delete the customer and all related sales data.')) {
        try {
            const res = await fetch(`${API_URL}/customers/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            if (!res.ok) throw new Error('Failed to delete customer');
            await fetchCustomers();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
  };


  return (
    <div className="animate-fadeInUp">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Customers</h1>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700 transition"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <span className="ml-2 text-sm font-medium">Add Customer</span>
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
                  placeholder="Search customers by name, email..."
                  className="pl-10 pr-4 py-2 rounded-lg border dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full md:w-80"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? <p className="text-center py-4">Loading customers...</p> : (
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phone</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Spent</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Last Purchase</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                {filteredCustomers.map(customer => (
                  <tr key={customer._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{customer.name}</td>
                    <td className="p-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{customer.email}</td>
                    <td className="p-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{customer.phone}</td>
                    <td className="p-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">${customer.totalPurchases.toFixed(2)}</td>
                    <td className="p-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{new Date(customer.lastPurchaseDate).toLocaleDateString()}</td>
                    <td className="p-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleOpenEditModal(customer)} className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 mr-4">Edit</button>
                      <button onClick={() => handleDeleteCustomer(customer._id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <CustomerFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCustomer}
        customer={editingCustomer}
      />
    </div>
  );
};

const CustomerFormModal: React.FC<{isOpen: boolean, onClose: () => void, onSave: (customer: Omit<Customer, '_id' | 'totalPurchases' | 'lastPurchaseDate' | 'createdAt'>) => void, customer: Customer | null}> = ({ isOpen, onClose, onSave, customer }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if(customer) {
            setName(customer.name);
            setEmail(customer.email);
            setPhone(customer.phone);
        } else {
            setName('');
            setEmail('');
            setPhone('');
        }
    }, [customer, isOpen]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave({ name, email, phone });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={customer ? "Edit Customer" : "Add New Customer"}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <input type="text" name="name" id="name" required value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <input type="email" name="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                    <input type="tel" name="phone" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500" />
                </div>
                 <div className="flex justify-end pt-4 space-x-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Save Customer</button>
                </div>
            </form>
        </Modal>
    );
};


export default CustomersPage;