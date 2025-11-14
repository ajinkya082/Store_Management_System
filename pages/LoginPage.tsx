
import React from 'react';
import { InventoryIcon, GoogleIcon } from '../utils/icons';
import { AuthPage } from '../App';

interface LoginPageProps {
  onLogin: () => void;
  setAuthPage: (page: AuthPage) => void;
  onBackToLobby: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, setAuthPage, onBackToLobby }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
            StoreFlow Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Welcome back! Please enter your details.
          </p>
        </div>
        
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-slate-700 rounded-t-md focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT focus:z-10 sm:text-sm"
                placeholder="Email address"
                defaultValue="admin@store.com"
              />
            </div>
            <div>
              <label htmlFor="password"className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-slate-700 rounded-b-md focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT focus:z-10 sm:text-sm"
                placeholder="Password"
                defaultValue="password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary-DEFAULT focus:ring-primary-hover border-gray-300 dark:border-slate-500 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-gray-900 dark:text-gray-300">
                Remember me
              </label>
            </div>
            <button type="button" onClick={() => setAuthPage('forgot')} className="font-medium text-primary-DEFAULT hover:text-primary-hover">
              Forgot your password?
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-DEFAULT hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-slate-600"></div>
            <span className="flex-shrink mx-4 text-gray-400 dark:text-gray-500 text-xs">OR</span>
            <div className="flex-grow border-t border-gray-300 dark:border-slate-600"></div>
        </div>
        
        <button
            onClick={onLogin}
            className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600"
        >
            <GoogleIcon />
            <span className="ml-2">Sign in with Google</span>
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <button onClick={() => setAuthPage('signup')} className="font-medium text-primary-DEFAULT hover:text-primary-hover">
                Sign up
            </button>
        </p>

        <p className="mt-4 text-center text-sm">
            <button onClick={onBackToLobby} className="font-medium text-gray-600 dark:text-gray-400 hover:text-primary-DEFAULT">
                &larr; Back to Role Selection
            </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
