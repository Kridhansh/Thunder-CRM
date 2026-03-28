// Task Model - Database operations for tasks
import { query } from '../lib/db.server';

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

// Get all tasks (with optional user filtering)
export async function getAllTasks(userId?: number, userRole?: string): Promise<Task[]> {
  let filter = '';
  if (userId && userRole !== 'admin') {
    filter = `WHERE assigned_to = $1 OR created_by = $1`;
  }
  
  const result = await query(
    filter ? `${filter} ORDER BY due_date ASC` : 'SELECT * FROM tasks ORDER BY due_date ASC',
    filter ? [userId] : []
  );
  
  return result.rows;
}

// Get single task by ID
export async function getTaskById(id: number): Promise<Task | null> {
  const result = await query('SELECT * FROM tasks WHERE id = $1', [id]);
  return result.rows[0] || null;
}

// Create new task
export async function createTask(task: Omit<Task, 'id'>, userId?: number): Promise<Task> {
  const { title, description, contact_id, deal_id, assigned_to, due_date, priority, status } = task;
  const result = await query(
    `INSERT INTO tasks (title, description, contact_id, deal_id, assigned_to, due_date, priority, status, created_by) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [title, description, contact_id, deal_id, assigned_to, due_date, priority || 'medium', status || 'pending', userId]
  );
  return result.rows[0];
}

// Update task
export async function updateTask(id: number, task: Partial<Task>): Promise<Task> {
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (task.title !== undefined) { fields.push(`title = $${paramIndex++}`); values.push(task.title); }
  if (task.description !== undefined) { fields.push(`description = $${paramIndex++}`); values.push(task.description); }
  if (task.contact_id !== undefined) { fields.push(`contact_id = $${paramIndex++}`); values.push(task.contact_id); }
  if (task.deal_id !== undefined) { fields.push(`deal_id = $${paramIndex++}`); values.push(task.deal_id); }
  if (task.assigned_to !== undefined) { fields.push(`assigned_to = $${paramIndex++}`); values.push(task.assigned_to); }
  if (task.due_date !== undefined) { fields.push(`due_date = $${paramIndex++}`); values.push(task.due_date); }
  if (task.priority !== undefined) { fields.push(`priority = $${paramIndex++}`); values.push(task.priority); }
  if (task.status !== undefined) { fields.push(`status = $${paramIndex++}`); values.push(task.status); }

  fields.push('updated_at = NOW()');
  values.push(id);

  const result = await query(
    `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  );
  return result.rows[0];
}

// Delete task
export async function deleteTask(id: number): Promise<void> {
  await query('DELETE FROM tasks WHERE id = $1', [id]);
}

// Get pending tasks count
export async function getPendingTasksCount(): Promise<number> {
  const result = await query("SELECT COUNT(*) as count FROM tasks WHERE status = 'pending'");
  return parseInt(result.rows[0].count);
}