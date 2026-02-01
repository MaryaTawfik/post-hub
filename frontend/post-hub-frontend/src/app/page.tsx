"use client";
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { ChevronDown, ArrowRight, History, MapPin, Camera } from 'lucide-react';
import api from '@/lib/api';
import { IPost } from '@/types';
import PostCard from '@/components/ui/PostCard';

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const postsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const scrollToPosts = () => {
    postsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-20">
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          {/* Hero Image */}
          <div className="absolute inset-0">
            <img
              src="/images/hero.jpg"
              alt="Yemen Heritage"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>

          {/* Hero Content */}
          <div className="relative h-full flex flex-col justify-center px-8 sm:px-16 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-600/20 border border-amber-600/30 rounded-full text-amber-500 text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
              <History size={14} />
              <span>Preserving History</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black text-white leading-tight mb-6 animate-slide-up">
              Welcome to <br />
              <span className="text-amber-500">Yemen Heritage</span> Hub
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed animate-slide-up delay-100">
              Explore the soul of South Arabia through stories, photography, and the deep cultural roots that shaped civilizations for millennia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
              <button
                onClick={scrollToPosts}
                className="group flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-amber-600/20"
              >
                See About Yemen Culture
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                href="/posts/create"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold transition-all"
              >
                <Camera size={20} />
                Share Your Story
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown size={32} className="text-white/50" />
          </div>
        </section>

        {/* Info Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-amber-50 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-700 mb-6">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Ancient Cities</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Discover the mud-brick skyscrapers of Shibam and the historic architecture of Sana'a.</p>
          </div>
          <div className="p-8 rounded-3xl bg-white border border-amber-50 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-700 mb-6">
              <History size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Millennial Roots</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Through thousands of years, Yemen has been a crossroads of civilizations and traditions.</p>
          </div>
          <div className="p-8 rounded-3xl bg-white border border-amber-50 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-700 mb-6">
              <Camera size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Visual Legacy</h3>
            <p className="text-slate-600 text-sm leading-relaxed">A community-driven archive of the stunning landscapes and artistic expressions of Yemen.</p>
          </div>
        </section>

        {/* Posts Section */}
        <section ref={postsRef} className="space-y-12 pb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-4">Latest Explorations</h2>
              <div className="h-1.5 w-24 bg-amber-600 rounded-full"></div>
            </div>
            <Link href="/posts" className="text-amber-700 font-bold hover:underline underline-offset-8 flex items-center gap-2">
              View all stories <ArrowRight size={18} />
            </Link>
          </div>

          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-[450px] bg-slate-100 animate-pulse rounded-3xl"></div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 6).map(post => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-100">
              <div className="max-w-md mx-auto">
                <p className="text-slate-400 text-lg mb-6">The archives are currently empty. Be the first to share a piece of history.</p>
                <Link href="/posts/create" className="inline-flex items-center gap-2 text-amber-700 font-bold">
                  Start Posting <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  );
}
