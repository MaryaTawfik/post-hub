"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-amber-50 to-amber-100 bg-opacity-90 backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center rounded-b-xl">
      {/* Logo */}
      <Link href="/" className="text-brown-700 font-extrabold text-xl tracking-wide hover:text-brown-800 transition-colors">
        MyBrand
      </Link>

      {/* Links */}
      <div className="flex gap-6 items-center">
        <Link href="/about" className="text-brown-600 hover:text-brown-800 hover:underline underline-offset-4 transition-all">
          About
        </Link>
        <Link href="/services" className="text-brown-600 hover:text-brown-800 hover:underline underline-offset-4 transition-all">
          Services
        </Link>
        <Link href="/contact" className="text-brown-600 hover:text-brown-800 hover:underline underline-offset-4 transition-all">
          Contact
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-4">
        {user ? (
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-brown-700 text-cream-100 hover:bg-brown-800 transition-all shadow-sm"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-lg border border-brown-400 text-brown-700 hover:bg-brown-100 hover:bg-opacity-50 transition-all shadow-sm"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
