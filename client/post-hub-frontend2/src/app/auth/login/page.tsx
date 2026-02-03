"use client";
import { Suspense, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { AxiosError } from 'axios';

// Define the shape of your backend error response
interface ErrorResponse {
  message: string;
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });

      setEmail('');
      setPassword('');

      login(res.data);
      const next = searchParams.get('next');
      router.push(next ?? '/');
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email" value={email} required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password" value={password} required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}