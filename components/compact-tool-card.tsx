import Image from "next/image"
import Link from "next/link"

interface CompactToolCardProps {
  title: string
  category: string
  slug: string
  logo: string
}

export function CompactToolCard({ 
  title, 
  category, 
  slug, 
  logo
}: CompactToolCardProps) {
  return (
    <Link 
      href={`/tool/${slug}`}
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#1a1f2c] transition-colors group"
    >
      <div className="relative flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)] bg-gradient-to-br from-gray-800 to-gray-900">
        <Image
          src={logo}
          alt={`${title} logo`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col min-w-0">
        <h3 className="font-medium text-[15px] text-gray-100 truncate leading-none mb-1.5">
          {title}
        </h3>
        <p className="text-xs text-gray-500 truncate">
          {category}
        </p>
      </div>
    </Link>
  )
}

