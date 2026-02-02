'use client';

import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import Protected from './Protected';
import Footer from '../ui/Footer';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Protected adminOnly>
      <div className="min-h-screen flex bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </Protected>
  );
}
