// Auth Service
// Handles authentication and user management

const API_BASE_URL = '/api';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  // Login
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    
    return response.json();
  },

  // Register
  async register(email: string, password: string, name: string, role: string = 'user'): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, role }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }
    
    return response.json();
  },

  // Save token to localStorage
  setToken(token: string): void {
    localStorage.setItem('crm_token', token);
  },

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('crm_token');
  },

  // Save user to localStorage
  setUser(user: User): void {
    localStorage.setItem('crm_user', JSON.stringify(user));
  },

  // Get user from localStorage
  getUser(): User | null {
    const userStr = localStorage.getItem('crm_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Logout
  logout(): void {
    localStorage.removeItem('crm_token');
    localStorage.removeItem('crm_user');
    window.location.href = '/login';
  },

  // Check if user is logged in
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  // Get auth header
  getAuthHeader(): HeadersInit {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
};

export default authService;