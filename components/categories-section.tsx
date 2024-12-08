'use client'

import { ArrowRight, Code, FileText, ImageIcon, Mic2, Video, BarChart2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Category {
  id: string
  name: string
  slug: string
  count: number
  description?: string
}

const categoryIcons = {
  'image': ImageIcon,
  'voice': Mic2,
  'video': Video,
  'data-analysis': BarChart2,
  'code': Code,
  'text': FileText,
}

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories', { cache: 'no-store' })
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
    return <div className="text-center py-20 text-gray-400">Loading categories...</div>
  }

  if (error) {
    return <div className="text-center py-20 text-red-400">Error: {error}</div>
  }

  return (
    <section className="py-20 bg-black">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-400 mb-4">AI Tool Categories</h2>
            <p className="text-gray-500">
              Unlock innovation with our diverse range of cutting-edge solutions
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
          {categories.map((category) => {
            const IconComponent = categoryIcons[category.slug as keyof typeof categoryIcons] || Code
            
            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="block p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  <span className="text-sm text-gray-400">{category.count} tools</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  {category.description || `Explore ${category.name.toLowerCase()} AI tools and solutions`}
                </p>
                <IconComponent className="h-5 w-5 text-purple-500" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

