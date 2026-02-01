'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import MainLayout from '@/components/layout/MainLayout';
import Protected from '@/components/layout/Protected';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PenTool, Image as ImageIcon, Tag as TagIcon, Save, ArrowLeft } from 'lucide-react';

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    tags: ''
  });

  useEffect(() => {
    if (id) {
      api.get(`/posts/${id}`)
        .then(res => {
          const post = res.data;
          setData({
            title: post.title || '',
            content: post.content || '',
            imageUrl: post.imageUrl || '',
            tags: post.tags ? post.tags.join(', ') : ''
          });
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      await api.put(`/posts/${id}`, {
        ...data,
        tags: tagsArray
      });
      router.push(`/posts/${id}`);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <MainLayout><div className="flex justify-center py-20">Loading...</div></MainLayout>;

  return (
    <Protected>
      <MainLayout>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-2xl text-white">
                <PenTool size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Edit Story</h1>
                <p className="text-slate-500">Refine your contribution.</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => router.back()} className="gap-2">
              <ArrowLeft size={16} /> Back
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Title</label>
              <Input
                placeholder="Title"
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
                className="w-full min-h-[300px] p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-slate-700"
                placeholder="Tell your story..."
                value={data.content}
                onChange={e => setData({ ...data, content: e.target.value })}
                required
              />
            </div>

            <div className="pt-4 flex gap-4">
              <Button
                type="submit"
                disabled={saving}
                className="flex-1 gap-2"
              >
                {saving ? 'Saving...' : <><Save size={18} /> Save Changes</>}
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
