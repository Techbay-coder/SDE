import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import type { User, UserRole } from '../../types';

interface UserFormProps {
  user?: User | null;
  isLoading: boolean;
  onSave: (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  role: Yup.string()
    .oneOf(['RM', 'AUDITOR'], 'ADMIN')
    .required('Role is required'),
  isActive: Yup.boolean().required(),
});

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel, isLoading }) => {

  console.log(user);
  const formik = useFormik({
    initialValues: {
      name: user?.fullName || '',
      email: user?.email || '',
       role: user?.roleType || '' as UserRole,
       isActive: user?.isActive ?? true,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
      onSave(values);
    },
  });

  const roleOptions = [
    // { value: 'RM', label: 'Relationship Manager' },
    // { value: 'TRADE_TEAM', label: 'Trade Team' },
    // { value: 'TREASURY', label: 'Treasury Team' },
    { value: 'admin', label: ' Admin' },
    { value: 'AUDITOR', label: 'Auditor' },
    {value: " officer ", label:"Officer"}
  ];

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          id="name"
          type="text"
          {...formik.getFieldProps('name')}
          className={`input-field ${
            formik.touched.name && formik.errors.name
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : ''
          }`}
          placeholder="Enter full name"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
          className={`input-field ${
            formik.touched.email && formik.errors.email
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : ''
          }`}
          placeholder="Enter email address"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
        )}
      </div>

      {/* Role Field */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
          Role *
        </label>
        <select
          id="role"
          {...formik.getFieldProps('role')}
          className={`input-field ${
            formik.touched.role && formik.errors.role
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : ''
          }`}
        >
          {roleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {formik.touched.role && formik.errors.role && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.role}</p>
        )}
      </div>

      {/* Status Field */}
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="isActive"
              value="true"
              checked={formik.values.isActive === true}
              onChange={() => formik.setFieldValue('isActive', true)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Active</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="isActive"
              value="false"
              checked={formik.values.isActive === false}
              onChange={() => formik.setFieldValue('isActive', false)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Inactive</span>
          </label>
        </div>
      </div> */}

      {/* Role Description */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Role Permissions:</h4>
        <div className="text-sm text-gray-600">
          {/* {formik.values.role === 'RM' && (
            <ul className="list-disc list-inside space-y-1">
              <li>Create and submit bid requests</li>
              <li>View own requests and their status</li>
              <li>Edit draft requests</li>
            </ul>
          )} */}
          {/* {formik.values.role === 'TRADE_TEAM' && (
            <ul className="list-disc list-inside space-y-1">
              <li>Review submitted bid requests</li>
              <li>Approve or reject requests</li>
              <li>Add transaction references</li>
            </ul>
          )} */}
          {/* {formik.values.role === 'TREASURY' && (
            <ul className="list-disc list-inside space-y-1">
              <li>Review trade-approved requests</li>
              <li>Upload Excel files for finalization</li>
              <li>Mark requests as successful/unsuccessful</li>
            </ul>
          )} */}
          {formik.values.role === 'admin' && (
            <ul className="list-disc list-inside space-y-1">
              <li>Manage all system users</li>
              <li>View all bid requests</li>
              <li>Export reports and data</li>
            </ul>
          )}
          {formik.values.role === 'AUDITOR' && (
            <ul className="list-disc list-inside space-y-1">
              <li>View audit logs and user activities</li>
              <li>Monitor system usage</li>
              <li>Export audit reports</li>
            </ul>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          // disabled={!formik.isValid || formik.isSubmitting}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-auto px-2 rounded-lg bg-[#8A226F] text-[#f6f1f5]"
        >
          <div className='flex'>
            
            {isLoading && (
          <div className="w-5 h-5 border-2 bg-[#8A226F] border-t-transparent rounded-full animate-spin" />
            )}
          {user ? 'Update User' : 'Create User'}
          </div>
        </button>
      </div>
    </form>
  );
};

export default UserForm;
