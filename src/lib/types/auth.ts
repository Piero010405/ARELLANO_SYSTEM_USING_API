// lib/types/auth.ts
export interface User {
    id: Int16Array,
    admin: boolean,
    email: string,
    name: string,
    photo: string,
    sessionId: string,
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}