"use client";
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter, useParams } from 'next/navigation';
import { AxiosError } from 'axios';

interface ErrorResponse { message: string; }

export default function EditPost() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setImageUrl(res.data.imageUrl || '');
      } catch (err) {
        console.error("Error loading post", err);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/posts/${id}`, { title, content, imageUrl });
      alert("Updated successfully!");
      router.push('/');
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Edit Post</h1>
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100 space-y-4">
        <input 
            type="text" value={title} placeholder="Title" required 
            className="w-full p-3 border rounded-lg text-slate-900" 
            onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
            type="text" value={imageUrl} placeholder="Image URL" 
            className="w-full p-3 border rounded-lg text-slate-900" 
            onChange={(e) => setImageUrl(e.target.value)} 
        />
        <textarea 
            value={content} required rows={10} 
            className="w-full p-3 border rounded-lg text-slate-900" 
            onChange={(e) => setContent(e.target.value)} 
        />
        <button type="submit" className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-700 transition">
          Save Changes
        </button>
      </form>
    </div>
  );
}