
import React from 'react';
import { InventoryIcon } from '../utils/icons';
import { AuthPage } from '../App';

interface SignUpPageProps {
  onLogin: () => void;
  setAuthPage: (page: AuthPage) => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onLogin, setAuthPage }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, you would handle the signup logic here.
    // For this demo, we'll just log the user in.
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <div className="p-3 bg-primary-DEFAULT rounded-full text-white mb-4">
            <InventoryIcon />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Get started with StoreFlow today!
          </p>
        </div>
        
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="full-name" className="sr-only">Full Name</label>
            <input
              id="full-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT sm:text-sm"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label htmlFor="email-address-signup" className="sr-only">Email address</label>
            <input
              id="email-address-signup"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password-signup" className="sr-only">Password</label>
            <input
              id="password-signup"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT sm:text-sm"
              placeholder="Password"
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-DEFAULT hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button onClick={() => setAuthPage('login')} className="font-medium text-primary-DEFAULT hover:text-primary-hover">
                Sign in
            </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
