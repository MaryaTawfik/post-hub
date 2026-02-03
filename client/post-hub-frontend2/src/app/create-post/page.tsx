"use client";
import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios'; // ✅ Import AxiosError

// ✅ Define error interface
interface ErrorResponse {
  message: string;
}

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/posts', {
        title,
        content,
        imageUrl,
        tags: tags.split(',').map(t => t.trim())
      });

      // ✅ Optional: Clear form before navigating
      setTitle('');
      setContent('');
      setImageUrl('');
      setTags('');

      router.push('/');
    } catch (err) {
      // ✅ Replace (error: any) with type-safe handling
      const error = err as AxiosError<ErrorResponse>;
      alert(error.response?.data?.message || "Failed to create post. Are you logged in?");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Post Your Culture</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            placeholder="e.g. Traditional Yemeni Coffee"
            required
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500 text-black"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            placeholder="https://example.com/image.jpg"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500 text-black"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            type="text"
            value={tags}
            placeholder="history, food, music"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500 text-black"
            onChange={(e) => setTags(e.target.value)}
          />
          <p className="text-xs text-gray-400 mt-1">Separate tags with commas</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            value={content}
            placeholder="Share the story behind this tradition..."
            required
            rows={8}
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500 text-black"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-100"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}