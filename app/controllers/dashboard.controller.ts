// Dashboard Controller - Business logic for dashboard stats
import { getContactsStats } from '../controllers/contact.controller';
import { getDealsStats, getRevenueStats } from '../controllers/deal.controller';
import { getPendingTasksStats } from '../controllers/task.controller';

export interface DashboardStats {
  contacts: number;
  deals: number;
  pendingTasks: number;
  totalRevenue: number;
}

// Get all dashboard stats
export async function getDashboardStats(): Promise<DashboardStats> {
  const [contacts, deals, pendingTasks, totalRevenue] = await Promise.all([
    getContactsStats(),
    getDealsStats(),
    getPendingTasksStats(),
    getRevenueStats()
  ]);

  return {
    contacts,
    deals,
    pendingTasks,
    totalRevenue
  };
}