import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import Modal from './Modal';


interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: 'danger' | 'warning' | 'success' | 'info';
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'warning',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false,
}) => {
  const typeConfig = {
    danger: {
      icon: XCircle,
      iconColor: 'text-red-600',
      buttonColor: 'bg-red-600 hover:bg-red-700',
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
    },
    success: {
      icon: CheckCircle,
      iconColor: 'text-green-600',
      buttonColor: 'bg-green-600 hover:bg-green-700',
    },
    info: {
      icon: Info,
      iconColor: 'text-blue-600',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
          <Icon className={`w-6 h-6 ${config.iconColor}`} />
        </div>
        
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex items-center justify-center space-x-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`${config.buttonColor} text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2`}
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
