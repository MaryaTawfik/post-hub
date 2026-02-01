'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import AdminLayout from '@/components/layout/AdminLayout';
import { UserX, UserCheck, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/bloggers')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const toggleBlock = async (id: string, isBlocked: boolean) => {
    try {
      await api.patch(`/admin/block-user/${id}`);
      setUsers(users.map(u =>
        u._id === id ? { ...u, isBlocked: !u.isBlocked } : u
      ));
    } catch (err) {
      alert("Failed to update user status");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-2xl text-white">
            <Shield size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Controls</h1>
            <p className="text-slate-500">Manage contributors and platform integrity.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Contributors</p>
                <p className="text-2xl font-bold text-slate-900">{users.length}</p>
              </div>
            </div>
          </div>
          {/* Add more stats if needed */}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Platform Contributors</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  [1, 2, 3].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={4} className="p-4"><div className="h-4 bg-slate-100 rounded w-full"></div></td>
                    </tr>
                  ))
                ) : users.length > 0 ? (
                  users.map(user => (
                    <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <span className="font-semibold text-slate-900">{user.name}</span>
                      </td>
                      <td className="p-4 text-slate-600">{user.email}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isBlocked ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                          }`}>
                          {user.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant={user.isBlocked ? 'primary' : 'danger'}
                          size="sm"
                          onClick={() => toggleBlock(user._id, user.isBlocked)}
                          className="gap-2"
                        >
                          {user.isBlocked ? (
                            <><UserCheck size={14} /> Unblock</>
                          ) : (
                            <><UserX size={14} /> Block</>
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      No contributors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
