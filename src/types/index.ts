export default interface loginValues {
    email: string;
    password: string;
};
 
export default interface paginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    
};
export  interface User {
  id: string;
  email: string;
  name: string;
  fullName?: string;
  role: UserRole;
  roleType?: UserRole;
  isActive: boolean;
  createdAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdOn?: string | any;
  dateLastUpdated?: string ;
  updatedBy?:string;

};
export interface DocumentUpload {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  url: string;
};
export  interface AuditLog {
    id: string;
    userId: string;
    userName: string;
    action: string;
    user: string;
    timestamp: string;
    details?: string;
    ipAddress?: string;
    resource?: string;
    actionType?: string;
    requestURL?: string;
    statusCode?: number;
}

export type UserRole = 'OFFICER' | "ADMIN" | 'AUDITOR';
 
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: PaginationInfo;
}

export interface LoginCredentials {
  email: string;
  password: string;
  otp: string;
  
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
// export const getFileSize = (bytes: number): string => {
//   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//   if (bytes === 0) return '0 Bytes';
//   const i = Math.floor(Math.log(bytes) / Math.log(1024));
//   return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
// };
