import './globals.css'
import { Inter } from 'next/font/google'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'
import { generateWebSiteSchema } from '@/lib/seo-utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Geekdroid | AI Tools Directory',
    template: '%s | Geekdroid'
  },
  description: 'Discover and compare the best AI tools for your business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteSchema()) }}
        />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <SiteNav />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

