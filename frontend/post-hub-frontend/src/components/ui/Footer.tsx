'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 py-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start">
                    <Link href="/" className="font-bold text-xl text-slate-900">
                        Post Hub
                    </Link>
                    <p className="mt-2 text-slate-500 text-sm">
                        Preserving history one story at a time.
                    </p>
                </div>

                <div className="flex gap-8 text-sm font-medium text-slate-600">
                    <Link href="/posts" className="hover:text-blue-600 transition-colors">Posts</Link>
                    <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
                    <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
                    <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
                </div>

                <div className="text-sm text-slate-400">
                    © {new Date().getFullYear()} Post Hub. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
