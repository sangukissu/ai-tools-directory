import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
}

export function generateMetadata({ title, description, canonical, ogImage }: SEOProps): Metadata {
  const siteName = "Geekdroid"
  const siteUrl = "https://geekdroid.in"
  
  return {
    title: `${title}`,
    description,
    openGraph: {
      title,
      description,
      url: canonical || siteUrl,
      siteName,
      images: [{ url: ogImage || `${siteUrl}/og-image.png` }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage || `${siteUrl}/og-image.png`],
    },
    alternates: {
      canonical: canonical || siteUrl,
    },
  }
}

export function WebSiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Geekdroid",
          "url": "https://geekdroid.in",
          "description": "Discover and compare the best AI tools for your needs",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://geekdroid.in/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })
      }}
    />
  )
}

