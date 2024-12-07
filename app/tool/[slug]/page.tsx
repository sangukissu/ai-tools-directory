import { Button } from "@/components/ui/button"
import { Bookmark, ChevronRight, ExternalLink } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import ApolloWrapper from '@/components/ApolloWrapper'
import { notFound } from 'next/navigation'

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
  params: Promise<{ slug: string }>
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = await getAITool(slug)

  if (!tool) {
    notFound()
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
              <div className="flex items-start space-x-6 mb-8">
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={tool.featuredImage?.node?.sourceUrl || "/placeholder.svg"}
                    alt={tool.title}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{tool.title}</h1>
                  <div className="flex items-center space-x-4 mb-4">
                    {tool.aiToolCategories && tool.aiToolCategories.nodes && tool.aiToolCategories.nodes.map((category) => (
                      <Link 
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        className="bg-purple-900 text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-purple-800 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                  {tool.excerpt && (
                    <div className="text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: tool.excerpt }} />
                  )}
                  <div className="flex items-center space-x-4">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Explore Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="border-gray-700">
                      <Bookmark className="mr-2 h-4 w-4" />
                      <span>Save</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tool Preview */}
              {tool.featuredImage && tool.featuredImage.node && tool.featuredImage.node.sourceUrl && (
                <div className="rounded-lg overflow-hidden border border-gray-800 mb-8">
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
                <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: tool.content }} />
              )}
            </div>

            {/* Featured Tools Sidebar */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold mb-6">Featured AI Tools</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Link
                    key={i}
                    href={`/tool/featured-${i}`}
                    className="block p-4 rounded-lg border border-gray-800 hover:bg-gray-900 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src="/placeholder.svg"
                        alt={`Featured Tool ${i}`}
                        width={50}
                        height={50}
                        className="rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold">Featured Tool {i}</h3>
                        <p className="text-sm text-gray-400">Category</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ApolloWrapper>
  )
}

