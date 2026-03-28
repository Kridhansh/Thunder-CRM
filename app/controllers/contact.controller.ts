// Contact Controller - Business logic for contacts
import { 
  getAllContacts, 
  getContactById, 
  createContact, 
  updateContact, 
  deleteContact,
  getContactsCount,
  type Contact 
} from '../models/contact.server';

// Get all contacts
export async function listContacts(userId?: number, userRole?: string): Promise<Contact[]> {
  return getAllContacts(userId, userRole);
}

// Get single contact
export async function getContact(id: number): Promise<Contact | null> {
  return getContactById(id);
}

// Create contact
export async function addContact(contact: Omit<Contact, 'id'>, userId?: number): Promise<Contact> {
  return createContact(contact, userId);
}

// Update contact
export async function modifyContact(id: number, contact: Partial<Contact>): Promise<Contact> {
  return updateContact(id, contact);
}

// Delete contact
export async function removeContact(id: number): Promise<void> {
  return deleteContact(id);
}

// Get dashboard stats - contacts count
export async function getContactsStats(): Promise<number> {
  return getContactsCount();
}