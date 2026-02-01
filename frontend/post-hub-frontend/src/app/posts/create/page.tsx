'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import MainLayout from '@/components/layout/MainLayout';
import Protected from '@/components/layout/Protected';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PenTool, Image as ImageIcon, Tag as TagIcon, Send } from 'lucide-react';

export default function CreatePostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    tags: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      await api.post('/posts', {
        ...data,
        tags: tagsArray
      });
      router.push('/posts');
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Protected>
      <MainLayout>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-600 rounded-2xl text-white">
              <PenTool size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Create New Story</h1>
              <p className="text-slate-500">Share your heritage with the world.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Title
              </label>
              <Input
                placeholder="The ancient walls of Sana'a..."
                value={data.title}
                onChange={e => setData({ ...data, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <ImageIcon size={16} className="text-slate-400" /> Image URL (Optional)
              </label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={data.imageUrl}
                onChange={e => setData({ ...data, imageUrl: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <TagIcon size={16} className="text-slate-400" /> Tags (comma separated)
              </label>
              <Input
                placeholder="history, architecture, traditions"
                value={data.tags}
                onChange={e => setData({ ...data, tags: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Content</label>
              <textarea
                className="w-full min-h-[200px] p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-slate-700"
                placeholder="Tell your story..."
                value={data.content}
                onChange={e => setData({ ...data, content: e.target.value })}
                required
              />
            </div>

            <div className="pt-4 flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 gap-2"
              >
                {loading ? 'Publishing...' : <><Send size={18} /> Publish Story</>}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </MainLayout>
    </Protected>
  );
}
