// Users API Route - Using controller pattern
import { listUsers, listUsersForDropdown, addUser, modifyUser, removeUser } from '../../controllers/user.controller';

// GET /api/users - List all users
// GET /api/users/list - List users for dropdown
export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  
  // Check if this is for dropdown (lightweight)
  const isDropdown = url.pathname.includes('/list');
  
  const users = isDropdown 
    ? await listUsersForDropdown() 
    : await listUsers();
  
  return Response.json(users);
}

// POST /api/users - Create user
// PUT /api/users/:id - Update user
// DELETE /api/users/:id - Delete user
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
  
  if (method === 'POST') {
    // Create new user
    const user = await addUser(data);
    return Response.json(user, { status: 201 });
  }
  
  if (method === 'PUT' && idNum) {
    // Update user
    const user = await modifyUser(idNum, data);
    return Response.json(user);
  }
  
  if (method === 'DELETE' && idNum) {
    // Delete user
    await removeUser(idNum);
    return Response.json({ success: true });
  }
  
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}