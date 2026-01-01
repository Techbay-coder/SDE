import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Search,
  Download,
  UserCheck,
  UserX,
  Edit,
} from "lucide-react";
import Table from "../components/essentials/table";
import type { User, UserRole } from "../types";
import toast from "react-hot-toast";
import { formatDate, getRoleDisplayName, searchItems } from "../utils/helpers";

import UserForm from "../components/users/userForm";
import ConfirmDialog from "../components/essentials/confirmDiaolog";
import Modal from "../components/essentials/Modal";
import { exportUsers } from "../utils/export";


  const mockUsers: User[] = [
  {id: "1",
  email: "adeboye@gmail.com",
  name: "adeboye",
  fullName: "adeboye alli ",
  role: "ADMIN",
  // roleType?: "ADMIN",
  isActive: true,
  createdAt: new Date().toISOString(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdOn: "2023-10-01T10:00:00Z",
    dateLastUpdated: "2023-10-10T12:00:00Z",   

  },
  {id: "2",
  email: "adebinpe@gmail.com",
  name: "adebinpe",
  fullName: "adebinpe alli ",
  role: "ADMIN",
  // roleType?: "ADMIN",
  isActive: true,
  createdAt: new Date().toISOString(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdOn: "2023-10-01T10:00:00Z",
    dateLastUpdated: "2023-10-10T12:00:00Z",   

  },

  {id: "3",
  email: "adebinpe@gmail.com",
  name: "adebinpe",
  fullName: "adebinpe alli ",
  role: "ADMIN",
   roleType: "ADMIN",
  isActive: true,
  createdAt: new Date().toISOString(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdOn: "2023-10-01T10:00:00Z",
    dateLastUpdated: "2023-10-10T12:00:00Z",   

  },
];

//   import React, { useState, useEffect } from "react";
// import {
//   Plus,
//   Search,
//   Download,
//   Edit,
//   UserCheck,
//   UserX,
// } from "lucide-react";
//import Table from "../components/common/Table";
//import Modal from "../components/essential/modal";
//import ConfirmDialog from "../components/common/ConfirmDialog";
//import UserForm from "../components/users/UserForm";
//import { exportUsers } from "../utils/export";
//import { formatDate, getRoleDisplayName, searchItems } from "../utils/helpers";
//import { createUsers, getUsers, updateUsers } from "../services";
//import toast from "react-hot-toast";

const UserManagement: React.FC = () => {
  const udStr = sessionStorage.getItem("ud");
  const user = udStr ? JSON.parse(udStr) : null;
  const [users, setUsers] = useState<User[]>([]);
 // const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "ACTIVE" | "INACTIVE"
  >("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [userToToggle, setUserToToggle] = useState<User | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: "createdAt",
    direction: "desc",
  });

  const itemsPerPage = 10;

  const fetchUsers = () => {
    setLoading(true);
    setUsers(mockUsers);
    setLoading(false);
    // getUsers().then((res) => {
    //   setLoading(false);
    //   setUsers(res);
    // });
  };



  useEffect(() => {
    //fetchUsers();
    //fetchUsers();
  }, []);
    //console.log(users,"USERS")
  // Filter and search users
    const filteredUsers = useMemo (()=>{
    let filtered = [...users];

    // Apply role filter
    if (roleFilter !== "ALL") {
      filtered = filtered.filter((user) => user.roleType === roleFilter);
    }

    // Apply status filter
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((user) =>
        statusFilter === "ACTIVE" ? user.isActive : !user.isActive
      );
    }

    // Apply search
    if (searchTerm) {
      filtered = searchItems(filtered, searchTerm, [
        "fullName",
        "email",
        "role",
      ]);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof User];
      const bValue = b[sortConfig.key as keyof User];

      if (sortConfig.direction === "asc") {
        return (aValue || "") > (bValue || "") ? 1 : -1;
      } else {
        return (aValue || "") < (bValue || "") ? 1 : -1;
      }
    });

    // setFilteredUsers(filtered);
    // setCurrentPage(1);
    return filtered
  }, [users, searchTerm, roleFilter, statusFilter, sortConfig]);

  const handleSort = (key: string, direction: "asc" | "desc") => {
    setSortConfig({ key, direction });
  };

  const handleAddUser = () => {
    setIsLoading(false);
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setIsLoading(false);
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (user: User) => {
    setUserToToggle(user);
    setIsConfirmDialogOpen(true);
  };

  const confirmToggleStatus = async () => {
    if (userToToggle) {
     const payload = {
        fullName: userToToggle.fullName,
        email: userToToggle.email,
        isActive: userToToggle.isActive ? false : true,
        roleType: userToToggle.roleType,
        updatedBy: user.email,
      };
      await updateUsers().then((res) => {
        if(res.success) {
          setIsModalOpen(false);
          setIsLoading(false);
          toast.success(res.message);
          fetchUsers();
        } else {
          toast.error(res.message)
        }
        setIsLoading(false);
      })
    }
    setIsConfirmDialogOpen(false);
    setUserToToggle(null);
  };

  const handleSaveUser = async (
    userData: Omit<User, "id" | "createdAt" | "updatedAt">
  ) => {
    if (editingUser) {
      setIsLoading(true);
      const payload = {
        fullName: userData.name,
        email: userData.email,
        isActive: userData.isActive,
        roleType: userData.role,
        updatedBy: user.email,
      };

      await updateUsers(payload).then((res) => {
        if(res.success) {
          setIsModalOpen(false);
          setIsLoading(false);
          toast.success(res.message);
          fetchUsers();
        } else {
          toast.error(res.message)
        }
        setIsLoading(false);
      })

    } else {
      setIsLoading(true);
      const payload = {
        fullName: userData.name,
        email: userData.email,
        isInternal: true,
        roleType: userData.role,
        createdBy: user.email,
      };

      await createUsers(payload).then((res) => {
        if(res.success) {
          setIsModalOpen(false);
          setIsLoading(false);
          fetchUsers();
          toast.success(res.message)
        } else {
          toast.error(res.message)
        }
        setIsLoading(false);
      })

    }

  };

  const handleExport = (format: "excel" | "pdf") => {
    exportUsers(filteredUsers, format);
  };

  const columns = [
    {
      key: "fullName",
      header: "Name",
      sortable: true,
       render: (user: User) => (
        <span className="capitalize">
          {user.fullName}
        </span>
      ),
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
    },
    {
      key: "roleType",
      header: "Role",
      render: (user: User) => (
        <span className="status-badge bg-primary-100 text-primary-800">
          {getRoleDisplayName(user?.roleType as UserRole)}
        </span>
      ),
      sortable: true,
    },
    {
      key: "isActive",
      header: "Status",
      render: (user: User) => (
        <span
          className={`status-badge ${
            user.isActive ? "status-active" : "status-inactive"
          }`}
        >
          {user.isActive ? "Active" : "Inactive"}
        </span>
      )
    },
    {
      key: "createdOn",
      header: "Created At",
      render: (user: User) => formatDate(user.createdOn || ""),
      sortable: true,
    },
    {
      key: "actions",
      header: "Actions",
      render: (user: User) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEditUser(user)}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Edit user"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleToggleStatus(user)}
            className={`p-1 ${
              user.isActive
                ? "text-red-600 hover:text-red-800"
                : "text-green-600 hover:text-green-800"
            }`}
            title={user.isActive ? "Deactivate user" : "Activate user"}
          >
            {user.isActive ? (
              <UserX className="w-4 h-4" />
            ) : (
              <UserCheck className="w-4 h-4" />
            )}
          </button>
          {/* <button
            onClick={() => handleDeleteUser(user.id)}
            className="p-1 text-red-600 hover:text-red-800"
            title="Delete user"
          >
            <Trash2 className="w-4 h-4" />
          </button> */}
        </div>
      ),
    },
  ];

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log(user,"user here")

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
       {/* {user.role ==="AUDITOR" &&  <button */}
       <button
          onClick={handleAddUser}

          className="btn-primary flex items-center space-x-2 w-auto px-2 text-[#f9f8f8] rounded-md bg-[#8A226F] hover:bg-[#741e53]"
        >
         <Plus className="w-4 h-4 " />
          <span>Add User</span>
          </button> 
          {/* </button> } */}
      </div>

      {/* Filters and Search */}
      <div className="card p-6">
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value as UserRole | "ALL")
              }
              className="input-field"
            >
              {/* <option value="ALL">All Roles</option>
              <option value="RM">Relationship Manager</option>
              <option value="TRADE_TEAM">Trade Team</option>
              <option value="TREASURY">Treasury</option> */}
              <option value="ADMIN"> Admin</option>
              <option value="AUDITOR">Auditor</option>
              <option value="officer"> Officer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "ALL" | "ACTIVE" | "INACTIVE")
              }
              className="input-field"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export
            </label>
            <div className="flex space-x-6 bg-[#8A226F ]">
              <button
                onClick={() => handleExport("excel")}
              className="btn-secondary flex items-center space-x-1 text-sm  rounded-md bg-[#8A226F] text-white w-auto px-2"
              >
                <Download className="w-4 h-4" />
                <span>Excel</span>
              </button>
              <button
                onClick={() => handleExport("pdf")}
                className="btn-secondary flex items-center space-x-1 text-sm rounded-md bg-[#8A226F] text-white w-auto px-2"
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <Table
        data={paginatedUsers}
        columns={columns}
        loading={loading}
        emptyMessage="No users found"
        pagination={{
          currentPage,
          totalPages,
          totalItems: filteredUsers.length,
          itemsPerPage,
          onPageChange: setCurrentPage,
        }}
        onSort={handleSort}
        sortConfig={sortConfig}
      />

      {/* User Form Modal */}
      { <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? "Edit User" : "Add New User"}
        size="md"
      >
        <UserForm
          user={editingUser}
          onSave={handleSaveUser}
          onCancel={() => setIsModalOpen(false)}
          isLoading={isLoading}
        />
      </Modal> }

      {/* Confirmation Dialog */}
      { <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={confirmToggleStatus}
        title={`${userToToggle?.isActive ? "Deactivate" : "Activate"} User`}
        message={`Are you sure you want to ${
          userToToggle?.isActive ? "deactivate" : "activate"
        } ${userToToggle?.fullName}? This will ${
          userToToggle?.isActive
            ? "prevent them from accessing"
            : "allow them to access"
        } the system.`}
        type={userToToggle?.isActive ? "warning" : "success"}
        confirmText={userToToggle?.isActive ? "Deactivate" : "Activate"}
      /> }
    </div>
  );
};

export default UserManagement;
