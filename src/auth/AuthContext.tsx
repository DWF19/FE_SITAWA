
import { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types/user';
import api from '../lib/api';
import { set } from 'date-fns';

type AuthContextType = {
  userRole: string | null;
  setUserRole: (role: string) => void;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string, address: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [confirmPass, setConfirmPass] = useState<string | null>(null);
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const response = await api.get('/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      setUserRole(response.data.role);
      sessionStorage.setItem('role', response.data.role);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password });
      const newToken = response.data.access_token;
      sessionStorage.setItem('token', newToken);
      setToken(newToken);
      await fetchUser(newToken);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

   const register = async (name: string, email: string, password: string, phone: string, address: string, role: string) => {
    try {
      setConfirmPass(password);
      
      const response = await api.post('/register', { name, email, password, password_confirmation: confirmPass, role, address, phone });
      const newToken = response.data.access_token;
      sessionStorage.setItem('token', newToken);
      setToken(newToken);
      await fetchUser(newToken);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = async () => {

    try {
      if (token) {
        await api.post('/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ userRole, setUserRole, user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error
  }
  return context;
};
