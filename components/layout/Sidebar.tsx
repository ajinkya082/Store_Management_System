
import React from 'react';
import { DashboardIcon, ProductsIcon, CustomersIcon, SalesIcon, InventoryIcon, SettingsIcon, ReportsIcon, UsersIcon, CloseIcon } from '../../utils/icons';
import { Page } from '../../App';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isSidebarOpen, toggleSidebar }) => {
  const navItems: { page: Page; label: string; icon: React.ReactNode }[] = [
    { page: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { page: 'products', label: 'Products', icon: <ProductsIcon /> },
    { page: 'customers', label: 'Customers', icon: <CustomersIcon /> },
    { page: 'sales', label: 'Sales', icon: <SalesIcon /> },
    { page: 'inventory', label: 'Inventory', icon: <InventoryIcon /> },
    { page: 'reports', label: 'Reports', icon: <ReportsIcon /> },
    { page: 'users', label: 'Users', icon: <UsersIcon /> },
    { page: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  ];

  const baseItemClass = "flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-primary-DEFAULT/10 hover:text-primary-DEFAULT dark:hover:text-primary-foreground rounded-lg transition-colors duration-200";
  const activeItemClass = "bg-primary-DEFAULT text-white dark:text-white shadow-lg";

  return (
    <aside className={`bg-white dark:bg-slate-800 shadow-xl transition-transform duration-300 ease-in-out w-64 h-full fixed lg:relative z-30 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="flex items-center justify-between h-20 border-b dark:border-slate-700 px-4">
        <div className="flex items-center">
            <InventoryIcon />
            <h1 className="text-xl font-bold text-gray-800 dark:text-white ml-3">StoreFlow</h1>
        </div>
        <button 
          onClick={toggleSidebar} 
          className="lg:hidden p-2 -mr-2 text-gray-600 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
          aria-label="Close sidebar"
        >
          <CloseIcon />
        </button>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.page}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(item.page);
              if (isSidebarOpen) toggleSidebar(); // Close sidebar on mobile after navigation
            }}
            className={`${baseItemClass} ${currentPage === item.page ? activeItemClass : ''}`}
            title={item.label}
          >
            {item.icon}
            <span className="ml-4">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
