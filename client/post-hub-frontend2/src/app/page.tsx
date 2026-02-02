"use client";
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import PostCard from '@/components/PostCard';

// ✅ 1. Define the Post interface here as well (or export it from a types file)
interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: {
    _id: string;
    name: string;
    role: string;
  };
}

export default function HomePage() {
  // ✅ 2. Tell the state it will hold an array of Post objects
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.get('/posts').then(res => setPosts(res.data));
  }, []);

  return (
    <main>
      {/* Hero Section */}
      {/* ✅ 3. Update the URL to point to your public folder */}
      <div 
        className="relative h-[400px] w-full bg-cover bg-center rounded-2xl mb-10 overflow-hidden" 
        style={{ backgroundImage: "url('/yemen-map.jpg')" }} 
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-5xl font-extrabold text-white">Welcome to Post Hub</h1>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}