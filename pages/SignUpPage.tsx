import React, { useState } from 'react';
import { InventoryIcon } from '../utils/icons';
import { AuthPage } from '../App';
import { User } from '../types';
import { API_URL } from '../utils/api';

interface SignUpPageProps {
  onLogin: (user: User) => void;
  setAuthPage: (page: AuthPage) => void;
  role: 'owner' | 'customer' | null;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onLogin, setAuthPage, role }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, accessRole: role }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        setAuthPage('login');
      }, 2000);

    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
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
            Create a {role === 'owner' ? 'Store' : 'Customer'} Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Get started with StoreFlow today!
          </p>
        </div>
        
        {error && <p className="text-center text-sm text-red-600 bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">{error}</p>}
        {success && <p className="text-center text-sm text-green-600 bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">{success}</p>}
        
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="full-name" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Full Name</label>
            <input
              id="full-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Ajinkya Govardhan Raut"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading || !!success}
            />
          </div>
          <div>
            <label htmlFor="email-address-signup" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Email address</label>
            <input
              id="email-address-signup"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="mr.jinx428@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || !!success}
            />
          </div>
          <div>
            <label htmlFor="password-signup" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Password</label>
            <input
              id="password-signup"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading || !!success}
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading || !!success}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-600/50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Registering...' : 'Sign up'}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button onClick={() => setAuthPage('login')} className="font-medium text-primary-600 hover:text-primary-500" disabled={isLoading || !!success}>
                Sign in
            </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;