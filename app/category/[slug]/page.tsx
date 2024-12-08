import { ToolCard } from "@/components/tool-card"
import ApolloWrapper from '@/components/ApolloWrapper'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { notFound } from 'next/navigation'

interface AIToolCategory {
  name: string;
  slug: string;
}

interface AITool {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  aiToolCategories: {
    nodes: AIToolCategory[];
  };
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
}

interface AIToolsResponse {
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  };
  edges: {
    node: AITool;
  }[];
}

async function getAIToolsByCategory(category: string): Promise<AIToolsResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(
    `${apiUrl}/api/ai-tools?first=12&category=${encodeURIComponent(category)}`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch AI Tools: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  return data
}

interface PageProps {
  params: { slug: string }
}

export default async function CategoryPage({ params }: PageProps) {
  let aiToolsData: AIToolsResponse;

  try {
    aiToolsData = await getAIToolsByCategory(params.slug)
  } catch (error) {
    console.error('Error fetching category data:', error)
    notFound()
  }

  // Format the category name for display
  const formattedCategoryName = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  // If we have data, use the actual category name from the first tool
  const categoryName = 
    aiToolsData.edges[0]?.node.aiToolCategories.nodes[0]?.name || 
    formattedCategoryName

  return (
    <ApolloWrapper>
      <div className="min-h-screen bg-black">
        <main className="container mx-auto px-4 py-8">
          <nav className="flex items-center space-x-2 text-sm mb-8">
            <Link href="/" className="text-gray-400 hover:text-white">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white">{categoryName}</span>
          </nav>
          
          <div className="max-w-screen-2xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">{categoryName} AI Tools</h1>
            
            {aiToolsData.edges.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No tools found in this category yet.
                </p>
                <Link 
                  href="/submit" 
                  className="text-purple-500 hover:text-purple-400 mt-4 inline-block"
                >
                  Submit the first tool →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {aiToolsData.edges.map(({ node: tool }) => (
                  <ToolCard
                    key={tool.id}
                    title={tool.title}
                    category={tool.aiToolCategories.nodes[0]?.name || categoryName}
                    slug={tool.slug}
                    previewImage={tool.featuredImage?.node?.sourceUrl || "/placeholder.svg"}
                    logo={tool.featuredImage?.node?.sourceUrl || "/placeholder.svg"}
                    isVerified={Math.random() > 0.5}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </ApolloWrapper>
  )
}

