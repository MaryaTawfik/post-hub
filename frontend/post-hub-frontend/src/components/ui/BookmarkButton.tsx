'use client'

import api from '@/lib/api'
import { useState } from 'react'

export default function BookmarkButton({ postId }: { postId: string }) {
  const [saved, setSaved] = useState(false)

  const toggle = async () => {
    await api.post(`/posts/${postId}/bookmark`)
    setSaved(!saved)
  }

  return (
    <button
      onClick={toggle}
      className={`text-sm ${saved ? 'text-yellow-500' : 'text-gray-400'}`}
    >
      ⭐ {saved ? 'Bookmarked' : 'Bookmark'}
    </button>
  )
}
