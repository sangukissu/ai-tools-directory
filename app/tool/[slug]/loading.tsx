export default function Loading() {
    return (
      <div className="min-h-screen bg-black text-white">
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm mb-4 bg-[#0d1117] rounded-xl border border-[#1d2433] px-4 py-2">
            <div className="h-4 w-16 bg-gray-800 rounded animate-pulse" />
            <div className="h-4 w-4 bg-gray-800 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
            <div className="h-4 w-4 bg-gray-800 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-800 rounded animate-pulse" />
          </nav>
  
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              <div className="bg-[#0d1117] rounded-2xl border border-[#1d2433] p-5">
                <div className="mb-8">
                  <div className="h-8 w-64 bg-gray-800 rounded animate-pulse mb-4" />
                  <div className="h-6 w-32 bg-gray-800 rounded animate-pulse mb-6" />
                  <div className="h-4 w-full bg-gray-800 rounded animate-pulse mb-2" />
                  <div className="h-4 w-2/3 bg-gray-800 rounded animate-pulse mb-8" />
                  <div className="h-10 w-40 bg-gray-800 rounded animate-pulse" />
                </div>
  
                <div className="mb-8 h-64 bg-gray-800 rounded animate-pulse" />
  
                <div className="space-y-4">
                  <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
  
              <div className="bg-[#0d1117] rounded-2xl border border-[#1d2433] p-5">
                <div className="h-6 w-48 bg-gray-800 rounded animate-pulse mb-4" />
                <div className="h-4 w-full bg-gray-800 rounded animate-pulse mb-2" />
                <div className="h-4 w-5/6 bg-gray-800 rounded animate-pulse mb-2" />
                <div className="h-4 w-4/5 bg-gray-800 rounded animate-pulse" />
              </div>
            </div>
  
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <div className="bg-[#0d1117] rounded-2xl border border-[#1d2433] p-5">
                  <div className="h-6 w-32 bg-gray-800 rounded animate-pulse mb-4" />
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="h-10 w-10 bg-gray-800 rounded-full animate-pulse" />
                        <div className="flex-1">
                          <div className="h-4 w-full bg-gray-800 rounded animate-pulse mb-1" />
                          <div className="h-3 w-2/3 bg-gray-800 rounded animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
  
                <div className="bg-[#0d1117] rounded-2xl border border-[#1d2433] p-5">
                  <div className="h-6 w-24 bg-gray-800 rounded animate-pulse mb-4" />
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-8 bg-gray-800 rounded animate-pulse" />
                    ))}
                  </div>
                  <div className="h-10 w-full bg-gray-800 rounded animate-pulse" />
                </div>
  
                <div className="bg-[#0d1117] rounded-2xl border border-[#1d2433] p-5">
                  <div className="h-6 w-40 bg-gray-800 rounded animate-pulse mb-4" />
                  <div className="h-4 w-full bg-gray-800 rounded animate-pulse mb-2" />
                  <div className="h-4 w-5/6 bg-gray-800 rounded animate-pulse mb-4" />
                  <div className="h-10 w-full bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
  
  