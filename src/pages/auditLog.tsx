import React, { useState, useEffect } from 'react';
import { Search, Download } from 'lucide-react';
import Table from '../components/essentials/table';
import type { AuditLog } from '../types';
import { exportAuditLogs } from '../utils/export';
import { formatDateTime, searchItems } from '../utils/helpers';
//import { getUserActivities } from '../services';

const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'timestamp',
    direction: 'desc',
  });

  const itemsPerPage = 20;

  const fetchUserActivities = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await getUserActivities(page);
      setLogs(response.activities || []);
      setTotalPages(response.totalPages || 1);
      setTotalItems(response.totalCount || 0);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserActivities(currentPage);
  }, [currentPage, sortConfig]);

  // Filter and search logs (client-side for current page)
  useEffect(() => {
    let filtered = [...logs];

    // Apply date range filter
    if (dateFrom || dateTo) {
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        const start = dateFrom ? new Date(dateFrom) : null;
        const end = dateTo ? new Date(dateTo + 'T23:59:59') : null;
        
        if (start && logDate < start) return false;
        if (end && logDate > end) return false;
        return true;
      });
    }

    // Apply search
    if (searchTerm) {
      filtered = searchItems(filtered, searchTerm, ['userName', 'ipAddress']);
    }

    setFilteredLogs(filtered);
  }, [logs, searchTerm, dateFrom, dateTo]);

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log(filteredLogs)

  const handleExport = (format: 'excel' | 'pdf') => {
    exportAuditLogs(filteredLogs, format);
  };


  const columns = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      render: (log: AuditLog) => (
        <div className="text-sm">
          {formatDateTime(log.timestamp)}
        </div>
      ),
      sortable: true,
    },
    {
      key: 'userName',
      header: 'User',
      render: (log: AuditLog) => (
        <div className="text-sm font-medium">
          {log.userName}
        </div>
      ),
      sortable: true,
    },
    {
      key: 'actionType',
      header: 'Action',
      sortable: true,
    },
    {
      key: 'requestUrl',
      header: 'Request URL',
      sortable: true,
    },
    {
      key: 'statusCode',
      header: 'Status Code',
      // render: (log: AuditLog) => (
      //   <div className="text-sm text-gray-600 max-w-xs truncate" title={log.statusCode}>
      //     {log.statusCode}
      //   </div>
      // ),
    },
    {
      key: 'ipAddress',
      header: 'IP Address',
      render: (log: AuditLog) => (
        <div className="text-sm font-mono text-gray-600">
          {log.ipAddress}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600">Monitor user activities</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Export</label>
            <div className="flex space-x-2">
              <button
                onClick={() => handleExport('excel')}
                className="btn-secondary flex items-center space-x-1 text-sm rounded-md bg-[#8A226F] text-white w-auto px-2"
              >
                <Download className="w-4 h-4" />
                <span>Excel</span>
              </button>
              <button
                onClick={() => handleExport('pdf')}
                className="btn-secondary flex items-center space-x-1 text-sm rounded-md bg-[#8A226F] text-white w-auto px-2"
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
     

      {/* Audit Logs Table */}
      <Table
        data={filteredLogs}
        columns={columns}
        loading={loading}
        emptyMessage="No audit logs found"
        pagination={{
          currentPage,
          totalPages,
          totalItems,
          itemsPerPage,
          onPageChange: handlePageChange,
        }}
        onSort={handleSort}
        sortConfig={sortConfig}
      />
    </div>
  );
};

export default AuditLogs;
   