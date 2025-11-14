
import React, { useState } from 'react';
import CustomerSidebar, { CustomerPage } from './CustomerSidebar';
import Navbar from './Navbar';
import { mockCustomerUser } from '../../data/mockData';

interface CustomerDashboardLayoutProps {
  children: React.ReactNode;
  currentPage: CustomerPage;
  setCurrentPage: (page: CustomerPage) => void;
  handleLogout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const CustomerDashboardLayout: React.FC<CustomerDashboardLayoutProps> = ({
  children,
  currentPage,
  setCurrentPage,
  handleLogout,
  theme,
  toggleTheme,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900 font-sans">
      <div 
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={toggleSidebar}
      ></div>
      <CustomerSidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Navbar 
            toggleTheme={toggleTheme} 
            theme={theme} 
            handleLogout={handleLogout} 
            toggleSidebar={toggleSidebar}
            user={mockCustomerUser}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboardLayout;
