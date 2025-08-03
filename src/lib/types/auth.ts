// lib/types/auth.ts
export interface User {
    id: Int16Array,
    name: string,
    email: string,
    photo: string,
    admin: boolean
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}