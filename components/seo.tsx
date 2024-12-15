import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
}

export function SEO({ title, description, canonical, ogImage }: SEOProps) {
  const siteName = "Geekdroid"
  const siteUrl = "https://geekdroid.in"
  
  return (
    <Head>
      <title>{`${title} | ${siteName}`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical || siteUrl} />
      
      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical || siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage || `${siteUrl}/og-image.png`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || `${siteUrl}/og-image.png`} />
    </Head>
  )
}

export function WebSiteSchema() {
  return (
    <Head>
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
    </Head>
  )
}

