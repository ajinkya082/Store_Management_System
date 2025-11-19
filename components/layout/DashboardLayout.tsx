import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Page } from '../../App';
import { User } from '../../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  handleLogout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: User | null;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  currentPage,
  setCurrentPage,
  handleLogout,
  theme,
  toggleTheme,
  user,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-850 font-sans">
      <div 
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={toggleSidebar}
      ></div>
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar 
            toggleTheme={toggleTheme} 
            theme={theme} 
            handleLogout={handleLogout} 
            toggleSidebar={toggleSidebar}
            user={user}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
