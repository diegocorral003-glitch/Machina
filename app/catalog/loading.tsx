'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-dark-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="animate-pulse space-y-8">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <div className="inline-block h-6 w-32 bg-dark-800 rounded-full mb-6" />
          <div className="h-12 w-80 bg-dark-800 rounded mx-auto mb-4" />
          <div className="h-6 w-96 bg-dark-800 rounded mx-auto" />
        </div>

        {/* Filters skeleton */}
        <div className="bg-dark-900/80 p-4 rounded-2xl border border-white/10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="h-12 w-full md:w-96 bg-dark-800 rounded-xl" />
            <div className="flex gap-2">
              <div className="h-12 w-24 bg-dark-800 rounded-lg" />
              <div className="h-12 w-24 bg-dark-800 rounded-lg" />
              <div className="h-12 w-24 bg-dark-800 rounded-lg" />
              <div className="h-12 w-24 bg-dark-800 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-dark-900 rounded-2xl border border-white/5 overflow-hidden">
              <div className="aspect-[4/3] bg-dark-800" />
              <div className="p-6 space-y-4">
                <div className="h-6 w-3/4 bg-dark-800 rounded" />
                <div className="h-4 w-1/2 bg-dark-800 rounded" />
                <div className="h-4 w-full bg-dark-800 rounded" />
                <div className="flex justify-between pt-4 border-t border-white/5">
                  <div className="h-6 w-20 bg-dark-800 rounded" />
                  <div className="h-10 w-10 bg-dark-800 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}