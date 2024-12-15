'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Flag, Facebook, Twitter, LinkedinIcon as LinkedIn, LinkIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from 'react'

interface ToolSidebarProps {
  toolName: string;
  toolSlug: string;
}

export function ToolSidebar({ toolName, toolSlug }: ToolSidebarProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/tool/${toolSlug}`
    : `/tool/${toolSlug}`

  const shareText = `Check out ${toolName} on AI Tools Directory`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
                    className="flex items-center justify-center p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
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
                    className="flex items-center justify-center p-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md transition-colors"
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
                    className="flex items-center justify-center p-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md transition-colors"
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
                    className="flex items-center justify-center p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                  >
                    <LinkIcon className="h-5 w-5" />
                    <span className="sr-only">Copy link</span>
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
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          Submit AI Tool
        </Button>
      </div>
    </div>
  )
}

