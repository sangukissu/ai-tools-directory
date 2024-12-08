import { ImageIcon, Mic2, Video, BarChart2, Code, FileText } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ApolloWrapper from '@/components/ApolloWrapper'

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

async function getCategories() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  const res = await fetch(`${apiUrl}/api/categories`, { 
    cache: 'no-store',
    next: { revalidate: 0 }
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch categories')
  }
  
  const data = await res.json()
  return data.nodes || []
}

export default async function CategoriesPage() {
  let categories: Category[] = []
  
  try {
    categories = await getCategories()
  } catch (error) {
    console.error('Error loading categories:', error)
    notFound()
  }

  return (
    <ApolloWrapper>
      <div className="min-h-screen bg-black">
        <main className="container mx-auto px-4 py-20">
          <div className="max-w-screen-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-400 mb-4">
              Categories
            </h1>
            <p className="text-xl text-gray-500 mb-16">
              Explore our curated collection of AI tools across different categories
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const IconComponent = categoryIcons[category.slug as keyof typeof categoryIcons] || Code

                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="group block p-8 rounded-xl bg-[#111] border border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg"
                  >
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className="h-6 w-6 text-gray-400" />
                      </div>
                    </div>

                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-2xl font-semibold text-white group-hover:text-gray-300 transition-colors">
                        {category.name}
                      </h2>
                      <svg
                        className="w-5 h-5 text-gray-600 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>

                    <p className="text-gray-400 mb-6 text-sm">
                      {category.description || `${category.name} AI tools and solutions for your needs`}
                    </p>

                    <div className="text-sm text-gray-500">
                      {category.count} {category.count === 1 ? 'tool' : 'tools'} available
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </ApolloWrapper>
  )
}

