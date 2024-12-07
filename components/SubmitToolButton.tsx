'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function SubmitToolButton() {
  const router = useRouter()

  return (
    <Button 
      onClick={() => router.push('/submit')} 
      className="mt-4 bg-purple-600 hover:bg-purple-700"
    >
      Submit AI Tool
    </Button>
  )
}

