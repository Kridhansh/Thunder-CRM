// Deal Controller - Business logic for deals
import { 
  getAllDeals, 
  getDealById, 
  createDeal, 
  updateDeal, 
  deleteDeal,
  getDealsCount,
  getTotalRevenue,
  type Deal 
} from '../models/deal.server';

// Get all deals
export async function listDeals(userId?: number, userRole?: string): Promise<Deal[]> {
  return getAllDeals(userId, userRole);
}

// Get single deal
export async function getDeal(id: number): Promise<Deal | null> {
  return getDealById(id);
}

// Create deal
export async function addDeal(deal: Omit<Deal, 'id'>, userId?: number): Promise<Deal> {
  return createDeal(deal, userId);
}

// Update deal
export async function modifyDeal(id: number, deal: Partial<Deal>): Promise<Deal> {
  return updateDeal(id, deal);
}

// Delete deal
export async function removeDeal(id: number): Promise<void> {
  return deleteDeal(id);
}

// Get dashboard stats - deals count
export async function getDealsStats(): Promise<number> {
  return getDealsCount();
}

// Get revenue stats
export async function getRevenueStats(): Promise<number> {
  return getTotalRevenue();
}