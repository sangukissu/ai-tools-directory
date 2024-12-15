import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface ToolCardProps {
  title: string
  category: string
  slug: string
  previewImage: string
  logo: string
  isVerified?: boolean
}

export function ToolCard({ title, category, slug, previewImage, logo, isVerified }: ToolCardProps) {
  return (
    <Link 
      href={`/tool/${slug}`}
      className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-gray-900/90 to-gray-950 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300"
    >
      <div className="p-3 pb-0">
        <div className="aspect-[16/10] relative overflow-hidden rounded-xl">
          <Image
            src={previewImage}
            alt={`${title} preview`}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <div className="px-3 pb-3 pt-2 flex items-center gap-3">
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-800/50">
          <Image
            src={logo}
            alt={`${title} logo`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm text-white flex items-center gap-2 truncate">
            {title}
            {isVerified && (
              <Badge variant="secondary" className="flex-shrink-0 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </Badge>
            )}
          </h3>
          <Link href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`} className="text-xs text-gray-400 hover:text-gray-300 truncate">
  {category}
</Link>
        </div>
      </div>
    </Link>
  )
}

