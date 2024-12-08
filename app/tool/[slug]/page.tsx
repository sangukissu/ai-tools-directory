import { Button } from "@/components/ui/button"
import { ExternalLink, ChevronRight } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import ApolloWrapper from '@/components/ApolloWrapper'
import { notFound } from 'next/navigation'
import { ToolSidebar } from '@/components/tool-sidebar'

interface AIToolCategory {
  name: string;
  slug: string;
}

interface AITool {
  id: string;
  title: string;
  content: string;
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
  affiliateLink?: string;
}

async function getAITool(slug: string): Promise<AITool | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiUrl}/api/ai-tools/${slug}`, { next: { revalidate: 3600 } })
  if (!res.ok) {
    return null
  }
  return res.json()
}

interface PageProps {
  params: { slug: string }
}

export default async function ToolPage({ params }: PageProps) {
  const tool = await getAITool(params.slug)

  if (!tool) {
    notFound()
  }

  // Function to remove "Read more" link from excerpt
  const cleanExcerpt = (excerpt: string) => {
    return excerpt.replace(/<a\s+[^>]*>Read more<\/a>/i, '').trim();
  }

  return (
    <ApolloWrapper>
      <div className="min-h-screen bg-black text-white">
        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-8">
            <Link href="/" className="text-gray-400 hover:text-white">
              AI Tools List
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            {tool.aiToolCategories && tool.aiToolCategories.nodes && tool.aiToolCategories.nodes[0] && (
              <>
                <Link href={`/category/${tool.aiToolCategories.nodes[0].slug}`} className="text-gray-400 hover:text-white">
                  {tool.aiToolCategories.nodes[0].name}
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </>
            )}
            <span className="text-white">{tool.title}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{tool.title}</h1>
              {tool.aiToolCategories && tool.aiToolCategories.nodes && tool.aiToolCategories.nodes[0] && (
                <Link 
                  href={`/category/${tool.aiToolCategories.nodes[0].slug}`}
                  className="inline-block bg-purple-900 text-white text-sm font-semibold px-3 py-1 rounded-full hover:bg-purple-800 transition-colors mb-6"
                >
                  {tool.aiToolCategories.nodes[0].name}
                </Link>
              )}

              {tool.excerpt && (
                <div 
                  className="text-gray-300 mb-8 text-lg" 
                  dangerouslySetInnerHTML={{ __html: cleanExcerpt(tool.excerpt) }} 
                />
              )}

              <Link 
                href={tool.affiliateLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-purple-600 text-primary-foreground shadow hover:bg-purple-700 h-9 px-4 py-2"
              >
                Explore Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>

              {/* Tool Preview */}
              {tool.featuredImage && tool.featuredImage.node && tool.featuredImage.node.sourceUrl && (
                <div className="rounded-lg overflow-hidden border border-gray-800 mb-8 mt-8">
                  <Image
                    src={tool.featuredImage.node.sourceUrl}
                    alt={`${tool.title} Preview`}
                    width={800}
                    height={600}
                    className="w-full"
                  />
                </div>
              )}

              {/* Tool Content */}
              {tool.content && (
                <div className="prose prose-invert max-w-none mt-8" dangerouslySetInnerHTML={{ __html: tool.content }} />
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <ToolSidebar toolName={tool.title} toolSlug={tool.slug} />
            </div>
          </div>
        </main>
      </div>
    </ApolloWrapper>
  )
}

