"use client";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

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

export default function PostCard({ post }: { post: Post }) {
  const { user } = useAuth();
  const router = useRouter();

 const handleAction = (e: React.MouseEvent) => {
  e.preventDefault(); // Prevents any default button behavior
  
  if (!user) {
    alert("You should log in first!");
    // This must match the folder name in your src/app directory
    router.push(`/auth/login?next=${encodeURIComponent(`/posts/${post._id}`)}`);
  } else {
    // Logic for logged-in users (e.g., adding to bookmarks)
    console.log("Adding to bookmarks...");
  }
};

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await api.delete(`/posts/${post._id}`);
        window.location.reload(); // Refresh to show post is gone
      } catch (err) {
        alert("Failed to delete post");
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition flex flex-col h-full">
      <img 
        src={post.imageUrl || '/yemen-map.jpg'} 
        alt={post.title} 
        className="h-48 w-full object-cover" 
      />
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">{post.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">{post.content}</p>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-50">
          <button 
            onClick={handleAction} 
            className="text-orange-600 text-sm font-bold hover:text-orange-700 transition"
          >
            See More
          </button>

          <div className="flex gap-4 items-center">
            {/* Bookmark Icon (Requires Login) */}
            <button onClick={handleAction} title="Bookmark" className="text-lg">🔖</button>

            {/* ✅ The logic you requested: Only owner or admin can Edit/Delete */}
            {(user?.role === 'admin' || user?.id === post.author._id) && (
              <div className="flex gap-2 border-l pl-3">
                <button 
                  onClick={() => router.push(`/edit-post/${post._id}`)} 
                  className="hover:scale-125 transition text-lg"
                  title="Edit Post"
                >
                  ✏️
                </button>
                <button 
                  onClick={handleDelete} 
                  className="hover:scale-125 transition text-lg"
                  title="Delete Post"
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}