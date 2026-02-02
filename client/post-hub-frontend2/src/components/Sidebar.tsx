"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Home, Globe, PlusSquare, LogIn, UserPlus, LogOut, Menu, X, Shield, PenTool } from "lucide-react";

// ✅ 1. Define the interface to tell TypeScript what to expect
interface AuthItem {
  name: string;
  icon: React.ReactNode;
  href?: string;      // Optional: only for Login/Signup
  onClick?: () => void; // Optional: only for Logout
  className?: string;
}

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Home Page", href: "/", icon: <Home size={20} /> },
    { name: "Yemen Culture", href: "/yemen-culture", icon: <Globe size={20} /> },
    { name: "Blogger Culture", href: "/blogger-culture", icon: <PenTool size={20} /> },
    { name: "Post Your Culture", href: "/create-post", icon: <PlusSquare size={20} />, requireAuth: true },
  ];

  if (user?.role === 'admin') {
    menuItems.push({ 
        name: "Admin Dashboard", 
        href: "/admin", 
        icon: <Shield size={20} />, 
        requireAuth: true 
    });
  }

  // ✅ 2. Explicitly type the array as AuthItem[]
  const authItems: AuthItem[] = user ? [
    { name: "Logout", onClick: logout, icon: <LogOut size={20} />, className: "text-red-500 hover:bg-red-50" }
  ] : [
    { name: "Login", href: "/auth/login", icon: <LogIn size={20} /> }, 
    { name: "Signup", href: "/auth/signup", icon: <UserPlus size={20} /> }
  ];

  const handleProtectedLink = (e: React.MouseEvent, href: string, requireAuth?: boolean) => {
    if (requireAuth && !user) {
      e.preventDefault();
      alert('Please login first to post your culture');
      router.push(`/auth/login?next=${encodeURIComponent(href)}`);
    }
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-amber-600 text-white rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-full bg-white border-r border-amber-100 shadow-xl transition-all duration-300 z-50 flex flex-col
        ${isOpen ? "w-64" : "w-0 lg:w-20 overflow-hidden"}`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white font-bold shrink-0">Y</div>
          {isOpen && <h1 className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">Heritage Hub</h1>}
        </div>

        <nav className="flex-1 px-4 mt-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleProtectedLink(e, item.href, item.requireAuth)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all group ${isActive ? "bg-amber-600 text-white shadow-lg" : "text-slate-600 hover:bg-amber-50 hover:text-amber-700"}`}
                  >
                    <span className={isActive ? "text-white" : "text-amber-600"}>{item.icon}</span>
                    {isOpen && <span className="font-medium">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-amber-50">
          <ul className="space-y-1">
            {authItems.map((item) => (
              <li key={item.name}>
                {/* ✅ TypeScript is now happy because it knows these properties exist on the AuthItem interface */}
                {item.href ? (
                  <Link 
                    href={item.href} 
                    className="flex items-center gap-3 p-3 rounded-xl text-slate-600 hover:bg-amber-50 hover:text-amber-700 transition-all group"
                  >
                    <span className="text-amber-600 group-hover:text-amber-700">{item.icon}</span>
                    {isOpen && <span className="font-medium">{item.name}</span>}
                  </Link>
                ) : (
                  <button 
                    onClick={item.onClick}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${item.className || "text-slate-600 hover:bg-amber-50"}`}
                  >
                    <span className={item.className ? "" : "text-amber-600"}>{item.icon}</span>
                    {isOpen && <span className="font-medium">{item.name}</span>}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};