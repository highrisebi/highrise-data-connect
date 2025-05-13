
import { createContext, useContext, useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = user !== null;

  // Mock authentication functions - to be replaced with real authentication
  const login = async (email: string, password: string) => {
    // Mock login - would actually call an API in a real app
    console.log('Login attempt with:', email, password);
    
    // Mock successful login
    setUser({
      id: '1',
      email,
      role: email.includes('admin') ? 'admin' : 'user',
    });
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (email: string, password: string) => {
    // Mock registration - would actually call an API in a real app
    console.log('Registration attempt with:', email, password);
    
    // Mock successful registration and login
    setUser({
      id: '1',
      email,
      role: 'user',
    });
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
