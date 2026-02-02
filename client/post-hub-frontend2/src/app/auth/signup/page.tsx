"use client";
import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios'; // ✅ Import AxiosError

// ✅ Define the shape of your backend error response
interface ErrorResponse {
  message: string;
}

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', adminCode: ''
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      
      // Clear the form completely
      setFormData({ name: '', email: '', password: '', adminCode: '' });
      
      alert("Registration successful! Redirecting to login...");
      router.push('/auth/login');
    } catch (err) {
      // ✅ Type-safe error handling replaces (error: any)
      const error = err as AxiosError<ErrorResponse>;
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-black">Create Account</h2>
        <input 
          type="text" value={formData.name} placeholder="Name" required
          className="w-full p-3 border rounded-lg text-black"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="email" value={formData.email} placeholder="Email" required
          className="w-full p-3 border rounded-lg text-black"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" value={formData.password} placeholder="Password" required
          className="w-full p-3 border rounded-lg text-black"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <input 
          type="text" value={formData.adminCode} placeholder="Admin Code (Optional)"
          className="w-full p-3 border rounded-lg bg-gray-50 text-black"
          onChange={(e) => setFormData({...formData, adminCode: e.target.value})}
        />
        <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition">
          Register
        </button>
      </form>
    </div>
  );
}