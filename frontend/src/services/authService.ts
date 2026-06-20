import { api } from './api';
import type { AuthResponse, LoginRequest, RegisterRequest, UserResponse } from '../types';

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  getMe: async (): Promise<UserResponse> => {
    const response = await api.get<UserResponse>('/auth/me');
    return response.data;
  },

  updateProfile: async (fullName: string): Promise<UserResponse> => {
    const response = await api.put<UserResponse>('/users/profile', { fullName });
    return response.data;
  },
};
export type { LoginRequest, RegisterRequest };
