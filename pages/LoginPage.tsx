import React, { useState } from 'react';
import { InventoryIcon, GoogleIcon } from '../utils/icons';
import { AuthPage } from '../App';
import { User } from '../types';
import { API_URL } from '../utils/api';

interface LoginPageProps {
  onLogin: (user: User) => void;
  setAuthPage: (page: AuthPage) => void;
  onBackToLobby: () => void;
  role: 'owner' | 'customer' | null;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, setAuthPage, onBackToLobby, role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to login');
      }
      
      if (data.accessRole !== role) {
        throw new Error(`You are not authorized to log in as a ${role}.`);
      }

      onLogin(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div 
        className="min-h-screen flex items-center justify-center font-sans bg-slate-100 dark:bg-slate-900 p-4"
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border dark:border-slate-700 animate-fadeInUp">
        <div className="flex flex-col items-center">
            <div className="p-3 bg-primary-600 rounded-full text-white mb-4">
                <InventoryIcon />
            </div>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            {role === 'owner' ? 'StoreFlow Login' : 'Customer Login'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Welcome back! Please enter your details.
          </p>
        </div>
        
        {error && <p className="text-center text-sm text-red-600 bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">{error}</p>}
        
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
              <label htmlFor="email-address" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-slate-700 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div>
              <label htmlFor="password"className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-slate-700 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-slate-500 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-gray-900 dark:text-gray-300">
                Remember me
              </label>
            </div>
            <button type="button" onClick={() => setAuthPage('forgot')} className="font-medium text-primary-600 hover:text-primary-500">
              Forgot your password?
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-slate-600"></div>
            <span className="flex-shrink mx-4 text-gray-400 dark:text-gray-500 text-xs uppercase">Or</span>
            <div className="flex-grow border-t border-gray-300 dark:border-slate-600"></div>
        </div>
        
        <button
            className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50"
            disabled
        >
            <GoogleIcon />
            <span className="ml-2">Sign in with Google</span>
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <button onClick={() => setAuthPage('signup')} className="font-medium text-primary-600 hover:text-primary-500">
                Sign up
            </button>
        </p>

        <p className="mt-4 text-center text-sm">
            <button onClick={onBackToLobby} className="font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600">
                &larr; Back to Role Selection
            </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;