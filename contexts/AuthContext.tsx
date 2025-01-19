import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'admin' | 'moderator' | 'user';
export type UserType = 'student' | 'staff';

interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  userType: UserType;
  idNumber: string;
  fullName: string;
  department?: string;
  yearLevel?: number; // for students
  position?: string;  // for staff
  status: 'active' | 'inactive' | 'banned';
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
    userType: UserType;
    idNumber: string;
    fullName: string;
    department?: string;
    yearLevel?: number;
    position?: string;
  }) => Promise<void>;
  isAdmin: () => boolean;
  isModerator: () => boolean;
  updateUserRole: (userId: string, role: UserRole) => Promise<void>;
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
      // TODO: Implement actual authentication here
      // This is just mock data for demonstration
      const mockUser: User = {
        id: '1',
        email: 'user@example.com',
        username: 'user123',
        role: idNumber.includes('admin') ? 'admin' : 'user',
        userType: idNumber.startsWith('STF') ? 'staff' : 'student',
        idNumber,
        fullName: 'John Doe',
        department: 'Computer Science',
        yearLevel: idNumber.startsWith('STF') ? undefined : 2,
        position: idNumber.startsWith('STF') ? 'Professor' : undefined,
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
    userType: UserType;
    idNumber: string;
    fullName: string;
    department?: string;
    yearLevel?: number;
    position?: string;
  }) {
    try {
      setIsLoading(true);
      // TODO: Implement actual registration here
      const newUser: User = {
        id: Math.random().toString(),
        email: userData.email,
        username: userData.email.split('@')[0],
        role: 'user',
        userType: userData.userType,
        idNumber: userData.idNumber,
        fullName: userData.fullName,
        department: userData.department,
        yearLevel: userData.yearLevel,
        position: userData.position,
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
    return user?.role === 'admin';
  }

  function isModerator() {
    return user?.role === 'moderator';
  }

  async function updateUserRole(userId: string, role: UserRole) {
    if (!isAdmin()) throw new Error('Unauthorized');
    // TODO: Implement API call to update user role
    console.log(`Updating user ${userId} role to ${role}`);
  }

  async function banUser(userId: string) {
    if (!isAdmin() && !isModerator()) throw new Error('Unauthorized');
    // TODO: Implement API call to ban user
    console.log(`Banning user ${userId}`);
  }

  async function unbanUser(userId: string) {
    if (!isAdmin()) throw new Error('Unauthorized');
    // TODO: Implement API call to unban user
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
        isModerator,
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