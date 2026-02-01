'use client';

import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { BookOpen, Shield, PenTool, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <MainLayout>
      <div className="relative isolate overflow-hidden">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:pt-20">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-blue-600/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600/10">
                  What's new
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-slate-600">
                  <span>Just shipped v1.0</span>
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Preserving our heritage through stories
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Post Hub is a place for explorers and culture enthusiasts to share and discover the rich history, architecture, and traditions of our lands.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/posts"
                className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
              >
                Browse Posts
              </Link>
              <Link href="/auth/register" className="text-sm font-semibold leading-6 text-slate-900 flex items-center gap-1 hover:text-blue-600 transition-colors">
                Become a Contributor <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="rounded-2xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <div className="w-[500px] h-[400px] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-2xl flex items-center justify-center">
                  <BookOpen size={120} className="text-white opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Share Faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to share stories
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                  <PenTool className="h-5 w-5 flex-none text-blue-600" />
                  Powerful Editor
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">Create beautiful blog posts with images and tags to reach your audience effectively.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                  <Shield className="h-5 w-5 flex-none text-blue-600" />
                  Admin Controls
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">Dedicated admin dashboard to manage content, users, and ensure a high-quality community.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                  <BookOpen className="h-5 w-5 flex-none text-blue-600" />
                  Rich Archive
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">Browse through categories and tags to find exactly what you're interested in.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
