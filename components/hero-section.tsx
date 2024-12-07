'use client'

import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import Image from 'next/image'

const popularTools = [
  { name: 'loopin', logo: '/placeholder.svg' },
  { name: 'bing chat', logo: '/placeholder.svg' },
  { name: 'Adobe', logo: '/placeholder.svg' },
  { name: 'monica', logo: '/placeholder.svg' },
  { name: 'Chat GPT', logo: '/placeholder.svg' },
  { name: 'Jasper', logo: '/placeholder.svg' },
]

export function HeroSection() {
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
          
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search AI tools..."
                className="w-full pl-12 pr-4 py-6 bg-gray-900 border-gray-800 rounded-full text-gray-100 placeholder:text-gray-400"
              />
            </div>
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

