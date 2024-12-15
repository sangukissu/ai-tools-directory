import './globals.css'
import { Inter } from 'next/font/google'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { WebSiteSchema } from '@/components/seo'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Geekdroid | AI Tools Directory',
  description: 'Discover and compare the best AI tools for your business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WebSiteSchema />
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

