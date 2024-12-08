"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useDebounce } from '@/hooks/use-debounce'
import { Input } from "@/components/ui/input"
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

const navItems = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "GPT Store", href: "/gpt-store" },
  { name: "Shorts Video", href: "/shorts-video" },
  { name: "Blog", href: "/blog" },
  { name: "Submit AI Tool", href: "/submit" },
]

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<AITool[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const searchAITools = async () => {
      if (debouncedSearchTerm.length >= 3) {
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

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  return (
    <>
      <div className="w-full bg-black text-white py-1 px-4 text-center border-b border-gray-800">
        🏆 Ranking #1 in AI Tools – Submit Your Tool Today! 🚀
      </div>
      <header className="sticky top-0 z-50 border-b bg-black border-gray-800">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/placeholder.svg"
              alt="FindMyAITool"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-white">findmyaitool</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className="text-white hover:text-gray-300 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Search
              className="h-5 w-5 text-white cursor-pointer hover:text-gray-300 transition-colors"
              onClick={toggleSearch}
            />
            <Button
              className="md:hidden"
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex flex-col h-full"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <Link href="/" className="flex items-center space-x-2" onClick={toggleMenu}>
                  <Image
                    src="/placeholder.svg"
                    alt="FindMyAITool"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="text-xl font-bold text-white">findmyaitool</span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleMenu}
                  className="text-white hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <nav className="flex flex-col p-4 space-y-4">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * navItems.indexOf(item) }}
                  >
                    <Link
                      href={item.href}
                      className="text-white hover:text-gray-300 text-lg py-2 block"
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-gray-900 w-full max-w-2xl rounded-lg shadow-lg overflow-hidden"
              ref={searchRef}
            >
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search AI tools..."
                    className="w-full pl-12 pr-4 py-6 bg-gray-800 border-gray-700 rounded-full text-gray-100 placeholder:text-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                </div>
                {(searchResults.length > 0 || isLoading) && (
                  <div className="mt-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
                    {isLoading ? (
                      <div className="p-4 text-center text-gray-400">Searching...</div>
                    ) : (
                      <ul className="max-h-96 overflow-y-auto">
                        {searchResults.map((tool) => (
                          <li key={tool.id} className="border-b border-gray-700 last:border-b-0">
                            <Link
                              href={`/tool/${tool.slug}`}
                              className="flex items-center p-4 hover:bg-gray-700 transition-colors"
                              onClick={() => setIsSearchOpen(false)}
                            >
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
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

