import type { UserRole } from "./type";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string; 
  role: UserRole;
}