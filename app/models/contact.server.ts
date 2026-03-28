// Contact Model - Database operations for contacts
import { query } from '../lib/db.server';

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

// Get all contacts (with optional user filtering)
export async function getAllContacts(userId?: number, userRole?: string): Promise<Contact[]> {
  let filter = '';
  if (userId && userRole !== 'admin') {
    filter = `WHERE assigned_to = $1 OR created_by = $1`;
  }
  
  const result = await query(
    filter ? `${filter} ORDER BY created_at DESC` : 'SELECT * FROM contacts ORDER BY created_at DESC',
    filter ? [userId] : []
  );
  
  return result.rows;
}

// Get single contact by ID
export async function getContactById(id: number): Promise<Contact | null> {
  const result = await query('SELECT * FROM contacts WHERE id = $1', [id]);
  return result.rows[0] || null;
}

// Create new contact
export async function createContact(contact: Omit<Contact, 'id'>, userId?: number): Promise<Contact> {
  const { name, email, phone, company, status, assigned_to } = contact;
  const result = await query(
    `INSERT INTO contacts (name, email, phone, company, status, assigned_to, created_by) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [name, email, phone, company, status || 'active', assigned_to, userId]
  );
  return result.rows[0];
}

// Update contact
export async function updateContact(id: number, contact: Partial<Contact>): Promise<Contact> {
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (contact.name !== undefined) { fields.push(`name = $${paramIndex++}`); values.push(contact.name); }
  if (contact.email !== undefined) { fields.push(`email = $${paramIndex++}`); values.push(contact.email); }
  if (contact.phone !== undefined) { fields.push(`phone = $${paramIndex++}`); values.push(contact.phone); }
  if (contact.company !== undefined) { fields.push(`company = $${paramIndex++}`); values.push(contact.company); }
  if (contact.status !== undefined) { fields.push(`status = $${paramIndex++}`); values.push(contact.status); }
  if (contact.assigned_to !== undefined) { fields.push(`assigned_to = $${paramIndex++}`); values.push(contact.assigned_to); }

  fields.push('updated_at = NOW()');
  values.push(id);

  const result = await query(
    `UPDATE contacts SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  );
  return result.rows[0];
}

// Delete contact
export async function deleteContact(id: number): Promise<void> {
  await query('DELETE FROM contacts WHERE id = $1', [id]);
}

// Get contacts count
export async function getContactsCount(): Promise<number> {
  const result = await query('SELECT COUNT(*) as count FROM contacts');
  return parseInt(result.rows[0].count);
}