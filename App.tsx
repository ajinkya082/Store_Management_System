
import React, { useState, useCallback, useEffect } from 'react';
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
import { User } from './types';

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
  const [user, setUser] = useState<User | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    try {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const userData: User = JSON.parse(userInfo);
        setUser(userData);
        setRole(userData.accessRole);
        if (userData.accessRole === 'owner') {
          setView('owner_dashboard');
        } else if (userData.accessRole === 'customer') {
          setView('customer_dashboard');
        }
      }
    } catch (error) {
      console.error("Failed to parse user info from localStorage", error);
      localStorage.removeItem('userInfo');
    }
  }, []);

  const handleSelectRole = useCallback((selectedRole: Role) => {
    setRole(selectedRole);
    setView('auth');
    setAuthPage('login');
  }, []);

  const handleLogin = useCallback((userData: User) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
    if (userData.accessRole === 'owner') {
      setView('owner_dashboard');
    } else if (userData.accessRole === 'customer') {
      setView('customer_dashboard');
    }
  }, []);

  const handleUpdateUser = useCallback((updatedUserData: User) => {
    const currentUserData = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const newUserData = { 
        ...currentUserData, 
        ...updatedUserData,
        token: updatedUserData.token || currentUserData.token
    };
    localStorage.setItem('userInfo', JSON.stringify(newUserData));
    setUser(newUserData);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('userInfo');
    setUser(null);
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
      case 'dashboard': return <DashboardPage user={user} />;
      case 'products': return <ProductsPage user={user} />;
      case 'customers': return <CustomersPage user={user} />;
      case 'sales': return <SalesPage user={user} />;
      case 'inventory': return <InventoryPage user={user} />;
      case 'reports': return <ReportsPage user={user} />;
      case 'users': return <UsersPage user={user} />;
      case 'settings': return <SettingsPage user={user} onUpdateUser={handleUpdateUser} />;
      default: return <DashboardPage user={user}/>;
    }
  };

  const renderCustomerPage = () => {
    switch (customerPage) {
        case 'dashboard': return <CustomerDashboardPage user={user} />;
        case 'orders': return <CustomerDashboardPage user={user} />; 
        case 'settings': return <SettingsPage user={user} onUpdateUser={handleUpdateUser} />;
        default: return <CustomerDashboardPage user={user} />;
    }
  };

  switch (view) {
    case 'lobby':
      return <LobbyPage onSelectRole={handleSelectRole} />;
    
    case 'auth':
      switch (authPage) {
        case 'login':
          return <LoginPage onLogin={handleLogin} setAuthPage={setAuthPage} onBackToLobby={handleBackToLobby} role={role} />;
        case 'signup':
          return <SignUpPage onLogin={handleLogin} setAuthPage={setAuthPage} role={role} />;
        case 'forgot':
          return <ForgotPasswordPage setAuthPage={setAuthPage} />;
        default:
          return <LoginPage onLogin={handleLogin} setAuthPage={setAuthPage} onBackToLobby={handleBackToLobby} role={role} />;
      }

    case 'owner_dashboard':
      return (
        <DashboardLayout
          currentPage={ownerPage}
          setCurrentPage={setOwnerPage}
          handleLogout={handleLogout}
          theme={theme}
          toggleTheme={toggleTheme}
          user={user}
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
                user={user}
            >
                {renderCustomerPage()}
            </CustomerDashboardLayout>
        );

    default:
      return <LobbyPage onSelectRole={handleSelectRole} />;
  }
};

export default App;
