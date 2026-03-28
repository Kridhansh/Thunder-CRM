// Dashboard API Route - Using controller pattern
import { getDashboardStats } from '../../controllers/dashboard.controller';

// GET /api/dashboard - Get dashboard statistics
export async function loader({ request }: { request: Request }) {
  const stats = await getDashboardStats();
  return Response.json(stats);
}