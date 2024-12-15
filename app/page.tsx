import { HeroSection } from '@/components/hero-section'
import { CategoriesSection } from '@/components/categories-section'
import { AIToolsSection } from '@/components/AIToolsSection'
import ApolloWrapper from '@/components/ApolloWrapper'
import { generateMetadata, generateWebPageSchema } from '@/lib/seo-utils'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = generateMetadata({
  title: "Geekdroid | Discover AI Tools for Your Business",
  description: "Explore our curated collection of AI tools to streamline your workflow and find the perfect solution for your business needs.",
  canonical: "https://geekdroid.in"
})

export default function Home() {
  const webPageSchema = generateWebPageSchema(
    "Discover AI Tools for Your Business",
    "Explore our curated collection of AI tools to streamline your workflow and find the perfect solution for your business needs.",
    "https://geekdroid.in"
  )

  return (
    <ApolloWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <div className="min-h-screen bg-black">
        <HeroSection />
        <CategoriesSection />
        
        <section className="py-20">
          <div className="max-w-7xl px-4 mx-auto">
            <Suspense fallback={<div>Loading AI Tools...</div>}>
              <AIToolsSection />
            </Suspense>
          </div>
        </section>
      </div>
    </ApolloWrapper>
  );
}

