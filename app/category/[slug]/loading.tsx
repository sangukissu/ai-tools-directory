import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function Loading() {
  return (
    <div className="min-h-screen bg-black">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <nav className="flex items-center space-x-2 text-sm mb-4 bg-[#0d1117] rounded-xl border border-[#1d2433] px-4 py-2">
          <Link href="/" className="h-4 w-24 bg-gray-800 rounded animate-pulse hover:text-white">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
        </nav>
        
        <div className="mx-auto bg-[#0d1117] rounded-2xl border border-[#1d2433] p-5">
          <div className="h-8 w-64 bg-gray-800 rounded animate-pulse mb-8" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-[#1a1f2c] rounded-lg p-4 space-y-4">
                <div className="h-40 bg-gray-800 rounded animate-pulse" />
                <div className="h-6 w-3/4 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-800 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

