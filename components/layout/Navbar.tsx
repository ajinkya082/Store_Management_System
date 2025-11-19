import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, NotificationIcon, SunIcon, MoonIcon, ChevronDownIcon, LogoutIcon, SettingsIcon } from '../../utils/icons';
import { User } from '../../types';

interface NavbarProps {
  toggleTheme: () => void;
  theme: 'light' | 'dark';
  handleLogout: () => void;
  toggleSidebar: () => void;
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, theme, handleLogout, toggleSidebar, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  if (!user) return null;

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 h-20 flex items-center justify-between px-6 z-10 flex-shrink-0">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none lg:hidden mr-4">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="relative hidden md:block">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
        <button className="relative text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
          <NotificationIcon />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
        </button>
        
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2">
            <img src={user.avatarUrl} alt="User Avatar" className="h-10 w-10 rounded-full object-cover border-2 border-primary-500 shadow-sm"/>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{user.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{user.accessRole === 'owner' ? user.systemRole : 'Customer'}</span>
            </div>
            <ChevronDownIcon className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-xl py-2 ring-1 ring-black ring-opacity-5 z-20 border dark:border-slate-700 animate-scaleIn">
              <div className="px-4 py-2 border-b dark:border-slate-700 mb-2">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
              </div>
              <button className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700/50">
                <SettingsIcon className="h-4 w-4 mr-2"/>
                Profile Settings
              </button>
              <div className="border-t dark:border-slate-700 my-2"></div>
              <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10">
                <LogoutIcon className="h-4 w-4 mr-2" />
                <span className="ml-1">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
