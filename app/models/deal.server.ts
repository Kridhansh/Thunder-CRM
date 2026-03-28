// Deal Model - Database operations for deals
import { query } from '../lib/db.server';

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

// Get all deals (with optional user filtering)
export async function getAllDeals(userId?: number, userRole?: string): Promise<Deal[]> {
  let filter = '';
  if (userId && userRole !== 'admin') {
    filter = `WHERE assigned_to = $1 OR created_by = $1`;
  }
  
  const result = await query(
    filter ? `${filter} ORDER BY created_at DESC` : 'SELECT * FROM deals ORDER BY created_at DESC',
    filter ? [userId] : []
  );
  
  return result.rows;
}

// Get single deal by ID
export async function getDealById(id: number): Promise<Deal | null> {
  const result = await query('SELECT * FROM deals WHERE id = $1', [id]);
  return result.rows[0] || null;
}

// Create new deal
export async function createDeal(deal: Omit<Deal, 'id'>, userId?: number): Promise<Deal> {
  const { title, value, contact_id, assigned_to, stage, probability } = deal;
  const result = await query(
    `INSERT INTO deals (title, value, contact_id, assigned_to, stage, probability, created_by) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [title, value, contact_id, assigned_to, stage || 'new', probability || 0, userId]
  );
  return result.rows[0];
}

// Update deal
export async function updateDeal(id: number, deal: Partial<Deal>): Promise<Deal> {
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (deal.title !== undefined) { fields.push(`title = $${paramIndex++}`); values.push(deal.title); }
  if (deal.value !== undefined) { fields.push(`value = $${paramIndex++}`); values.push(deal.value); }
  if (deal.contact_id !== undefined) { fields.push(`contact_id = $${paramIndex++}`); values.push(deal.contact_id); }
  if (deal.assigned_to !== undefined) { fields.push(`assigned_to = $${paramIndex++}`); values.push(deal.assigned_to); }
  if (deal.stage !== undefined) { fields.push(`stage = $${paramIndex++}`); values.push(deal.stage); }
  if (deal.probability !== undefined) { fields.push(`probability = $${paramIndex++}`); values.push(deal.probability); }

  fields.push('updated_at = NOW()');
  values.push(id);

  const result = await query(
    `UPDATE deals SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  );
  return result.rows[0];
}

// Delete deal
export async function deleteDeal(id: number): Promise<void> {
  await query('DELETE FROM deals WHERE id = $1', [id]);
}

// Get deals count
export async function getDealsCount(): Promise<number> {
  const result = await query('SELECT COUNT(*) as count FROM deals');
  return parseInt(result.rows[0].count);
}

// Get total deal value (revenue)
export async function getTotalRevenue(): Promise<number> {
  const result = await query(
    "SELECT COALESCE(SUM(value), 0) as total FROM deals WHERE stage = 'won'"
  );
  return parseFloat(result.rows[0].total) || 0;
}