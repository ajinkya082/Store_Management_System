
import React, { useState, useCallback } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import CustomersPage from './pages/CustomersPage';
import SalesPage from './pages/SalesPage';
import InventoryPage from './pages/InventoryPage';
import SettingsPage from './pages/SettingsPage';
import ReportsPage from './pages/ReportsPage';
import UsersPage from './pages/UsersPage';
import { useTheme } from './hooks/useTheme';
import LobbyPage from './pages/LobbyPage';
import CustomerDashboardLayout from './components/layout/CustomerDashboardLayout';
import CustomerDashboardPage from './pages/CustomerDashboardPage';
import { CustomerPage } from './components/layout/CustomerSidebar';

export type Page = 'dashboard' | 'products' | 'customers' | 'sales' | 'inventory' | 'reports' | 'users' | 'settings';
export type AuthPage = 'login' | 'signup' | 'forgot';
type View = 'lobby' | 'auth' | 'owner_dashboard' | 'customer_dashboard';
type Role = 'owner' | 'customer';

const App: React.FC = () => {
  const [view, setView] = useState<View>('lobby');
  const [role, setRole] = useState<Role | null>(null);
  const [authPage, setAuthPage] = useState<AuthPage>('login');
  const [ownerPage, setOwnerPage] = useState<Page>('dashboard');
  const [customerPage, setCustomerPage] = useState<CustomerPage>('dashboard');
  const { theme, toggleTheme } = useTheme();

  const handleSelectRole = useCallback((selectedRole: Role) => {
    setRole(selectedRole);
    setView('auth');
    setAuthPage('login');
  }, []);

  const handleLogin = useCallback(() => {
    if (role === 'owner') {
      setView('owner_dashboard');
    } else if (role === 'customer') {
      setView('customer_dashboard');
    }
  }, [role]);

  const handleLogout = useCallback(() => {
    setView('lobby');
    setRole(null);
    setOwnerPage('dashboard');
    setCustomerPage('dashboard');
  }, []);

  const handleBackToLobby = useCallback(() => {
    setView('lobby');
    setRole(null);
  }, []);

  const renderOwnerPage = () => {
    switch (ownerPage) {
      case 'dashboard': return <DashboardPage />;
      case 'products': return <ProductsPage />;
      case 'customers': return <CustomersPage />;
      case 'sales': return <SalesPage />;
      case 'inventory': return <InventoryPage />;
      case 'reports': return <ReportsPage />;
      case 'users': return <UsersPage />;
      case 'settings': return <SettingsPage />;
      default: return <DashboardPage />;
    }
  };

  const renderCustomerPage = () => {
    switch (customerPage) {
        case 'dashboard': return <CustomerDashboardPage />;
        case 'orders': return <CustomerDashboardPage />; // Placeholder, can be a new component
        case 'settings': return <SettingsPage />; // Can reuse or create a customer-specific one
        default: return <CustomerDashboardPage />;
    }
  };

  switch (view) {
    case 'lobby':
      return <LobbyPage onSelectRole={handleSelectRole} />;
    
    case 'auth':
      switch (authPage) {
        case 'login':
          return <LoginPage onLogin={handleLogin} setAuthPage={setAuthPage} onBackToLobby={handleBackToLobby} />;
        case 'signup':
          return <SignUpPage onLogin={handleLogin} setAuthPage={setAuthPage} />;
        case 'forgot':
          return <ForgotPasswordPage setAuthPage={setAuthPage} />;
        default:
          return <LoginPage onLogin={handleLogin} setAuthPage={setAuthPage} onBackToLobby={handleBackToLobby} />;
      }

    case 'owner_dashboard':
      return (
        <DashboardLayout
          currentPage={ownerPage}
          setCurrentPage={setOwnerPage}
          handleLogout={handleLogout}
          theme={theme}
          toggleTheme={toggleTheme}
        >
          {renderOwnerPage()}
        </DashboardLayout>
      );
    
    case 'customer_dashboard':
        return (
            <CustomerDashboardLayout
                currentPage={customerPage}
                setCurrentPage={setCustomerPage}
                handleLogout={handleLogout}
                theme={theme}
                toggleTheme={toggleTheme}
            >
                {renderCustomerPage()}
            </CustomerDashboardLayout>
        );

    default:
      return <LobbyPage onSelectRole={handleSelectRole} />;
  }
};

export default App;
