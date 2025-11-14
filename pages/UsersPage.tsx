import React, { useState } from 'react';
import { User } from '../types';
import { mockSystemUsers } from '../data/mockData';
import { PlusCircleIcon } from '../utils/icons';
import Modal from '../components/common/Modal';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockSystemUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = (user: Omit<User, 'avatarUrl'>) => {
    const newUser: User = {
      ...user,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${user.name.replace(' ', '+')}`,
    };
    setUsers([newUser, ...users]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">User Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-primary-DEFAULT text-white px-4 py-2 rounded-lg shadow hover:bg-primary-hover transition"
        >
          <PlusCircleIcon />
          <span className="ml-2">Add User</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b dark:border-slate-700">
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email} className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <td className="p-4">
                    <div className="flex items-center">
                      <img src={user.avatarUrl} alt={user.name} className="h-10 w-10 rounded-full mr-3" />
                      <span className="font-medium dark:text-gray-200">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'Admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Active</span>
                  </td>
                  <td className="p-4">
                     <button className="text-primary-DEFAULT hover:underline mr-4">Edit</button>
                    <button className="text-red-500 hover:underline">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddUser}
      />
    </div>
  );
};

const UserFormModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: (user: Omit<User, 'avatarUrl'>) => void; }> = ({ isOpen, onClose, onSave }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newUser = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            role: formData.get('role') as 'Admin' | 'Staff',
        };
        onSave(newUser);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New User">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <input type="text" name="name" id="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-DEFAULT focus:ring-primary-DEFAULT" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <input type="email" name="email" id="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-DEFAULT focus:ring-primary-DEFAULT" />
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                    <select name="role" id="role" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-DEFAULT focus:ring-primary-DEFAULT">
                        <option>Staff</option>
                        <option>Admin</option>
                    </select>
                </div>
                 <div className="flex justify-end pt-4 space-x-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-slate-600 rounded-md hover:bg-gray-300 dark:hover:bg-slate-500">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary-DEFAULT text-white rounded-md hover:bg-primary-hover">Add User</button>
                </div>
            </form>
        </Modal>
    );
};


export default UsersPage;