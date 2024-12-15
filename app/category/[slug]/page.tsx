import { ToolCard } from "@/components/tool-card"
import ApolloWrapper from '@/components/ApolloWrapper'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import TryAgainButton from '@/components/TryAgainButton'
import SubmitToolButton from '@/components/SubmitToolButton'
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

async function getAllTools(first: number = 100): Promise<AIToolsResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(
    `${apiUrl}/api/ai-tools?first=${first}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch AI Tools: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

function filterToolsByCategory(tools: AIToolsResponse, categorySlug: string): AITool[] {
  return tools.edges
    .map(edge => edge.node)
    .filter(tool => 
      tool.aiToolCategories.nodes.some(
        category => category.slug.toLowerCase() === categorySlug.toLowerCase()
      )
    );
}

interface PageProps {
  params: { slug: string }
}

export default async function CategoryPage({ params }: PageProps) {
  let allTools: AIToolsResponse | null = null;
  let error: Error | null = null;

  try {
    allTools = await getAllTools();
  } catch (e) {
    error = e instanceof Error ? e : new Error('An unknown error occurred');
    console.error('Error fetching AI Tools:', error);
  }

  if (!allTools) {
    return notFound();
  }

  const filteredTools = filterToolsByCategory(allTools, params.slug);
  
  if (filteredTools.length === 0) {
    return notFound();
  }

  const categoryName = filteredTools[0].aiToolCategories.nodes.find(
    cat => cat.slug.toLowerCase() === params.slug.toLowerCase()
  )?.name || params.slug;

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
            
            {error ? (
              <Alert variant="destructive" className="bg-red-900 border-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error Loading AI Tools</AlertTitle>
                <AlertDescription>
                  We're sorry, but there was an error loading the AI tools. Please try again later.
                  {process.env.NODE_ENV === 'development' && (
                    <div className="mt-2 text-sm opacity-75">
                      Error details: {error.message}
                    </div>
                  )}
                </AlertDescription>
                <TryAgainButton />
              </Alert>
            ) : filteredTools.length === 0 ? (
              <Alert className="bg-yellow-900 border-yellow-800">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No AI Tools Found</AlertTitle>
                <AlertDescription>
                  No AI tools are currently available in this category. Please check back later or submit your own tool.
                </AlertDescription>
                <SubmitToolButton />
              </Alert>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTools.map((tool) => (
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

