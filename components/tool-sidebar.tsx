'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Flag, Facebook, Twitter, LinkedinIcon as LinkedIn, LinkIcon, Check } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useEffect } from 'react'

interface ToolSidebarProps {
  toolName: string;
  toolSlug: string;
}

export function ToolSidebar({ toolName, toolSlug }: ToolSidebarProps) {
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState(`/tool/${toolSlug}`)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}/tool/${toolSlug}`)
    }
  }, [toolSlug])

  const shareText = `Check out ${toolName} on AI Tools Directory`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Don't render share buttons until after client-side hydration
  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-900 p-4 rounded-lg animate-pulse">
          <div className="h-6 bg-gray-800 rounded w-24 mb-4"></div>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-800 rounded"></div>
              ))}
            </div>
            <div className="h-10 bg-gray-800 rounded"></div>
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg animate-pulse">
          <div className="h-6 bg-gray-800 rounded w-32 mb-4"></div>
          <div className="h-4 bg-gray-800 rounded w-full mb-4"></div>
          <div className="h-10 bg-gray-800 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Tool Actions</h2>
        <div className="space-y-4">
          {/* Social Share Buttons */}
          <div className="grid grid-cols-4 gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Share on Facebook</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share on Facebook</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Share on Twitter</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share on Twitter</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(toolName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
                  >
                    <LinkedIn className="h-5 w-5" />
                    <span className="sr-only">Share on LinkedIn</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share on LinkedIn</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleCopyLink}
                    className={`flex items-center justify-center p-2 text-white rounded-md transition-colors ${
                      copied ? 'bg-secondary hover:bg-secondary/80' : 'bg-primary hover:bg-primary/90'
                    }`}
                  >
                    {copied ? <Check className="h-5 w-5" /> : <LinkIcon className="h-5 w-5" />}
                    <span className="sr-only">{copied ? 'Link copied' : 'Copy link'}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? 'Copied!' : 'Copy link'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Report Issue Button */}
          <Button 
            variant="outline" 
            className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
          >
            <Flag className="mr-2 h-4 w-4" />
            Report Issue
          </Button>
        </div>
      </div>

      <div className="bg-gray-900 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Submit Your Tool</h2>
        <p className="text-sm text-gray-400 mb-4">
          Have an AI tool that's not listed? Submit it to our directory!
        </p>
        <Button className="w-full bg-accent hover:bg-accent/90 text-white">
          Submit AI Tool
        </Button>
      </div>
    </div>
  )
}

