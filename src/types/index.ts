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
export interface User {
  id: string;
  email: string;
  name: string;
  fullName?: string;
  //role: UserRole;
  //roleType?: UserRole;
  isActive: boolean;
  createdAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdOn?: string | any;
  dateLastUpdated?: string 

};
interface DocumentUpload {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  url: string;
};
export interface AuditLog {
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
