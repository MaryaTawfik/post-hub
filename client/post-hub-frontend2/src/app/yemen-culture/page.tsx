"use client";
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import PostCard from '@/components/PostCard';

interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: { _id: string; name: string; role: string; };
}

export default function YemenCulturePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getAdminPosts = async () => {
      const res = await api.get('/posts');
      // Only show posts created by admins
      const adminPosts = res.data.filter((p: Post) => p.author.role === 'admin');
      setPosts(adminPosts);
    };
    getAdminPosts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10 border-b pb-5">
        <h1 className="text-4xl font-bold text-orange-600">🇾🇪 Yemen Culture</h1>
        <p className="text-gray-500 mt-2">Official posts and historical insights from the Admin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map(post => <PostCard key={post._id} post={post} />)
        ) : (
          <p className="text-gray-400 italic">No official cultural posts found yet.</p>
        )}
      </div>
    </div>
  );
}