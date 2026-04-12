'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero skeleton */}
      <div className="relative h-[90vh] bg-dark-900">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-900/90 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <div className="max-w-3xl animate-pulse space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-dark-700" />
              <div className="h-4 w-48 bg-dark-800 rounded" />
            </div>
            <div className="h-20 w-96 bg-dark-800 rounded" />
            <div className="h-6 w-full max-w-xl bg-dark-800 rounded" />
            <div className="h-6 w-3/4 max-w-xl bg-dark-800 rounded" />
            <div className="flex gap-4 pt-4">
              <div className="h-14 w-40 bg-dark-800 rounded-lg" />
              <div className="h-14 w-40 bg-dark-800 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-dark-900 border border-white/5 rounded-xl p-6 animate-pulse">
              <div className="w-14 h-14 bg-dark-800 rounded-lg mb-4" />
              <div className="h-8 w-16 bg-dark-800 rounded mb-2" />
              <div className="h-3 w-24 bg-dark-800 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Categories skeleton */}
      <div className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-dark-800 rounded" />
            <div className="h-10 w-64 bg-dark-800 rounded" />
          </div>
          <div className="h-6 w-32 bg-dark-800 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[500px] bg-dark-900 rounded-xl border border-dark-800" />
          ))}
        </div>
      </div>

      {/* Products skeleton */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-dark-950">
        <div className="text-center mb-16">
          <div className="h-4 w-24 bg-dark-800 rounded mx-auto mb-2" />
          <div className="h-8 w-48 bg-dark-800 rounded mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-dark-900 rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-dark-800" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 bg-dark-800 rounded" />
                <div className="h-3 w-1/2 bg-dark-800 rounded" />
                <div className="flex justify-between pt-4">
                  <div className="h-6 w-20 bg-dark-800 rounded" />
                  <div className="h-8 w-8 bg-dark-800 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}