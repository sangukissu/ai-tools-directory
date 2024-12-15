'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Share, Copy, Check } from 'lucide-react'
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

interface PromoteToolProps {
  toolName: string
  toolSlug: string
}

export function PromoteTool({ toolName, toolSlug }: PromoteToolProps) {
  const [copied, setCopied] = useState(false)
  const toolUrl = `https://geekdroid.in/tool/${toolSlug}`

  
  const embedCode = `<a href="https://geekdroid.in/tool/${toolSlug}" target="_blank" rel="noopener">
 <img src="https://geekdroid.in/bg-logo.webp" alt="Featured on Geekdroid" width="240" height="56" />
</a>`

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="relative overflow-hidden bg-[#0d1117] rounded-2xl border border-[#1d2433] p-5">
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Promote {toolName}
            </h2>
            <p className="text-gray-400">
              Maximize Your Reach: Unleashing the Potential of Promote Your Tool
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost"
                size="sm"
                className="h-9 bg-white/5 hover:bg-white/10 text-white rounded-lg px-4"
              >
                <Share className="w-4 h-4 mr-2" />
                Share on
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuItem asChild>
                <a 
                  href={`https://twitter.com/intent/tweet?text=Check out ${toolName}&url=${encodeURIComponent(toolUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  Twitter
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(toolUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  Facebook
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(toolUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  LinkedIn
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-[#0d1117] rounded-lg px-4 py-2 border border-[#1d2433]">
            <Image
              src="/bg-logo.webp"
              alt="FindMyAITool Badge"
              width={240}
              height={56}
              className="rounded-lg"
            />
          </div>

          <Button
            variant="secondary"
            className="bg-[#0d1117] text-white hover:bg-gray-800/70 border border-[#1d2433]"
            onClick={handleCopyCode}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Embed Code
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

