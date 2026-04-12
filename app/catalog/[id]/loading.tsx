'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-dark-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="animate-pulse space-y-8">
        {/* Back button skeleton */}
        <div className="h-6 w-32 bg-dark-800 rounded" />

        {/* Content grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image skeleton */}
          <div className="aspect-[4/3] bg-dark-800 rounded-2xl" />

          {/* Details skeleton */}
          <div className="space-y-6">
            <div className="h-4 w-24 bg-dark-800 rounded" />
            <div className="h-10 w-3/4 bg-dark-800 rounded" />
            <div className="h-8 w-32 bg-dark-800 rounded" />
            
            <div className="space-y-2">
              <div className="h-4 w-full bg-dark-800 rounded" />
              <div className="h-4 w-5/6 bg-dark-800 rounded" />
            </div>

            <div className="h-20 bg-dark-800 rounded-xl border border-white/10" />

            <div className="flex gap-4">
              <div className="h-14 w-1/2 bg-dark-800 rounded-xl" />
              <div className="h-14 w-1/2 bg-dark-800 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Contact section skeleton */}
        <div className="bg-dark-900 p-8 rounded-2xl border border-white/10">
          <div className="h-8 w-48 bg-dark-800 rounded mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-dark-800 rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 w-20 bg-dark-800 rounded" />
                <div className="h-3 w-28 bg-dark-800 rounded" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-dark-800 rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 w-20 bg-dark-800 rounded" />
                <div className="h-3 w-28 bg-dark-800 rounded" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-dark-800 rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 w-20 bg-dark-800 rounded" />
                <div className="h-3 w-28 bg-dark-800 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}