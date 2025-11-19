import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { User } from '../types';
import { API_URL } from '../utils/api';

interface SettingsPageProps {
    user: User | null;
    onUpdateUser: (user: User) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ user, onUpdateUser }) => {
    const { theme, toggleTheme } = useTheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleSaveChanges = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (password && password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match.' });
            return;
        }
        setIsLoading(true);

        try {
            const updateData: {name: string, email: string, password?: string} = { name, email };
            if (password) {
                updateData.password = password;
            }

            const res = await fetch(`${API_URL}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.token}`,
                },
                body: JSON.stringify(updateData),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to update profile.');
            }

            onUpdateUser(data);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setIsLoading(false);
        }
    };


    if (!user) {
        return <div>Loading user settings...</div>;
    }

    return (
        <div className="animate-fadeInUp">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Settings</h1>

            <form onSubmit={handleSaveChanges} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50 max-w-3xl mx-auto">
                {message && (
                    <div className={`p-3 rounded-lg mb-6 text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
                        {message.text}
                    </div>
                )}
                <div className="space-y-8 divide-y divide-slate-200 dark:divide-slate-700">
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Profile</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="md:col-span-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="md:col-span-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500" />
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Avatar</label>
                            <div className="md:col-span-2 flex items-center space-x-4">
                                <img src={user.avatarUrl} alt="Avatar" className="h-16 w-16 rounded-full"/>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Avatar updates automatically based on your name.</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 pt-8">
                        <h2 className="text-xl font-semibold">Change Password</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Leave these fields blank to keep your current password.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <label htmlFor="password"className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                            <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="md:col-span-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500" />
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <label htmlFor="confirmPassword"className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="md:col-span-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500" />
                        </div>
                    </div>

                    <div className="space-y-6 pt-8">
                        <h2 className="text-xl font-semibold">Appearance</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
                          <div className="md:col-span-2 flex items-center">
                              <span className="mr-3 text-sm">Light</span>
                              <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" id="theme-toggle" className="sr-only peer" checked={theme === 'dark'} onChange={toggleTheme} />
                                  <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                              </label>
                              <span className="ml-3 text-sm">Dark</span>
                          </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6 flex justify-end">
                    <button type="submit" disabled={isLoading} className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg shadow-sm hover:bg-primary-700 transition disabled:bg-primary-600/50 disabled:cursor-not-allowed">
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SettingsPage;