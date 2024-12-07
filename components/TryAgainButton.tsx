'use client'

import { Button } from "@/components/ui/button"

export default function TryAgainButton() {
  return (
    <Button 
      onClick={() => window.location.reload()} 
      className="mt-4 bg-purple-600 hover:bg-purple-700"
    >
      Try Again
    </Button>
  )
}

