// Contacts API Route - Using controller pattern
import { listContacts, addContact, modifyContact, removeContact } from '../../controllers/contact.controller';

// GET /api/contacts - List all contacts
export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  const userRole = url.searchParams.get('userRole');
  
  const contacts = await listContacts(
    userId ? parseInt(userId) : undefined,
    userRole || undefined
  );
  
  return Response.json(contacts);
}

// POST /api/contacts - Create contact
// PUT /api/contacts/:id - Update contact
// DELETE /api/contacts/:id - Delete contact
export async function action({ request }: { request: Request }) {
  const method = request.method;
  const url = new URL(request.url);
  
  // Extract ID from path if present
  const pathParts = url.pathname.split('/').filter(Boolean);
  const id = pathParts[pathParts.length - 1];
  const idNum = id && !isNaN(parseInt(id)) ? parseInt(id) : null;
  
  // Parse request body
  const contentType = request.headers.get('content-type') || '';
  let data: any;
  
  if (contentType.includes('application/json')) {
    data = await request.json();
  } else {
    const formData = await request.formData();
    data = Object.fromEntries(formData);
  }
  
  // Get userId from query params
  const userId = url.searchParams.get('userId');
  
  if (method === 'POST') {
    // Create new contact
    const contact = await addContact(data, userId ? parseInt(userId) : undefined);
    return Response.json(contact, { status: 201 });
  }
  
  if (method === 'PUT' && idNum) {
    // Update contact
    const contact = await modifyContact(idNum, data);
    return Response.json(contact);
  }
  
  if (method === 'DELETE' && idNum) {
    // Delete contact
    await removeContact(idNum);
    return Response.json({ success: true });
  }
  
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}