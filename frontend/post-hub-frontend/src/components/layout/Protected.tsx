'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Protected({
  children,
  role,
}: {
  children: React.ReactNode
  role?: 'admin' | 'blogger'
}) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace('/auth/login')
      return
    }

    if (role && user.role !== role) {
      router.replace('/')
    }
  }, [user, router, role])

  if (!user) return null

  return <>{children}</>
}
