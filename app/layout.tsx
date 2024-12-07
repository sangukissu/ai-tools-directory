import './globals.css'
import { Inter } from 'next/font/google'
import { SiteNav } from '@/components/site-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Tools Directory',
  description: 'Discover the best AI tools for your business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteNav />
        {children}
      </body>
    </html>
  )
}
