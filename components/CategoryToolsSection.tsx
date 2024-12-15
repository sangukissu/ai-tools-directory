'use client'

import { useState } from 'react'
import React from 'react'
import { ToolCard } from "@/components/tool-card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import TryAgainButton from '@/components/TryAgainButton'
import SubmitToolButton from '@/components/SubmitToolButton'
import { AdSense } from '@/components/AdSense'
import { adsenseConfig } from '@/lib/adsense-config'

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

async function getAIToolsByCategory(category: string, first: number = 20, after: string | null = null): Promise<AIToolsResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const url = new URL(`${apiUrl}/api/ai-tools`);
  url.searchParams.append('first', first.toString());
  url.searchParams.append('category', category);
  if (after) url.searchParams.append('after', after);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Failed to fetch AI Tools: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

interface CategoryToolsSectionProps {
  initialTools: AITool[];
  category: string;
  initialPageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  };
}

export function CategoryToolsSection({ initialTools, category, initialPageInfo }: CategoryToolsSectionProps) {
  const [tools, setTools] = useState<AITool[]>(initialTools);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasNextPage, setHasNextPage] = useState(initialPageInfo.hasNextPage);
  const [endCursor, setEndCursor] = useState<string | null>(initialPageInfo.endCursor);

  const loadMoreTools = async () => {
    setLoading(true);
    try {
      const data = await getAIToolsByCategory(category, 20, endCursor);
      const newTools = data.edges.map(edge => edge.node).filter(tool => 
        tool.aiToolCategories.nodes.some(cat => cat.slug.toLowerCase() === category.toLowerCase())
      );
      setTools(prevTools => [...prevTools, ...newTools]);
      setHasNextPage(data.pageInfo.hasNextPage);
      setEndCursor(data.pageInfo.endCursor);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  // Filter initial tools to ensure they belong to the correct category
  const filteredTools = tools.filter(tool => 
    tool.aiToolCategories.nodes.some(cat => cat.slug.toLowerCase() === category.toLowerCase())
  );

  if (error) {
    return (
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
    );
  }

  if (filteredTools.length === 0 && !loading) {
    return (
      <Alert className="bg-yellow-900 border-yellow-800">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No AI Tools Found</AlertTitle>
        <AlertDescription>
          No AI tools are currently available in this category. Please check back later or submit your own tool.
        </AlertDescription>
        <SubmitToolButton />
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool, index) => (
          <React.Fragment key={tool.id}>
            <ToolCard
              title={tool.title}
              category={tool.aiToolCategories.nodes[0]?.name || category}
              slug={tool.slug}
              previewImage={tool.featuredImage?.node?.sourceUrl || "/placeholder.svg"}
              logo={tool.featuredImage?.node?.sourceUrl || "/placeholder.svg"}
              isVerified={Math.random() > 0.5}
            />
            {(index + 1) % 8 === 0 && (
              <div className="col-span-full my-8">
                <AdSense slot={adsenseConfig.slots.inContentFixed} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={loadMoreTools}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
}

