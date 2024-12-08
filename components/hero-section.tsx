'use client'

import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useDebounce } from '@/hooks/use-debounce'
import { sanitizeSearchTerm } from '@/lib/utils'

interface AITool {
  id: string;
  title: string;
  slug: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
}

const popularTools = [
  { name: 'loopin', logo: '/placeholder.svg' },
  { name: 'bing chat', logo: '/placeholder.svg' },
  { name: 'Adobe', logo: '/placeholder.svg' },
  { name: 'monica', logo: '/placeholder.svg' },
  { name: 'Chat GPT', logo: '/placeholder.svg' },
  { name: 'Jasper', logo: '/placeholder.svg' },
]

export function HeroSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<AITool[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 500) // Increased debounce delay
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const searchAITools = async () => {
      if (debouncedSearchTerm.length >= 3) { // Minimum 3 characters to trigger search
        setIsLoading(true)
        try {
          const sanitizedTerm = sanitizeSearchTerm(debouncedSearchTerm)
          const response = await fetch(`/api/search?q=${encodeURIComponent(sanitizedTerm)}`)
          if (!response.ok) {
            throw new Error('Search request failed')
          }
          const data = await response.json()
          setSearchResults(data)
        } catch (error) {
          console.error('Error searching AI tools:', error)
          setSearchResults([])
        } finally {
          setIsLoading(false)
        }
      } else {
        setSearchResults([])
      }
    }

    searchAITools()
  }, [debouncedSearchTerm])

  return (
    <section className="relative py-20 overflow-hidden bg-black">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="text-gray-400">Discover </span>
            <span className="bg-gradient-to-r from-red-500 to-rose-500 text-transparent bg-clip-text">AI</span>
            {' '}
            <span className="bg-gradient-to-r from-violet-500 to-purple-500 text-transparent bg-clip-text">Tools</span>
            {' '}
            <span className="text-gray-400">for Your</span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text">Business!</span>
          </h1>
          <p className="text-gray-400 text-xl mb-12">
            Streamline Your Workflow with Our List of AI tools. Find Your Perfect Solution.
          </p>
          
          <div className="max-w-2xl mx-auto mb-12 relative" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search AI tools..."
                className="w-full pl-12 pr-4 py-6 bg-gray-900 border-gray-800 rounded-full text-gray-100 placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <AnimatePresence>
              {(searchResults.length > 0 || isLoading) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 w-full mt-2 bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden"
                >
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-400">Searching...</div>
                  ) : (
                    <ul className="max-h-96 overflow-y-auto">
                      {searchResults.map((tool) => (
                        <li key={tool.id} className="border-b border-gray-800 last:border-b-0">
                          <Link href={`/tool/${tool.slug}`} className="flex items-center p-4 hover:bg-gray-800 transition-colors">
                            <Image
                              src={tool.featuredImage?.node?.sourceUrl || '/placeholder.svg'}
                              alt={tool.title}
                              width={40}
                              height={40}
                              className="rounded-full mr-4"
                            />
                            <span className="text-white">{tool.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mb-16">
            <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-100">
              Explore 4+ AI Tools
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-gray-700 text-white hover:bg-gray-800">
              View All Categories
            </Button>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 max-w-3xl mx-auto">
            {popularTools.map((tool) => (
              <Link 
                key={tool.name}
                href={`/tool/${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-emerald-500 transition-transform group-hover:scale-110">
                  <Image
                    src={tool.logo}
                    alt={tool.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-gray-400 text-sm">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

