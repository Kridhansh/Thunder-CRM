// User Model - Database operations for users
import { query } from '../lib/db.server';
import bcrypt from 'bcryptjs';

export interface User {
  id?: number;
  email: string;
  name: string;
  role: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

// Get all users
export async function getAllUsers(): Promise<User[]> {
  const result = await query('SELECT id, name, email, role FROM users ORDER BY name');
  return result.rows;
}

// Get users for dropdown (without password)
export async function getUsersForDropdown(): Promise<User[]> {
  const result = await query('SELECT id, name, email, role FROM users ORDER BY name');
  return result.rows;
}

// Get single user by ID
export async function getUserById(id: number): Promise<User | null> {
  const result = await query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
}

// Get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
}

// Create new user
export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  const { email, name, role, password } = user;
  const hashedPassword = await bcrypt.hash(password || 'password123', 10);
  const result = await query(
    'INSERT INTO users (email, name, role, password) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role',
    [email, name, role || 'user', hashedPassword]
  );
  return result.rows[0];
}

// Update user
export async function updateUser(id: number, user: Partial<User>): Promise<User> {
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (user.email !== undefined) { fields.push(`email = $${paramIndex++}`); values.push(user.email); }
  if (user.name !== undefined) { fields.push(`name = $${paramIndex++}`); values.push(user.name); }
  if (user.role !== undefined) { fields.push(`role = $${paramIndex++}`); values.push(user.role); }
  if (user.password !== undefined) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    fields.push(`password = $${paramIndex++}`);
    values.push(hashedPassword);
  }

  fields.push('updated_at = NOW()');
  values.push(id);

  const result = await query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING id, email, name, role`,
    values
  );
  return result.rows[0];
}

// Delete user
export async function deleteUser(id: number): Promise<void> {
  await query('DELETE FROM users WHERE id = $1', [id]);
}

// Verify password
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}