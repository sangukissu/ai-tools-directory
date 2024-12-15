import { Button } from "@/components/ui/button"
import { ExternalLink, ChevronRight } from 'lucide-react'
import { CheckCircle2 } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import ApolloWrapper from '@/components/ApolloWrapper'
import { notFound } from 'next/navigation'
import { ToolSidebar } from '@/components/tool-sidebar'
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
  modifiedGmt: string;
}

async function getAITool(slug: string): Promise<AITool | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  // Add cache-busting query parameter
  const timestamp = Date.now();
  const res = await fetch(
    `${apiUrl}/api/ai-tools/${slug}?t=${timestamp}`, 
    { 
      cache: 'no-store', // Disable caching completely
    }
  )
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

  // Function to format the content with proper HTML structure
  const formatContent = (content: string) => {
    // Split content into sections based on headings
    const sections = content.split(/(?=<h[1-6])/);

    return sections.map((section, index) => {
      // Check if the section contains a list
      if (section.includes('<ul>')) {
        const listItems = section.match(/<li>(.*?)<\/li>/g);
        if (listItems) {
          return (
            <div key={index}>
              <ul className="space-y-4 my-4 list-none">
                {listItems.map((item, i) => {
                  const content = item.replace(/<li>|<\/li>/g, '');
                  return (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#24cc90] mr-3 mt-0.5 flex-shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: content }} />
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }
      }

      // Format regular content
      const formattedSection = section
        // Format headings
        .replace(/<h2>/g, '<h2 className="text-2xl font-bold text-white mt-8 mb-4">')
        .replace(/<h3>/g, '<h3 className="text-xl font-semibold text-white mt-6 mb-3">')
        // Format paragraphs
        .replace(/<p>/g, '<p className="text-gray-300 mb-4">');

      return <div key={index} dangerouslySetInnerHTML={{ __html: formattedSection }} />;
    });
  };

  // Format the modified date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Recently updated';
    }
  }

  return (
    <ApolloWrapper>
      <div className="min-h-screen bg-black text-white">
        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-8">
            <Link href="/" className="text-gray-400 hover:text-white">
              Home
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
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{tool.title}</h1>
                {tool.aiToolCategories && tool.aiToolCategories.nodes && tool.aiToolCategories.nodes[0] && (
                    <Link 
                    href={`/category/${tool.aiToolCategories.nodes[0].slug}`}
                    className="inline-block bg-primary text-white text-sm font-semibold px-3 py-1 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 mb-6"
                  >
                    {tool.aiToolCategories.nodes[0].name}
                  </Link>
                )}

                {tool.excerpt && (
                  <div 
                    className="text-gray-300 mb-8 text-lg leading-relaxed" 
                    dangerouslySetInnerHTML={{ __html: cleanExcerpt(tool.excerpt) }} 
                  />
                )}

                {tool.affiliateLink ? (
                  <Link 
                    href={tool.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-white shadow hover:bg-primary/90 h-9 px-4 py-2"
                  >
                    Explore Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                ) : (
                  <span className="text-gray-400">No affiliate link available</span>
                )}
              </div>

              {/* Tool Preview */}
              {tool.featuredImage && tool.featuredImage.node && tool.featuredImage.node.sourceUrl && (
                <Card className="mb-8 bg-gray-900 border-gray-800">
                  <CardContent className="p-0">
                    <Image
                      src={tool.featuredImage.node.sourceUrl}
                      alt={`${tool.title} Preview`}
                      width={800}
                      height={600}
                      className="w-full rounded-lg"
                    />
                  </CardContent>
                </Card>
              )}

              {/* Tool Content */}
              {tool.content && (
                <div className="prose prose-invert max-w-none">
                  {formatContent(tool.content)}
                </div>
              )}

              {/* Last updated information */}
              {tool.modifiedGmt && (
                <p className="text-sm text-gray-400 mt-8">
                  Last updated: {formatDate(tool.modifiedGmt)}
                </p>
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

