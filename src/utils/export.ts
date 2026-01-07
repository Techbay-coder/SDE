/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type {  User, AuditLog } from '../types';

export const exportToExcel = (data: any[], filename: string, sheetName: string = 'Sheet1') => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const exportToPDF = (data: any[], columns: string[], title: string, filename: string) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text(title, 14, 20);
  
  // Add timestamp
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
  
  // Create table
  autoTable(doc, {
    head: [columns],
    body: data.map(item => columns.map(col => {
      const value = getNestedValue(item, col);
      return value !== null && value !== undefined ? String(value) : '';
    })),
    startY: 40,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [147, 51, 234], // Purple theme
      textColor: 255,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });
  
  doc.save(`${filename}.pdf`);
};

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// export const exportBidRequests = (requests: BidRequest[], format: 'excel' | 'pdf') => {
//   const data = requests.map(request => ({
//     id: request.id,
//     accountNumber: request.accountInfo.accountNumber,
//     accountName: request.accountInfo.accountName,
//     formMRefId: request.formMInfo.refId,
//     applicantName: request.formMInfo.applicantName,
//     currency: request.formMInfo.currency,
//     totalCFValue: request.formMInfo.totalCFValue,
//     amount: request.rateInfo.amount,
//     rate: request.rateInfo.rate,
//     // status: request.status,
//     createdAt: new Date(request.createdAt).toLocaleDateString(),
//     tradeReference: request.tradeTeamReview?.transactionReference || '',
//     tradeStatus: request.tradeTeamReview?.status || '',
//     isFinalized: request.treasuryReview ? 'Yes' : 'No',
//     isSuccessful: request.treasuryReview?.isSuccessful ? 'Yes' : 'No',
//   }));

//   if (format === 'excel') {
//     exportToExcel(data, 'bid-requests', 'Bid Requests');
//   } else {
//     const columns = [
//       'ID', 'Account Number', 'Account Name', 'Form M Ref ID', 'Applicant Name',
//       'Currency', 'Total C&F Value', 'Amount', 'Rate', 'Status', 'Created At',
//       'Trade Reference', 'Trade Status', 'Finalized', 'Successful'
//     ];
//     exportToPDF(data, columns, 'Bid Requests Report', 'bid-requests');
//   }
// };

export const exportUsers = (users: User[], format: 'excel' | 'pdf') => {
  const data = users.map(user => ({
    fullName: user.fullName,
    email: user.email,
    role: user.roleType,
    status: user.isActive ? 'Active' : 'Inactive',
    createdAt: new Date(user.createdOn).toLocaleDateString() || "",
    updatedAt: user.dateLastUpdated ? new Date(user.dateLastUpdated as string | number | Date).toLocaleDateString() : "",
    updatedBy: user.updatedBy ||  "",
  }));

  if (format === 'excel') {
    exportToExcel(data, 'sde Users report', 'sde Users report');
  } else {
    const columns = ['fullName', 'email', 'role', 'status', 'createdAt', 'updatedAt', 'updatedBy'];
    exportToPDF(data, columns, 'Bid Confirmation Users Report', 'Bid Confirmation Users Report');
  }
};

export const exportAuditLogs = (logs: AuditLog[], format: 'excel' | 'pdf') => {
  const data = logs.map(log => ({
    id: log.id,
    userName: log.userName,
    actionType: log.actionType,
    requestUrl: log.requestURL,
    statusCode: log.statusCode,
    ipAddress: log.ipAddress,
    timestamp: new Date(log.timestamp).toLocaleString(),
  }));

  if (format === 'excel') {
    exportToExcel(data, 'audit-logs', 'Audit Logs');
  } else {
    const columns = ['userName', 'actionType', 'requestUrl', 'statusCode', 'ipAddress', 'timestamp'];
    exportToPDF(data, columns, 'Audit Logs Report', 'audit-logs');
  }
};

export const readExcelFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};
