import { HeroSection } from '@/components/hero-section'
import { CategoriesSection } from '@/components/categories-section'
import { ToolCard } from "@/components/tool-card"
import ApolloWrapper from '@/components/ApolloWrapper'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import TryAgainButton from '@/components/TryAgainButton'
import SubmitToolButton from '@/components/SubmitToolButton'

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

async function getAITools(first: number = 10, after: string | null = null): Promise<AIToolsResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const url = new URL(`${apiUrl}/api/ai-tools`);
  url.searchParams.append('first', first.toString());
  if (after) url.searchParams.append('after', after);
  
  // Add a default category or fetch all categories
  url.searchParams.append('category', 'all');

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch AI Tools: ${res.status} ${res.statusText}`);
  }
  return res.json();
}



export default async function Home() {
  let aiToolsData: AIToolsResponse | null = null;
  let error: Error | null = null;

  try {
    aiToolsData = await getAITools();
  } catch (e) {
    error = e instanceof Error ? e : new Error('An unknown error occurred');
    console.error('Error fetching AI Tools:', error);
  }

  return (
    <ApolloWrapper>
      <div className="min-h-screen bg-black">
        <HeroSection />
        <CategoriesSection />
        
        <section className="py-20">
          <div className="container px-4 mx-auto">
            {error ? (
              <Alert variant="destructive" className="bg-red-900 border-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error Loading AI Tools</AlertTitle>
                <AlertDescription>
                  We&apos;re sorry, but there was an error loading the AI tools. Please try again later.
                  {process.env.NODE_ENV === 'development' && (
                    <div className="mt-2 text-sm opacity-75">
                      Error details: {error.message}
                    </div>
                  )}
                </AlertDescription>
                <TryAgainButton />
              </Alert>
            ) : !aiToolsData || !aiToolsData.edges || aiToolsData.edges.length === 0 ? (
              <Alert className="bg-yellow-900 border-yellow-800">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No AI Tools Found</AlertTitle>
                <AlertDescription>
                  No AI tools are currently available. Please check back later or submit your own tool.
                </AlertDescription>
                <SubmitToolButton />
              </Alert>
            ) : (
              <div className="max-w-screen-2xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-8">Featured AI Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {aiToolsData.edges.map(({ node: tool }) => (
                    <ToolCard
                      key={tool.id}
                      title={tool.title}
                      category={tool.aiToolCategories.nodes[0]?.name || "AI Tool"}
                      slug={tool.slug}
                      previewImage={tool.featuredImage?.node?.sourceUrl || "/placeholder.svg"}
                      logo={tool.featuredImage?.node?.sourceUrl || "/placeholder.svg"}
                      isVerified={Math.random() > 0.5}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </ApolloWrapper>
  );
}

