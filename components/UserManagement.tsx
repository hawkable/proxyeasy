import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { User, UserStatus } from '../types';
import { Search, Plus, MoreVertical, Trash2, Edit2, RotateCcw } from 'lucide-react';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load users from persistent DB on mount
  useEffect(() => {
    setUsers(db.users.getAll());
  }, []);

  const getStatusColor = (status: UserStatus) => {
    switch(status) {
      case UserStatus.ACTIVE: return 'bg-green-100 text-green-700';
      case UserStatus.DISABLED: return 'bg-slate-100 text-slate-600';
      case UserStatus.EXPIRED: return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getUsagePercentage = (used: number, total: number) => {
    const pct = (used / total) * 100;
    return Math.min(pct, 100);
  };

  const getUsageColor = (pct: number) => {
    if (pct > 90) return 'bg-red-500';
    if (pct > 70) return 'bg-orange-500';
    return 'bg-blue-500';
  };

  const handleDelete = (id: string) => {
    if(confirm('Are you sure you want to delete this user?')) {
      db.users.delete(id);
      setUsers(db.users.getAll());
    }
  };

  // Simple Add Functionality for Demo
  const handleAddUser = () => {
    const username = prompt("Enter username:");
    if (username) {
      const newUser = db.users.add({
        username,
        email: `${username.toLowerCase()}@example.com`,
        status: UserStatus.ACTIVE,
        usedTraffic: 0,
        totalLimit: 100,
        expiryDate: '2024-12-31',
        remark: 'New User'
      });
      setUsers(db.users.getAll());
    }
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={handleAddUser}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
        >
          <Plus size={20} />
          <span>Add User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                <th className="px-6 py-4">User Info</th>
                <th className="px-6 py-4">Remark</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Traffic Usage</th>
                <th className="px-6 py-4">Expiry</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900">{user.username}</span>
                      <span className="text-sm text-slate-500">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{user.remark || '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 w-1/4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{user.usedTraffic} GB</span>
                        <span>{user.totalLimit} GB</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${getUsageColor(getUsagePercentage(user.usedTraffic, user.totalLimit))}`} 
                          style={{ width: `${getUsagePercentage(user.usedTraffic, user.totalLimit)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700 font-medium">{user.expiryDate}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Reset Traffic">
                        <RotateCcw size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div className="px-6 py-12 text-center text-slate-500">
            No users found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};