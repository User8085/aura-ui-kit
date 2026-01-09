/**
 * API Configuration and Helper Functions
 * 
 * This module provides a centralized way to make API calls to the backend.
 * The base URL is configured via environment variable for flexibility across environments.
 */

// Base API URL - configure via environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

/**
 * Generic fetch wrapper with error handling
 * @param endpoint - API endpoint (e.g., '/auth/login')
 * @param options - Fetch options (method, body, headers, etc.)
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Get auth token from storage if available
  const token = localStorage.getItem('auth_token');
  if (token) {
    (defaultHeaders as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'An error occurred');
  }

  return response.json();
}

// Auth API calls
export const authApi = {
  login: (email: string, password: string) =>
    apiClient<{ token: string; user: { id: string; email: string; name: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  signup: (name: string, email: string, password: string) =>
    apiClient<{ token: string; user: { id: string; email: string; name: string } }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  logout: () =>
    apiClient<{ success: boolean }>('/auth/logout', {
      method: 'POST',
    }),
};

// Dashboard API calls
export const dashboardApi = {
  getStats: () =>
    apiClient<{
      totalUsers: number;
      revenue: number;
      activeProjects: number;
      conversionRate: number;
    }>('/dashboard/stats'),

  getRecentActivity: () =>
    apiClient<Array<{
      id: string;
      user: string;
      action: string;
      date: string;
      status: 'completed' | 'pending' | 'failed';
    }>>('/dashboard/activity'),

  getProjects: () =>
    apiClient<Array<{
      id: string;
      name: string;
      status: 'active' | 'paused' | 'completed';
      progress: number;
      team: string[];
    }>>('/dashboard/projects'),
};
