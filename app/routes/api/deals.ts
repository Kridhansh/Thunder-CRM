// Deals API Route - Using controller pattern
import { listDeals, addDeal, modifyDeal, removeDeal } from '../../controllers/deal.controller';

// GET /api/deals - List all deals
export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  const userRole = url.searchParams.get('userRole');
  
  const deals = await listDeals(
    userId ? parseInt(userId) : undefined,
    userRole || undefined
  );
  
  return Response.json(deals);
}

// POST /api/deals - Create deal
// PUT /api/deals/:id - Update deal
// DELETE /api/deals/:id - Delete deal
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
    // Create new deal
    const deal = await addDeal(data, userId ? parseInt(userId) : undefined);
    return Response.json(deal, { status: 201 });
  }
  
  if (method === 'PUT' && idNum) {
    // Update deal
    const deal = await modifyDeal(idNum, data);
    return Response.json(deal);
  }
  
  if (method === 'DELETE' && idNum) {
    // Delete deal
    await removeDeal(idNum);
    return Response.json({ success: true });
  }
  
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}