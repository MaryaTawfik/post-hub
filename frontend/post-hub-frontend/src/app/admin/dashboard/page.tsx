'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import AdminLayout from '@/components/layout/AdminLayout';
import { UserX, UserCheck, Shield, Users, FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Tab = 'bloggers' | 'posts';

export default function AdminDashboard() {
  const [bloggers, setBloggers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('bloggers');
  const [loading, setLoading] = useState(true);

  const fetchBloggers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/posts/all-bloggers');
      setBloggers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'bloggers') {
      fetchBloggers();
    } else {
      fetchPosts();
    }
  }, [activeTab]);

  const toggleBlock = async (id: string) => {
    try {
      await api.patch(`/posts/block-user/${id}`);
      setBloggers(bloggers.map(u =>
        u._id === id ? { ...u, isBlocked: !u.isBlocked } : u
      ));
    } catch (err) {
      alert("Failed to update user status");
    }
  };

  const deletePost = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(p => p._id !== id));
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-600 rounded-2xl text-white">
            <Shield size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Controls</h1>
            <p className="text-slate-500">Manage contributors and platform integrity.</p>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <button
            onClick={() => setActiveTab('bloggers')}
            className={`flex items-center gap-4 p-6 rounded-2xl border transition-all ${activeTab === 'bloggers'
              ? 'bg-white border-amber-600 shadow-lg ring-2 ring-amber-600/10'
              : 'bg-white border-slate-100 shadow-sm hover:border-amber-200'
              }`}
          >
            <div className={`p-4 rounded-xl ${activeTab === 'bloggers' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-600'}`}>
              <Users size={32} />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-slate-500">Manage Users</p>
              <p className="text-2xl font-bold text-slate-900">All Bloggers</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-4 p-6 rounded-2xl border transition-all ${activeTab === 'posts'
              ? 'bg-white border-amber-600 shadow-lg ring-2 ring-amber-600/10'
              : 'bg-white border-slate-100 shadow-sm hover:border-amber-200'
              }`}
          >
            <div className={`p-4 rounded-xl ${activeTab === 'posts' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-600'}`}>
              <FileText size={32} />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-slate-500">Manage Content</p>
              <p className="text-2xl font-bold text-slate-900">All Posts</p>
            </div>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900">
              {activeTab === 'bloggers' ? 'Platform Contributors' : 'Platform Posts'}
            </h2>
            {loading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-600"></div>}
          </div>

          <div className="overflow-x-auto">
            {activeTab === 'bloggers' ? (
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
                  ) : bloggers.length > 0 ? (
                    bloggers.map(user => (
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
                            onClick={() => toggleBlock(user._id)}
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
                    <tr><td colSpan={4} className="p-8 text-center text-slate-500">No contributors found.</td></tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Author</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
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
                  ) : posts.length > 0 ? (
                    posts.map(post => (
                      <tr key={post._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <span className="font-semibold text-slate-900 line-clamp-1">{post.title}</span>
                        </td>
                        <td className="p-4 text-slate-600">{post.author?.name || 'Unknown'}</td>
                        <td className="p-4 text-slate-500 text-sm">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right">
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => deletePost(post._id)}
                            className="gap-2"
                          >
                            <Trash2 size={14} /> Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={4} className="p-8 text-center text-slate-500">No posts found.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
