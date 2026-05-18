import React, { createContext, useContext, useState, useCallback } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  createdAt: string;
}

interface StoredUser extends User {
  passwordHash: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = 'solarwear_users';
const SESSION_KEY = 'solarwear_session';

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(36);
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function loadUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      const users = loadUsers();
      const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!found) return { success: false, error: 'No existe una cuenta con este correo.' };
      if (found.passwordHash !== simpleHash(password)) return { success: false, error: 'Contraseña incorrecta.' };

      const { passwordHash: _pw, ...userData } = found;
      setUser(userData);
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      return { success: true };
    },
    []
  );

  const register = useCallback(
    async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      const users = loadUsers();
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, error: 'Ya existe una cuenta con este correo.' };
      }

      const newUser: StoredUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        initials: getInitials(name),
        createdAt: new Date().toISOString(),
        passwordHash: simpleHash(password),
      };

      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      const { passwordHash: _pw, ...userData } = newUser;
      setUser(userData);
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      return { success: true };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
