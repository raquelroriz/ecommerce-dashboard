import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";

export type AuthUser = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const STORAGE_KEY = "auth-user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as AuthUser;
      if (parsed) return parsed;
      return null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, [user]);

  async function login(email: string, _password: string) {
    const name = email.split("@")[0] || "User";
    await new Promise((r) => setTimeout(r, 300));
    setUser({name, email});
  }

  async function register(name: string, email: string, _password: string) {
    await new Promise((r) => setTimeout(r, 500));
    setUser({name: name || email.split("@")[0] || "User", email});
  }

  function logout() {
    setUser(null);
  }

  const value = useMemo<AuthContextType>(
    () => ({user, isAuthenticated: !!user, login, register, logout}),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

export function RequireAuth({children}: { children: React.ReactNode }) {
  const {isAuthenticated} = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{from: location}}/>;
  }
  return <>{children}</>;
}
