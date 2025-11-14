
import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, NotificationIcon, SunIcon, MoonIcon, ChevronDownIcon, LogoutIcon } from '../../utils/icons';
import { User } from '../../types';

interface NavbarProps {
  toggleTheme: () => void;
  theme: 'light' | 'dark';
  handleLogout: () => void;
  toggleSidebar: () => void;
  user: User;
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

  return (
    <header className="bg-white dark:bg-slate-800 shadow-md h-20 flex items-center justify-between px-6 z-10">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none lg:hidden mr-4">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 hover:text-primary-DEFAULT transition">
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
        <button className="relative text-gray-500 dark:text-gray-400 hover:text-primary-DEFAULT transition">
          <NotificationIcon />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2">
            <img src={user.avatarUrl} alt="User Avatar" className="h-10 w-10 rounded-full object-cover border-2 border-primary-DEFAULT"/>
            <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-200">{user.name}</span>
            <ChevronDownIcon />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
              <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
              <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">Profile</button>
              <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">
                <LogoutIcon />
                <span className="ml-2">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
