'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Share2, Flag, Facebook, Twitter, LinkedinIcon as LinkedIn, LinkIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useEffect } from 'react'

interface ToolSidebarProps {
  toolName: string;
  toolSlug: string;
}

interface SimilarTool {
  id: string;
  title: string;
  slug: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
}

export function ToolSidebar({ toolName, toolSlug }: ToolSidebarProps) {
  const [showShareLinks, setShowShareLinks] = useState(false)
  const [copied, setCopied] = useState(false)
  const [similarTools, setSimilarTools] = useState<SimilarTool[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/tool/${toolSlug}`
    : `/tool/${toolSlug}`

  const shareText = `Check out ${toolName} on AI Tools Directory`


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: toolName,
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        setShowShareLinks(true)
      }
    } else {
      setShowShareLinks(true)
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Tool Actions</h2>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
            onClick={handleShare}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share Tool
          </Button>

          {showShareLinks && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(toolName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md"
              >
                <LinkedIn className="h-4 w-4" />
              </a>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center justify-center p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md border-gray-600"
                      onClick={handleCopyLink}
                    >
                      {copied ? 'Copied!' : <LinkIcon className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? 'Copied!' : 'Copy link'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}

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



