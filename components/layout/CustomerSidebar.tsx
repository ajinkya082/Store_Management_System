import React from 'react';
import { DashboardIcon, ProductsIcon, SettingsIcon, CloseIcon } from '../../utils/icons';

export type CustomerPage = 'dashboard' | 'orders' | 'settings';

interface CustomerSidebarProps {
  currentPage: CustomerPage;
  setCurrentPage: (page: CustomerPage) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const CustomerSidebar: React.FC<CustomerSidebarProps> = ({ currentPage, setCurrentPage, isSidebarOpen, toggleSidebar }) => {
  const navItems: { page: CustomerPage; label: string; icon: React.ReactNode }[] = [
    { page: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { page: 'orders', label: 'My Orders', icon: <ProductsIcon /> },
    { page: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  ];

  const baseItemClass = "group flex items-center px-4 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-primary-50 dark:hover:bg-slate-700/50 hover:text-primary-600 dark:hover:text-primary-300 rounded-lg transition-colors duration-200";
  const activeItemClass = "bg-primary-50 dark:bg-slate-700 text-primary-600 dark:text-primary-300 font-semibold";

  return (
    <aside className={`bg-white dark:bg-slate-800 shadow-xl border-r border-slate-200 dark:border-slate-700 transition-transform duration-300 ease-in-out w-64 h-full fixed lg:relative z-30 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="flex items-center justify-between h-20 border-b border-slate-200 dark:border-slate-700 px-4">
        <div className="flex items-center">
            <div className="p-2 bg-primary-600 rounded-lg text-white">
                <DashboardIcon className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white ml-3">My Account</h1>
        </div>
        <button 
          onClick={toggleSidebar} 
          className="lg:hidden p-2 -mr-2 text-gray-600 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
          aria-label="Close sidebar"
        >
          <CloseIcon />
        </button>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.page}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(item.page);
              if (window.innerWidth < 1024) {
                toggleSidebar();
              }
            }}
            className={`${baseItemClass} ${currentPage === item.page ? activeItemClass : ''}`}
            title={item.label}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default CustomerSidebar;
