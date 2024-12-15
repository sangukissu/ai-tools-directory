export default function Loading() {
    return (
      <div className="min-h-screen bg-black">
        <div className="animate-pulse space-y-8 py-20">
          {/* Hero Section Placeholder */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-64 bg-gray-800 rounded-xl mb-8"></div>
            <div className="h-12 bg-gray-800 rounded-xl w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-800 rounded-xl w-1/2"></div>
          </div>
  
          {/* Categories Section Placeholder */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-8 bg-gray-800 rounded-xl w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-40 bg-gray-800 rounded-xl"></div>
              ))}
            </div>
          </div>
  
          {/* AI Tools Section Placeholder */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-8 bg-gray-800 rounded-xl w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-800 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  