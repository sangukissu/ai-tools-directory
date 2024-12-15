import { Metadata } from 'next'

export interface SEOProps {
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

export function generateWebSiteSchema() {
  return {
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
  }
}

export function generateWebPageSchema(title: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Geekdroid",
      "url": "https://geekdroid.in"
    }
  }
}

export function generateTechArticleSchema(tool: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": tool.title,
    "description": tool.description,
    "image": tool.image,
    "datePublished": tool.datePublished,
    "dateModified": tool.dateModified,
    "author": {
      "@type": "Organization",
      "name": "Geekdroid"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Geekdroid",
      "logo": {
        "@type": "ImageObject",
        "url": "https://geekdroid.in/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": tool.url
    }
  }
}

export function cleanExcerpt(excerpt: string): string {
  return excerpt.replace(/<a\s+[^>]*>Read more<\/a>/i, '').trim();
}

