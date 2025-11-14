import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { mockUser } from '../data/mockData';

const SettingsPage: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Settings</h1>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                {/* Profile Settings */}
                <div className="pb-6 border-b dark:border-slate-700">
                    <h2 className="text-xl font-semibold mb-4">Profile</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input type="text" name="name" id="name" defaultValue={mockUser.name} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-DEFAULT focus:ring-primary-DEFAULT" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <input type="email" name="email" id="email" defaultValue={mockUser.email} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-DEFAULT focus:ring-primary-DEFAULT" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Avatar</label>
                            <div className="mt-2 flex items-center space-x-4">
                                <img src={mockUser.avatarUrl} alt="Avatar" className="h-12 w-12 rounded-full"/>
                                <button className="px-3 py-1.5 text-sm font-medium border border-gray-300 dark:border-slate-600 rounded-md hover:bg-gray-50 dark:hover:bg-slate-700">Change</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appearance Settings */}
                <div className="py-6 border-b dark:border-slate-700">
                    <h2 className="text-xl font-semibold mb-4">Appearance</h2>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
                        <div className="flex items-center">
                            <span className="mr-2 text-sm">Light</span>
                            <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="theme-toggle" className="sr-only peer" checked={theme === 'dark'} onChange={toggleTheme} />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-DEFAULT"></div>
                            </label>
                            <span className="ml-2 text-sm">Dark</span>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="pt-6 flex justify-end">
                    <button className="px-6 py-2 bg-primary-DEFAULT text-white font-semibold rounded-lg shadow hover:bg-primary-hover transition">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
