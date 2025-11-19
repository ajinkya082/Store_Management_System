import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { PlusCircleIcon } from '../utils/icons';
import Modal from '../components/common/Modal';
import { API_URL } from '../utils/api';

interface UsersPageProps {
  user: User | null;
}

const UsersPage: React.FC<UsersPageProps> = ({ user: currentUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${currentUser?.token}` },
      });
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.token) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleAddUser = async (userData: Omit<User, '_id' | 'avatarUrl' | 'accessRole'> & { password?: string }) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser?.token}`,
        },
        body: JSON.stringify({ ...userData, accessRole: 'owner' }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add user');
      }
      setIsModalOpen(false);
      await fetchUsers();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (userId === currentUser?._id) {
        alert("You cannot delete your own account.");
        return;
    }
    if (window.confirm("Are you sure you want to remove this user?")) {
        try {
            const res = await fetch(`${API_URL}/users/${userId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${currentUser?.token}` },
            });
             if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to remove user');
            }
            await fetchUsers();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
  }

  return (
    <div className="animate-fadeInUp">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">User Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700 transition"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <span className="ml-2 text-sm font-medium">Add User</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50">
        <div className="overflow-x-auto">
          {loading ? <p className="text-center py-4">Loading users...</p> : (
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                {users.map((user) => (
                  <tr key={user.email} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={user.avatarUrl} alt={user.name} className="h-10 w-10 rounded-full mr-4" />
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{user.email}</td>
                    <td className="p-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.systemRole === 'Admin' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-gray-100 text-gray-800 dark:bg-slate-600 dark:text-slate-200'}`}>
                        {user.systemRole}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">Active</span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 mr-4">Edit</button>
                      <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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

const UserFormModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: (user: any) => void; }> = ({ isOpen, onClose, onSave }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newUser = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            systemRole: formData.get('role') as 'Admin' | 'Staff',
        };
        onSave(newUser);
        onClose();
        e.currentTarget.reset();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New User">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <input type="text" name="name" id="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <input type="email" name="email" id="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500" />
                </div>
                 <div>
                    <label htmlFor="password"className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <input type="password" name="password" id="password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500" />
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                    <select name="role" id="role" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500">
                        <option>Staff</option>
                        <option>Admin</option>
                    </select>
                </div>
                 <div className="flex justify-end pt-4 space-x-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Add User</button>
                </div>
            </form>
        </Modal>
    );
};


export default UsersPage;