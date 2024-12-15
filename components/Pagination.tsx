import Link from 'next/link'
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  hasNextPage: boolean
}

export default function Pagination({ currentPage, hasNextPage }: PaginationProps) {
  return (
    <div className="flex justify-center items-center mt-12 space-x-4">
      <Button
        asChild
        variant="outline"
        disabled={currentPage === 1}
        className="bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50"
      >
        <Link href={`/?page=${currentPage - 1}`}>Previous</Link>
      </Button>
      <span className="text-white text-sm">Page {currentPage}</span>
      <Button
        asChild
        variant="outline"
        disabled={!hasNextPage}
        className="bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50"
      >
        <Link href={`/?page=${currentPage + 1}`}>Next</Link>
      </Button>
    </div>
  )
}

