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

  // Function to format the content with proper HTML structure
  const formatContent = (content: string) => {
    // Split content into sections based on headings
    const sections = content.split(/(?=<h[1-6])/);
  
    return sections.map((section, index) => {
      // Check if the section is a FAQ
      if (section.includes('[rakmath_faq]')) {
        const faqContent = section.match(/\[rakmath_faq\]([\s\S]*?)\[\/rakmath_faq\]/);
        if (faqContent && faqContent[1]) {
          const faqItems = faqContent[1].split(/(?=\[rakmath_faq_item)/);
          return (
            <div key={index} className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, faqIndex) => {
                  const question = item.match(/question="(.*?)"/)?.[1];
                  const answer = item.match(/answer="(.*?)"/)?.[1];
                  if (question && answer) {
                    return (
                      <AccordionItem key={faqIndex} value={`item-${faqIndex}`}>
                        <AccordionTrigger>{question}</AccordionTrigger>
                        <AccordionContent>{answer}</AccordionContent>
                      </AccordionItem>
                    );
                  }
                  return null;
                })}
              </Accordion>
            </div>
          );
        }
      }

      // Format regular content
      const formattedSection = section
        // Format lists
        .replace(/<ul>/g, '<ul className="space-y-4 my-4 list-none">')
        .replace(/<li>/g, '<li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-[#24cc90] mr-3 mt-0.5 flex-shrink-0" /><span>')
        .replace(/<\/li>/g, '</span></li>')
        // Format headings
        .replace(/<h2>/g, '<h2 className="text-2xl font-bold text-white mt-8 mb-4">')
        .replace(/<h3>/g, '<h3 className="text-xl font-semibold text-white mt-6 mb-3">')
        // Format paragraphs
        .replace(/<p>/g, '<p className="text-gray-300 mb-4">');

      return <div key={index} dangerouslySetInnerHTML={{ __html: formattedSection }} />;
    });
  };

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
                    className="inline-block bg-purple-900 text-white text-sm font-semibold px-3 py-1 rounded-full hover:bg-purple-800 transition-colors mb-6"
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
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-purple-600 text-primary-foreground shadow hover:bg-purple-700 h-9 px-4 py-2"
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

