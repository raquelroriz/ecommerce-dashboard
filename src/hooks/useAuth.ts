// Auxiliary hooks for authentication
export {useAuth} from "../context/AuthContext";

import {useMemo} from "react";
import {type AuthUser, useAuth} from "../context/AuthContext";

// Returns only the authenticated user (or null).
export function useAuthUser(): AuthUser | null {
  const {user} = useAuth();
  return user;
}

// Returns only the authentication boolean.
export function useIsAuthenticated(): boolean {
  const {isAuthenticated} = useAuth();
  return isAuthenticated;
}

// It only returns the auth actions: login, register, and logout.
export function useAuthActions() {
  const {login, register, logout} = useAuth();
  return useMemo(() => ({login, register, logout}), [login, register, logout]);
}
