'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Protected({
  children,
  adminOnly,
}: {
  children: React.ReactNode
  adminOnly?: boolean
}) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace('/auth/login')
      return
    }

    if (adminOnly && user.role !== 'admin') {
      router.replace('/')
    }
  }, [user, router, adminOnly])

  if (!user) return null

  return <>{children}</>
}
