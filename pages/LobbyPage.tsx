import React from 'react';
import { CubeIcon, CustomersIcon, InventoryIcon } from '../utils/icons';

interface LobbyPageProps {
  onSelectRole: (role: 'owner' | 'customer') => void;
}

const LobbyPage: React.FC<LobbyPageProps> = ({ onSelectRole }) => {
  return (
    <div 
        className="min-h-screen flex flex-col items-center justify-center font-sans p-4 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>
      <div className="relative w-full max-w-4xl mx-auto text-center">
        <div className="mb-12 animate-fadeInUp">
          <div className="inline-block p-3 bg-white/10 rounded-xl mb-4">
            <CubeIcon className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Welcome to StoreFlow</h1>
          <p className="mt-4 text-lg text-slate-300">Your all-in-one store management solution.</p>
          <p className="mt-2 text-lg text-slate-300">Please select your role to continue.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RoleCard
            title="Shop Owner"
            description="Manage products, view sales analytics, and oversee store operations."
            icon={<InventoryIcon />}
            onClick={() => onSelectRole('owner')}
            animationDelay="200ms"
          />
          <RoleCard
            title="Customer"
            description="View your order history, manage your profile, and browse products."
            icon={<CustomersIcon />}
            onClick={() => onSelectRole('customer')}
            animationDelay="400ms"
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
    animationDelay?: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, description, icon, onClick, animationDelay }) => (
    <button
        onClick={onClick}
        className="group bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg transition-all duration-300 text-left w-full focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-opacity-50 animate-fadeInUp border border-white/20 hover:border-primary-400 hover:scale-[1.03] hover:bg-white/20"
        style={{ animationDelay: animationDelay || '0ms' }}
    >
        <div className="flex items-center mb-4">
            <div className="text-primary-300 mr-4 group-hover:text-white transition-colors">
                {icon}
            </div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <p className="text-slate-300">{description}</p>
    </button>
);

export default LobbyPage;
