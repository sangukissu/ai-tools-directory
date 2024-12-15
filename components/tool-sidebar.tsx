'use client'

import { Button } from "@/components/ui/button"
import { Flag, Facebook, Twitter, LinkedinIcon as LinkedIn, LinkIcon, Check } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useEffect } from 'react'
import { CompactToolCard } from "./compact-tool-card"

interface AIToolCategory {
  name: string;
  slug: string;
}

interface RelatedTool {
  id: string;
  title: string;
  slug: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  aiToolCategories: {
    nodes: AIToolCategory[];
  };
}

interface ToolSidebarProps {
  toolName: string;
  toolSlug: string;
  relatedTools: RelatedTool[];
}

export function ToolSidebar({ toolName, toolSlug, relatedTools }: ToolSidebarProps) {
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

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Related Tools Section */}
      {relatedTools.length > 0 && (
        <div className="bg-[#0d1117] rounded-2xl border border-[#1d2433] p-2 py-4">
          <h2 className="text-lg font-semibold text-white mb-4 px-1">Related AI Tools</h2>
          <div className="space-y-1">
            {relatedTools.map((tool) => (
              <CompactToolCard
                key={tool.id}
                title={tool.title}
                category={tool.aiToolCategories.nodes[0]?.name || "AI Tool"}
                slug={tool.slug}
                logo={tool.featuredImage?.node?.sourceUrl || "/placeholder.svg"}
              />
            ))}
          </div>
        </div>
      )}

      <div className="bg-[#0d1117] rounded-2xl border border-[#1d2433] p-5">
        <h2 className="text-lg font-semibold text-white mb-4">Share This Tool</h2>
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
                    className="flex items-center justify-center p-2.5 bg-[#1a1f2c] hover:bg-[#252b3b] text-white rounded-xl transition-colors"
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
                    className="flex items-center justify-center p-2.5 bg-[#1a1f2c] hover:bg-[#252b3b] text-white rounded-xl transition-colors"
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
                    className="flex items-center justify-center p-2.5 bg-[#1a1f2c] hover:bg-[#252b3b] text-white rounded-xl transition-colors"
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
                    className={`flex items-center justify-center p-2.5 rounded-xl transition-colors ${
                      copied 
                        ? 'bg-green-600/20 text-green-500 hover:bg-green-600/30' 
                        : 'bg-[#1a1f2c] hover:bg-[#252b3b] text-white'
                    }`}
                  >
                    {copied ? <Check className="h-5 w-5" /> : <LinkIcon className="h-5 w-5" />}
                    <span className="sr-only">{copied ? 'Copied!' : 'Copy link'}</span>
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
            className="w-full justify-start bg-[#1a1f2c] hover:bg-[#252b3b] text-white border-[#2d3548] rounded-xl h-11"
          >
            <Flag className="mr-2 h-4 w-4" />
            Report Issue
          </Button>
        </div>
      </div>

      <div className="bg-[#0d1117] rounded-2xl border border-[#1d2433] p-5">
        <h2 className="text-lg font-semibold text-white mb-3">Submit Your Tool</h2>
        <p className="text-sm text-gray-400 mb-4">
          Have an AI tool that's not listed? Submit it to our directory!
        </p>
        <Button className="w-full bg-primary hover:bg-blue-700 text-white rounded-xl h-11">
          Submit AI Tool
        </Button>
      </div>
    </div>
  )
}

