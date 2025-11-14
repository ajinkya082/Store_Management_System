
import React, { useState } from 'react';
import { InventoryIcon } from '../utils/icons';
import { AuthPage } from '../App';

interface ForgotPasswordPageProps {
  setAuthPage: (page: AuthPage) => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ setAuthPage }) => {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, you would handle sending the reset email here.
    setEmailSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <div className="p-3 bg-primary-DEFAULT rounded-full text-white mb-4">
            <InventoryIcon />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {emailSent 
              ? "Check your email for a password reset link." 
              : "Enter your email and we'll send you a link to reset your password."
            }
          </p>
        </div>
        
        {!emailSent ? (
          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address-forgot" className="sr-only">Email address</label>
              <input
                id="email-address-forgot"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-slate-700 focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT sm:text-sm"
                placeholder="Email address"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-DEFAULT hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        ) : null}

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            <button onClick={() => setAuthPage('login')} className="font-medium text-primary-DEFAULT hover:text-primary-hover">
                Back to Sign in
            </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
