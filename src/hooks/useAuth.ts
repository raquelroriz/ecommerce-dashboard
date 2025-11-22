// Hooks auxiliares para autenticação
// Mantém compatibilidade: exporta o hook original do contexto
export {useAuth} from "../context/AuthContext";

import {useMemo} from "react";
import {type AuthUser, useAuth} from "../context/AuthContext";

/**
 * Retorna apenas o usuário autenticado (ou null).
 */
export function useAuthUser(): AuthUser | null {
  const {user} = useAuth();
  return user;
}

/**
 * Retorna somente o booleano de autenticação.
 */
export function useIsAuthenticated(): boolean {
  const {isAuthenticated} = useAuth();
  return isAuthenticated;
}

/**
 * Retorna apenas as ações do auth: login, register e logout.
 */
export function useAuthActions() {
  const {login, register, logout} = useAuth();
  return useMemo(() => ({login, register, logout}), [login, register, logout]);
}
