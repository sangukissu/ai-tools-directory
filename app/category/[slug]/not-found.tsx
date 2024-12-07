import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Category Not Found</h2>
          <p className="text-gray-400 mb-8">
            Sorry, we couldn't find the category you're looking for.
          </p>
          <Link 
            href="/"
            className="text-purple-500 hover:text-purple-400 underline"
          >
            Return to Home
          </Link>
        </div>
      </main>
    </div>
  )
}

