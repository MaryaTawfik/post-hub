"use client";
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import PostCard from '@/components/PostCard';
import { AxiosError } from 'axios';

// --- Interfaces ---
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

interface ErrorResponse {
  message: string;
}

export default function BloggerCulturePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBloggerPosts = async () => {
      try {
        const res = await api.get('/posts');
        // ✅ Filter: Only include posts where the author is NOT an admin
        const communityData = res.data.filter((post: Post) => post.author.role === 'blogger');
        setPosts(communityData);
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        console.error("Error fetching blogger posts:", error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBloggerPosts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="mb-12 border-b border-gray-100 pb-6">
        <h1 className="text-4xl font-extrabold text-blue-600 flex items-center gap-3">
          <span>✍️</span> Blogger Culture
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Explore stories, traditions, and personal insights shared by our community members.
        </p>
      </header>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
                <p className="text-gray-400 text-xl italic">No community posts yet.</p>
                <button 
                  onClick={() => window.location.href = '/create-post'}
                  className="mt-4 text-blue-600 font-bold hover:underline"
                >
                  Be the first to share your culture!
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}