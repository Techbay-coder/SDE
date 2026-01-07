import type {UserRole} from "../types"


export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
};
// export const getRoleDisplayName = (role: string): string => {
//   return role.replace(/_/g, ' ');
// };

export const filterByDateRange = <T extends { createdAt: string }>(
  items: T[],
  startDate?: string,
  endDate?: string
): T[] => {
  if (!startDate && !endDate) return items;
  
  return items.filter(item => {
    const itemDate = new Date(item.createdAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    if (start && itemDate < start) return false;
    if (end && itemDate > end) return false;
    return true;
  });
};
 export const searchItems = <T>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
): T[] => {
  if (!searchTerm.trim()) return items;
  
  const term = searchTerm.toLowerCase();
  return items.filter(item =>
    searchFields.some(field => {
      const value = item[field];
      return value && String(value).toLowerCase().includes(term);
    })
  );
};


export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
 
export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
export const getRoleDisplayName = (role: UserRole): string => {
  const roleNames: Record<UserRole, string> = {
    // RM: 'Relationship Manager',
    // TRADE_TEAM: 'Trade Team',
    // TREASURY: 'Treasury Team',
    OFFICER: "OFFICER",
    ADMIN: 'Admin',
    AUDITOR: 'Auditor',
  };
  return roleNames[role] || role;
};
export const getFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

export const sortByDate = <T extends { createdAt: string }>(
  items: T[],
  order: 'asc' | 'desc' = 'desc'
): T[] => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};
