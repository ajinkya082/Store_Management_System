import React, { useState } from 'react';
import { Customer } from '../types';
import { mockCustomers } from '../data/mockData';
import { PlusCircleIcon, SearchIcon } from '../utils/icons';
import Modal from '../components/common/Modal';

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCustomer = (customer: Omit<Customer, 'id' | 'totalPurchases' | 'lastPurchaseDate'>) => {
    const newCustomer: Customer = {
      id: customers.length + 1,
      totalPurchases: 0,
      lastPurchaseDate: new Date().toISOString().split('T')[0],
      ...customer,
    };
    setCustomers([newCustomer, ...customers]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Customers</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-primary-DEFAULT text-white px-4 py-2 rounded-lg shadow hover:bg-primary-hover transition"
        >
          <PlusCircleIcon />
          <span className="ml-2">Add Customer</span>
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
                placeholder="Search customers..."
                className="pl-10 pr-4 py-2 rounded-lg border dark:border-slate-600 bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
                />
            </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b dark:border-slate-700">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Last Purchase</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id} className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <td className="p-4 font-medium dark:text-gray-200">{customer.name}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{customer.email}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{customer.phone}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">${customer.totalPurchases.toFixed(2)}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{customer.lastPurchaseDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CustomerFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddCustomer}
      />
    </div>
  );
};

const CustomerFormModal: React.FC<{isOpen: boolean, onClose: () => void, onSave: (customer: Omit<Customer, 'id' | 'totalPurchases' | 'lastPurchaseDate'>) => void}> = ({ isOpen, onClose, onSave }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newCustomer = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
        };
        onSave(newCustomer);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Customer">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <input type="text" name="name" id="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-DEFAULT focus:ring-primary-DEFAULT" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <input type="email" name="email" id="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-DEFAULT focus:ring-primary-DEFAULT" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                    <input type="tel" name="phone" id="phone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-DEFAULT focus:ring-primary-DEFAULT" />
                </div>
                 <div className="flex justify-end pt-4 space-x-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-slate-600 rounded-md hover:bg-gray-300 dark:hover:bg-slate-500">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary-DEFAULT text-white rounded-md hover:bg-primary-hover">Save Customer</button>
                </div>
            </form>
        </Modal>
    );
};


export default CustomersPage;
