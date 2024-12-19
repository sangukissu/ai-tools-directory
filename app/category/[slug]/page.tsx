import { Suspense } from 'react'
import ApolloWrapper from '@/components/ApolloWrapper'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { CategoryToolsSection } from '@/components/CategoryToolsSection'

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

async function getCategoryTools(category: string, first: number = 20): Promise<AIToolsResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const url = `${apiUrl}/api/ai-tools?first=${first}&category=${encodeURIComponent(category)}`;
  console.log('Fetching category tools from:', url);
  
  const res = await fetch(url, { 
    cache: 'no-store',
    next: { revalidate: 0 }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch AI Tools: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  console.log('API Response:', data);
  return data;
}

interface PageProps {
  params: { slug: string }
}

export default async function CategoryPage({ params }: PageProps) {
  let categoryTools: AIToolsResponse | null = null;
  let error: Error | null = null;

  try {
    categoryTools = await getCategoryTools(params.slug);
    console.log('Fetched category tools:', categoryTools);
  } catch (e) {
    error = e instanceof Error ? e : new Error('An unknown error occurred');
    console.error('Error fetching AI Tools:', error);
  }

  if (!categoryTools || categoryTools.edges.length === 0) {
    console.log('No category tools found, returning 404');
    return notFound();
  }

  const initialTools = categoryTools.edges.map(edge => edge.node);
  const categoryName = initialTools[0]?.aiToolCategories.nodes.find(
    cat => cat.slug.toLowerCase() === params.slug.toLowerCase()
  )?.name || params.slug;

  console.log('Rendering category page with:', {
    categoryName,
    initialToolsCount: initialTools.length,
    hasNextPage: categoryTools.pageInfo.hasNextPage,
    endCursor: categoryTools.pageInfo.endCursor
  });

  return (
    <ApolloWrapper>
      <div className="min-h-screen bg-black">
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm mb-4 bg-[#0d1117] rounded-xl border border-[#1d2433] px-4 py-2">
            <Link href="/" className="text-gray-400 hover:text-white">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white">{categoryName}</span>
          </nav>
          
          <div className="mx-auto bg-[#0d1117] rounded-2xl border border-[#1d2433] p-5">
            <h1 className="text-3xl font-bold text-white mb-8">{categoryName} AI Tools</h1>
            
            <Suspense fallback={<div>Loading AI Tools...</div>}>
              <CategoryToolsSection 
                initialTools={initialTools} 
                category={params.slug}
                initialPageInfo={categoryTools.pageInfo}
              />
            </Suspense>
          </div>
        </main>
      </div>
    </ApolloWrapper>
  )
}

