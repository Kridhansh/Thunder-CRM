// User Controller - Business logic for users
import { 
  getAllUsers, 
  getUsersForDropdown,
  getUserById, 
  getUserByEmail,
  createUser, 
  updateUser, 
  deleteUser,
  verifyPassword,
  type User 
} from '../models/user.server';

// Get all users (for management)
export async function listUsers(): Promise<User[]> {
  return getAllUsers();
}

// Get users for dropdown (lightweight)
export async function listUsersForDropdown(): Promise<User[]> {
  return getUsersForDropdown();
}

// Get single user
export async function getUser(id: number): Promise<User | null> {
  return getUserById(id);
}

// Get user by email (for login)
export async function getUserByEmailAddress(email: string): Promise<User | null> {
  return getUserByEmail(email);
}

// Create user
export async function addUser(user: Omit<User, 'id'>): Promise<User> {
  return createUser(user);
}

// Update user
export async function modifyUser(id: number, user: Partial<User>): Promise<User> {
  return updateUser(id, user);
}

// Delete user
export async function removeUser(id: number): Promise<void> {
  return deleteUser(id);
}

// Authenticate user
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email);
  if (!user || !user.password) return null;
  
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return null;
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}