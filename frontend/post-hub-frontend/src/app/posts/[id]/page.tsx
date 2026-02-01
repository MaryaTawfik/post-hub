'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import api from '@/lib/api';
import { IPost } from '@/types';
import { Calendar, User, Tag } from 'lucide-react';

export default function PostDetailPage() {
    const { id } = useParams();
    const [post, setPost] = useState<IPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            api.get(`/posts/${id}`)
                .then(res => {
                    setPost(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.response?.data?.message || 'Failed to load post');
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <MainLayout><div className="flex justify-center py-20">Loading...</div></MainLayout>;
    if (error) return <MainLayout><div className="text-red-500 text-center py-20">{error}</div></MainLayout>;
    if (!post) return <MainLayout><div className="text-center py-20">Post not found</div></MainLayout>;

    return (
        <MainLayout>
            <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {post.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.imageUrl} alt={post.title} className="w-full h-[400px] object-cover" />
                )}

                <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags?.map(tag => (
                            <span key={tag} className="flex items-center gap-1 text-sm font-medium px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                                <Tag size={14} />
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 text-slate-500 mb-8 pb-8 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                <User size={20} className="text-slate-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">{post.author?.name || 'Unknown'}</p>
                                <p className="text-xs">Author</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span className="text-sm">{new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap">
                            {post.content}
                        </p>
                    </div>
                </div>
            </article>
        </MainLayout>
    );
}
