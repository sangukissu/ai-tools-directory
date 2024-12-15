export default function Loading() {
    return (
      <div className="min-h-screen bg-black">
        <main className="container mx-auto px-4 py-20">
          <div className="max-w-screen-2xl mx-auto">
            <div className="h-12 w-48 bg-gray-800 rounded-lg mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-gray-800 rounded-lg mb-16 animate-pulse" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="p-8 rounded-xl bg-[#111] border border-gray-800"
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-800 mb-6 animate-pulse" />
                  <div className="h-8 w-32 bg-gray-800 rounded-lg mb-4 animate-pulse" />
                  <div className="h-4 w-full bg-gray-800 rounded-lg mb-2 animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-800 rounded-lg mb-6 animate-pulse" />
                  <div className="h-4 w-24 bg-gray-800 rounded-lg animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }
  
  
