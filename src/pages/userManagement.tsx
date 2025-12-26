import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Download,
  Edit,
  UserCheck,
  UserX,
} from "lucide-react";
import Table from "../components/essentials/table";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<Array<any>>([]);
  const [search, setSearch] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Minimal columns structure for the table component
  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
    { key: "status", header: "Status" },
  ];

  // Simple filtering logic
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      !search ||
      (u.name && u.name.toLowerCase().includes(search.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(search.toLowerCase()));
    const matchesRole = !role || u.role === role;
    const matchesStatus = !status || u.status === status;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [filteredUsers.length, totalPages, currentPage]);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">
            Manage system users and their permissions
          </p>
        </div>
        <button
          onClick={() => {}}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input-field"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="auditor">auditor</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input-field"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Export
          </label>
          <div>
            <button
              onClick={() => {}}
              className="w-full btn-secondary flex items-center justify-center space-x-1 text-sm"
            >
              <Download className="w-5 h-5" />
              <span>Excel</span>
            </button>
            <button
              onClick={() => {}}
              className="w-full btn-secondary flex items-center justify-center space-x-1 text-sm mt-2"
            >
              <Download className="w-5 h-5" />
              <span>PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Table */}
      <Table
        data={paginatedUsers}
        columns={columns}
        loading={loading}
        emptyMessage="No users found."
        pagination={{
          currentPage,
          totalPages,
          totalItems: filteredUsers.length,
          itemsPerPage,
          onPageChange: handlePageChange,
        }}
      />
    </div>
  );
};