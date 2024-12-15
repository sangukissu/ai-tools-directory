'use client'

import { ArrowRight, BarChart2, Code, Image, MessageSquare, Video, Wand2, Music, Box, Briefcase, Grid } from 'lucide-react'
import Link from 'next/link'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'

// Map of category names to their icons and descriptions
const categoryMeta: Record<string, { icon: any; description: string; color: string }> = {
  'Text': {
    icon: MessageSquare,
    description: 'Text generation, processing, and language models for content creation.',
    color: 'from-blue-500/20'
  },
  'Image': {
    icon: Image,
    description: 'AI-powered image generation, editing, and enhancement tools.',
    color: 'from-purple-500/20'
  },
  'Voice': {
    icon: Wand2,
    description: 'Voice synthesis, recognition, and audio processing solutions.',
    color: 'from-green-500/20'
  },
  'Video': {
    icon: Video,
    description: 'Video creation, editing, and AI-enhanced production tools.',
    color: 'from-red-500/20'
  },
  'Code': {
    icon: Code,
    description: 'Code generation, analysis, and development assistance tools.',
    color: 'from-yellow-500/20'
  },
  'Data Analysis': {
    icon: BarChart2,
    description: 'Advanced data processing, visualization, and analytics platforms.',
    color: 'from-cyan-500/20'
  },
  'Audio': {
    icon: Music,
    description: 'Audio processing, music generation, and sound editing tools.',
    color: 'from-indigo-500/20'
  },
  '3D': {
    icon: Box,
    description: '3D modeling, animation, and visualization tools.',
    color: 'from-pink-500/20'
  },
  'Business': {
    icon: Briefcase,
    description: 'Business automation, productivity, and management tools.',
    color: 'from-orange-500/20'
  },
  'Other': {
    icon: Grid,
    description: 'Other innovative AI tools and solutions.',
    color: 'from-violet-500/20'
  }
}

export function CategoriesSection() {
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories')
        if (!response.ok) throw new Error('Failed to fetch categories')
        const data = await response.json()
        setCategories(data.nodes || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (isLoading) {
    return (
      <section className="py-20 bg-black">
        <div className="container px-4 mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-64 bg-gray-800 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-gray-800 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-400">Error: {error}</div>
    )
  }

  return (
    <section className="py-20 bg-black">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-300 mb-4">Categories</h2>
            <p className="text-gray-500">
              Explore our curated collection of AI tools across different categories
            </p>
          </div>
          <Link 
            href="/categories" 
            className="flex items-center text-purple-500 hover:text-purple-400 transition-colors"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((category) => {
            const meta = categoryMeta[category.name] || {
              icon: Grid,
              description: `Discover ${category.name.toLowerCase()} AI tools and solutions.`,
              color: 'from-gray-500/20'
            }
            const Icon = meta.icon

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group"
              >
                <Card className="h-full bg-[#0d1117] border-[#1d2433] transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10">
                  <div className="p-6 space-y-4">
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${meta.color} to-transparent flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                        <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="text-gray-400 text-sm">
                        {meta.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[#1d2433]">
                      <span className="text-sm text-gray-500">
                        {category.count} {category.count === 1 ? 'tool' : 'tools'} available
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

