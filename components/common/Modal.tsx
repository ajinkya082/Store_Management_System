import React from 'react';
import { CloseIcon } from '../../utils/icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center animate-fadeIn"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 w-full max-w-md m-4 relative animate-scaleIn border border-slate-200 dark:border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
