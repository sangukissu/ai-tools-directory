import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">FindMyAITool</h2>
            <p className="text-gray-400 mb-4">Discover and compare the best AI tools for your needs. Our curated directory helps you find the perfect AI solution for your projects.</p>
            <div className="flex space-x-4">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/page/categories" className="text-gray-400 hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/submit" className="text-gray-400 hover:text-white transition-colors">Submit Tool</Link></li>
              <li><Link href="/page/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/page/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/page/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/page/cookie-policy" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Geekdroid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

