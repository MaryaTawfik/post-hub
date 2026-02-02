'use client';

import api from '@/lib/api';
import { useState } from 'react';
import { Bookmark } from 'lucide-react';

export default function BookmarkButton({ postId }: { postId: string }) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      await api.post(`/posts/${postId}/bookmark`);
      setSaved(!saved);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`p-2 rounded-lg transition-all ${saved ? 'bg-black text-white' : 'text-gray-400 hover:text-black hover:bg-slate-100'}`}
    >
      <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
