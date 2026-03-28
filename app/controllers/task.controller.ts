// Task Controller - Business logic for tasks
import { 
  getAllTasks, 
  getTaskById, 
  createTask, 
  updateTask, 
  deleteTask,
  getPendingTasksCount,
  type Task 
} from '../models/task.server';

// Get all tasks
export async function listTasks(userId?: number, userRole?: string): Promise<Task[]> {
  return getAllTasks(userId, userRole);
}

// Get single task
export async function getTask(id: number): Promise<Task | null> {
  return getTaskById(id);
}

// Create task
export async function addTask(task: Omit<Task, 'id'>, userId?: number): Promise<Task> {
  return createTask(task, userId);
}

// Update task
export async function modifyTask(id: number, task: Partial<Task>): Promise<Task> {
  return updateTask(id, task);
}

// Delete task
export async function removeTask(id: number): Promise<void> {
  return deleteTask(id);
}

// Get dashboard stats - pending tasks count
export async function getPendingTasksStats(): Promise<number> {
  return getPendingTasksCount();
}