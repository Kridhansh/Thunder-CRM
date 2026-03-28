// Auth Login API Route - Using controller pattern
import { authenticateUser } from '../../../controllers/user.controller';

// POST /api/auth/login - Authenticate user
export async function action({ request }: { request: Request }) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }
  
  // Parse request body
  const contentType = request.headers.get('content-type') || '';
  let data: any;
  
  if (contentType.includes('application/json')) {
    data = await request.json();
  } else {
    const formData = await request.formData();
    data = Object.fromEntries(formData);
  }
  
  const { email, password } = data;
  
  if (!email || !password) {
    return Response.json({ error: 'Email and password are required' }, { status: 400 });
  }
  
  try {
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    
    return Response.json(user);
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'An error occurred during login' }, { status: 500 });
  }
}