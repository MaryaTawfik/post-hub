'use client';

import { IPost } from '@/types';
import { Calendar, User, Edit3, Eye, Bookmark, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PostCard({ post }: { post: IPost }) {
    const { user } = useAuth();
    const router = useRouter();

    const handleProtectedAction = (e: React.MouseEvent, action: string, path?: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            alert('Please login first to ' + action);
            router.push('/auth/login');
            return;
        }

        if (path) {
            router.push(path);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-amber-50 overflow-hidden hover:shadow-xl transition-all duration-300 group">
            {post.imageUrl && (
                <div className="relative h-56 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-white text-sm font-medium">Read full story</span>
                    </div>
                </div>
            )}

            <div className="p-6">
                <div className="flex gap-2 mb-4">
                    {post.tags?.map((tag: string) => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-amber-700 transition-colors">
                    {post.title}
                </h3>

                <p className='text-slate-600 line-clamp-2 mb-6 text-sm leading-relaxed'>
                    {post.content}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400 mb-6 pb-6 border-b border-slate-50">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                            <User size={12} />
                        </div>
                        <span className="font-medium text-slate-600">{post.author?.name || 'Explorer'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <button
                        onClick={(e) => handleProtectedAction(e, 'edit this post', `/posts/${post._id}/edit`)}
                        className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-amber-600 hover:text-white transition-all group/btn"
                    >
                        <Edit3 size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Edit</span>
                    </button>

                    <button
                        onClick={(e) => handleProtectedAction(e, 'see details', `/posts/${post._id}`)}
                        className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-amber-600 hover:text-white transition-all group/btn"
                    >
                        <Eye size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Detail</span>
                    </button>

                    <button
                        onClick={(e) => handleProtectedAction(e, 'bookmark this post')}
                        className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-amber-600 hover:text-white transition-all group/btn"
                    >
                        <Bookmark size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
}