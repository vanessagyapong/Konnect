import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserType = 'student' | 'staff';

interface User {
  id: string;
  email: string;
  username: string;
  userType: UserType;
  idNumber: string;
  fullName: string;
  department?: string;
  yearLevel?: number;
  position?: string;
  status: 'active' | 'inactive';
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signIn: (idNumber: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (userData: {
    email: string;
    password: string;
    idNumber: string;
    fullName: string;
    department?: string;
  }) => Promise<void>;
  isAdmin: () => boolean;
  updateUserRole: (userId: string, role: string) => Promise<void>;
  banUser: (userId: string) => Promise<void>;
  unbanUser: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AUTH_STORAGE_KEY = '@auth_token';
const USER_STORAGE_KEY = '@user_data';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      setIsLoading(true);
      const [token, userData] = await Promise.all([
        AsyncStorage.getItem(AUTH_STORAGE_KEY),
        AsyncStorage.getItem(USER_STORAGE_KEY),
      ]);

      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } else {
        await Promise.all([
          AsyncStorage.removeItem(AUTH_STORAGE_KEY),
          AsyncStorage.removeItem(USER_STORAGE_KEY),
        ]);
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(idNumber: string, password: string) {
    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API call to authenticate user
      // The backend should return the user's role based on their ID
      const mockUser: User = {
        id: '1',
        email: 'user@example.com',
        username: idNumber,
        userType: idNumber.startsWith('STF') ? 'staff' : 'student', // Role determined by backend
        idNumber,
        fullName: 'John Doe',
        department: 'Computer Science',
        status: 'active'
      };

      await Promise.all([
        AsyncStorage.setItem(AUTH_STORAGE_KEY, 'dummy-token'),
        AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser)),
      ]);

      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    try {
      setIsLoading(true);
      await Promise.all([
        AsyncStorage.removeItem(AUTH_STORAGE_KEY),
        AsyncStorage.removeItem(USER_STORAGE_KEY),
      ]);
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signUp(userData: {
    email: string;
    password: string;
    idNumber: string;
    fullName: string;
    department?: string;
  }) {
    try {
      setIsLoading(true);
      // TODO: Implement actual registration API call
      // The backend should determine and return the user's role based on their ID
      const newUser: User = {
        id: Math.random().toString(),
        email: userData.email,
        username: userData.email.split('@')[0],
        userType: userData.idNumber.startsWith('STF') ? 'staff' : 'student', // Role determined by backend
        idNumber: userData.idNumber,
        fullName: userData.fullName,
        department: userData.department,
        status: 'active'
      };

      await Promise.all([
        AsyncStorage.setItem(AUTH_STORAGE_KEY, 'dummy-token'),
        AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser)),
      ]);

      setUser(newUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  function isAdmin() {
    return user?.idNumber.startsWith('ADM') || false;
  }

  async function updateUserRole(userId: string, role: string) {
    if (!isAdmin()) throw new Error('Unauthorized');
    // TODO: Implement actual role update
    console.log(`Updating user ${userId} role to ${role}`);
  }

  async function banUser(userId: string) {
    if (!isAdmin()) throw new Error('Unauthorized');
    // TODO: Implement actual ban
    console.log(`Banning user ${userId}`);
  }

  async function unbanUser(userId: string) {
    if (!isAdmin()) throw new Error('Unauthorized');
    // TODO: Implement actual unban
    console.log(`Unbanning user ${userId}`);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        signIn,
        signOut,
        signUp,
        isAdmin,
        updateUserRole,
        banUser,
        unbanUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);