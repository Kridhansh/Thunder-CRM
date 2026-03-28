// Dashboard Stats Component
interface DashboardStatsProps {
  stats: {
    contacts: number;
    deals: number;
    pendingTasks: number;
    totalRevenue: number;
  };
  loading?: boolean;
}

export function DashboardStats({ stats, loading }: DashboardStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-md animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    { label: 'Total Contacts', value: stats.contacts, icon: '👥', color: 'bg-blue-50' },
    { label: 'Active Deals', value: stats.deals, icon: '💼', color: 'bg-green-50' },
    { label: 'Pending Tasks', value: stats.pendingTasks, icon: '📋', color: 'bg-yellow-50' },
    { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: '💰', color: 'bg-purple-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div key={index} className={`${stat.color} rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow`}>
          <div className="text-3xl mb-2">{stat.icon}</div>
          <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;