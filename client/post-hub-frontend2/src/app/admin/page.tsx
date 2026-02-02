"use client";
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

// --- Interfaces ---
interface Blogger {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  role: 'blogger' | 'admin';
}

interface Post {
  _id: string;
  title: string;
  author: { 
    _id: string;
    name: string; 
    role: string;
  };
}

export default function AdminDashboard() {
  const [view, setView] = useState<'users' | 'posts'>('users');
  const [data, setData] = useState<(Blogger | Post)[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch Data
  const fetchData = async (type: 'users' | 'posts') => {
    setLoading(true);
    setView(type);
    const endpoint = type === 'users' ? '/posts/all-bloggers' : '/posts';
    try {
      const res = await api.get(endpoint);
      setData(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Action: Toggle Block User
  const handleToggleBlock = async (id: string) => {
    try {
      await api.patch(`/posts/block-user/${id}`);
      fetchData('users'); // Refresh list
    } catch (error) {
      alert("Failed to update user status");
    }
  };

  // Action: Delete Post
  const handleDeletePost = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await api.delete(`/posts/${id}`);
        fetchData('posts'); // Refresh list
      } catch (error) {
        alert("Failed to delete post");
      }
    }
  };

  // Type Guard
  const isBlogger = (item: Blogger | Post): item is Blogger => {
    return (item as Blogger).name !== undefined;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-gray-800">Admin Control Panel</h1>
        <p className="text-gray-500">Manage your platform users and content.</p>
      </header>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <button 
          onClick={() => fetchData('users')} 
          className={`p-8 rounded-2xl text-left transition-all shadow-lg hover:scale-[1.02] ${
            view === 'users' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'
          }`}
        >
          <span className="text-3xl mb-2 block">👥</span>
          <h2 className="text-xl font-bold">All Bloggers</h2>
          <p className={view === 'users' ? 'text-blue-100' : 'text-gray-500'}>Manage accounts & access</p>
        </button>

        <button 
          onClick={() => fetchData('posts')} 
          className={`p-8 rounded-2xl text-left transition-all shadow-lg hover:scale-[1.02] ${
            view === 'posts' ? 'bg-purple-600 text-white' : 'bg-white text-gray-800 border'
          }`}
        >
          <span className="text-3xl mb-2 block">📝</span>
          <h2 className="text-xl font-bold">All Posts</h2>
          <p className={view === 'posts' ? 'text-purple-100' : 'text-gray-500'}>Review and moderate content</p>
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-700 uppercase tracking-wider text-sm">
            {view === 'users' ? 'Blogger List' : 'Post Moderation'}
          </h3>
          {loading && <div className="animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full"></div>}
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-xs uppercase border-b">
              <th className="p-4 font-semibold">{view === 'users' ? 'User Info' : 'Post Details'}</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id} className="hover:bg-orange-50/30 transition">
                  <td className="p-4">
                    {isBlogger(item) ? (
                      <div>
                        <p className="font-bold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.email}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-bold text-gray-800">{item.title}</p>
                        <p className="text-xs text-orange-600 font-medium">Author: {item.author.name} ({item.author.role})</p>
                      </div>
                    )}
                  </td>
                  
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-3">
                      {isBlogger(item) ? (
                        <button 
                          onClick={() => handleToggleBlock(item._id)}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                            item.isBlocked 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'bg-red-100 text-red-700 hover:bg-red-200'
                          }`}
                        >
                          {item.isBlocked ? 'UNBLOCK' : 'BLOCK USER'}
                        </button>
                      ) : (
                        <>
                          {/* EDIT button only if author is Admin */}
                          {item.author.role === 'admin' && (
                            <button 
                              onClick={() => router.push(`/edit-post/${item._id}`)}
                              className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-200 transition"
                            >
                              EDIT
                            </button>
                          )}
                          {/* DELETE button for ALL posts */}
                          <button 
                            onClick={() => handleDeletePost(item._id)}
                            className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition"
                          >
                            DELETE
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-20 text-center text-gray-400 italic">
                  No data found. Click a card above to fetch.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}