'use client';

import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import Protected from './Protected';
import Footer from '../ui/Footer';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Protected role="admin">
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
          {children}
        </main>
        <Footer />
      </div>
    </Protected>
  );
}
