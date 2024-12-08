'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ThumbsUp } from 'lucide-react'

interface LikeButtonProps {
  toolId: string;
  initialLikes?: number;
}

export function LikeButton({ toolId, initialLikes = 0 }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [hasLiked, setHasLiked] = useState(false)

  const handleLike = async () => {
    if (hasLiked) return

    try {
      // In a real implementation, you would make an API call here
      // await fetch('/api/tools/like', {
      //   method: 'POST',
      //   body: JSON.stringify({ toolId }),
      // })

      setLikes(prev => prev + 1)
      setHasLiked(true)
      // Store in localStorage to persist the like
      localStorage.setItem(`liked_${toolId}`, 'true')
    } catch (error) {
      console.error('Error liking tool:', error)
    }
  }

  return (
    <Button 
      variant="outline" 
      className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
      onClick={handleLike}
      disabled={hasLiked}
    >
      <ThumbsUp className={`mr-2 h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
      {hasLiked ? 'Liked' : 'Like'} ({likes})
    </Button>
  )
}

