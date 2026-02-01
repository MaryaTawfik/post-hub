import { IPost } from '@/types';
import { Calendar, User } from 'lucide-react';

// Change 'any' to 'IPost'
export default function PostCard({ post }: { post: IPost }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Note: Fixed the typo 'imageurl' to 'imageUrl' to match your interface */}
            {post.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
            )}

            <div className="p-5">
                <div className="flex gap-2 mb-3">
                    {post.tags?.map((tag: string) => (
                        <span key={tag} className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                            #{tag}
                        </span>
                    ))}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {post.title}
                </h3>
                <p className='text-slate-600 line-clamp-3 mb-4'>{post.content}</p>

                <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t">
                    <div className="flex items-center gap-1">
                        <User size={14} />
                        {/* TypeScript now knows author has a name! */}
                        <span>{post.author?.name || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}