'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {jwtDecode, JwtPayload } from 'jwt-decode';
import { useRouter } from 'next/navigation';

// Define User type based on your JWT payload
interface User extends JwtPayload{
  email: string;
  name: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, name: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children } : {children : ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);  // User can either be null or a User object
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<User>(token);  // Decode token to User type
      setUser(decoded);  // Set user state with decoded token data
    }
  }, []);

  const login = async (email: string, name: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('token', token);

        const decoded = jwtDecode<User>(token);  // Type decoded as User
        setUser(decoded);  // Update user state with decoded token

        return true;
      } else {
        console.error('Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};