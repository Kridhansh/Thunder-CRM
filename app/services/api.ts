// CRM API Service
// This service provides methods to interact with the backend API

import { authService } from './auth';

// Use relative path - will be proxied to backend via Vite
const API_BASE_URL = '/api';

// Helper to get headers with auth
function getHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    ...authService.getAuthHeader()
  };
}

export interface Contact {
  id?: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  assigned_to?: number;
  assigned_to_name?: string;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Deal {
  id?: number;
  title: string;
  value: number;
  contact_id?: number;
  contact_name?: string;
  assigned_to?: number;
  assigned_to_name?: string;
  stage: string;
  probability: number;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  contact_id?: number;
  contact_name?: string;
  deal_id?: number;
  deal_title?: string;
  assigned_to?: number;
  assigned_to_name?: string;
  due_date: string;
  priority: string;
  status: string;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
}

export interface DashboardStats {
  contacts: number;
  deals: number;
  pendingTasks: number;
  totalRevenue: number;
}

// Dashboard Stats
export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await fetch(`${API_BASE_URL}/dashboard`, {
    headers: getHeaders()
  });
  return response.json();
}

// Contacts API
export async function getContacts(): Promise<Contact[]> {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    headers: getHeaders()
  });
  return response.json();
}

export async function createContact(contact: Omit<Contact, 'id'>): Promise<Contact> {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(contact),
  });
  return response.json();
}

export async function updateContact(id: number, contact: Partial<Contact>): Promise<Contact> {
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(contact),
  });
  return response.json();
}

export async function deleteContact(id: number): Promise<void> {
  await fetch(`${API_BASE_URL}/contacts/${id}`, { 
    method: 'DELETE',
    headers: getHeaders()
  });
}

// Deals API
export async function getDeals(): Promise<Deal[]> {
  const response = await fetch(`${API_BASE_URL}/deals`, {
    headers: getHeaders()
  });
  return response.json();
}

export async function createDeal(deal: Omit<Deal, 'id'>): Promise<Deal> {
  const response = await fetch(`${API_BASE_URL}/deals`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(deal),
  });
  return response.json();
}

export async function updateDeal(id: number, deal: Partial<Deal>): Promise<Deal> {
  const response = await fetch(`${API_BASE_URL}/deals/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(deal),
  });
  return response.json();
}

export async function deleteDeal(id: number): Promise<void> {
  await fetch(`${API_BASE_URL}/deals/${id}`, { 
    method: 'DELETE',
    headers: getHeaders()
  });
}

// Tasks API
export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    headers: getHeaders()
  });
  return response.json();
}

export async function createTask(task: Omit<Task, 'id'>): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function updateTask(id: number, task: Partial<Task>): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function deleteTask(id: number): Promise<void> {
  await fetch(`${API_BASE_URL}/tasks/${id}`, { 
    method: 'DELETE',
    headers: getHeaders()
  });
}

// Users API (for assignment dropdowns)
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export async function getUsersList(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: getHeaders()
  });
  return response.json();
}

// User Management API (admin only)
export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: getHeaders()
  });
  return response.json();
}

export async function createUser(user: { email: string; name: string; role: string; password: string }): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(user),
  });
  return response.json();
}

export async function updateUser(id: number, user: { email?: string; name?: string; role?: string; password?: string }): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(user),
  });
  return response.json();
}

export async function deleteUser(id: number): Promise<void> {
  await fetch(`${API_BASE_URL}/users/${id}`, { 
    method: 'DELETE',
    headers: getHeaders()
  });
}