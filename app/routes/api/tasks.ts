// Tasks API Route - Using controller pattern
import { listTasks, addTask, modifyTask, removeTask } from '../../controllers/task.controller';

// GET /api/tasks - List all tasks
export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  const userRole = url.searchParams.get('userRole');
  
  const tasks = await listTasks(
    userId ? parseInt(userId) : undefined,
    userRole || undefined
  );
  
  return Response.json(tasks);
}

// POST /api/tasks - Create task
// PUT /api/tasks/:id - Update task
// DELETE /api/tasks/:id - Delete task
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
    // Create new task
    const task = await addTask(data, userId ? parseInt(userId) : undefined);
    return Response.json(task, { status: 201 });
  }
  
  if (method === 'PUT' && idNum) {
    // Update task
    const task = await modifyTask(idNum, data);
    return Response.json(task);
  }
  
  if (method === 'DELETE' && idNum) {
    // Delete task
    await removeTask(idNum);
    return Response.json({ success: true });
  }
  
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}