'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth data on mount
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const presenterData = localStorage.getItem('presenter');
      
      if (token && presenterData) {
        try {
          const parsedPresenter = JSON.parse(presenterData);
          setUser({
            ...parsedPresenter,
            token
          });
        } catch (error) {
          console.error('Error parsing presenter data:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('presenter');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('presenter', JSON.stringify(userData));
    setUser({
      ...userData,
      token
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('presenter');
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 