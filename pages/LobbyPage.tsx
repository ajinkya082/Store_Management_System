
import React from 'react';
import { InventoryIcon, CustomersIcon } from '../utils/icons';

interface LobbyPageProps {
  onSelectRole: (role: 'owner' | 'customer') => void;
}

const LobbyPage: React.FC<LobbyPageProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 font-sans p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <div className="inline-block p-4 bg-primary-DEFAULT rounded-full text-white mb-4">
                <InventoryIcon />
            </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">Welcome to StoreFlow</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Your all-in-one store management solution.</p>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Please select your role to continue.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RoleCard
            title="Shop Owner"
            description="Manage products, view sales analytics, and oversee store operations."
            icon={<InventoryIcon />}
            onClick={() => onSelectRole('owner')}
          />
          <RoleCard
            title="Customer"
            description="View your order history, manage your profile, and browse products."
            icon={<CustomersIcon />}
            onClick={() => onSelectRole('customer')}
          />
        </div>
      </div>
    </div>
  );
};

interface RoleCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, description, icon, onClick }) => (
    <button
        onClick={onClick}
        className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-left w-full focus:outline-none focus:ring-4 focus:ring-primary-DEFAULT focus:ring-opacity-50"
    >
        <div className="flex items-center mb-4">
            <div className="p-3 bg-primary-DEFAULT/10 text-primary-DEFAULT rounded-full mr-4">
                {icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </button>
);

export default LobbyPage;
